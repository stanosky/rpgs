"use strict";
import UniqueObject from 'rpgs/core/UniqueObject';
import expect from 'chai';

describe('UniqueObject', function() {
  let obj = new UniqueObject();
  it('should exist', function() {
      expect(obj).to.not.be.undefined;
  });
};
