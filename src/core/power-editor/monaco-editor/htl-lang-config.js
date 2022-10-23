export const languageConfiguration = {
    "comments": {
        // symbols used for start and end a block comment.
        "blockComment": ["<!--/*", "*/-->"]
    },
    // symbols used as brackets
    "brackets": [
        ["{", "}"],
        ["[", "]"],
        ["(", ")"]
    ],
    // symbols that are auto closed when typing
    "autoClosingPairs": [
        { "open": "${", "close": "}" },
        { "open": "[", "close": "]" },
        { "open": "(", "close": ")" },
        { "open": "'", "close": "'", "notIn": ["comment"] },
        { "open": "\"", "close": "\"", "notIn": ["string"] }
    ],
    "autoCloseBefore": ";:.,=}])>` \n\t",
    // symbols that can be used to surround a selection
    "surroundingPairs": [
        ["{", "}"],
        ["[", "]"],
        ["(", ")"],
        ["\"", "\""],
        ["'", "'"]
    ],
    "folding": {
        "markers": {
            "start": "^\\s*<--\/*s#?region */-->\/\\b",
            "end": "^\\s*<--\/*s#?endregion */-->\\b"
        }
    },
    "wordPattern": "(-?\\d*\\.\\d\\w*)|([^\\`\\~\\!\\@\\#\\%\\^\\&\\*\\(\\)\\-\\=\\+\\[\\{\\]\\}\\\\\\|\\;\\:\\'\\\"\\,\\.\\<\\>\\/\\?\\s]+)",
    "indentationRules": {
        "increaseIndentPattern": "^((?!\\/\\/).)*(\\{[^}\"'`]*|\\([^)\"'`]*|\\[[^\\]\"'`]*)$",
        "decreaseIndentPattern": "^((?!.*?\\/\\*).*\\*/)?\\s*[\\}\\]].*$"
    }
};

export const getSuggestList = (range) => {
    return {
        tags: [
            {
                label: '"sly"',
                kind: monaco.languages.CompletionItemKind.Function,
                documentation: 'sly documentation goes here',
                insertText: '"sly": "*"',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range: range
            },
        ],
        attributes: [
            {
                label: '"my-third-party-library"',
                kind: monaco.languages.CompletionItemKind.Function,
                documentation: 'Describe your library here',
                insertText: '"${1:my-third-party-library}": "${2:1.2.3}"',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range: range
            },
            {
                label: '"data-sly-test"',
                kind: monaco.languages.CompletionItemKind.Function,
                documentation: 'data-sly-test documentation goes here',
                insertText: '"data-sly-test": "*"',
                insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range: range
            }
        ]
    }
};