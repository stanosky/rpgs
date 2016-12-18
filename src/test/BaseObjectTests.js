"use strict";
import BaseNode from 'rpgs/core/BaseNode';
import expect from 'chai';

describe('BaseNode', function() {
  let obj = new BaseNode();
  it('should exist', function() {
      expect(obj).to.not.be.undefined;
  });
};
