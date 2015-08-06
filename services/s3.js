require('dotenv').load();
var http = require('http');
var util = require('util');
var fs = require('fs');
var md5File = require('md5-file');
var multiparty = require('multiparty');
var AWS = require('aws-sdk');
var PORT = process.env.PORT || 27372;


var bucket = process.env.S3_BUCKET;
var s3 = new AWS.S3({
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET,
  // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
});


var server = http.createServer(function(req, res) {
  if (req.url === '/') {
    res.writeHead(200, {'content-type': 'text/html'});
    res.end(
      '<form action="/upload" enctype="multipart/form-data" method="post">'+
      '<input type="text" name="path" placeholder="s3 key here"><br>'+
      '<input type="file" name="upload"><br>'+
      '<input type="submit" value="Upload">'+
      '</form>'
    );
  } else if (req.url === '/upload') {

    var form = new multiparty.Form();

    form.parse(req, function(err, fields, files) {
      if (err) {
        res.writeHead(400, {'content-type': 'text/plain'});
        res.end("invalid request: " + err.message);
        return;
      }

      fileName = md5File(files.upload[0].path)+files.upload[0].originalFilename

      var params = {
        Bucket: bucket,
        Key: fileName,
        ACL: 'public-read',
        Body: fs.readFileSync(files.upload[0].path)
      };
      s3.putObject(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response
      });

      // save a row in the data base

      res.writeHead(200, {'content-type': 'text/plain'});
      res.end('received files:\n\n '+util.inspect(files.upload[0]));
    });

    
  } else {
    res.writeHead(404, {'content-type': 'text/plain'});
    res.end('404');
  }
});
server.listen(PORT, function() {
  console.info('listening on http://0.0.0.0:'+PORT+'/');
});