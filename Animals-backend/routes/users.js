var express = require('express');
var router = express.Router();
var User = require('../models/User');
const authUser = require('../middleware/auth')

router.post('/', async (req, res) => {
  const {login, password} = req.body;

  try {
    const user = await User.create({login, password});
    const token = await user.generateAuthToken();
    res.status(201).json({user, token});
  } catch (error) {
    let msg;
    if(error.code == 11000) {
      msg= 'Login already exists';
    } else {
      msg = error.message;
    }
    res.status(400).json(msg)
  }
})

router.post('/login', async(req, res) => {
  const {login, password} = req.body;
  try {
    const user = await User.findByCredentails(login, password);
    const token = await user.generateAuthToken();
    res.json({user, token})
  } catch (e) {
    res.status(400).json(e.message);
  }
})

router.delete('/logout', authUser, async(req, res)=> {
try {
  req.user.tokens = req.user.tokens.filter((tokenObj)=> {
    return tokenObj.token !== req.token;
  })
  await req.user.save();
  res.status(200).send();
} catch (e) {
  res.status(400).json(e.message);
}
})

module.exports = router;
