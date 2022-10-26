import { languages } from "monaco-editor";

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
                label: 'sly',
                kind: languages.CompletionItemKind.Function,
                insertText: '<sly data-sly-${1:0}></sly>',
                insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range: range
            },
            {
                label: 'template',
                kind: languages.CompletionItemKind.Function,
                insertText: '<template data-sly-template.${1:template}=\"${@ ${2:data}}\">$2</template>$0',
                insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range: range
            },
        ],
        attributes: [
            {
                label: 'data-sly-test',
                kind: languages.CompletionItemKind.Function,
                insertText: 'data-sly-test = "${}"',
                insertTextRules: languages.CompletionItemInsertTextRule.InsertAsSnippet,
                range: range
            }
        ]
    }
};