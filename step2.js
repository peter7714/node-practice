const fs = require('fs');
const process = require('process')
const axios = require('axios');

let arg = process.argv[2];

function cat(path){
    fs.readFile(path, 'utf8', (err, data) => {
        if (err){
            console.error(`Error reading path ${path}: ${err}`);
            process.exit(1)
        } else {
            console.log(data);
        }
    })
};

async function webCat(url){
    try {
        let res = await axios.get(url);
        console.log(res.data);
    }   catch (err) {
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

if (arg.slice(0, 4) === 'http') {
    webCat(arg);
} else {
    cat(arg);
}
