var lodash = require('lodash');
var util = require('../lib/util');

module.exports = {

  name: 'Assignment Comparison',

  description: 'Benchmarks of Object.assign() vs Lodash.assign()',

  enable: function () {
    return util.isES6();
  },

  setup: function () {
    return {
      left: {
        a: 1, b: 2, c: 3
      },
      right: {
        a: 4, b: 5, c: 6, d: 7
      }
    }
  },

  options: function () {
    return { async: false };
  },

  exec: function (suite, ctx) {
    suite
      .add('Object#assign', function () {
        Object.assign({}, ctx.left, ctx.right);
      })
      .add('Lodash#assign', function () {
        lodash.assign({}, ctx.left, ctx.right);
      });
  }

};
