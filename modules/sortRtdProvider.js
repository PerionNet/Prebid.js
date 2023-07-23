import * as utils from '../src/utils.js';
import {submodule} from '../src/hook.js';
import {ajax} from '../src/ajax.js';

export let sortTargeting = {};

/** @type {RtdSubmodule} */
export const sortSubModule = {
  name: 'sort',
  init: init,
  getBidRequestData: getBidRequestData,
  getTargetingData: getTargetingData
};

function init(config, userConsent) {
  const params = config.params;
  if (!params || !params.accountId || !params.cc) {
    utils.logError('missing accountId or cc param for sort provider');
    return false;
  }
  return true;
}

function getSortData(config) {
  return new Promise((resolve, reject) => {
    const requestOptions = {
      method: 'GET'
    }
    const callbacks = {
      success(responseText, response) {
        resolve({'sort': responseText});
      },
      error(error) {
        reject(error);
      }
    };
    const url = 'https://ads.undertone.com/sort?accountid=' + config.params.accountId + '&cc=' + config.params.cc;
    ajax(url, callbacks, null, requestOptions)
  })
}
function getBidRequestData(reqBidsConfigObj, callback, config) {
  try {
    getSortData(config)
      .then((response) => {
        sortTargeting = response;
        utils.logInfo('SORT targeting', sortTargeting);
        callback();
      })
      .catch((err) => {
        sortTargeting = {'sort': '-2'};
        utils.logError(err);
        callback();
      });
  } catch (err) {
    utils.logError('get sort data failed', err);
  }
}

function getTargetingData(adUnits, config, userConsent) {
  const targeting = {};
  adUnits.forEach(function (adUnit) {
    targeting[adUnit] = sortTargeting;
  });
  utils.logInfo('SORT targeting', targeting);
  return targeting;
}

submodule('realTimeData', sortSubModule);
