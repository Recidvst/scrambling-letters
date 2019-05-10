require("@babel/register");
require('jsdom-global')();
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;

console.log(process.env.BABEL_ENV);
console.log(process.env.NODE_ENV);

// import Scrambler and create test vars
import Scrambler from '../js/scrambler.js';
import ScramblerSetup from '../js/scrambleSetup.js';

const TEST_TRIGGER = Scrambler;
const TEST_SETUP = ScramblerSetup;
console.log(TEST_TRIGGER);
console.log(TEST_SETUP);

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