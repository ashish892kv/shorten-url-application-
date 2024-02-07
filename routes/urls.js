const express = require("express");
const {
  body,
  validationResult
} = require('express-validator');
const Urls = require("../models/urls");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.post("/url", [body('url').isURL()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) 
  {
    return res.status(422).send("invalid input");
  }
  try 
  {
    let url = await Urls.findOne({
      url: req.body.url,
    });
    if (url) 
    {
      res.send(`${req.headers.origin}/sh/${url.short}`);
    } 
    else 
    {
      url = new Urls({
        url: req.body.url,
      });
      await url.save();
      res.send(`${req.headers.origin}/sh/${url.short}`);
    }
  } 
  catch (e) 
  {
    res.status(500).send(e);
  }
});

router.get('/sh/:id', async (req, res) => {
  try {
    const url = await Urls.findOne({
      short: req.params.id
    });
    if (url) {
      res.redirect(url.url);
    } else {
      res.status(404).send("not found");
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
