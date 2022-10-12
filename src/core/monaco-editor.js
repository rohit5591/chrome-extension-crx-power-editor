import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
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
import PseudoWorker from 'pseudo-worker';
import { handleResize } from './core';


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
const urlPrefix = document.getElementById('plugin-prefix').value + 'power-editor/';
window.MonacoEnvironment = {
    getWorker: function (moduleId, label) {
        if (label === 'json') {
            return new PseudoWorker(urlPrefix + 'json.worker.js');
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
            return new PseudoWorker(urlPrefix + 'css.worker.js');
        }
        if (label === 'html') {
            return new PseudoWorker(urlPrefix + 'html.worker.js');
        }
        if (label === 'typescript' || label === 'javascript') {
            return new PseudoWorker(urlPrefix + 'ts.worker.js');
        }
        return new PseudoWorker(urlPrefix + 'editor.worker.js');
    }
};

export const initVSEditor = (tab, id, codeMirror, extension) => {
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