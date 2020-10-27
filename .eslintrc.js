module.exports = {
    'env': {
        'es6': true
    },
    'extends': 'eslint:recommended',
    'globals': {
        'process': true
    },
    'settings': {
        'import/resolver': {
            'node': {
                'extensions': ['.js', '.jsx', '.ts', '.tsx']
            }
        }
    },
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'project': 'tsconfig.json',
        'sourceType': 'module'
    },
    'plugins': [
        '@typescript-eslint',
        'eslint-plugin-import'
    ],
    'rules': {
        '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/no-require-imports': 'error',
        '@typescript-eslint/quotes': [
            'error',
            'single'
        ],
        'comma-dangle': 'error',
        'curly': 'error',
        'eqeqeq': [
            'error',
            'always'
        ],
        'no-trailing-spaces': 'error',
        'no-var': 'error',
        'prefer-const': 'error',
        'no-console': 'error',
        'no-throw-literal': 'error',
        'import/no-extraneous-dependencies': 'error',
        'import/no-cycle': 'error',
        'import/no-self-import': 'error',
        'import/no-unresolved': 'error',
        'no-undef': 'off',
        'no-unused-vars': 'off',
        'id-length': [2, { 'exceptions': 'ij'.split(''), 'properties': 'never' }],
        'space-before-blocks': 'error',
        'keyword-spacing': 'error',
        'space-before-function-paren': 'error',
        'camelcase': ['error', { ignoreDestructuring: true }],
        'semi': 'error'
    },
    'overrides': [{
        'files': ['*.ts', '*.tsx'],
        'rules': {
            '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
            'no-undef': 'off'
        },
        'env': {
            'es6': true,
            'node': true
        }
    }, {
        'files': ['test/*.js'],
        'parserOptions': {
            'ecmaVersion': 6,
            'sourceType': 'module'
        },
        'env': {
            'es6': true,
            'mocha': true,
            'node': true
        }
    }]
};
