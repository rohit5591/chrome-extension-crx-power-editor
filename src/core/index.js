import { initVSEditor } from './monaco-editor';
import { initCMEditor } from './code-mirror';
import { createEditor } from './core';

const typeOfEditorElement = document.getElementById('editorType');
if (typeOfEditorElement && typeOfEditorElement?.value == 'editorType-codeMirror') {
	createEditor(initCMEditor);
} else {
	createEditor(initVSEditor);
}
