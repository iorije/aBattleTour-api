'use strict';

//their modules
var session = require('client-sessions');

module.exports.sessionCookie = session({
    cookieName: 'session',
    secret: '$2a$10$Q5r3xVuKW3Nh9/NS0aCrHOXZYGgJ3xtDI193ISgIb8GkEj2AQK7IQi',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
});
