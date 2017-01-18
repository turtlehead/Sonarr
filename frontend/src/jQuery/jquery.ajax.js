var $ = require('JsLibraries/jquery');

const absUrlRegex = /^(https?\:)?\/\//i;
const apiRoot = window.Sonarr.ApiRoot;
const urlBase = window.Sonarr.urlBase;

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
  const url = xhr.url;
  if (!absUrlRegex.test(url) && !url.startsWith(urlBase)) {
    if (url.startsWith('signalr')) {
      xhr.url = urlBase + xhr.url;
    } else {
      xhr.url = apiRoot + xhr.url;
    }
  }
}

function addApiKey(xhr) {
  xhr.headers = xhr.headers || {};
  xhr.headers['X-Api-Key'] = window.Sonarr.ApiKey;
}

module.exports = function(jQuery) {
  const originalAjax = jQuery.ajax;
  jQuery.ajax = function(xhr) {
    if (xhr) {
      moveBodyToQuery(xhr);
      addRootUrl(xhr);
      addApiKey(xhr);
    }
    return originalAjax.apply(this, arguments);
  };
};
