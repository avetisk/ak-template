ak-template
===========

Micro-template engine.

Using [John Resig's micro-template specs](http://ejohn.org/blog/javascript-micro-templating/).

# API

## `template(str)`

### description

Returns compiled template.

N.B: templates are cached.

### arguments

- **`str`** *String*

String representing the template.

Using [John Resig's micro-template format](http://ejohn.org/blog/javascript-micro-templating/).

### return

`function (locals) {}`

You can pass an `Object` as a parameter, it will be accessible within the template through the variable `locals`.

See exemple for more details.

## `template.globals` *Object*

Define globals: keys are defaulted with locals.

Think of it more as global defaults. Useful for sharing helper functions.

See example for more details.

## `template.escape(str)`

Escape function, replaces `<`, `>`, `&`, `"`, `'` by their equivalent HTML entity.

Can be overridden.

# Example

```javascript
var template = require('ak-template');
template.globals.title = 'JavaScript FTW!';
template.globals.upper = function (str) {
  return (str + '').toUpperCase();
};

// replace 
template('<h1><%- locals.title %></h1>') // -> [Function]
template('<h1><%- locals.title %></h1>')(); // -> <h1>JavaScript FTW!</h1>
template('<h1><%- locals.title %></h1>')({'title': 'JavaScript is awesome!'}); // -> <h1>JavaScript is awesome!</h1>
template('<h1><%- locals.upper(locals.title) %></h1>')({'title': 'JavaScript is awesome!'}); // -> <h1>JAVASCRIPT IS AWESOME!</h1>

// using plain JS
template('<% if (locals.foo) { %><h1>Foo</h1><% } else { %><h2>Bar</h2><% } %>')({'foo': true}); // -> <h1>Foo</h1>
template('<% if (locals.foo) { %><h1>Foo</h1><% } else { %><h2>Bar</h2><% } %>')(); // -> <h2>Bar</h2>

// escape
template('<%- locals.word %>')({'word': '<script>do_evil()</script>'}); // -> &lt;script&gtdo_evil()&lt;/script&gt
template('<%= locals.word %>')({'word': '<script>do_evil()</script>'}); // -> <script>do_evil()</script>

template.escape = function (str) {
  return str.toUpperCase();
};

template('<%- locals.word %>')({'word': '<script>do_evil()</script>'}); // -> <SCRIPT>DO_EVIL()</SCRIPT>
template('<%= locals.word %>')({'word': '<script>do_evil()</script>'}); // -> <script>do_evil()</script>
```

# Why `locals` and not using `with`?

`with` is [evil](http://www.seejohncode.com/2012/04/11/javascript-with-and-why-you-shouldnt-use-it/).
