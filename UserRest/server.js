var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var auth = require('basic-auth')
const config = require('./config');

var User       = require('./user');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// enable CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    if ( req.method === 'OPTIONS' ) {
		res.writeHead(200);
		res.end();
		return;
	};
    next();
});

var port = process.env.PORT || 2500;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
  // check authorization
  var credentials = auth(req); 
  if (!credentials && credentials !== config.credentials) {    
    console.log('access denied: ' +JSON.stringify(req.headers));
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="csci680 user list"')
    res.send('Access denied')
  } else {
    console.log('Access granted to: ' + credentials.name + "," + credentials.pass);  
    next();    // make sure we go to the next routes and don't stop here
  }
});

// test route to make sure everything is working (accessed at GET http://localhost:2500/api)
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to our user api !' });   
});

// more routes for our API will happen here
// on routes that end in /users
// ----------------------------------------------------

router.route('/users')
    // get all the bears (accessed at GET http://localhost:8080/api/users)
    .get(function(req, res) {
        User.getAll(function(err, users) {
            if (err) {
                res.send(err); 
            } else {     
                res.json(users);
            }
        });
    })
    
    // create a user (accessed at POST http://localhost:8080/api/users)
    .post(function(req, res) { 
        // insert the user and check for errors
        User.insert(req, function(err) {
            if (err) 
                res.send(err);
            res.json({ message: 'User: ' + req.body.username + ' created' });
        });
    });

// on routes that end in /users/username
// ----------------------------------------------------
router.route('/users/:username')

    // get the user by username (accessed at GET http://localhost:8080/api/users/name)
    .get(function(req, res) {
        User.find(req.params.username, function(err, users) {
            if (err)
                res.send(err);
            if (users.length > 0)
              res.json(users[0]);
            else
              res.json({message: 'User: ' + req.params.username + ' not found'});
        });
    })
    // update the user by username (accessed at PUT http://localhost:8080/api/users/name)
    .put(function(req, res) {
        User.update(req.params.username, req.body, function(err, rs) {
            if (err) {
                res.send(err);  
            } else {         
                res.json({ message: 'User: ' + req.params.username + ' has new fullname: ' + req.body.fullname });
            }
        });
    })
    // delete the user with this name (accessed at DELETE http://localhost:8080/api/users/name)
    .delete(function(req, res) {
      User.remove(req.params.username, function(err, obj) {
        if (err) {
            res.send(err);
        } else {
            res.json({ message: 'Successfully deleted: ' + req.params.username + ' (' + obj.result.n + ')' });
        }
    });
  });    

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER, listening on all interfaces
// =============================================================================
app.listen(port,'0.0.0.0');
console.log('Ready to accept commonds on port ' + port);