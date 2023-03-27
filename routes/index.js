var express = require('express');
var router = express.Router();
const URL = "https://picsum.photos/"
const URL2 = "https://image-charts.com/chart?chs="

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/generate-image', function (req, res, next) {
  res.render('image-form');
});

router.post('/generate-image', function (req, res, next) {
  height = req.body.height;
  width = req.body.width;
  blur = req.body.blur;
  gray = req.body.grayscale ? true : false;
  imageUrl = URL + height + "/" + width
  
  if (gray && blur) {
    imageUrl += "?grayscale" + "&blur=" + blur
  }
  if (gray && !blur) {
    imageUrl += "?grayscale"
  }
  if (blur && !gray) {
    imageUrl += "?blur=" + blur
  }

  res.render('image-form', {link: imageUrl});
});

router.get('/generate-qr-code', function (req, res, next) {
  res.render('qr-code-form');
});

router.post('/generate-qr-code', function (req, res, next) {

  width = req.body.width;
  value = req.body.value;

  // Default values
  if (!width) {
    width = 200
  }
  if (!value) {
    value = "No message specified"
  }

  // Compose the URL
  imageUrl = URL2 + width + "x" + width + "&cht=qr&chl=" + value + "&choe=UTF-8"

  res.render('qr-code-form', {link: imageUrl});
});

module.exports = router;
