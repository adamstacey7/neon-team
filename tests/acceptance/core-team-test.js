import { module, test } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';
import setupMockData from '../helpers/setupMockData';

module('Acceptance | core team', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('visiting /core-team or /', async function(assert) {
    await visit('/core-team');
    assert.equal(currentURL(), '/core-team');

    await visit('/');
    assert.equal(currentURL(), '/core-team');
  });

  test('should display header with correct title', async function(assert) {
    await visit('/');
    assert.equal(
      this.element.querySelector('.header .title').textContent.trim(),
      'Team Overview',
      'should display header of front page'
    );
  });

  test('should display correct number of team members', async function(assert) {
    setupMockData(server);
    await visit('/');
    assert.equal(
      this.element.querySelectorAll('.member').length,
      3,
      'should be equal to the number of members returned from ember data'
    );
  });

  test('should go to member click of member', async function(assert) {
    setupMockData(server);
    await visit('/');
    await click('.member:first-child .details');
    assert.equal(
      currentURL(),
      '/member/0',
      "should navigate to first member's page"
    );
    assert.equal(
      this.element.querySelector('.first-name').textContent.trim(),
      'First Name: Adam',
      'should equal first name of member 1'
    );
    assert.equal(
      this.element.querySelector('.last-name').textContent.trim(),
      'Last Name: Stacey',
      'should equal last name of member 1'
    );
  });

  test('should open confirmation alert when clicking delete button for that member', async function(assert) {
    setupMockData(server);
    await visit('/');

    await click('.delete:first-child');

    assert.equal(currentURL(), '/core-team');
    assert.ok(
      this.element.querySelector('.modal'),
      'should show the confirmation alert'
    );
    assert.equal(
      this.element.querySelector('.modal-body p').textContent.trim(),
      'Are you sure you want to delete member Adam Stacey?',
      'should display the correct message'
    );
  });

  test('should delete the member after confirming it', async function(assert) {
    setupMockData(server);
    await visit('/');

    assert.equal(this.element.querySelectorAll('.member').length, 3);

    await click('.delete:first-child');

    await click('.confirm');

    assert.ok(
      !this.element.querySelector('.modal'),
      'should close the confirmation alert'
    );
    assert.equal(
      this.element.querySelectorAll('.member').length,
      2,
      'should delete the member'
    );
  });

  test('should redirect to core team page when clicking on logo', async function(assert) {
    await visit('/');
    await click('.header-title');
    assert.equal(
      currentURL(),
      '/core-team',
      'should redirect to core team page'
    );
  });

  test('should redirect to create member page when clicking on link in app header', async function(assert) {
    await visit('/');
    await click('.create-member-link a');
    assert.equal(
      currentURL(),
      '/member/create',
      'should redirect to member creation page'
    );
  });
});
