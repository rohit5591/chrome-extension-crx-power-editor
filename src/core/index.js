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
if (typeOfEditorElement && typeOfEditorElement?.value == 'editorType-codeMirror') {
	initEditor = initCMEditor;
}

observeCRXInitiated();
