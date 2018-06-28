import Component from '@ember/component';

export default Component.extend({
  init() {
    this._super(...arguments);
  },
  actions: {
    close() {
      this._close();
    },
    customAction(params) {
      this.get('customAction')(...params);
      this._close();
    }
  },
  _close() {
    this.get('toggleVisibility')();
  }
});