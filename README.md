
# express-flashyo

Flash messaging for Express 4.x

## Install

    npm install flashyo --save

## Initialise

```javascript
app.use(require('express-session')); // OPTIONAL
app.use(require('express-flashyo'));
```

## Use

### Response

Using `res.flash(message, [level])` or `res.flash({ message: '...', customKeys: 123 })` sets values straight away onto the res.locals object (shown in example) so your view engine can render the data.

```javascript
app.use(require('express-flashyo'))
app.get('/', function(req, res) {

  res.flash('Welcome to this crazy Express app!');
  // res.locals.flashyo = [
  //   { message: 'Welcome to this crazy Express app!' }
  // ];

  res.flash('Welcome to this crazy Express app!');
  // res.locals.flashyo = [
  //   { message: 'Welcome to this crazy Express app!' }
  // ];

  res.render('layout');

});
```

### Delayed Response

By using a delayed response requires `express-session` to be initialised beforehand. When `req.flash(message, [level])` or `req.flash({ message: '...', customKeys: 123 });` the message is places in the session so that the next request has the flash message places in `res.locals`.

```javascript
// app.use express-session
// app.use(require('express-flashyo'));

app.get('/setup', function() {
  setTimeout(function() {
    req.flash('You\'re site is now setup');
    res.redirect('/');
  }, 600);
});

app.get('/', function(req, res) {
  console.log()
})
```

Licence: MIT