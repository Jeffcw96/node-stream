const fs = require('fs');
const { Transform } = require('stream');
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');

// console.time("normal")
// fs.readFile(__dirname + '/example.txt', 'utf-8', (err, data) => {
//     console.log(data)
// })
// console.timeEnd("normal")

const myTransform = new Transform({
    //cb = callback which takes in 2 arguements => (err, data)
    transform(chunk, encoding, cb) {
        const data = decoder.write(chunk).toUpperCase()
        cb(null, data)
    }
});

const readStream = fs.createReadStream(__dirname + '/data.txt');
const writeStream = fs.createWriteStream(__dirname + '/output.txt');

readStream
    .pipe(myTransform)
    .pipe(writeStream)

