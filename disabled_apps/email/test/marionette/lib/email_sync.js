'use strict';
/*jshint node: true, browser: true */
var SHARED_PATH = __dirname + '/../../../../../shared/test/integration';

function EmailSync(client) {
  this.client = client;
}
module.exports = EmailSync;

EmailSync.prototype = {
  /**
   * Call this in the setup() for the test.
   */

  setup: function() {
    this.client.contentScript.inject(
      SHARED_PATH + '/mock_navigator_moz_set_message_handler.js'
    );
    this.client.contentScript.inject(
      SHARED_PATH + '/mock_navigator_mozalarms.js'
    );
  },

  /**
   * Does the work to trigger a sync using helpers in
   * mock_navigator_moz_set_message_handler.js.
   */
  triggerSync: function() {
    // trigger sync in Email App
    this.client.executeScript(function() {
      var interval = 1000;
      var date = new Date(Date.now() + interval).getTime();
      var alarm = {
        data: {
          type: 'sync',
          accountIds: ['0', '1'],
          interval: interval,
          timestamp: date
        }
      };
      return window.wrappedJSObject.fireMessageHandler(alarm, 'alarm');
    });
  }
};
