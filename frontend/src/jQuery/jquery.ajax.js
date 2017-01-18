const $ = require('JsLibraries/jquery');

const absUrlRegex = /^(https?\:)?\/\//i;
const apiRoot = window.Sonarr.ApiRoot;
const urlBase = window.Sonarr.UrlBase;

function isRelative(xhr) {
  return !absUrlRegex.test(xhr.url);
}

function moveBodyToQuery(xhr) {
  if (xhr.data && xhr.type === 'DELETE') {
    if (xhr.url.contains('?')) {
      xhr.url += '&';
    } else {
      xhr.url += '?';
    }
    xhr.url += $.param(xhr.data);
    delete xhr.data;
  }
}

function addRootUrl(xhr) {
  var url = xhr.url;
  if (url.startsWith('/signalr')) {
    xhr.url = urlBase + xhr.url;
  } else {
    xhr.url = apiRoot + xhr.url;
  }
}

function addApiKey(xhr) {
  xhr.headers = xhr.headers || {};
  xhr.headers['X-Api-Key'] = window.Sonarr.ApiKey;
}

module.exports = function(jQuery) {
  var originalAjax = jQuery.ajax;
  jQuery.ajax = function(xhr) {
    if (xhr && isRelative(xhr)) {
      moveBodyToQuery(xhr);
      addRootUrl(xhr);
      addApiKey(xhr);
    }
    return originalAjax.apply(this, arguments);
  };
};
