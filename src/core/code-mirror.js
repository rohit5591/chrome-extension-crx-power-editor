import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { syntaxHighlighting } from '@codemirror/language'
import { html } from "../../node_modules/@codemirror/lang-html";
import { css } from "../../node_modules/@codemirror/lang-css";
import { xml } from "../../node_modules/@codemirror/lang-xml";
import { json } from "../../node_modules/@codemirror/lang-json";
import { sql } from "../../node_modules/@codemirror/lang-sql";
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

import {
	oneDarkTheme,
	oneDarkHighlightStyle
} from '@codemirror/theme-one-dark';

const getCMTheme = (theme) => {
	switch (theme) {
		case "amy": {
			return amy;
		}
		case "ayuLight": {
			return ayuLight;
		}
		case "barf": {
			return barf;
		}
		case "bespin": {
			return bespin;
		}
		case "birdsOfParadise": {
			return birdsOfParadise;
		}
		case "boysAndGirls": {
			return boysAndGirls;
		}
		case "clouds": {
			return clouds;
		}
		case "cobalt": {
			return cobalt;
		}
		case "coolGlow": {
			return coolGlow;
		}
		case "dracula1": {
			return dracula;
		}
		case "espresso": {
			return espresso;
		}
		case "noctisLilac": {
			return noctisLilac;
		}
		case "rosePineDawn": {
			return rosePineDawn;
		}
		case "smoothy": {
			return smoothy;
		}
		case "solarizedLight1": {
			return solarizedLight;
		}
		case "tomorrow": {
			return tomorrow;
		}
		case "dark": {
			return syntaxHighlighting([oneDarkTheme, oneDarkHighlightStyle], { fallback: true });
		}
		case "materialLight": {
			return materialLight;
		}
		case "materialDark": {
			return materialDark;
		}
		case "solarizedLight2": {
			return solarizedLightCM;
		}
		case "solarizedDark": {
			return solarizedDark;
		}
		case "dracula2": {
			return draculaCM;
		}
		case "githubLight": {
			return githubLight;
		}
		case "githubDark": {
			return githubDark;
		}
		case "aura": {
			return aura;
		}
		default: {
			return [];
		}
	}
};

const initCMEditor = (tab, id, codeMirror, extension) => {
	let theme = [];
	const editorThemeElement = document.getElementById("editorTheme");
	if (editorThemeElement !== null && editorThemeElement?.value) {
		theme = getCMTheme(editorThemeElement.value);
	}

	const editor = new EditorView({
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
const getCMType = (extension) => {
	switch (extension) {
		case "js":
			return [javascript()];
		case "css":
			return [css()];
		case "json":
			return [json()];
		case "html":
			return [html()];
		case "sql":
			return [sql()];
		case "md":
			return [markdown()];
		case "xml":
			return [xml()];
	}
	return [];
};