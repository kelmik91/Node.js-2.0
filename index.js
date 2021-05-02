const fs = require('fs');

const readStream = fs.createReadStream('./access.log', 'utf8');

readStream.on('data', (chunk) => {

    const arrChunk = chunk.split("\n");

    for (let i = 0; i < 2; i++) {
        if (arrChunk[i].includes('89.123.1.41')) {
            fs.writeFile('./89.123.1.41_requests.log', arrChunk[i] + "\n", { flag: 'a' }, (err) => console.log(err));
        }
        else if (arrChunk[i].includes('34.48.240.111')) {
            fs.writeFile('./34.48.240.111_requests.log', arrChunk[i] + "\n", { flag: 'a' }, (err) => console.log(err));
        }
    }
});

readStream.on('end', () => {
    console.log('File reading finished')
});
readStream.on('error', () => console.log(err));
