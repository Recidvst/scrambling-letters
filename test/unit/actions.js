require("@babel/register");
require('jsdom-global')();
const assert = require('assert');
const chai = require('chai');
chai.use(require('chai-dom'));
const expect = chai.expect;

import * as TEST_ACTIONS from '../../js/scrambleActions.js';

describe('actions', function() {
  it('actions wrapper should exist', function() {
    expect(TEST_ACTIONS).to.exist;
  });
  it('actions wrapper should be an object', function() {
    expect(typeof(TEST_ACTIONS)).to.equal('object');
  });
});

describe('actionsFunctionsOutput', function() { // wrapper

  describe('setArgs', function() {
    it('should exist', function() {
      expect(TEST_ACTIONS.setArgs).to.exist;
    });
    it('should be a function', function() {
      expect(typeof(TEST_ACTIONS.setArgs)).to.equal('function');
    });
    it('should return an object', function() {
      expect(typeof(TEST_ACTIONS.setArgs({random: undefined}))).to.equal('object');
    });
    it('should return the new argument if a defined value is passed to a valid key', function() {
      expect(TEST_ACTIONS.setArgs({random: [1500, 3500]}, true)).to.deep.include({random: [1500, 3500]});
    });
    it('should return the new argument if a defined value is passed to a valid key', function() {
      expect(TEST_ACTIONS.setArgs({text: 'newtext'}, true)).to.deep.include({text: 'newtext'});
    });
  });

  describe('killCheck', function() {
    it('should exist', function() {
      expect(TEST_ACTIONS.killCheck).to.exist;
    });
    it('should be a function', function() {
      expect(typeof(TEST_ACTIONS.killCheck)).to.equal('function');
    });
    it('should return true if both args have equal length', function() {
      expect(TEST_ACTIONS.killCheck([1], [1])).to.be.true;
    });
    it('should return false if both args have different length', function() {
      expect(TEST_ACTIONS.killCheck([1], [1,2])).to.be.false;
    });
    it('should return true if both args match', function() {
      expect(TEST_ACTIONS.killCheck([1,2], [1,2])).to.be.true;
    });
    it('should return false if both args differ', function() {
      expect(TEST_ACTIONS.killCheck([1,3], [1,2])).to.be.false;
    });
  });

  describe('defineEndText', function() {
    it('should exist', function() {
      expect(TEST_ACTIONS.defineEndText).to.exist;
    });
    it('should be a function', function() {
      expect(typeof(TEST_ACTIONS.defineEndText)).to.equal('function');
    });
    it('should return an object', function() {
      expect(typeof(TEST_ACTIONS.defineEndText('test'))).to.equal('object');
    });
    it('should return false if passed no argument', function() {
      expect(TEST_ACTIONS.defineEndText()).to.be.false;
    });
    it('should return false if passed something other than a string', function() {
      expect(TEST_ACTIONS.defineEndText([1,2,3])).to.be.false;
    });
    it('should return an object with three items', function() {
      let result = TEST_ACTIONS.defineEndText('test');
      expect(Object.keys(result)).length.to.have.length(3);
    });
  });

});