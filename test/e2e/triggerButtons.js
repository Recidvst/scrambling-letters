const siteURL = 'https://scrambling-letters.chris-snowden.me/'

module.exports = {
  'Scramble text button' : function (browser) {
    browser
      .url(siteURL)
      .waitForElementVisible('body')
      .pause(5000)
      .assert.containsText('h1 + h3', 'A lightweight javascript library for adding a scrambling/decoding effect to your text.')
      .assert.containsText('#scramble-paragraph-button', 'SCRAMBLE TEXT')
      .click('#scramble-paragraph-button')
      .pause(500, function() {
        browser.expect.element('h1 + h3').text.to.not.equal('A lightweight javascript library for adding a scrambling/decoding effect to your text.')
      })
      .pause(5000)
      .assert.containsText('h1 + h3', 'A lightweight javascript library for adding a scrambling/decoding effect to your text.')
    browser.end();
  },
  'Scramble titles button' : function (browser) {
    browser
      .url(siteURL)
      .waitForElementVisible('body')
      .pause(5000)
      .assert.containsText('.why-scrambling h2', 'Why Scrambling Letters?')
      .assert.containsText('#scramble-title-button', 'SCRAMBLE TITLES')   
      .click('#scramble-title-button')
      .pause(500, function() {
        browser.expect.element('.why-scrambling h2').text.to.not.equal('Why Scrambling Letters?')
      })
      .pause(5000)
      .assert.containsText('.why-scrambling h2', 'Why Scrambling Letters?') 
    browser.end();
  },
  'Decode titles button' : function (browser) {
    browser
      .url(siteURL)
      .waitForElementVisible('body')
      .pause(5000)
      .assert.containsText('h1', 'Scrambling Letters')
      .assert.containsText('#scramble-paragraph-decode', 'DECODE TITLES')
      .click('#scramble-paragraph-decode')
      .pause(500, function() {
        browser.expect.element('h1').text.to.not.equal('Scrambling Letters?')
        browser.expect.element('h1').text.to.not.equal('Secret message')
      })
      .pause(5000)
      .assert.containsText('h1', 'Secret message')
      .end();
  }
};