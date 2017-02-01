# benches/node

### Running

Basic runner exists at the moment, you can invoke using `index.js`:

```bash
# runs only bench/suite_1.js and bench/suite_2.js (if enabled)
$ node index.js bench/suite_1.js bench/suite_2.js

# runs all enabled suites
$ node index.js 
```

### Definition

Super easy to define a benchmark, just create a file in `bench/` exporting a suite.

All benchmarks are created via [benchmark](https://github.com/bestiejs/benchmark.js), so their options and features apply.

```javascript
module.exports = {

  // optional, default is the file name
  name: 'Name of my suite',

  // optional, default is empty
  description: 'Description of my suite',

  // optional, default is true
  // if return truthy, enable this benchmark
  // can also be a raw value (evaluated with !!)
  enable: function () {
    return true;
  },

  // optional, default is {}
  // returned value passed to exec() as `ctx`
  // can also be a raw value
  setup: function () {
    return { }
  },

  // optional, default is {}
  // returned value passed to benchmark options
  // can also be a raw value
  options: function () {
    return { };
  },

  // suite execution, modify the passed in suite
  // ctx is equivalent to return of setup()
  exec: function (suite, ctx) {
    suite
      .add('startsWith', function () {
        return 'test'.startsWith('t');
      })
      .add('slice', function () {
        return 'test'.slice(0, 1) === 't';
      });
  }

};

```
