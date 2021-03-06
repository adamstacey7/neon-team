import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.get('store').findRecord('member', params.member_id);
  },
  actions: {
    error(reason) {
      if (reason.errors[0].status === '404') {
        this.transitionTo('not-found', ' ');
      }
    }
  }
});
