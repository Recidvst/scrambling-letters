require("@babel/register");
require('jsdom-global')();
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const should = chai.should;

// import Scrambler and create test var
const Scrambler = require('../js/scramble.js');
const ScramblerSetup = require('../js/scrambleSetup.js');

const TEST_TRIGGER = Scrambler.Scrambler;
const TEST_SETUP = ScramblerSetup.ScramblerSetup;

describe('scramblerExists', function() {
  it('main function should exist', function() {
    expect(TEST_TRIGGER).to.exist;
  });
  it('setup function should exist', function() {
    expect(TEST_SETUP).to.exist;
  });
});

describe('scramblerIsFunction', function() {
  it('should be a function', function() {
    expect(typeof(TEST_TRIGGER)).to.equal('function')
  });
});
describe('scramblerSetupIsObject', function() {
  it('should be an object', function() {
    expect(typeof(TEST_SETUP)).to.equal('object')
  });
});

describe('scramblerParamTypes', function() {
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
    expect(TEST_TRIGGER(true)).to.be.false;;
  });
  it('should fail loudly if passed an integer', function() {
    assert.throws(() => TEST_TRIGGER(1), Error);
  });
  it('should fail loudly if passed a float', function() {
    assert.throws(() => TEST_TRIGGER(1.01), Error);
  });
  it('should fail loudly if passed a function', function() {
    assert.throws(() => TEST_TRIGGER(function test() {return true}), Error);
  });
  it('should fail loudly if passed an undefined param', function() {
    assert.throws(() => TEST_TRIGGER(ZZZ), Error, "ReferenceError: ZZZ is not defined");
  });
});