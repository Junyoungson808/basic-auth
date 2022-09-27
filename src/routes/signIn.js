'use strict';

const express = require('express');
const {  } = require('../models');

const router = express.Router();

router.post('/signin', async (req, res, next) => {
  let customers = await.read();
  res.status(200).send(customers);
});



module.exports = router;
