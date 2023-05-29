module.exports = {
    env: {
        browser: false,
        commonjs: true,
        es2021: true,
    },
    extends: ['airbnb-base', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    plugins: ['prettier'],
    rules: {
        'no-use-before-define': [
            'error',
            {
                functions: false,
                classes: true,
                variables: true,
                allowNamedExports: false,
            },
        ],
        'no-shadow': 'off',
        'no-plusplus': 'off',
        'prefer-destructuring': ['error', { object: true, array: false }],
        'spaced-comment': 'off',
        'no-param-reassign': 'off',
        'no-console': 'off',
        'prefer-template': 'off',
    },
}
