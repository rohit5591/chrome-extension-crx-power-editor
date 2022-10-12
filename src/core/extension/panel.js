import jquery from "jquery";
import "@popperjs/core";
import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";
import './panel.css';

window.jquery = jquery;
window.$ = jquery;
window.bootstrap = bootstrap;
require("jquery-mousewheel")($);
require('malihu-custom-scrollbar-plugin')($);

var isChrome = !browser;
var browser = browser || chrome;
var config = config || { urls: ['http://localhost:4502'], isEnable: false, editorType: "editorType-vs", editorTheme: 'vs', editorHook: 750 };

$(function () {
	$('#statusWrap').on("click", function () {
		var isCheck = $(this).attr("class").indexOf("danger") === -1;
		setLabelStatus(!isCheck);
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
		var isCheck = $('#statusWrap').attr("class").indexOf("danger") === -1;
		config.isEnable = isCheck;
		config.editorType = $('.editor-toggle.active input').attr("id");
		config.editorHook = $('#editorHook').val();
		var urls = [];
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

function setLabelStatus(isEnable) {
	if (isEnable) {
		$('#lbStatus').text('Enabled')
			.parent()
			.removeClass('btn-danger')
			.addClass('btn-success');

		$('.mCSB_container').removeClass('disabled');
	} else {
		$('#lbStatus').text('Disabled')
			.parent()
			.removeClass('btn-success')
			.addClass('btn-danger');
		$('.mCSB_container').addClass('disabled');
	}
}

function getUrl() {
	var url = $('#txtUrl').val();
	if (isValidHttpUrl(url)) {
		$('#txtUrl').val('');
		addUrlSection('new', url);
	} else {
		console.log('invalid url');
	}

}

function addUrlSection(id, value) {
	var content = '<div id="' + id + '" class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><span class="url-regex">' + value + '<span/></div>';
	$('.list-url .mCSB_container').prepend(content);
}

function isValidHttpUrl(string) {
	let url;

	try {
		url = new URL(string);
	} catch (_) {
		return false;
	}

	return url.protocol === "http:" || url.protocol === "https:";
}

function initPopup(config) {
	console.log('Init popup');
	setLabelStatus(config.isEnable);

	$('.list-url .mCSB_container').html('');
	var urls = config.urls;
	for (var i = urls.length - 1; i >= 0; i--) {
		var url = urls[i];
		addUrlSection('index', url);
	};
	if (config.editorTheme) {
		if (config.editorType === "editorType-vs") {
			$("#editorType-vs-theme").val(config.editorTheme);
		} else {
			$("#editorType-codeMirror-theme").val(config.editorTheme);
		}
	}
	$('#editorHook').val(config.editorHook);
	$('.settings').hide();
	$('.editor-toggle').removeClass("active");
	$('.settings-' + config.editorType).show();
	$('#' + config.editorType).parent().addClass("active");
}

function onError(error) {
	console.log(`Error: ${error}`);
}

function initialize() {
	console.log('Run init');
	if (isChrome) {
		browser.storage.local.get('config', (results) => {
			loadConfig(results);
		});
	} else {
		var storageSetting = browser.storage.local.get('config');
		storageSetting.then((results) => {
			loadConfig(results);
		}, onError);
	}
}

function loadConfig(results) {
	console.log(results)
	if (results.config) {
		config = results.config;
	}
	initPopup(config);
}

$(window).on('load', function () {
	initialize();
	$(".list-url").mCustomScrollbar({
		theme: "dark",
		scrollbarPosition: "outside"
	});
	$(".editor-toggle").click(function () {
		$(".settings").hide();
		$(".settings-" + $(this).find("input").attr("id")).show();
	});
});