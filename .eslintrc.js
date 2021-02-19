const commonRules = {
  semi: ['error', 'never'],
  'no-console': 0,

  'quote-props': 0,
  'import/prefer-default-export': 0,
  'no-await-in-loop': 0,
  'no-restricted-syntax': 0,
  'max-classes-per-file': 0,
  'no-underscore-dangle': 0,
  'no-case-declarations': 0,
  'import/no-cycle': 0, // IMPORTANT
  'import/no-extraneous-dependencies': 0,
}

module.exports = {
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:import/typescript',
  ],
  env: {
    node: true,
    jest: true,
  },
  rules: commonRules,

  overrides: [
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      extends: [
        'airbnb-base',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
      ],
      rules: {
        ...commonRules,

        '@typescript-eslint/camelcase': 0,
        '@typescript-eslint/interface-name-prefix': 0,

        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/ban-ts-ignore': 0,

        'import/extensions': 0,
        'no-shadow': 0,
      },

      settings: {
        'import/extensions': ['.ts'],
        'import/parsers': {
          '@typescript-eslint/parser': ['.ts'],
        },
        'import/resolver': {
          node: {
            extensions: ['.ts', '.d.ts', '.js'],
            moduleDirectory: ['node_modules', 'src/'],
          },
        },
      },
    },
  ],
}
