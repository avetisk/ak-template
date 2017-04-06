/*global describe, it*/

'use strict';

var template = process.env.AK_TEMPLATE_TEST_COVERAGE ? require('../lib-cov/template') : require('../');
var assert = require('assert');

describe('template', function () {
  it('should compile', function (done) {
    var tpl = template('<div><%= locals.hari %></div>');

    assert(tpl instanceof Function);

    done();
  });

  it('should render variable', function (done) {
    var tpl = template('<div><%= locals.hari %></div>');

    assert(tpl instanceof Function);

    var html = tpl({'hari': 'Hari Bol !'});

    assert.equal(html, '<div>Hari Bol !</div>');

    done();
  });

  it('should render without variable', function (done) {
    var tpl = template('<div>Empty.</div>');

    assert(tpl instanceof Function);

    var html = tpl();

    assert.equal(html, '<div>Empty.</div>');

    done();
  });

  it('should render script', function (done) {
    var tpl = template(
      /*jshint quotmark: false*/
      '<div><% for (var i = 0; i < locals.len; i += 1) { %>\n<span><%= i %></span><% } %></div>'
    );

    assert(tpl instanceof Function);

    var html = tpl({'len': 5});

    assert.equal(html, '<div> <span>0</span> <span>1</span> <span>2</span> <span>3</span> <span>4</span></div>');

    done();
  });

  it('should defaults global locals', function (done) {
    template.globals['hari'] = 'Hari';
    template.globals['bol'] = 'Bol !';

    var tpl = template('<div><%= locals.hari %> <%= locals.bol %></div>');
    var html = tpl();

    assert.equal(html, '<div>Hari Bol !</div>');

    html = tpl({'hari': 'Govinda', 'bol': 'Hari !'});

    assert.equal(html, '<div>Govinda Hari !</div>');

    done();
  });

  it('should escape <%- variable %>', function (done) {
    var tpl = template('<div><%- locals.hari %><%- locals.number %></div>');
    var inject = '<script>alert("\'&")</script>';

    var html = tpl({
      'hari': inject,
      'number': 123
    });

    assert.equal(html, '<div>&lt;script&gtalert(&quot;&#39;&amp;&quot;)&lt;/script&gt123</div>');

    done();
  });
});
