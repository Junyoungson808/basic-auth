'use strict';

module.exports = function logger (req, res, next){
  console.log(`REQUEST: ${req.method}, ${req.originalUrl}`);
  next();
};

