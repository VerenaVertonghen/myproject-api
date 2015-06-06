var router = require('express').Router();
var bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
 extended: true
}));

// log all requests
router.all('*', function(req, res, next){
	console.log('router');
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With, Origin, Content-Type, Authorization, Accept");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	next();
});

module.exports = exports = router;