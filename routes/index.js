var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

/* GET home page. */
/* router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
 */

mongoose.connect("mongodb+srv://admin-alonzo:test123@cluster0-gwd9g.mongodb.net/studyDB", {
        useNewUrlParser: true
    }).catch(function(err){
        console.log(err)
    })

  const Schema = mongoose.Schema;
  const cardSchema = new Schema({
      verses: String,
      scripture: String,
      gem: String,
  })
  const Card = mongoose.model("Card", cardSchema)

router.get("/", function(req, res, next){
  Card.find({}, function(err, card){
    if(!err){
      console.log(card);
      res.render('index', {
        cardList: card
      })
    } else {
      console.log(err)
    }
  })
})

router.get("/create", function(req, res, next){

  res.render("create")
})

router.post("/create", function(req, res, next){
  const card = new Card({
    verses: req.body.verses,
    scripture: req.body.scriptures,
    gem: req.body.gemList
  })
  card.save()
  console.log(card.errors)
  res.redirect("/")
})

module.exports = router;
