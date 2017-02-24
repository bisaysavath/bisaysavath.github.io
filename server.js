/* jshint node: true, curly:true, eqeqeq: true, forin, true, immed: true, indent: 4, latedef: true, newcap: true, nonew: true, quotmark: double, undef: true, unused: true, strict: true, trailing: true */

"use strict";
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

// Server looks at the current directory
app.use(express.static(__dirname));

app.listen(port, function () {
    console.log("Server is listening at port " + port);
});