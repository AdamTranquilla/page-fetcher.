const request = require('request');
const fs = require('fs');

const [url, file] = process.argv.splice(2);


request(url, (error, response, body) => {
  if (error || response.status > 400) console.log(error);
console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  if (!file) {
    console.log('file parameter is required');
    return;
  } else {
    fs.writeFile(file, body, (error) => {
      let bytes = 0;
      const lines = body.split('\n');
      for (const line of lines) {
        bytes += Buffer.byteLength(line + '\n', 'utf8');
      }
      console.log(`Downloaded and saved ${bytes} bytes to ${file}`);
      return;
    });
  }
});