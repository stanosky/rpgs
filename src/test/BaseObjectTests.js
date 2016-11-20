"use strict";
import BaseObject from 'rpgs/core/BaseObject';
import expect from 'chai';

describe('BaseObject', function() {
  let obj = new BaseObject();
  it('should exist', function() {
      expect(obj).to.not.be.undefined;
  });
};
