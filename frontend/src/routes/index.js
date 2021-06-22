'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);

module.exports = app => {
  fs
      .readdirSync(__dirname)
      .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
      })
      .forEach(file => {
        const route = require(path.join(__dirname, file));
        switch (typeof route) {
          case 'function':
            route(app);
            break;
          case 'object':
            console.log(file);
            app.use(route);
            break;
        }
      })
};
