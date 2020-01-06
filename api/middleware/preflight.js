var preflight = {}

// This file checks preflight in order to handle CORS requests.

preflight.check = function (req, res, next) {
  console.log('IN PREFLIGHT');

  res.setHeader('access-control-allow-methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.setHeader('access-control-allow-headers', 'x-auth, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');
  res.setHeader('access-control-allow-credentials', true);
  res.setHeader('access-control-allow-origin', '*');
  
  if (req.method == 'OPTIONS'){
    console.log('Preflight detected');
    return res.sendStatus(200);
  }
  console.log('Normal request incoming. ');
  next();
}

  module.exports = preflight
