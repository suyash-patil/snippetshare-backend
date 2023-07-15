const express = require('express');
const router = express.Router();
const expressAsyncHandler = require('express-async-handler');
const UserModel = require('../models/user');

router.route('/register').post(expressAsyncHandler(async (req, res) => {
    const {email, password, username} = req.body;

    const userAlreadyExist = await UserModel.findOne({ email: email });
    const usernameExist = await UserModel.findOne({username: username});

    if(userAlreadyExist) {
        res.status(401);
        throw new Error('User with this email already exists');
    }

    else if(usernameExist) {
        res.status(401);
        throw new Error('User with this username already exists');
    }
    else {
        const user = await UserModel.create({
            email,
            password,
            username,
            snippets: [],
            viewSnippets: [],
            editSnippets: [],
        });
        if (user) {
            res.status(201).json({
              _id: user._id,
              name: user.email,
              username: user.username,
              snippets: [],
              viewSnippets: [],
              editSnippets: [],
              createdAt: user.createdAt,
              updatedAt: user.updatedAt
            });
          }
          else {
            res.json(401);
            throw new Error('Invalid Email and Password');
          }
    }

}));

router.route('/login').post(expressAsyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const user = await UserModel.findOne({email: email});

    if(user && await user.matchPass(password)){
        res.json({
            _id: user._id,
            email: user.email,
            username: user.username,
            snippets: user.snippets,
            viewSnippets: user.viewSnippets,
            editSnippets: user.editSnippets,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
          })
      } else {
        res.json(401);
        throw new Error('Invalid Email and Password');
    }
    

}));

module.exports = router;