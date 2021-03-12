const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const message = require('../messages/session');

const authConfig = require('../../config/auth');

exports.authenticate = async function (req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      result: 'error',
      message: message.error.code1.subcode1.message
    });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.id = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({
      result: 'error',
      message: message.error.code1.subcode2.message
    });
  }
};