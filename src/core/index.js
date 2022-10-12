import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
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
import PseudoWorker from 'pseudo-worker';
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

import Active4D from "../../node_modules/monaco-themes/themes/Active4D.json";
import AllHallowsEve from "../../node_modules/monaco-themes/themes/All Hallows Eve.json";
import Amy from "../../node_modules/monaco-themes/themes/Amy.json";
import BirdsofParadise from "../../node_modules/monaco-themes/themes/Birds of Paradise.json";
import Blackboard from "../../node_modules/monaco-themes/themes/Blackboard.json";
import BrillianceBlack from "../../node_modules/monaco-themes/themes/Brilliance Black.json";
import BrillianceDull from "../../node_modules/monaco-themes/themes/Brilliance Dull.json";
import ChromeDevTools from "../../node_modules/monaco-themes/themes/Chrome DevTools.json";
import CloudsMidnight from "../../node_modules/monaco-themes/themes/Clouds Midnight.json";
import Clouds from "../../node_modules/monaco-themes/themes/Clouds.json";
import Cobalt from "../../node_modules/monaco-themes/themes/Cobalt.json";
import Cobalt2 from "../../node_modules/monaco-themes/themes/Cobalt2.json";
import Dawn from "../../node_modules/monaco-themes/themes/Dawn.json";
import DominionDay from "../../node_modules/monaco-themes/themes/Dominion Day.json";
import Dracula from "../../node_modules/monaco-themes/themes/Dracula.json";
import Dreamweaver from "../../node_modules/monaco-themes/themes/Dreamweaver.json";
import Eiffel from "../../node_modules/monaco-themes/themes/Eiffel.json";
import EspressoLibre from "../../node_modules/monaco-themes/themes/Espresso Libre.json";
import GitHub from "../../node_modules/monaco-themes/themes/GitHub.json";
import IDLE from "../../node_modules/monaco-themes/themes/IDLE.json";
import idleFingers from "../../node_modules/monaco-themes/themes/idleFingers.json";
import iPlastic from "../../node_modules/monaco-themes/themes/iPlastic.json";
import Katzenmilch from "../../node_modules/monaco-themes/themes/Katzenmilch.json";
import krTheme from "../../node_modules/monaco-themes/themes/krTheme.json";
import KuroirTheme from "../../node_modules/monaco-themes/themes/Kuroir Theme.json";
import LAZY from "../../node_modules/monaco-themes/themes/LAZY.json";
import MagicWBAmiga from "../../node_modules/monaco-themes/themes/MagicWB (Amiga).json";
import MerbivoreSoft from "../../node_modules/monaco-themes/themes/Merbivore Soft.json";
import Merbivore from "../../node_modules/monaco-themes/themes/Merbivore.json";
import monoindustrial from "../../node_modules/monaco-themes/themes/monoindustrial.json";
import MonokaiBright from "../../node_modules/monaco-themes/themes/Monokai Bright.json";
import Monokai from "../../node_modules/monaco-themes/themes/Monokai.json";
import NightOwl from "../../node_modules/monaco-themes/themes/Night Owl.json";
import Nord from "../../node_modules/monaco-themes/themes/Nord.json";
import OceanicNext from "../../node_modules/monaco-themes/themes/Oceanic Next.json";
import PastelsonDark from "../../node_modules/monaco-themes/themes/Pastels on Dark.json";
import SlushandPoppies from "../../node_modules/monaco-themes/themes/Slush and Poppies.json";
import Solarizeddark from "../../node_modules/monaco-themes/themes/Solarized-dark.json";
import Solarizedlight from "../../node_modules/monaco-themes/themes/Solarized-light.json";
import SpaceCadet from "../../node_modules/monaco-themes/themes/SpaceCadet.json";
import Sunburst from "../../node_modules/monaco-themes/themes/Sunburst.json";
import TextmateMacClassic from "../../node_modules/monaco-themes/themes/Textmate (Mac Classic).json";
import Tomorrow from "../../node_modules/monaco-themes/themes/Tomorrow.json";
import TomorrowNight from "../../node_modules/monaco-themes/themes/Tomorrow-Night.json";
import TomorrowNightBlue from "../../node_modules/monaco-themes/themes/Tomorrow-Night-Blue.json";
import TomorrowNightBright from "../../node_modules/monaco-themes/themes/Tomorrow-Night-Bright.json";
import TomorrowNightEighties from "../../node_modules/monaco-themes/themes/Tomorrow-Night-Eighties.json";
import Twilight from "../../node_modules/monaco-themes/themes/Twilight.json";
import UpstreamSunburst from "../../node_modules/monaco-themes/themes/Upstream Sunburst.json";
import VibrantInk from "../../node_modules/monaco-themes/themes/Vibrant Ink.json";
import Xcode_default from "../../node_modules/monaco-themes/themes/Xcode_default.json";
import Zenburnesque from "../../node_modules/monaco-themes/themes/Zenburnesque.json";
import { Extension } from 'typescript';

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
const getVSTheme = (theme) => {
	let themeJson = {};
	switch (theme) {
		case 'Active4D': {
			themeJson = Active4D;
			break;
		}
		case 'Xcode_default': {
			themeJson = Xcode_default;
			break;
		}
		case 'AllHallowsEve': {
			themeJson = AllHallowsEve;
			break;
		}
		case 'Amy': {
			themeJson = Amy;
			break;
		}
		case 'BirdsofParadise': {
			themeJson = BirdsofParadise;
			break;
		}
		case 'Blackboard': {
			themeJson = Blackboard;
			break;
		}
		case 'BrillianceBlack': {
			themeJson = BrillianceBlack;
			break;
		}
		case 'BrillianceDull': {
			themeJson = BrillianceDull;
			break;
		}
		case 'ChromeDevTools': {
			themeJson = ChromeDevTools;
			break;
		}
		case 'CloudsMidnight': {
			themeJson = CloudsMidnight;
			break;
		}
		case 'Clouds': {
			themeJson = Clouds;
			break;
		}
		case 'Cobalt': {
			themeJson = Cobalt;
			break;
		}
		case 'Cobalt2': {
			themeJson = Cobalt2;
			break;
		}
		case 'Dawn': {
			themeJson = Dawn;
			break;
		}
		case 'DominionDay': {
			themeJson = DominionDay;
			break;
		}
		case 'Dracula': {
			themeJson = Dracula;
			break;
		}
		case 'Dreamweaver': {
			themeJson = Dreamweaver;
			break;
		}
		case 'Eiffel': {
			themeJson = Eiffel;
			break;
		}
		case 'EspressoLibre': {
			themeJson = EspressoLibre;
			break;
		}
		case 'GitHub': {
			themeJson = GitHub;
			break;
		}
		case 'IDLE': {
			themeJson = IDLE;
			break;
		}
		case 'idleFingers': {
			themeJson = idleFingers;
			break;
		}
		case 'iPlastic': {
			themeJson = iPlastic;
			break;
		}
		case 'Katzenmilch': {
			themeJson = Katzenmilch;
			break;
		}
		case 'krTheme': {
			themeJson = krTheme;
			break;
		}
		case 'KuroirTheme': {
			themeJson = KuroirTheme;
			break;
		}
		case 'LAZY': {
			themeJson = LAZY;
			break;
		}
		case 'MagicWBAmiga': {
			themeJson = MagicWBAmiga;
			break;
		}
		case 'MerbivoreSoft': {
			themeJson = MerbivoreSoft;
			break;
		}
		case 'Merbivore': {
			themeJson = Merbivore;
			break;
		}
		case 'monoindustrial': {
			themeJson = monoindustrial;
			break;
		}
		case 'MonokaiBright': {
			themeJson = MonokaiBright;
			break;
		}
		case 'Monokai': {
			themeJson = Monokai;
			break;
		}
		case 'NightOwl': {
			themeJson = NightOwl;
			break;
		}
		case 'Nord': {
			themeJson = Nord;
			break;
		}
		case 'OceanicNext': {
			themeJson = OceanicNext;
			break;
		}
		case 'PastelsonDark': {
			themeJson = PastelsonDark;
			break;
		}
		case 'SlushandPoppies': {
			themeJson = SlushandPoppies;
			break;
		}
		case 'Solarizeddark': {
			themeJson = Solarizeddark;
			break;
		}
		case 'Solarizedlight': {
			themeJson = Solarizedlight;
			break;
		}
		case 'SpaceCadet': {
			themeJson = SpaceCadet;
			break;
		}
		case 'Sunburst': {
			themeJson = Sunburst;
			break;
		}
		case 'TextmateMacClassic': {
			themeJson = TextmateMacClassic;
			break;
		}

		case 'TomorrowNightBlue': {
			themeJson = TomorrowNightBlue;
			break;
		}
		case 'TomorrowNightBright': {
			themeJson = TomorrowNightBright;
			break;
		}
		case 'TomorrowNightEighties': {
			themeJson = TomorrowNightEighties;
			break;
		}
		case 'TomorrowNight': {
			themeJson = TomorrowNight;
			break;
		}
		case 'Tomorrow': {
			themeJson = Tomorrow;
			break;
		}
		case 'Twilight': {
			themeJson = Twilight;
			break;
		}
		case 'UpstreamSunburst': {
			themeJson = UpstreamSunburst;
			break;
		}
		case 'VibrantInk': {
			themeJson = VibrantInk;
			break;
		}
		case 'Xcodedefault': {
			themeJson = Xcodedefault;
			break;
		}
		case 'Zenburnesque': {
			themeJson = Zenburnesque;
			break;
		}

	}
	if (Object.keys(themeJson).length > 0) {
		monaco.editor.defineTheme(theme, themeJson);
		monaco.editor.setTheme(theme);
	}
	return theme;
};

