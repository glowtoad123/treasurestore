var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

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

router.get("/card/:verses", function(req, res, next){
  Card.findOne({verses: req.params.verses}, function(err, card){ 
    if(!err){
      res.render("card", {
          card: card
      })
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

router.get("/edit/:id", function(req, res, next){
  Card.findById(req.params.id, function(err, card){
    if(!err){
      res.render("edit", {
        card: card
      })
    }
  })
})

router.post("/edit/:id", function(req, res, next){
  const id = req.params.id.replace(":", "")
  Card.findByIdAndUpdate(id, {
    verses: req.body.verses,
    scripture: req.body.scriptures,
    gem: req.body.gemList
  },
  {new: true},
  function(err, card){
      if(!err){
          console.log("I'm working")
          console.log(card)
          console.log(card.verses)
          res.redirect("/card/" + card.verses)
      } else if(err){
          console.log("I do not want to work even if there is nothing wrong with your code")
          console.log(err)
      }
  }
  )
})

module.exports = router;
