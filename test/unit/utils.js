require("@babel/register");
require('jsdom-global')();
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;

import * as TEST_UTILS from '../../js/scrambleUtil.js';

describe('utilFunctionsExist', function() {
  it('utils wrapper should exist', function() {
    expect(TEST_UTILS).to.exist;
  });
  it('utils wrapper should be an object', function() {
    expect(typeof(TEST_UTILS)).to.equal('object')
  });
});

describe('utilFunctionsOutput', function() { // wrapper

  describe('isBool', function() {
    it('should exist', function() {
      expect(TEST_UTILS.isBool).to.exist;
    });
    it('should be a function', function() {
      expect(typeof(TEST_UTILS.isBool)).to.equal('function')
    });
    it('should return true if passed a boolean', function() {
      expect(TEST_UTILS.isBool(true)).to.be.true;
    });
    it('should return false if passed something other than a boolean', function() {
      expect(TEST_UTILS.isBool(1)).to.be.false;
    });
  });

  describe('isArray', function() {
    it('should exist', function() {
      expect(TEST_UTILS.isArray).to.exist;
    });
    it('should be a function', function() {
      expect(typeof(TEST_UTILS.isArray)).to.equal('function')
    });
    it('should return true if passed an array', function() {
      expect(TEST_UTILS.isArray([1,2,3])).to.be.true;
    });
    it('should return false if passed something other than an array', function() {
      expect(TEST_UTILS.isArray(1)).to.be.false;
    });
  });

  describe('isFunction', function() {
    it('should exist', function() {
      expect(TEST_UTILS.isFunction).to.exist;
    });
    it('should be a function', function() {
      expect(typeof(TEST_UTILS.isFunction)).to.equal('function')
    });
    it('should return true if passed a function', function() {
      expect(TEST_UTILS.isFunction(function tester() { console.log('test'); })).to.be.true;
    });
    it('should return false if passed something other than a function', function() {
      expect(TEST_UTILS.isFunction(1)).to.be.false;
    });
  });

  describe('isInteger', function() {
    it('should exist', function() {
      expect(TEST_UTILS.isInteger).to.exist;
    });
    it('should be a function', function() {
      expect(typeof(TEST_UTILS.isInteger)).to.equal('function')
    });
    it('should return true if passed an integer', function() {
      expect(TEST_UTILS.isInteger(100)).to.be.true;
    });
    it('should return false if passed something other than an integer', function() {
      expect(TEST_UTILS.isInteger(false)).to.be.false;
      expect(TEST_UTILS.isInteger(undefined)).to.be.false;
      expect(TEST_UTILS.isInteger('100')).to.be.false;
    });
  });

  describe('isObject', function() {
    it('should exist', function() {
      expect(TEST_UTILS.isObject).to.exist;
    });
    it('should be a function', function() {
      expect(typeof(TEST_UTILS.isObject)).to.equal('function')
    });
    it('should return true if passed an object', function() {
      expect(TEST_UTILS.isObject({a:1})).to.be.true;
    });
    it('should return false if passed something other than an object', function() {
      expect(TEST_UTILS.isObject(1)).to.be.false;
    });
  });

  describe('isValidString', function() {
    it('should exist', function() {
      expect(TEST_UTILS.isValidString).to.exist;
    });
    it('should be a function', function() {
      expect(typeof(TEST_UTILS.isValidString)).to.equal('function')
    });
    it('should return true if passed a string', function() {
      expect(TEST_UTILS.isValidString('test')).to.be.true;
    });
    it('should return false if passed something other than a string', function() {
      expect(TEST_UTILS.isValidString(1)).to.be.false;
    });
    it('should return false if passed nothing', function() {
      expect(TEST_UTILS.isValidString()).to.be.false;
    });
  });

  describe('isValidArgType', function() {
    it('should exist', function() {
      expect(TEST_UTILS.isValidArgType).to.exist;
    });
    it('should be a function', function() {
      expect(typeof(TEST_UTILS.isValidArgType)).to.equal('function')
    });
    it('should return true if passed an object', function() {
      expect(TEST_UTILS.isValidArgType({a:1})).to.be.true;
    });
    it('should return true if passed a string', function() {
      expect(TEST_UTILS.isValidArgType('test')).to.be.true;
    });
    it('should return false if passed something other than an object or a string', function() {
      expect(TEST_UTILS.isValidArgType(1)).to.be.false;
    });
  });
  
  describe('randomChar', function() {
    it('should exist', function() {
      expect(TEST_UTILS.randomChar).to.exist;
    });
    it('should be a function', function() {
      expect(typeof(TEST_UTILS.randomChar)).to.equal('function')
    });
    it('should return a string', function() {
      expect(TEST_UTILS.randomChar()).to.be.a('string');
    });
    it('should return a 1 character string', function() {
      expect(TEST_UTILS.randomChar()).to.be.a('string').and.to.have.lengthOf(1);
    });
    it('should return a longer string if passed a number argument', function() {
      expect(TEST_UTILS.randomChar(2)).to.be.a('string').and.to.have.lengthOf(2);
    });
    it('should return false if the random character generated is a space', function() {
      expect(TEST_UTILS.randomChar(1, true)).to.be.false;
    });
  });
  
  describe('randomTime', function() {
    it('should exist', function() {
      expect(TEST_UTILS.randomTime).to.exist;
    });
    it('should be a function', function() {
      expect(typeof(TEST_UTILS.randomTime)).to.equal('function')
    });
    it('should return an integer', function() {
      expect(TEST_UTILS.randomTime()).to.be.a('number');
    });
    it('should return an integer if passed false', function() {
      expect(TEST_UTILS.randomTime(false)).to.be.a('number');
    });
    it('should return an integer if passed true', function() {
      expect(TEST_UTILS.randomTime(true)).to.be.a('number');
    });
    it('should return an integer if passed two parameters, one false boolean and one array', function() {
      expect(TEST_UTILS.randomTime(false, [100, 5000])).to.be.a('number');
    });
    it('should return an integer if passed two parameters, one true boolean and one array', function() {
      expect(TEST_UTILS.randomTime(true, [100, 5000])).to.be.a('number');
    });
    it('should return an integer if passed a bad parameter', function() {
      expect(TEST_UTILS.randomTime('string')).to.be.a('number');
    });
  });

});