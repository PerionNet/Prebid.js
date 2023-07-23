# Overview

Module Name: SORT Rtd Provider
Module Type: Rtd Provider
Maintainer: kereng@perion.com

# Description

The SORT RTD module provides Smart Group ID for the page.
To use this module, you’ll need to work with [Perion](https://perion.com/) to get an account and receive instructions on how to set up your pages and ad server.

# Integration

1) Build the SORT RTD module into the Prebid.js package with:

```
gulp build --modules=sortRtdProvider
```

# Configurations

2) Enable SORT Real Time Module using `pbjs.setConfig`

```javascript
pbjs.setConfig({
    realTimeData: {
      auctionDelay: 100,
      dataProviders: [{
            name: 'sort',
            waitForIt: true,
            params: {
                accountId: '123456',
                cc: 'sdfUIH1jMNB98XDFcbvsd'
            }
        }]
    }
});
```
