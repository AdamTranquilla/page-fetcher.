const request = require('request');
const fs = require('fs');

const [url, file] = process.argv.splice(2);

request(url, (error, response, body) => {
  if (error || response.status > 400) console.log(error);
  console.log('statusCode:', response && response.statusCode);
  if (!file) {
    console.log('file parameter is required');
    return;
  } else {
    fs.writeFile(file, body, error => {
      console.log(`Downloaded and saved ${response.headers['content-length']} bytes to ${file}`);
      return;
    });
  }
});