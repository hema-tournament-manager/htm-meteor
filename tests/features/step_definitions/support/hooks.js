module.exports = function () {
  this.Before(function () {
    global.CRITICAL = true;
    browser.url(process.env.ROOT_URL);
    client.execute(function() {
      $('#velocityOverlay').remove();
      $('#velocity-status-widget').remove();
    });
  })
};