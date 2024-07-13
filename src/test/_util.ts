import exported from '..'
import { parser, plugin as tseslintPlugin } from 'typescript-eslint'
import { TSESLint } from '@typescript-eslint/utils'
import semver from 'semver'
import * as importPlugin from 'eslint-plugin-import'
import * as nPlugin from 'eslint-plugin-n'
import * as promisePlugin from 'eslint-plugin-promise'
import { type PackageJson } from 'type-fest'

interface PkgDetails {
  pkgPath: string
  pkgJson: PackageJson
  ourDeps: NonNullable<PackageJson['dependencies']>
  ourPeerDeps: NonNullable<PackageJson['peerDependencies']>
  ourDevDeps: NonNullable<PackageJson['devDependencies']>
}

export const getPkgDetails = async (): Promise<PkgDetails> => {
  const { readPackageUp } = await import('read-pkg-up')
  const readResult = await readPackageUp()
  if (readResult === undefined) {
    throw new Error()
  }
  const ourPkg = readResult.packageJson
  if (ourPkg.dependencies === undefined) {
    throw new Error()
  }
  const ourDeps = ourPkg.dependencies
  if (ourPkg.peerDependencies === undefined) {
    throw new Error()
  }
  const ourPeerDeps = ourPkg.peerDependencies
  if (ourPkg.devDependencies === undefined) {
    throw new Error()
  }
  const ourDevDeps = ourPkg.devDependencies
  return {
    pkgJson: ourPkg,
    pkgPath: readResult.path,
    ourDeps,
    ourPeerDeps,
    ourDevDeps,
  }
}

export const isSingleCaretRange = (rangeStr: string): boolean => {
  const range = new semver.Range(rangeStr)
  return (
    range.set.length === 1 &&
    range.set[0].length === 2 &&
    range.set[0][0].operator === '>=' &&
    range.set[0][1].operator === '<'
  )
}

export const isPinnedRange = (rangeStr: string): boolean => {
  const range = new semver.Range(rangeStr)
  return (
    range.set.length === 1 &&
    range.set[0].length === 1 &&
    range.set[0][0].operator === ''
  )
}

export const extractVersionRange = (spec: string): string =>
  spec.split('@').slice(-1)[0]

const ourRules_ = exported.rules
if (ourRules_ === undefined) throw new Error('we seem to be exporting no rules')
export const ourRules = ourRules_

export const equivalents = [...new TSESLint.Linter().getRules().keys()].filter(
  (name) => Object.prototype.hasOwnProperty.call(tseslintPlugin.rules, name),
)

