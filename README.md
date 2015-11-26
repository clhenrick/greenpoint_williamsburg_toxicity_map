# NAG Brooklyn's Greenpoint - Williamsburg Toxicity Map
An interactive map for [Neighbors Allied For Good Growth](http://nag-brooklyn.org/) showing pollution and demographic data in the neighborhoods of Greenpoint and Williamsburg in Brooklyn, New York.

Created Summer / Fall, 2015 for [Pratt](https://www.pratt.edu/)'s [Spatial Analysis and Visualization Initiative](https://www.pratt.edu/pratt-research-and-centers/spatial-analysis-visualization-initiative/).

## Dependencies
- Node.js
- Cartodb.js
- Mapbox.js
- Bower
- jQuery
- jQuery UI
- Handlebars.js
- Normalize.css

## Installation:
Do `bower install` to download the dependencies locally.

## Data Processing in CartoDB
See the `sql/` directory for code relating to formatting the data tables in CartoDB / Postgres. 

## Creating The Basemap Tiles
Requires using [Mapbox Studio Classic](https://www.mapbox.com/mapbox-studio-classic/) and having a [MapBox account](https://www.mapbox.com/). 

**Note:** at the time of creating this project Mapbox Studio Classic was replaced by a newer version of the software titled Mapbox Studio.

The `basemap/` directory contains the necessary files to create the basemap tiles with Mapbox Studio Classic:

- `tm2/`: the files specifying the styling of the basemap's tiles.
- ~~`tm2.source/`: contains the necessary files that point to the custom data layers in `data/`.~~  
  (this folder is created by mapbox studio classic after adding the data layer (aka: `source`))
- `data/`: contains zipped ESRI Shapefiles that are required for `tm2.source/`.
- `toxicity-basemap.tm2z` the project's styles and metadata in a compressed format

## Updating Map's CartoDB Data Layers' Styles
To make the editing of CartoCSS easier for the CartoDB data layers, each layer's corresponding CartoCSS has been saved to a `.mss` file in the `mss/` directory. The `carto-to-js.js` script is then used to minify each `.mss` file and compile them into an object that is returned by the `app.cartocss` module.

### To update the CartoCSS do the following:  

1. Alter the corresponding `mss` file for the data layer in the `mss/` directory and save it.

2. Do `node carto-to-js.js` to update the `app.cartocss` module which is stored inside the file `js/carto.js`.

## Contributors:
- [Chris Henrick](https://github.com/clhenrick/)
- [Bowon Chung](https://github.com/bowon)