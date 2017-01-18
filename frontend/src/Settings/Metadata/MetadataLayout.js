import Marionette from 'marionette';
import tpl from './MetadataLayout.hbs';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import appStore from 'Store/appStore';
import MetadataSettings from './MetadataSettings';

module.exports = Marionette.LayoutView.extend({
  template: tpl,

  mountReact: function() {
    ReactDOM.render(
      <Provider store={appStore}>
        <MetadataSettings />
      </Provider>,
      this.el
    );
  },

  unmountReact: function() {
    if (this.isRendered) {
      ReactDOM.unmountComponentAtNode(this.el);
    }
  },

  onBeforeRender() {
    this.unmountReact();
  },

  onRender() {
    this.mountReact();
  },

  onClose: function() {
    this.unmountReact();
  }
});
