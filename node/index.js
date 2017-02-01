var _ = require('lodash');
var bench = require('benchmark');
var fs = require('fs');
var path = require('path');

/* Requirement */

var root;
var suites = [];

if (process.argv.length > 2) {
  root = path.resolve(__dirname);
  process.argv.slice(2).forEach(_includeFile);
} else {
  root = path.join(__dirname, 'bench');
  fs.readdirSync(root).forEach(_includeFile);
}

if (!suites.length) {
  return;
}

/* Execution */

suites.forEach(function (suite) {
  var swt  = new bench.Suite();
  var ctx  = suite.setup();
  var opts = suite.options();
  var desc = suite.description();
  var name = suite.name();

  console.log('Suite: ' + name);
  desc && console.log('Description: ' + desc);
  console.log('');

  suite.exec(swt, ctx);

  if (!swt.events || !swt.events.cycle) {
    swt.on('cycle', function(event) {
      console.log(String(event.target));
    });
  }

  swt.run(opts);

  console.log('');
});

/* Private */

function _includeFile(file) {
  file = path.join(root, file);

  var mod = require(file);
  var sanitized = _sanitize(mod, file);

  if (sanitized.enable()) {
    suites.push(sanitized);
  }
}

function _sanitize(mod, file) {
  mod = _.cloneDeep(mod);
  mod.file = file;

  _defaultBind(mod, 'name', null);
  _defaultBind(mod, 'description', null);
  _defaultBind(mod, 'enable', true);
  _defaultBind(mod, 'setup', {});
  _defaultBind(mod, 'options', {});
  _defaultBind(mod, 'exec', function (suite) {
    return suite;
  });

  if (mod.name() === null) {
    mod.name = function () {
      return path.basename(mod.file, '.js');
    };
  }

  return mod;
}

function _defaultBind(mod, field, def) {
  if (mod[field] === undefined) {
    mod[field] = def;
  }
  if (typeof mod[field] !== 'function') {
    var tmp = mod[field];
    mod[field] = function () {
      return tmp;
    }
  }
}
