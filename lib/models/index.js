const fs = require('fs'),
  path = require('path'),
  sequelize = require('../database'),
  _ = require('lodash'),
  db = {
    _namespace: {
    }
  };

const dirFilter = dirname => f => fs.lstatSync(path.join(dirname, f)).isDirectory();

function importModels(dirname) {
  // Import js files
  fs
  .readdirSync(dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
  .filter(_.negate(dirFilter(dirname)))
  .forEach(file => {
    const filePath = path.join(dirname, file),
      filePathRequired = require(filePath);

    // import model
    let model;
    if (typeof filePathRequired === 'function' && typeof filePathRequired.init === 'function') {
      filePathRequired.init(sequelize);
      model = filePathRequired;
    } else {
      model = sequelize.import(filePath);
    }

    // Add model reference in export
    db[model.name] = model;

    // Add namespacing
    const dirBasePath = path.basename(dirname);
    if (!db._namespace[dirBasePath]) db._namespace[dirBasePath] = {};

    db._namespace[dirBasePath][model.name] = model;
  });
}

const subdirs = fs
  .readdirSync(__dirname)
  .filter(dirFilter(__dirname))
  .map(d => path.join(__dirname, d));

// Import models in subdirs and root dir
subdirs.concat([__dirname]).forEach(dir => importModels(dir));

db.Sequelize = db.sequelize = sequelize;

module.exports = db;


