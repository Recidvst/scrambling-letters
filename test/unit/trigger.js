require("@babel/register");
require('jsdom-global')();
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;

// import Scrambler and create test vars
import Scrambler from '../../js/scrambler.js';
import ScramblerSetup from '../../js/scrambleSetup.js';

const TEST_TRIGGER = Scrambler;
const TEST_SETUP = ScramblerSetup;
console.log(TEST_SETUP);
console.log(TEST_SETUP({target: undefined}, true));

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
  it('should fail loudly if passed a function', function() {
    assert.throws(() => TEST_TRIGGER(function test() {return true}), Error);
  });
  it('should fail loudly if passed an undefined param', function() {
    assert.throws(() => TEST_TRIGGER(ZZZ), Error, "ReferenceError: ZZZ is not defined");
  });
});

describe('scramblerDefaultArguments', function() {
  it('should return the default ([data-scrambler]) if undefined passed as the target value', function() {
    expect(TEST_TRIGGER({target: undefined}, true)).to.deep.include({target: '[data-scrambler]'});
  });
  it('should return the default ([1000, 3000]) if undefined passed as the random value', function() {
    expect(TEST_TRIGGER({random: undefined}, true)).to.deep.include({random: [1000, 3000]});
  });
  it('should return the default (100) if undefined passed as the speed value', function() {
    expect(TEST_TRIGGER({speed: undefined}, true)).to.deep.include({speed: 100});
  });
  it('should return the default (false) if undefined passed as the text value', function() {
    expect(TEST_TRIGGER({text: undefined}, true)).to.deep.include({text: false});
  });
  it('should return the default ([data-scrambler]) if nothing passed as the target value', function() {
    expect(TEST_TRIGGER({speed: 200}, true)).to.deep.include({target: '[data-scrambler]'});
  });
  it('should return the default ([1000, 3000]) if nothing passed as the random value', function() {
    expect(TEST_TRIGGER({target: 'element'}, true)).to.deep.include({random: [1000, 3000]});
  });
  it('should return the default (100) if undefined nothing as the speed value', function() {
    expect(TEST_TRIGGER({target: 'element'}, true)).to.deep.include({speed: 100});
  });
  it('should return the default (false) if undefined nothing as the text value', function() {
    expect(TEST_TRIGGER({target: 'element'}, true)).to.deep.include({text: false});
  });
});

describe('scramblerValidArguments', function() {
  it('should return the passed argument if a valid string passed as the target value', function() {
    expect(TEST_TRIGGER({target: 'valid-string'}, true)).to.deep.include({target: 'valid-string'});
  });
  it('should return the passed argument if a valid array of numbers passed as the random value', function() {
    expect(TEST_TRIGGER({random: [2000, 4000]}, true)).to.deep.include({random: [2000, 4000]});
  });
  it('should return the passed argument if a valid number passed as the speed value', function() {
    expect(TEST_TRIGGER({speed: 200}, true)).to.deep.include({speed: 200});
  });
  it('should return the passed argument if a valid string passed as the text value', function() {
    expect(TEST_TRIGGER({text: 'valid'}, true)).to.deep.include({text: 'valid'});
  });
});

// will break if random is passed an array of non-numbers? similarly, all other options..