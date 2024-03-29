import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import Active4D from "monaco-themes/themes/Active4D.json";
import AllHallowsEve from "monaco-themes/themes/All Hallows Eve.json";
import Amy from "monaco-themes/themes/Amy.json";
import BirdsofParadise from "monaco-themes/themes/Birds of Paradise.json";
import Blackboard from "monaco-themes/themes/Blackboard.json";
import BrillianceBlack from "monaco-themes/themes/Brilliance Black.json";
import BrillianceDull from "monaco-themes/themes/Brilliance Dull.json";
import ChromeDevTools from "monaco-themes/themes/Chrome DevTools.json";
import CloudsMidnight from "monaco-themes/themes/Clouds Midnight.json";
import Clouds from "monaco-themes/themes/Clouds.json";
import Cobalt from "monaco-themes/themes/Cobalt.json";
import Cobalt2 from "monaco-themes/themes/Cobalt2.json";
import Dawn from "monaco-themes/themes/Dawn.json";
import DominionDay from "monaco-themes/themes/Dominion Day.json";
import Dracula from "monaco-themes/themes/Dracula.json";
import Dreamweaver from "monaco-themes/themes/Dreamweaver.json";
import Eiffel from "monaco-themes/themes/Eiffel.json";
import EspressoLibre from "monaco-themes/themes/Espresso Libre.json";
import GitHub from "monaco-themes/themes/GitHub.json";
import IDLE from "monaco-themes/themes/IDLE.json";
import idleFingers from "monaco-themes/themes/idleFingers.json";
import iPlastic from "monaco-themes/themes/iPlastic.json";
import Katzenmilch from "monaco-themes/themes/Katzenmilch.json";
import krTheme from "monaco-themes/themes/krTheme.json";
import KuroirTheme from "monaco-themes/themes/Kuroir Theme.json";
import LAZY from "monaco-themes/themes/LAZY.json";
import MagicWBAmiga from "monaco-themes/themes/MagicWB (Amiga).json";
import MerbivoreSoft from "monaco-themes/themes/Merbivore Soft.json";
import Merbivore from "monaco-themes/themes/Merbivore.json";
import monoindustrial from "monaco-themes/themes/monoindustrial.json";
import MonokaiBright from "monaco-themes/themes/Monokai Bright.json";
import Monokai from "monaco-themes/themes/Monokai.json";
import NightOwl from "monaco-themes/themes/Night Owl.json";
import Nord from "monaco-themes/themes/Nord.json";
import OceanicNext from "monaco-themes/themes/Oceanic Next.json";
import PastelsonDark from "monaco-themes/themes/Pastels on Dark.json";
import SlushandPoppies from "monaco-themes/themes/Slush and Poppies.json";
import Solarizeddark from "monaco-themes/themes/Solarized-dark.json";
import Solarizedlight from "monaco-themes/themes/Solarized-light.json";
import SpaceCadet from "monaco-themes/themes/SpaceCadet.json";
import Sunburst from "monaco-themes/themes/Sunburst.json";
import TextmateMacClassic from "monaco-themes/themes/Textmate (Mac Classic).json";
import Tomorrow from "monaco-themes/themes/Tomorrow.json";
import TomorrowNight from "monaco-themes/themes/Tomorrow-Night.json";
import TomorrowNightBlue from "monaco-themes/themes/Tomorrow-Night-Blue.json";
import TomorrowNightBright from "monaco-themes/themes/Tomorrow-Night-Bright.json";
import TomorrowNightEighties from "monaco-themes/themes/Tomorrow-Night-Eighties.json";
import Twilight from "monaco-themes/themes/Twilight.json";
import UpstreamSunburst from "monaco-themes/themes/Upstream Sunburst.json";
import VibrantInk from "monaco-themes/themes/Vibrant Ink.json";
import Xcode_default from "monaco-themes/themes/Xcode_default.json";
import Zenburnesque from "monaco-themes/themes/Zenburnesque.json";
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
    const isVSMinimapElement = document.getElementById("isVSMinimap");
    const isVSMinimap = isVSMinimapElement?.value === 'true';
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
        },
        minimap: {
            enabled: isVSMinimap
        }
    });
    editor.getModel().onDidChangeContent((event) => {
        codeMirror.setValue(editor.getValue());
    });
    tab.setAttribute("editor-initialzed", "true");
    document.querySelector('.loading.editor').style.display = 'none';
    handleResize(id);
};