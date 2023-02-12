module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],

    parserOptions: {
        ecmaVersion: 2021,
        parser: '@typescript-eslint/parser',
    },

    rules: {
        indent: ['error', 4, { SwitchCase: 1 }],
        'space-before-function-paren': 'off',
        'keyword-spacing': 'off',
        'comma-dangle': ['error', 'always-multiline'],
        'no-unused-vars': 'off',
        '@typescript-eslint/member-delimiter-style': [
            'error',
            {
                multiline: {
                    delimiter: 'none',
                    requireLast: false,
                },
            },
        ],
        'prettier/prettier': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        'func-call-spacing': 'off',
    },
}
