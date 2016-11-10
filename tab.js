var request = require("request");
var Promise = require("promise");


requestp(process.argv[2], false).then(function (data) {
      process.send(data);
}, function (err) {
      process.send('ERROR: ' + err);
});


function requestp(url, json) {
    json = json || false;
    return new Promise(function (resolve, reject) {
        request({url:url, json:json}, function (err, res, body) {
            if (err) {
              return reject(err);
            } else if (res.statusCode !== 200) {
                err = new Error("Unexpected status code: " + res.statusCode);
                err.res = res;
                return reject(err);
            }
            resolve(body.toString('utf8'));
        });
    });
}


// request({
//   uri: process.argv[2],
// }, function(error, response, body) {
//    if (error && response.statusCode !== 200) {
//      process.send('ERROR: ' + response.statusCode);
//      console.log('ERROR: ' + response.statusCode);
//    }
//
//    process.send(body.toString('utf8'));
// });

// var http = require('http');
//
// var options = {
//   host: process.argv[2],
//   family: 4,
//   port: 80,
//   path: '/',
//   agent: false
// };
//
// var req = http.get(options, function(res) {
//   console.log('STATUS: ' + res.statusCode);
//   console.log('HEADERS: ' + JSON.stringify(res.headers));
//
//   // Buffer the body entirely for processing as a whole.
//   var bodyChunks = [];
//   res.on('data', function(chunk) {
//     // You can process streamed parts here...
//     bodyChunks.push(chunk);
//   }).on('end', function() {
//     var body = Buffer.concat(bodyChunks);
//     process.send(body.toString('utf8'));
//     // ...and/or process the entire body here.
//   })
//   req.socket.destroy();
// });
//
// req.on('error', function(e) {
//   console.log('ERROR: ' + e.message);
// }).on("socket", function (socket) {
//     socket.emit("agentRemove");
// });
