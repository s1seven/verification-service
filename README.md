# STEEL but SMART
[![CircleCI](https://circleci.com/gh/steelbutsmart/steelbutsmart-mvp/tree/master.svg?style=svg&circle-token=7257289c6f3dad71f2d42e30c8883ec04fc571fd)](https://circleci.com/gh/steelbutsmart/steelbutsmart-mvp/tree/master)

## Starting app

* Install dependencies `yarn`
* Build all by running `yarn build`
* Start postgres and BigchainDB containers `yarn workspace steelbutsmart-mvp-backend docker:test:infra` or set environment variables:
    * `DATABASE_URL` postgres url in e.g. `username://postgres@localhost:5433/database_name`
    * `BIGCHAINDB_URL` BigchainDB API url e.g. `https://ipdb-eu2.riddleandcode.com/api/v1/` (note: URL should include `/api/v1/` part)
* Start app `yarn workspace steelbutsmart-mvp-backend start`
* Go to `localhost:3000`, the app should be running

## Testing
* Install dependencies `yarn`
* Build all by running `yarn build`
* Start containers `yarn workspace steelbutsmart-mvp-backend docker:test:infra`
* Run unit tests `yarn test`
* Run e2e tests `yarn workspace steelbutsmart-mvp-backend e2e:open`

## Heroku integration
Master branch is deployed automatically. 

To clear staging database, run `heroku run trunc-db --app sbs-mvp-staging`

## BigchainDB GUI

1. Go to https://artus.github.io/bigchaindb-snooper/
1. Click the gear icon
1. Enter https://test.ipdb.io as the URL and click "Apply"

You can now search for assets/transactions by their hash, eg. 34f06caaaadbe8ac68ce9a3127354c7de4a13b744ca89c843033edc1d683964c.
