

module.exports = function(options) {

  return function(req, res, next) {

    res.locals.flashyo = res.locals.flashyo || [];
    req.session.flashyo = req.session.flashyo || [];

    res.locals.flashyo = req.session.flashyo.concat(res.locals.flashyo);
    req.session.flashyo = [];

    res.flash = function(message, level) {
      if(typeof message === 'string') {
        res.locals.flashyo.push({ message: message, level: level });
      } else {
        res.locals.flashyo.push(message);
      }
    }

    req.flash = function(message, level) {
      if(typeof message === 'string') {
        req.session.flashyo.push({ message: message, level: level });
      } else {
        req.session.flashyo.push(message);
      }
    };

    next();

  };

};