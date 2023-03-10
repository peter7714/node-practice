const fs = require('fs');
const process = require('process');
const axios = require('axios');

let arg = process.argv;

function handleOutput(text, output){
    if(output){
        fs.writeFile(output, text, 'utf8', err => {
            if (err){
                console.error(`Couldn't Write: ${output}: ${err}`);
                process.exit(1);
            }
        });
    }   else {
        console.log(text);
    }
}

function cat(path, out){
    fs.readFile(path, 'utf8', (err, data) => {
        if (err){
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        } else {
            handleOutput(data, out);
        }
    })
}

async function webCat(url, out){
    try {
        let res = await axios.get(url);
        handleOutput(res.data, out);
    }   catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

let path;
let out;

if (arg[2] === '--out'){
    out = arg[3];
    path = arg[4];
} else{
    path = arg[2];
}

if (path.slice(0, 4) === 'http') {
    webCat(path, out);
} else {
    cat(path, out);
};
