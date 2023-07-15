const express = require('express');
const router = express.Router();
const expressAsyncHandler = require('express-async-handler');
const SnippetModel = require('../models/snippets');

router.route('/create_snippet').post(expressAsyncHandler(async (req, res) => {
    const {title, snippet, _id} = req.body;

    const newSnippet = await SnippetModel.create({
        title,
        snippet,
        user: _id,
        canView: [_id],
        canEdit: [_id],
    });
    if (newSnippet) {
        res.status(201).json({
          _id: newSnippet._id,
          title: newSnippet.title,
          snippet: newSnippet.snippet,
          canView: newSnippet.canView,
          canEdit: newSnippet.canEdit,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        });
      }
      else {
        res.json(401);
        throw new Error('Invalid Email and Password');
      }
}));

router.route('/getAll').get(expressAsyncHandler(async (req, res) => {
    const snippets = await SnippetModel.find({});
    if(snippets) {
        res.json(snippets);
    } else {
        throw new Error('Snippets are not fetched! Try again later')
    }
}));

router.route('/:id').get(expressAsyncHandler(async (req, res) => {
    const snippet = await SnippetModel.findById({id: req.params.id});
    if(snippet) {
        res.json(snippet);
    } else {
        throw new Error('You cannot view this snippet! Please contact the owner for access');
    }
}))


module.exports = router;