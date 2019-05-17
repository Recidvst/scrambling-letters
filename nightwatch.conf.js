const chromedriver = require("chromedriver");
const geckodriver = require("geckodriver");
require('@babel/register')();

module.exports = (function (settings) {
  settings.test_workers = false;
  settings.webdriver.server_path = chromedriver.path;
  settings.test_settings.chrome.webdriver.server_path = chromedriver.path;
  settings.test_settings.firefox.webdriver.server_path = geckodriver.path;
  return settings;
})(require("./nightwatch.json"));