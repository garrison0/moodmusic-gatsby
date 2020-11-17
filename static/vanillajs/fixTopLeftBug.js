// this script exists because I noticed a buggy clump of characters in the top-left corner once :) 
// so, i relocated them all

const fs = require('fs');
const fileUrl = 'seatedBP3positions.txt';

var resDict = [];

function fixTopLeft(x, y){
    for (var i = 0; i < resDict.length; i++){
        let elem = resDict[i];

        if (elem.x < 25 && elem.y < 25) { 
            resDict[i].x = x;
            resDict[i].y = y;
        }
    }
}

var path = process.cwd();
var buffer = fs.readFileSync(path + "/" + fileUrl);
resDict = JSON.parse(buffer.toString());
fixTopLeft(423, 64);

fs.writeFile('charPoses.txt', JSON.stringify(resDict), (err) => { 
    if (err) throw err; 
}) 
        