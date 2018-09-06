let filename = process.argv[2];
let type = process.argv[3]; // Type: 'serve', 'build', 'major', 'minor', 'patch'
let moment = require('moment');
let fs = require('fs');

// Default values
function getDefault() {
  return {
    version: '0.0.0',
    timestamp: getTimestamp(),
  };
}

// Get MomentJS timestamp
function getTimestamp() {
  return moment().format('YYYY-MM-DDTHH:mm:ss');
}

// Increase App Version
function increaseVersion(version, type = 'patch') {
  let splitVersion = version.split('.');
  let number;

  switch (type) {
    case 'major':
      number = parseInt(splitVersion[0], 10);
      number++; // Increase major version
      splitVersion[0] = number;
      break;
    case 'minor':
      number = parseInt(splitVersion[1], 10);
      number++;
      splitVersion[1] = number;
      break;
    case 'patch':
    default:
      number = parseInt(splitVersion[2], 10);
      number++; // Increase patch version
      splitVersion[2] = number;
      break;
  }

  return splitVersion.join('.');
}

// Stringify JSON
function stringify(file) {
  return JSON.stringify(file, null, 2); // Pretty JSON
}

// Check for undefined
function isUndefined(obj) {
  return typeof obj === "undefined";
}

// Continue only if there's
// a filename defined
if (! isUndefined(filename) && ! isUndefined(type)) {

  // Serve Mode
  if (type === 'serve') {

    // Check if file exists, if not
    // create the first version
    fs.exists(filename, (exists) => {
      if (! exists) {

        // Default values
        let file = getDefault();

        // Save File
        fs.writeFile(filename, stringify(file), (err) => {
          if (err) {
            return console.log(err);
          }
        });
      }
    });
  }

  // Build Mode
  else {

    // Check if file exists, if not
    // create it and if exists increate
    // the current version and timestamp
    fs.exists(filename, (exists) => {

      // Default values
      let file = getDefault();

      if (exists) {

        // Get current values
        file = require(filename);

        // Update values
        file = {
          version: increaseVersion(file.version, type), // Increase Version
          timestamp: getTimestamp(), // Update Timestamp
        };
      }

      // Save File
      fs.writeFile(filename, stringify(file), (err) => {
        if (err) {
          return console.log(err);
        }

        console.log('========== Build version set to ' + file.version + ' ==========');
      });
    });
  }
}
