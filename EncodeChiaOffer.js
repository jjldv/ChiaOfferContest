const { createCanvas } = require('canvas');
const GIFEncoder = require('gifencoder');
const fs = require('fs');

if (process.argv.length < 4) {
    console.log("Usage: node EncodeChiaOffer.js <outputFilename> <textToEncode>");
    process.exit(1);
}
const filename = process.argv[2];
const text = process.argv[3];

function encodeStringToGif(text, filename = 'output.gif') {
    const size = 1; 
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    const encoder = new GIFEncoder(size, size);

    encoder.createReadStream().pipe(require('fs').createWriteStream(filename));
    encoder.start();
    encoder.setRepeat(0); 
    encoder.setDelay(500);
    encoder.setQuality(10); 
    const binaryString = text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join('');

    for (let bit of binaryString) {
        ctx.fillStyle = bit === '0' ? 'black' : 'white'; 
        ctx.fillRect(0, 0, size, size); 
        encoder.addFrame(ctx); 
    }

    encoder.finish();
    console.log(`GIF created: ${filename}`);
}

encodeStringToGif(text, filename);
