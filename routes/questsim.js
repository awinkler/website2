const express         = require('express'),
	  router          = express.Router({ mergeParams: true });

// setup routes
router.get('/', function(req, res){
	res.render('questsim');
});

module.exports = router;