export const expectedExportedValue: TSESLint.FlatConfig.Config = {
  languageOptions: {
    parser,
    parserOptions: {
      project: true,
    },
  },
  plugins: {
    '@typescript-eslint': tseslintPlugin,
    import: importPlugin,
    n: nPlugin,
    promise: promisePlugin,
  },
  rules: {
    'no-var': ['error'],
    'object-shorthand': ['warn', 'properties'],

    'accessor-pairs': [
      'error',
      {
        setWithoutGet: true,
        getWithoutSet: false,
        enforceForClassMembers: true,
      },
    ],
    'array-callback-return': [
      'error',
      {
        allowImplicit: false,
        allowVoid: false,
        checkForEach: false,
      },
    ],
    'class-methods-use-this': ['off'],
    'constructor-super': ['error'],
    curly: ['error', 'multi-line'],
    'default-case-last': ['error'],
    'dot-notation': ['off'],
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    'new-cap': ['error', { newIsCap: true, capIsNew: false, properties: true }],
    'no-array-constructor': ['off'],
    'no-async-promise-executor': ['error'],
    'no-caller': ['error'],
    'no-case-declarations': ['error'],
    'no-class-assign': ['error'],
    'no-compare-neg-zero': ['error'],
    'no-cond-assign': ['error'],
    'no-const-assign': ['error'],
    'no-constant-condition': ['error', { checkLoops: false }],
    'no-control-regex': ['error'],
    'no-debugger': ['error'],
    'no-delete-var': ['error'],
    'no-dupe-args': ['error'],
    'no-dupe-class-members': ['off'],
    'no-dupe-keys': ['error'],
    'no-duplicate-case': ['error'],
    'no-useless-backreference': ['error'],
    'no-empty': ['error', { allowEmptyCatch: true }],
    'no-empty-character-class': ['error'],
    'no-empty-pattern': ['error'],
    'no-eval': ['error'],
    'no-ex-assign': ['error'],
    'no-extend-native': ['error'],
    'no-extra-bind': ['error'],
    'no-extra-boolean-cast': ['error'],
    'no-fallthrough': ['error'],
    'no-func-assign': ['error'],
    'no-global-assign': ['error'],
    'no-implied-eval': ['off'],
    'no-import-assign': ['error'],
    'no-invalid-regexp': ['error'],
    'no-irregular-whitespace': ['error'],
    'no-iterator': ['error'],
    'no-labels': ['error', { allowLoop: false, allowSwitch: false }],
    'no-lone-blocks': ['error'],
    'no-loss-of-precision': ['off'],
    'no-misleading-character-class': ['error'],
    'no-prototype-builtins': ['error'],
    'no-useless-catch': ['error'],
    'no-multi-str': ['error'],
    'no-new': ['error'],
    'no-new-func': ['error'],
    'no-new-symbol': ['error'],
    'no-new-wrappers': ['error'],
    'no-obj-calls': ['error'],
    'no-object-constructor': ['error'],
    'no-octal': ['error'],
    'no-octal-escape': ['error'],
    'no-proto': ['error'],
    'no-redeclare': ['off'],
    'no-regex-spaces': ['error'],
    'no-return-assign': ['error', 'except-parens'],
    'no-self-assign': ['error', { props: true }],
    'no-self-compare': ['error'],
    'no-sequences': ['error'],
    'no-shadow-restricted-names': ['error'],
    'no-sparse-arrays': ['error'],
    'no-template-curly-in-string': ['error'],
    'no-this-before-super': ['error'],
    'no-throw-literal': ['off'],
    'no-undef-init': ['error'],
    'no-unexpected-multiline': ['error'],
    'no-unmodified-loop-condition': ['error'],
    'no-unneeded-ternary': ['error', { defaultAssignment: false }],
    'no-unreachable': ['error'],
    'no-unreachable-loop': ['error'],
    'no-unsafe-finally': ['error'],
    'no-unsafe-negation': ['error'],
    'no-unused-expressions': ['off'],
    'no-unused-vars': ['off'],
    'no-use-before-define': ['off'],
    'no-useless-call': ['error'],
    'no-useless-computed-key': ['error'],
    'no-useless-constructor': ['off'],
    'no-useless-escape': ['error'],
    'no-useless-rename': ['error'],
    'no-useless-return': ['error'],
    'no-void': ['error', { allowAsStatement: true }],
    'no-with': ['error'],
    'one-var': ['error', { initialized: 'never' }],
    'prefer-const': [
      'error',
      { destructuring: 'all', ignoreReadBeforeAssign: false },
    ],
    'prefer-promise-reject-errors': ['off'],
    'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
    'symbol-description': ['error'],
    'unicode-bom': ['error', 'never'],
    'use-isnan': [
      'error',
      {
        enforceForSwitchCase: true,
        enforceForIndexOf: true,
      },
    ],
    'valid-typeof': ['error', { requireStringLiterals: true }],
    yoda: ['error', 'never'],

    'import/export': ['error'],
    'import/first': ['error'],
    'import/no-absolute-path': [
      'error',
      { esmodule: true, commonjs: true, amd: false },
    ],
    'import/no-duplicates': ['error'],
    'import/no-named-default': ['error'],
    'import/no-webpack-loader-syntax': ['error'],

    'n/handle-callback-err': ['error', '^(err|error)$'],
    'n/no-callback-literal': ['error'],
    'n/no-deprecated-api': ['error'],
    'n/no-exports-assign': ['error'],
    'n/no-new-require': ['error'],
    'n/no-path-concat': ['error'],
    'n/process-exit-as-throw': ['error'],

    'promise/param-names': ['error'],
    '@typescript-eslint/adjacent-overload-signatures': ['error'],
    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    '@typescript-eslint/await-thenable': ['error'],
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-expect-error': 'allow-with-description',
        'ts-ignore': true,
        'ts-nocheck': true,
        'ts-check': false,
        minimumDescriptionLength: 3,
      },
    ],
    '@typescript-eslint/ban-tslint-comment': ['error'],
    '@typescript-eslint/ban-types': [
      'error',
      {
        extendDefaults: false,
        types: {
          String: {
            message: 'Use string instead',
            fixWith: 'string',
          },
          Boolean: {
            message: 'Use boolean instead',
            fixWith: 'boolean',
          },
          Number: {
            message: 'Use number instead',
            fixWith: 'number',
          },
          Symbol: {
            message: 'Use symbol instead',
            fixWith: 'symbol',
          },
          BigInt: {
            message: 'Use bigint instead',
            fixWith: 'bigint',
          },
          Function: {
            message: [
              'The `Function` type accepts any function-like value.',
              'It provides no type safety when calling the function, which can be a common source of bugs.',
              'It also accepts things like class declarations, which will throw at runtime as they will not be called with `new`.',
              'If you are expecting the function to accept certain arguments, you should explicitly define the function shape.',
            ].join('\n'),
          },
          // object typing
          Object: {
            message: [
              'The `Object` type actually means "any non-nullish value", so it is marginally better than `unknown`.',
              '- If you want a type meaning "any object", you probably want `Record<string, unknown>` instead.',
              '- If you want a type meaning "any value", you probably want `unknown` instead.',
            ].join('\n'),
          },
          '{}': {
            message: [
              '`{}` actually means "any non-nullish value".',
              '- If you want a type meaning "any object", you probably want `Record<string, unknown>` instead.',
              '- If you want a type meaning "any value", you probably want `unknown` instead.',
            ].join('\n'),
          },
        },
      },
    ],
    '@typescript-eslint/class-methods-use-this': [
      'error',
      {
        exceptMethods: [],
        enforceForClassFields: true,
        ignoreOverrideMethods: false,
        ignoreClassesThatImplementAnInterface: false,
      },
    ],
    '@typescript-eslint/class-literal-property-style': ['error', 'fields'],
    '@typescript-eslint/consistent-generic-constructors': [
      'error',
      'constructor',
    ],
    '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'never',
      },
    ],
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/consistent-type-exports': [
      'error',
      {
        fixMixedExportsWithInlineTypeSpecifier: true,
      },
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        disallowTypeAnnotations: true,
        fixStyle: 'inline-type-imports',
      },
    ],
    '@typescript-eslint/dot-notation': [
      'error',
      {
        allowIndexSignaturePropertyAccess: false,
        allowKeywords: true,
        allowPattern: '',
        allowPrivateClassPropertyAccess: false,
        allowProtectedClassPropertyAccess: false,
      },
    ],
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowExpressions: true,
        allowHigherOrderFunctions: true,
        allowTypedFunctionExpressions: true,
        allowDirectConstAssertionInArrowFunctions: true,
      },
    ],
    '@typescript-eslint/method-signature-style': ['error'],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'variableLike',
        leadingUnderscore: 'allow',
        trailingUnderscore: 'allow',
        format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      },
    ],
    '@typescript-eslint/no-array-constructor': ['error'],
    '@typescript-eslint/no-base-to-string': ['error'],
    '@typescript-eslint/no-confusing-void-expression': [
      'error',
      { ignoreArrowShorthand: false, ignoreVoidOperator: false },
    ],
    '@typescript-eslint/no-dupe-class-members': ['error'],
    '@typescript-eslint/no-dynamic-delete': ['error'],
    '@typescript-eslint/no-empty-interface': [
      'error',
      { allowSingleExtends: true },
    ],
    '@typescript-eslint/no-extra-non-null-assertion': ['error'],
    '@typescript-eslint/no-extraneous-class': [
      'error',
      { allowWithDecorator: true },
    ],
    '@typescript-eslint/no-floating-promises': ['error'],
    '@typescript-eslint/no-for-in-array': ['error'],
    '@typescript-eslint/no-implied-eval': ['error'],
    '@typescript-eslint/no-invalid-void-type': ['error'],
    '@typescript-eslint/no-loss-of-precision': ['error'],
    '@typescript-eslint/no-misused-new': ['error'],
    '@typescript-eslint/no-misused-promises': ['error'],
    '@typescript-eslint/no-namespace': ['error'],
    '@typescript-eslint/no-non-null-asserted-optional-chain': ['error'],
    '@typescript-eslint/no-non-null-assertion': ['error'],
    '@typescript-eslint/non-nullable-type-assertion-style': ['error'],
    '@typescript-eslint/no-this-alias': ['error', { allowDestructuring: true }],
    '@typescript-eslint/no-redeclare': ['error', { builtinGlobals: false }],
    '@typescript-eslint/no-unnecessary-type-assertion': ['error'],
    '@typescript-eslint/no-unnecessary-type-constraint': ['error'],
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': ['error'],
    '@typescript-eslint/no-unsafe-argument': ['error'],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        args: 'none',
        caughtErrors: 'none',
        ignoreRestSiblings: true,
        vars: 'all',
      },
    ],
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        functions: false,
        classes: false,
        enums: false,
        variables: false,
        typedefs: false,
      },
    ],
    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTaggedTemplates: true,
        allowTernary: true,
        enforceForJSX: false,
      },
    ],
    '@typescript-eslint/no-useless-constructor': ['error'],
    '@typescript-eslint/no-var-requires': ['error'],
    '@typescript-eslint/only-throw-error': [
      'error',
      { allowThrowingAny: false, allowThrowingUnknown: false },
    ],
    '@typescript-eslint/prefer-function-type': ['error'],
    '@typescript-eslint/prefer-includes': ['error'],
    '@typescript-eslint/prefer-nullish-coalescing': [
      'error',
      { ignoreConditionalTests: false, ignoreMixedLogicalExpressions: false },
    ],
    '@typescript-eslint/prefer-optional-chain': ['error'],
    '@typescript-eslint/prefer-readonly': ['error'],
    '@typescript-eslint/prefer-reduce-type-parameter': ['error'],
    '@typescript-eslint/prefer-return-this-type': ['error'],
    '@typescript-eslint/promise-function-async': ['error'],
    '@typescript-eslint/prefer-promise-reject-errors': ['error'],
    '@typescript-eslint/restrict-plus-operands': [
      'error',
      { skipCompoundAssignments: false },
    ],
    '@typescript-eslint/require-array-sort-compare': [
      'error',
      { ignoreStringArrays: true },
    ],
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      { allowNumber: true },
    ],
    '@typescript-eslint/return-await': ['error', 'always'],
    '@typescript-eslint/strict-boolean-expressions': [
      'error',
      {
        allowString: false,
        allowNumber: false,
        allowNullableObject: false,
        allowNullableBoolean: false,
        allowNullableString: false,
        allowNullableNumber: false,
        allowAny: false,
      },
    ],
    '@typescript-eslint/triple-slash-reference': [
      'error',
      { lib: 'never', path: 'never', types: 'never' },
    ],
    '@typescript-eslint/unbound-method': ['error', { ignoreStatic: false }],
  },
}
