module.exports = {
    extends: ['@bitfactory/stylelint-config'],
    ignoreFiles: [
        '**/coverage/*',
        '**/static/*',
    ],
    rules: {
        'selector-type-no-unknown': [
            true,
            {
                ignoreTypes: ['^'],
            },
        ],
        'declaration-block-no-redundant-longhand-properties': [
            true,
            {
                ignoreShorthands: ['/grid/'],
            },
        ],
    },
};
