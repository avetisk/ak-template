module.exports = process.env.TEST_COVERAGE ? require('./lib-cov/template') : require('./lib/template');
