require('jsdom-global')();
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const should = chai.should;

// import Scrambler (compiled ES5 version)
const Scrambler = require('../js/scramble-ES5.js');

describe('scramblerExists', function() {
  it('should exist', function() {
    expect(Scrambler).to.exist;
  });
});

describe('scramblerIsFunction', function() {
  it('should be a function', function() {
    expect(typeof(Scrambler)).to.equal('function')
  });
});

describe('scramblerParamTypes', function() {
  it('should succeed if passed a string', function() {
    expect(Scrambler('string')).to.be.undefined;
  });
  it('should succeed if passed an object', function() {
    expect(Scrambler({target: "h1", speed: 100})).to.be.undefined;
  });
  it('should fail silently if passed an array', function() {
    expect(Scrambler(['button','.title'])).to.be.undefined;
  });
  it('should fail silently if passed a boolean', function() {
    expect(Scrambler(true)).to.be.undefined;
  });
  it('should fail loudly if passed an integer', function() {
    assert.throws(() => Scrambler(1), Error);
  });
  it('should fail loudly if passed a float', function() {
    assert.throws(() => Scrambler(1.01), Error);
  });
  it('should fail loudly if passed a function', function() {
    assert.throws(() => Scrambler(function test() {return true}), Error);
  });
  it('should fail loudly if passed an undefined param', function() {
    assert.throws(() => Scrambler(ZZZ), Error, "ReferenceError: ZZZ is not defined");
  });
});