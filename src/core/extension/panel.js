import jquery from "jquery";
import "@popperjs/core";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css";
import "malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js";
import './panel.css';

window.jquery = jquery;
window.$ = jquery;

var browser = browser || chrome;
var isChrome = !browser;
var config = config || { urls: ['http://localhost:4502'], isEnable: false, isVSMinimap: true, editorType: "editorType-vs", editorTheme: 'vs' };

$(function () {
	$('#editorEnableCheck').on("change", function (e) {
		setLabelStatus($(e.target).is(':checked'));
	});

	$('#txtUrl').on("keypress", function (e) {
		if (e.key == 13) {
			getUrl();
			e.preventDefault();
		}
	});

	$('#btnAdd').on('click', function () {
		getUrl();
	});

	$('#btnSave').on("click", function () {
		const isCheck = $("#editorEnableCheck").is(":checked");
		config.isEnable = isCheck;
		const isVSMinimap = $("#monacoEditorMinimap").is(":checked");
		config.isVSMinimap = isVSMinimap;
		config.editorType = $('#editorSwitch .nav-link.active').attr("id");
		const urls = [];
		$('.url-regex').each(function (index) {
			urls.push($(this).text());
		});
		if (config.editorType === "editorType-vs") {
			config.editorTheme = $("#editorType-vs-theme").val()
		} else {
			config.editorTheme = $("#editorType-codeMirror-theme").val()
		}
		console.log(urls);
		config.urls = urls;
		browser.storage.local.set({ config: config });
		window.close();
	});

	$('#btnCancel').on("click", function () {
		initPopup(config);
	});

	$('#btnClose').on("click", function () {
		window.close();
	});
});

const setLabelStatus = (isEnable) => {
	if (isEnable) {
		$('.mCSB_container').removeClass('disabled');
	} else {
		$('.mCSB_container').addClass('disabled');
	}
};

const triggerError = (message) => {
	$('#txtUrl').addClass('is-invalid');
	$('.url-error').html(message);
	var count = 3;
	var x = setInterval(function () {
		if (count <= 0) {
			$('#txtUrl').removeClass('is-invalid');
			clearInterval(x);
		}
		count--;
	}, 1000);
};

const getUrl = () => {
	const value = $('#txtUrl').val();
	if (isValidHttpUrl(value)) {
		const url = new URL(value);
		if($('.url-regex').text().indexOf(url.origin) === -1) {
			$('#txtUrl').val('');
			addUrlSection('new', url.origin);
		} else {
			triggerError('Domain already added in the list');
		}
	} else {
		triggerError('Invalid URL');
		console.log('invalid url');
	}
};

const addUrlSection = (id, url) => {
	const content = `<div id="${id}" class="alert alert-success alert-dismissible fade show" role="alert"><span class="url-regex">${url}</span/><button type="button" class="btn-close delete-domain" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
	$('.list-url .mCSB_container').prepend(content);
};

const isValidHttpUrl = (string) => {
	let url;

	try {
		url = new URL(string);
	} catch (_) {
		return false;
	}

	return url.protocol === "http:" || url.protocol === "https:";
};

const initPopup = (config) => {
	console.log('Init popup');
	$('#editorEnableCheck').prop('checked', config.isEnable);
	$('#monacoEditorMinimap').prop('checked', config.isVSMinimap);
	setLabelStatus(config.isEnable);

	$('.list-url .mCSB_container').html('');
	const urls = config.urls;
	for (let i = urls.length - 1; i >= 0; i--) {
		let url = urls[i];
		addUrlSection('index', url);
	};
	if (config.editorTheme) {
		if (config.editorType === "editorType-vs") {
			$("#editorType-vs-theme").val(config.editorTheme);
		} else {
			$("#editorType-codeMirror-theme").val(config.editorTheme);
		}
	}
	if (config.editorType === "editorType-codeMirror") {
		$('#editorType-codeMirror').trigger('click');
	} else {
		$('#editorType-vs').trigger('click');
	}
};

const onError = (error) => {
	console.log(`Error: ${error}`);
};

const initialize = () => {
	console.log('Run init');
	if (isChrome) {
		browser.storage.local.get('config', (results) => {
			loadConfig(results);
		});
	} else {
		const storageSetting = browser.storage.local.get('config');
		storageSetting.then((results) => {
			loadConfig(results);
		}, onError);
	}
};

const loadConfig = (results) => {
	console.log(results)
	if (results.config) {
		config = results.config;
	}
	initPopup(config);
};

$(window).on('load', function () {
	initialize();
	$(".list-url").mCustomScrollbar();
	setTimeout(function () {
		$("#mCSB_1_scrollbar_vertical").
			removeClass("mCS-light").
			addClass("mCS-dark");
	}, 300);
	$(".editor-toggle").on('click', function () {
		$(".settings").hide();
		$(".settings-" + $(this).find("input").attr("id")).show();
	});
});