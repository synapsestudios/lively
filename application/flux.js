'use strict';

var Fluxxor = require('fluxxor');
var stores  = require('./stores');
var actions = require('./actions');

module.exports = new Fluxxor.Flux(stores, actions);
