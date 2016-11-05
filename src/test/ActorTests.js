"use strict";
const Actor = require('../js/rpgs/actors/Actor.js');
const expect = require('chai').expect;

describe('Actor', function() {
    let testActor = new Actor();
    it('should exist', function() {
        expect(testActor).to.not.be.undefined;
    });
    it('should have null name',function(){
        expect(testActor.getName()).to.eql('');
    });
    it('should set name', function(){
        let name = 'Adam';
        testActor.setName(name);
        expect(testActor.getName()).to.eql(name);
    });

});
