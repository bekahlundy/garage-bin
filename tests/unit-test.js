const expect = require('chai').expect;
const should = require('chai').should;
const jsdom = require('mocha-jsdom')
const {sortUp, sortDown} = require('../public/index.js');

describe('Unit Tests', () => {
  jsdom()

  before(() => {
    $ = require('jquery')
    fetch = require('fetch')
  })

  it('should sortUp', () => {
      expect(sortUp(list)).to.equal(1)
    })
})
