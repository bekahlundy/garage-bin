const expect = require('chai').expect;
const should = require('chai').should;
const jsdom = require('mocha-jsdom')
const {sortUp, sortDown, clearList, clearPopUp, countArrayLengths} = require('../public/index.js');

// these tests ARE ALL mocked out and not working. I tried many different ways to get these to work, but could not figure it out. It was always an error that failed everything, not just one test. My server tests are all passing however

describe('Unit Tests', () => {
  jsdom()

  before(() => {
    $ = require('jquery')
    fetch = require('fetch')
  })

  it('should sortUp', () => {
    list = {
      'soccer', 'bike', 'toys'
    }
      expect(sortUp(list)).to.equal({'bike', 'soccer', 'toys'})
  })

  it('should sortDown', () => {
    list = {
      'soccer', 'bike', 'toys'
    }
      expect(sortUp()).to.equal({'toys', 'soccer', 'bike'})
  })

  it('should clearList', () => {
    itemlist = {
      'soccer', 'bike', 'toys'
    }
      expect(clearList(itemList)).to.equal('')
  })

  it('should clearPopUp', () => {
    info = {
      'soccer', 'bike', 'toys'
    }
      expect(clearList(info)).to.equal('')
  })

  it('should countArrayLengths', () => {
        sparklingArr = ['sparkling']
        dustyArr = ['dusty']
        rancidArr = ['rancid']

      expect(countArrayLengths(sparklingArr, dustyArr, rancidArr)).to.equal(3)
  })

})
