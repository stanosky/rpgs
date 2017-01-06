import chai from 'chai';
import RPGSystem from '../lib/rpgs.min.js';

chai.expect();

const expect = chai.expect;

let lib;

describe('Given an instance of my library', function () {
  before(function () {
    lib = new RPGSystem();
  });
  describe('when I need the name', function () {
    it('should return the name', () => {
      expect(lib.findNode('')).to.be.equal(null);
    });
  });
});
