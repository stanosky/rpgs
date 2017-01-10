'use strict'
const expect = require('chai').expect
const Utils = require('../src/rpgs/core/Utils')

describe('Given an instance of Utils', function() {
  let array;

  beforeEach(function() {
    array = [];
    for (var i = 0; i < 10; i++) {
      array[i] = {getId: function () {return this.id},id:i};
    }
  });

  describe('#getUUID()', function() {
    it('should generate Universally Unique ID',() => {
      expect(Utils.getUUID()).to.be.not.equal(Utils.getUUID())
    });
  });

  describe('#indexOfObject(array, obj)',function() {
    it('should return proper index of obj3 in array', function() {
      let obj3 = array[2];
      expect(Utils.indexOfObject(array,obj3)).to.be.equal(2);
    });
    it('should return -1 if object is not part of an array', function() {
      expect(Utils.indexOfObject(array,new Object())).to.be.equal(-1);
    });
  });

  describe('#getIndexById(array, id)',function() {
    it('should return proper index of obj5 in array', function() {
      expect(Utils.getIndexById(array, 4)).to.be.equal(4);
    });
    it('should return -1 if object with wrong id is not part of an array', function() {
      expect(Utils.getIndexById(array, 'not exist')).to.be.equal(-1);
    });
  });

  describe('#addObjectToArray(array, obj)', function() {
    it('should add new object to an array', function() {
      let obj = new Object();
      Utils.addObjectToArray(array,obj);
      expect(array[array.length - 1]).to.be.equal(obj);
    });
    it('should not add object if its instance is already present in array', function() {
      let obj = array[4];
      Utils.addObjectToArray(array,obj);
      expect(array[array.length - 1]).to.be.not.equal(obj);
    });
  });

  describe('#removeObjectFromArray(array, obj)', function() {
    it('should remove passed object from an array', function() {
      let arrLen = array.length;
      let obj = array[0];
      Utils.removeObjectFromArray(array, obj);
      expect(array[0]).to.be.not.equal(obj);
      expect(array.length).to.be.equal(arrLen - 1);
    });
  });
});
