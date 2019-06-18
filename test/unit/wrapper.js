require("@babel/register");
require('jsdom-global')();
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;

// import Scrambler and create test vars
import Scrambler from '../../js/scrambler.js';
import ScrambleSetup from '../../js/scrambleSetup.js';

const TEST_TRIGGER = Scrambler;
const TEST_SETUP = ScrambleSetup;

describe('scramblerFunctionsExist', function() {
  it('main function should exist', function() {
    expect(TEST_TRIGGER).to.exist;
  });
  it('setup function should exist', function() {
    expect(TEST_SETUP).to.exist;
  });
});

describe('scramblerIsFunction', function() {
  it('main function should be a function', function() {
    expect(typeof(TEST_TRIGGER)).to.equal('function')
  });
});
describe('scramblerSetupIsFunction', function() {
  it('setup function should be a function', function() {
    expect(typeof(TEST_SETUP)).to.equal('function')
  });
});

describe('scramblerParams', function() {
  it('should succeed if passed a string', function() {
    expect(TEST_TRIGGER('string')).to.not.be.undefined;
  });
  it('should succeed if passed an object', function() {
    expect(TEST_TRIGGER({target: "h1", speed: 100})).to.not.be.undefined;
  });
  it('should fail silently if passed an array', function() {
    expect(TEST_TRIGGER(['button','.title'])).to.be.false;
  });
  it('should fail silently if passed a boolean', function() {
    expect(TEST_TRIGGER(true)).to.be.false;
  });
  it('should fail silently if passed a number', function() {
    expect(TEST_TRIGGER(7)).to.be.false;
    expect(TEST_TRIGGER(7.01)).to.be.false;
  });
  it('should fail silently if passed a function', function() {
    expect(TEST_TRIGGER(function test(e) {alert(e)})).to.be.false;
  });
  it('should fail silently if passed an undefined param', function() {
    expect(TEST_TRIGGER(undefined)).to.be.false;
  });
});