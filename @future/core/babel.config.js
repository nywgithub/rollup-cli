module.exports = {
    "presets": [
        [
            "@babel/env"
        ]
    ],
    "plugins": [
        "@babel/plugin-transform-arrow-functions",
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-syntax-import-meta",
        [
            "@babel/plugin-proposal-class-properties",
            {
                "loose": false
            }
        ],
        "@babel/plugin-proposal-json-strings",
        "@babel/plugin-transform-async-to-generator",
        "@babel/plugin-transform-runtime"
    ]
}