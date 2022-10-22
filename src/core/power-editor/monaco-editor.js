import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import Active4D from "../../../node_modules/monaco-themes/themes/Active4D.json";
import AllHallowsEve from "../../../node_modules/monaco-themes/themes/All Hallows Eve.json";
import Amy from "../../../node_modules/monaco-themes/themes/Amy.json";
import BirdsofParadise from "../../../node_modules/monaco-themes/themes/Birds of Paradise.json";
import Blackboard from "../../../node_modules/monaco-themes/themes/Blackboard.json";
import BrillianceBlack from "../../../node_modules/monaco-themes/themes/Brilliance Black.json";
import BrillianceDull from "../../../node_modules/monaco-themes/themes/Brilliance Dull.json";
import ChromeDevTools from "../../../node_modules/monaco-themes/themes/Chrome DevTools.json";
import CloudsMidnight from "../../../node_modules/monaco-themes/themes/Clouds Midnight.json";
import Clouds from "../../../node_modules/monaco-themes/themes/Clouds.json";
import Cobalt from "../../../node_modules/monaco-themes/themes/Cobalt.json";
import Cobalt2 from "../../../node_modules/monaco-themes/themes/Cobalt2.json";
import Dawn from "../../../node_modules/monaco-themes/themes/Dawn.json";
import DominionDay from "../../../node_modules/monaco-themes/themes/Dominion Day.json";
import Dracula from "../../../node_modules/monaco-themes/themes/Dracula.json";
import Dreamweaver from "../../../node_modules/monaco-themes/themes/Dreamweaver.json";
import Eiffel from "../../../node_modules/monaco-themes/themes/Eiffel.json";
import EspressoLibre from "../../../node_modules/monaco-themes/themes/Espresso Libre.json";
import GitHub from "../../../node_modules/monaco-themes/themes/GitHub.json";
import IDLE from "../../../node_modules/monaco-themes/themes/IDLE.json";
import idleFingers from "../../../node_modules/monaco-themes/themes/idleFingers.json";
import iPlastic from "../../../node_modules/monaco-themes/themes/iPlastic.json";
import Katzenmilch from "../../../node_modules/monaco-themes/themes/Katzenmilch.json";
import krTheme from "../../../node_modules/monaco-themes/themes/krTheme.json";
import KuroirTheme from "../../../node_modules/monaco-themes/themes/Kuroir Theme.json";
import LAZY from "../../../node_modules/monaco-themes/themes/LAZY.json";
import MagicWBAmiga from "../../../node_modules/monaco-themes/themes/MagicWB (Amiga).json";
import MerbivoreSoft from "../../../node_modules/monaco-themes/themes/Merbivore Soft.json";
import Merbivore from "../../../node_modules/monaco-themes/themes/Merbivore.json";
import monoindustrial from "../../../node_modules/monaco-themes/themes/monoindustrial.json";
import MonokaiBright from "../../../node_modules/monaco-themes/themes/Monokai Bright.json";
import Monokai from "../../../node_modules/monaco-themes/themes/Monokai.json";
import NightOwl from "../../../node_modules/monaco-themes/themes/Night Owl.json";
import Nord from "../../../node_modules/monaco-themes/themes/Nord.json";
import OceanicNext from "../../../node_modules/monaco-themes/themes/Oceanic Next.json";
import PastelsonDark from "../../../node_modules/monaco-themes/themes/Pastels on Dark.json";
import SlushandPoppies from "../../../node_modules/monaco-themes/themes/Slush and Poppies.json";
import Solarizeddark from "../../../node_modules/monaco-themes/themes/Solarized-dark.json";
import Solarizedlight from "../../../node_modules/monaco-themes/themes/Solarized-light.json";
import SpaceCadet from "../../../node_modules/monaco-themes/themes/SpaceCadet.json";
import Sunburst from "../../../node_modules/monaco-themes/themes/Sunburst.json";
import TextmateMacClassic from "../../../node_modules/monaco-themes/themes/Textmate (Mac Classic).json";
import Tomorrow from "../../../node_modules/monaco-themes/themes/Tomorrow.json";
import TomorrowNight from "../../../node_modules/monaco-themes/themes/Tomorrow-Night.json";
import TomorrowNightBlue from "../../../node_modules/monaco-themes/themes/Tomorrow-Night-Blue.json";
import TomorrowNightBright from "../../../node_modules/monaco-themes/themes/Tomorrow-Night-Bright.json";
import TomorrowNightEighties from "../../../node_modules/monaco-themes/themes/Tomorrow-Night-Eighties.json";
import Twilight from "../../../node_modules/monaco-themes/themes/Twilight.json";
import UpstreamSunburst from "../../../node_modules/monaco-themes/themes/Upstream Sunburst.json";
import VibrantInk from "../../../node_modules/monaco-themes/themes/Vibrant Ink.json";
import Xcode_default from "../../../node_modules/monaco-themes/themes/Xcode_default.json";
import Zenburnesque from "../../../node_modules/monaco-themes/themes/Zenburnesque.json";
import PseudoWorker from 'pseudo-worker';
import { handleResize } from './core';

const themeMap = {
    'Active4D': Active4D,
    'Xcode_default': Xcode_default,
    'AllHallowsEve': AllHallowsEve,
    'Amy': Amy,
    'BirdsofParadise': BirdsofParadise,
    'Blackboard': Blackboard,
    'BrillianceBlack': BrillianceBlack,
    'BrillianceDull': BrillianceDull,
    'ChromeDevTools': ChromeDevTools,
    'CloudsMidnight': CloudsMidnight,
    'Clouds': Clouds,
    'Cobalt': Cobalt,
    'Cobalt2': Cobalt2,
    'Dawn': Dawn,
    'DominionDay': DominionDay,
    'Dracula': Dracula,
    'Dreamweaver': Dreamweaver,
    'Eiffel': Eiffel,
    'EspressoLibre': EspressoLibre,
    'GitHub': GitHub,
    'IDLE': IDLE,
    'idleFingers': idleFingers,
    'iPlastic': iPlastic,
    'Katzenmilch': Katzenmilch,
    'krTheme': krTheme,
    'KuroirTheme': KuroirTheme,
    'LAZY': LAZY,
    'MagicWBAmiga': MagicWBAmiga,
    'MerbivoreSoft': MerbivoreSoft,
    'Merbivore': Merbivore,
    'monoindustrial': monoindustrial,
    'MonokaiBright': MonokaiBright,
    'Monokai': Monokai,
    'NightOwl': NightOwl,
    'Nord': Nord,
    'OceanicNext': OceanicNext,
    'PastelsonDark': PastelsonDark,
    'SlushandPoppies': SlushandPoppies,
    'Solarizeddark': Solarizeddark,
    'Solarizedlight': Solarizedlight,
    'SpaceCadet': SpaceCadet,
    'Sunburst': Sunburst,
    'TextmateMacClassic': TextmateMacClassic,
    'TomorrowNightBlue': TomorrowNightBlue,
    'TomorrowNightBright': TomorrowNightBright,
    'TomorrowNightEighties': TomorrowNightEighties,
    'TomorrowNight': TomorrowNight,
    'Tomorrow': Tomorrow,
    'Twilight': Twilight,
    'UpstreamSunburst': UpstreamSunburst,
    'VibrantInk': VibrantInk,
    'Xcodedefault': Xcode_default,
    'Zenburnesque': Zenburnesque
};

const getVSTheme = (theme) => {
    const themeJson = themeMap[theme] || {};
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
const urlPrefix = document.getElementById('plugin-prefix').value;
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