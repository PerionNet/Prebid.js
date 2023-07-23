import { sortSubModule } from 'modules/sortRtdProvider.js';
import { expect } from 'chai';
import {server} from '../../mocks/xhr';

describe('sortRtdProvider is a RTD provider that', function () {
  it('has the correct module name', function () {
    expect(sortSubModule.name).to.equal('sort');
  });
  describe('has a method `init` that', function () {
    it('exists', function () {
      expect(sortSubModule.init).to.be.a('function');
    });
    it('returns false missing config params', function () {
      const config = {
        name: 'sort',
        waitForIt: true,
      };
      const value = sortSubModule.init(config);
      expect(value).to.equal(false);
    });
    it('returns false missing accountId param', function () {
      const config = {
        name: 'sort',
        waitForIt: true,
        params: {}
      };
      const value = sortSubModule.init(config);
      expect(value).to.equal(false);
    });
    it('returns false with only the accountId param', function () {
      const config = {
        name: 'sort',
        waitForIt: true,
        params: {
          accountId: '123456'
        }
      };
      const value = sortSubModule.init(config);
      expect(value).to.equal(false);
    });
    it('returns true with the accountId and cc params', function () {
      const config = {
        name: 'sort',
        waitForIt: true,
        params: {
          accountId: '123456',
          cc: 'sdfUIH1jMNB98XDFcbvsd'
        }
      };
      const value = sortSubModule.init(config);
      expect(value).to.equal(true);
    });
    it('returns false with the accountId and cc params with empty values', function () {
      const config = {
        name: 'sort',
        waitForIt: true,
        params: {
          accountId: '',
          cc: '',
        }
      };
      const value = sortSubModule.init(config);
      expect(value).to.equal(false);
    });
  });

  describe('has a method `getBidRequestData` that', function () {
    it('exists', function () {
      expect(sortSubModule.getBidRequestData).to.be.a('function');
    });
    it('verify config params', function () {
      expect(config.name).to.not.be.undefined;
      expect(config.name).to.equal('sort');
      expect(config.params.accountId).to.not.be.undefined;
      expect(config.params).to.have.property('accountId');
      expect(config.params.cc).to.not.be.undefined;
      expect(config.params).to.have.property('cc');
    });
    it('invoke method', function () {
      const callback = sinon.spy();
      let request;
      const adUnitsOriginal = adUnits;
      sortSubModule.getBidRequestData({ adUnits: adUnits }, callback, config);
      request = server.requests[0];
      request.respond(200, {}, JSON.stringify(data));
      expect(adUnits).to.length(2);
      expect(adUnits[0]).to.be.eq(adUnitsOriginal[0]);
      setTimeout(() => {
        expect(callback.calledOnce).to.be.true
      }, 100)
    });
  });

  describe('has a method `getTargetingData` that', function () {
    it('exists', function () {
      expect(sortSubModule.getTargetingData).to.be.a('function');
    });
    describe('invoke method', function () {
      it('returns a targeting object with the right shape', function () {
        const targeting = sortSubModule.getTargetingData(adUnitsCode, config);
        expect(adUnitsCode).to.length(2);
        expect(targeting).to.be.not.null;
        expect(targeting).to.be.not.empty;
        expect(targeting['slotA']).to.be.not.null;
        expect(targeting['slotB']).to.be.not.null;
      });
      it('returns the right keys', function () {
        setTimeout(() => {
          const targeting = sortSubModule.getTargetingData(adUnitsCode, config);
          const targetingKeysA = Object.keys(targeting['slotA']);
          const targetingKeysB = Object.keys(targeting['slotB']);
          expect(targetingKeysA.length).to.equal(1);
          expect(targetingKeysA).to.include('sort', 'sort key missing from the targeting object');
          expect(targetingKeysB.length).to.equal(1);
          expect(targetingKeysB).to.include('sort', 'sort key missing from the targeting object');
        }, 100);
      });
      it('returns the right values', function () {
        setTimeout(() => {
          const targeting = sortSubModule.getTargetingData(adUnitsCode, config);
          const slotAValue = targeting['slotA'].sort;
          const slotBValue = (targeting['slotB']).sort;
          expect(slotAValue).to.equal('24');
          expect(slotBValue).to.equal('24');
        }, 100);
      });
    })
  });
});

const config = {
  name: 'sort',
  waitForIt: true,
  params: {
    accountId: 1234,
    cc: 'sdfUIH1jMNB98XDFcbvsd'
  }
};

const adUnitsCode = ['slotA', 'slotB'];
const adUnits = [
  {
    code: 'slotA',
    mediaTypes: {
      banner: {
        sizes: [970, 250]
      }
    },
    bids: [
      {
        bidder: 'appnexus',
        params: {
          placementId: 12345370,
        }
      }]
  },
  {
    code: 'slotB',
    mediaTypes: {
      banner: { sizes: [300, 250] }
    },
    bids: [
      {
        bidder: 'appnexus',
        params: {
          placementId: 12345370,
        }
      }]
  }];

const data = 24;