const initVSEditor = (tab, id, codeMirror, extension) => {
	const editorThemeElement = document.getElementById("editorTheme");
	const editorTheme = getVSTheme(editorThemeElement !== null ? editorThemeElement.value : 'vs');
	const editor = monaco.editor.create(document.getElementById(id + "_container"), {
		theme: editorTheme,
		value: codeMirror.getValue(),
		language: getVSName(extension),
		automaticLayout: true,
		scrollbar: {
			vertical: 'visible',
			horizontal: 'visible',
			verticalScrollbarSize: 12,
			horizontalScrollbarSize: 12
		}
	});
	editor.getModel().onDidChangeContent((event) => {
		codeMirror.setValue(editor.getValue());
	});
	tab.setAttribute("editor-initialzed", "true");
	document.querySelector('.loading.editor').style.display = 'none';
	handleResize(id);
};

const executeHook = () => {
	const editors = document.getElementById("editors");
	if (editors != null && editors.getAttribute("editor-progress") === null) {
		const loader = document.createElement("div");
		loader.setAttribute("class", "loading editor");
		loader.innerHTML = `<div class="progress progress-striped active"><div class="bar"></div></div>`;
		editors.prepend(loader);
		editors.setAttribute("editor-progress", "true");
	}
	document.querySelectorAll('.x-tab-strip-closable').forEach(tab => {
		if (tab.id) {
			const editorInitiazed = tab.getAttribute("editor-initialzed");
			if (editorInitiazed === null) {
				document.querySelector('.loading.editor').style.display = 'block';
				const id = tab.id.replace("editors__", "");
				const editorElement = document.getElementById(id);
				const editorHeight = document.getElementById("editors").clientHeight;
				const container = document.createElement("div");
				container.setAttribute("class", "monaco-container");
				container.id = id + "_container"
				container.style.height = (editorHeight - 57) + "px";
				//Get x-panel-bwrap
				const panelWrap = editorElement.querySelector(".x-panel-bwrap");
				const strip = panelWrap.childNodes[0];
				if (panelWrap.childNodes.length === 3) {
					panelWrap.childNodes[1].style.display = 'none';
					panelWrap.childNodes[2].style.display = 'none';
				}
				strip.setAttribute("editor-strip", "");
				strip.parentNode.insertBefore(container, strip.nextSibling);
				const extension = id.split(".")[id.split(".").length - 1];
				const codeMirrorDiv = editorElement.querySelector(".CodeMirror")
				const codeMirror = codeMirrorDiv.CodeMirror;
				document.querySelector('.loading.editor').style.display = 'block';
				const fileName = tab.id.substring(tab.id.lastIndexOf("/") + 1);
				const tabName = tab.querySelector(".x-tab-strip-text.file").innerHTML;
				if (fileName !== tabName) {
					log("New File : " + fileName);
					initEditor(tab, id, codeMirror, extension);
				} else {
					isFileEmpty(id).then(isEmpty => {
						if (isEmpty) {
							log("Empty : " + fileName);
							initEditor(tab, id, codeMirror, extension);
						} else {
							log("Non Empty loading : " + fileName);
							const loaderInterval = setInterval(function () {
								if (codeMirror.getValue() !== "") {
									clearInterval(loaderInterval);
									initEditor(tab, id, codeMirror, extension);
								}
							}, 50);
						}
					});
				}
			}
		}
	});
};

