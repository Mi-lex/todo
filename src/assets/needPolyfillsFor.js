/**
 * Some polyfills need to be included for react.
 * Babel "useBuiltIns": "usage" won't work
 * becouse the polyfills need to be loaded before React does.
 * 'usage' property also prevents explicit polyfills declaration
 * in .babelrc (i.e. )
 */

import 'core-js/es6/map';
import 'core-js/es6/set';
