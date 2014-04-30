exports.serve = function () {
    var express = require('express'),
        app     = express(),
        oneDay  = 86400000;

    app.use(express.compress());

    app.use(express.static(__dirname + '/public', { maxAge: oneDay }));

    app.listen(process.env.PORT || 3000);

    console.log('Server is running on port ' + (process.env.PORT || 3000));
}
