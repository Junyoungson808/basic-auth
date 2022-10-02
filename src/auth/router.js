'use strict';

const express = require('express');
const router = express.router();
const { users } = require('../auth/models/index');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const basicAuth = require('./middleware/basic');

router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.post('/signup', async (req, res, next) => {
  try {
    let { username, password } = req.body;
    let encryptedPassword = await bcrypt.hash(password, 10);
    let user = await users.create({
      username,
      password: encryptedPassword,
    });
    console.log('user', user);
    res.status(201).send(user);
  } catch (e) {
    next('Sign Up Error Occured');
  }
});

router.post('/signin', basicAuth, async (req, res, next) => {

  let basicHeaderParts = req.headers.authorization.split(' ');  // ['Basic', 'sdkjdsljd=']
  let encodedString = basicHeaderParts.pop();  // sdkjdsljd=
  let decodedString = base64.decode(encodedString); // "username:password"
  let [username, password] = decodedString.split(':'); // username, password

  try {
    const user = await users.findOne({ where: { username: username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      res.status(200).json(user);
    } else {
      throw new Error('Invalid User');
    }
  } catch (error) { res.status(403).send('Invalid Login'); }
});

module.exports = router;