const isFileEmpty = (file) => {
	return new Promise(function (resolve) {
		Ext.Ajax.request({
			url: '/crx/server' + file + '.1.json',
			success: function (response, options) {
				const res = response.responseText;
				resolve(JSON.parse(res)["jcr:content"][":jcr:data"] == 0);
			},
			failure: function (response, options) {
				resolve(true);
			}
		})
	});
};

const handleResizeHook = () => {
	document.querySelectorAll('.x-tab-strip-closable').forEach(tab => {
		if (tab.id) {
			handleResize(tab.id.replace("editors__", "") + "_container");
		}
	});
};

const handleResize = (containerId) => {
	const codeMirrorContainer = document.getElementById(containerId);
	const parentHeight = codeMirrorContainer.closest(".x-tab-panel-body").clientHeight;
	let containerHeight = codeMirrorContainer.clientHeight;
	if (containerHeight == 0) {
		containerHeight = +codeMirrorContainer.style.height.replace("px", "");
	}
	if (parentHeight - 25 !== containerHeight) {
		codeMirrorContainer.style.height = (codeMirrorContainer.closest(".x-tab-panel-body").clientHeight - 25) + "px";
		log("Height adjusted");
	}
};

const getVSName = (extension) => {
	if (extension === 'js') {
		return 'javascript';
	}
	if (extension === 'ts') {
		return 'typescript';
	}
	if (extension === 'hbs' || extension === 'handlebars') {
		return 'handlebars';
	}
	if (extension === 'md') {
		return 'markdown';
	}
	if (extension === 'ini' || extension === 'properties') {
		return 'ini';
	}
	return extension;
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

const initResizeObserver = () => {
	log("Resize Observer initiated...");
	const targetResizeNode = document.querySelector('#editors .x-tab-panel-body');
	const targetResizeNodeCallBack = (mutationList, observer2) => {
		log("Resized...");
		handleResizeHook();
	};
	const observer2 = new MutationObserver(targetResizeNodeCallBack);
	observer2.observe(targetResizeNode, { attributes: true });
};

const initTabObserver = () => {
	log("Tab Observer initiated...");
	const targetNodeEditor = document.querySelector('#editors .x-tab-panel-header:first-child');
	const editorHookCallBack = (mutationList, observer) => {
		log("Tab status changed...");
		executeHook();
	};
	const observer = new MutationObserver(editorHookCallBack);
	observer.observe(targetNodeEditor, config);
};

const observeCRXInitiated = () => {
	const targetNode = document.querySelector('body');
	const callback = (mutationList, observer) => {
		const repository = document.getElementById("repository");
		if (repository !== null) {
			log("Repository initiated...");
			observer.disconnect();
			log("Attaching hook...");
			initTabObserver();
			initResizeObserver();
		}
	};
	const observer = new MutationObserver(callback);
	observer.observe(targetNode, config);
};

const log = (message) => {
	if (typeof powereditor !== 'undefined' || window.location.href.indexOf("?debug") !== -1) {
		console.log(message);
	}
}

const config = { childList: true, subtree: true };
const typeOfEditorElement = document.getElementById('editorType');
let initEditor = initVSEditor;
if (typeOfEditorElement && typeOfEditorElement?.value == 'cm') {
	initEditor = initCMEditor;
}

const urlPrefix = document.getElementById('plugin-prefix').value + 'power-editor/';
window.MonacoEnvironment = {
	getWorker: function (moduleId, label) {
		if (label === 'json') {
			return new Worker(urlPrefix + 'json.worker.js');
		}
		if (label === 'css') {
			return new Worker(urlPrefix + 'css.worker.js');
		}
		if (label === 'html') {
			return new Worker(urlPrefix + 'html.worker.js');
		}
		if (label === 'typescript' || label === 'javascript') {
			return new Worker(urlPrefix + 'ts.worker.js');
		}
		return new Worker(urlPrefix + 'editor.worker.js');
	}
};
observeCRXInitiated();
