import { initVSEditor } from './monaco-editor';
import { initCMEditor } from './code-mirror';
import { createEditor } from './core';

const type = document.getElementById('editorType');
if (type && type?.value == 'editorType-codeMirror') {
	createEditor(initCMEditor);
} else {
	createEditor(initVSEditor);
}
