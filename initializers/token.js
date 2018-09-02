const jwt = require('jsonwebtoken');

module.exports = {
  name: 'token',
  after: 'passport',
  configure: (app) => {
    app.get('/token', (req, res) => {
      const tokenHeader = req.headers.authorization || '';
      const token = tokenHeader.replace(/^Bearer /, '');

      if (token) {
        res.status(200).send(jwt.verify(token, 'your_jwt_secret'));

        return;
      }

      res.status(401).send(null);
    });
  }
};
