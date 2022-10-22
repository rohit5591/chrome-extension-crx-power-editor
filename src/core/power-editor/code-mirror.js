import { EditorView, basicSetup } from "codemirror";
import { javascript, esLint } from "@codemirror/lang-javascript";
import { linter, lintGutter } from "@codemirror/lint";
import { syntaxHighlighting } from '@codemirror/language'
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { xml } from "@codemirror/lang-xml";
import { json } from "@codemirror/lang-json";
import { sql } from "@codemirror/lang-sql";
import { EditorState } from "@codemirror/state";
import { markdown } from "@codemirror/lang-markdown";
import {
	amy,
	ayuLight,
	barf,
	bespin,
	birdsOfParadise,
	boysAndGirls,
	clouds,
	cobalt,
	coolGlow,
	dracula,
	espresso,
	noctisLilac,
	rosePineDawn,
	smoothy,
	solarizedLight,
	tomorrow
} from 'thememirror';

import { materialLight } from '@ddietr/codemirror-themes/material-light';
import { materialDark } from '@ddietr/codemirror-themes/material-dark';
import { solarizedLight as solarizedLightCM } from '@ddietr/codemirror-themes/solarized-light';
import { solarizedDark } from '@ddietr/codemirror-themes/solarized-dark';
import { dracula as draculaCM } from '@ddietr/codemirror-themes/dracula';
import { githubLight } from '@ddietr/codemirror-themes/github-light';
import { githubDark } from '@ddietr/codemirror-themes/github-dark';
import { aura } from '@ddietr/codemirror-themes/aura';
import { handleResize } from './core';

import {
	oneDarkTheme,
	oneDarkHighlightStyle
} from '@codemirror/theme-one-dark';
import { default as eslint } from "eslint-linter-browserify";

const themeMap = {
	"amy": amy,
	"ayuLight": ayuLight,
	"barf": barf,
	"bespin": bespin,
	"birdsOfParadise": birdsOfParadise,
	"boysAndGirls": boysAndGirls,
	"clouds": clouds,
	"cobalt": cobalt,
	"coolGlow": coolGlow,
	"dracula1": dracula,
	"espresso": espresso,
	"noctisLilac": noctisLilac,
	"rosePineDawn": rosePineDawn,
	"smoothy": smoothy,
	"solarizedLight1": solarizedLight,
	"tomorrow": tomorrow,
	"dark": syntaxHighlighting([oneDarkTheme, oneDarkHighlightStyle], { fallback: true }),
	"materialLight": materialLight,
	"materialDark": materialDark,
	"solarizedLight2": solarizedLightCM,
	"solarizedDark": solarizedDark,
	"dracula2": draculaCM,
	"githubLight": githubLight,
	"githubDark": githubDark,
	"aura": aura
};
const extraGlobalAttributes = {
	"data-sly-use": null,
	"data-sly-test": null,
	"data-sly-include": null,
	"data-sly-resource": null,
	"data-sly-list": null,
	"data-sly-repeat": null,
	"data-sly-template": null,
	"data-sly-call": null,
	"data-sly-unwrap": null,
	"data-sly-attribute": null,
	"data-sly-set": null,
	"data-sly-element": null,
	"data-sly-text": null,
};
const htmlTagsConfig = (
	{
		extraTags: {
			"sly": {
				attrs: extraGlobalAttributes
			},
			"template": {
				attrs: {
					"data-sly-template": null
				}
			}
		},
		extraGlobalAttributes: extraGlobalAttributes
	}
);
const getCMType = (extension) => {
	switch (extension) {
		case "js":
		case "ts":
			return [
				lintGutter(),
				linter(esLint(new eslint.Linter(), config)),
				javascript()
			];
		case "scss":
		case "less":
		case "css":
			return [css()];
		case "json":
			return [json()];
		case "html":
			return [html(htmlTagsConfig)];
		case "sql":
			return [sql()];
		case "md":
			return [markdown()];
		case "xml":
			return [xml()];
	}
	return [];
};

const config = {
	// eslint configuration
	parserOptions: {
		ecmaVersion: 2019,
		sourceType: "script",
	},
	env: {
		browser: true,
		node: true,
	},
	rules: {
		semi: [1, "always"],
	},
};

export const initCMEditor = (tab, id, codeMirror, extension) => {
	let theme = [];
	const editorThemeElement = document.getElementById("editorTheme");
	if (editorThemeElement !== null && editorThemeElement?.value) {
		theme = themeMap[editorThemeElement.value] || [];
	}

	new EditorView({
		state: EditorState.create({
			doc: codeMirror.getValue(),
			scrollbarStyle: "simple",
			extensions: [
				basicSetup, ...getCMType(extension), ...theme,
				EditorView.updateListener.of(function (e) {
					if (e.docChanged) {
						codeMirror.setValue(e.state.doc.toString());
					}
				})
			]
		}),
		parent: document.getElementById(id + "_container")
	});
	tab.setAttribute("editor-initialzed", "true");
	document.querySelector('.loading.editor').style.display = 'none';
	handleResize(id);
};