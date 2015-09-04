# Greenpoint - Williamsburg Toxicity Map
An interactive map for The Nag showing pollution and demographic data in the neighborhoods of Greenpoint and Williamsburg in Brooklyn, New York.

## Dependencies
- Mapbox.js
- Cartodb.js
- jQuery
- Handlebars.js

## Installation:
- `bower install`

## Updating Map Data Layers Styles
1. Alter the corresponding `mss` file for the data layer in the `mss/` directory.

2. Do `node carto-to-js.js` to update the app.cartocss module in `js/carto.js`

## Contributors:
- Bowon Chung
- [Chris Henrick](http://chrishenrick.com) / [@clhenrick](https://github.com/clhenrick/)