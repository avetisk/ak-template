'use strict';

/**
 * Dependencies
 */
var defaults = require('stluafed');

/**
 * Export `template`
 *
 * @param {String} str
 * @return {Function}
 */
var template = module.exports = function (str) {
  var tpl = template.cache[str];

  if (tpl) {
    return tpl;
  }

  /*jshint evil: true, quotmark: false*/
  tpl = (new Function(
    'locals',
    'locals = this.defaults(locals || {}, this.globals);' +
    'var __p = [];' +
    '__p.push(\'' +
    str.replace(/[\r\t\n]/g, ' ')
      .replace(/'(?=[^%]*%>)/g, "\t")
      .split('\'').join('\\\'')
      .split("\t").join('\'')
      .replace(/<%=(.+?)%>/g, '\',$1,\'')
      .replace(/<%-(.+?)%>/g, '\',this.escape($1),\'')
      .split('<%').join('\');')
      .split('%>').join('__p.push(\'') +
    '\');return __p.join(\'\');'
  )).bind({
    'defaults': defaults,
    'globals': template.globals,
    'escape': template.escape
  });

  template.cache[str] = tpl;

  return tpl;
};

/**
 * Globals merged into `locals`
 */
template.globals = {};

/**
 * Cache
 */
template.cache = {};

/**
 * Escape function for <%- variable %>, can be overridden (default escape HTML)
 *
 * @param {String} str
 * @return {Function}
 */
template.escape = function (str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39');
};
