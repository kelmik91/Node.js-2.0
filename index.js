#!/usr/bin/env node

const fs = require('fs');
const path = require("path");
const inquirer = require("inquirer");

const isFile = fileName => {
    return fs.lstatSync(fileName).isFile();
}

const currentDirectory = process.cwd();
console.log(currentDirectory);

let list = fs.readdirSync(currentDirectory);

const para = function () {
    inquirer
        .prompt([{
            name: "fileName",
            type: "list",
            message: "Choose file:",
            choices: list,
        }])
        .then((answer) => {
            console.log(answer.fileName);

            if (!isFile(answer.fileName)) {
                console.log('!answer.fileName.isFile');
                list = fs.readdirSync(path.join(currentDirectory, answer.fileName));
                para();
            }

            const readStream = fs.createReadStream(answer.fileName, 'utf8');
            const data = []
            readStream.on('data', (chunk) => {

                const arrChunk = chunk.split("\n");

                for (let i = 0; i < 1; i++) {
                    if (arrChunk[i].includes(process.argv[2])) {
                        console.log('Совпадение!');
                        data.push(arrChunk[i])
                    }
                }
            });

            const writeStream = fs.createWriteStream(`./${process.argv[2]}_requests.log`, { flag: 'a' });

            readStream.on('end', () => {
                console.log('File reading finished');
                for (let i = 0; i < data.length; i++) {
                    writeStream.write(data[i] + '\n');
                }
                writeStream.end(() => console.log('File writing finished'));
            });

            readStream.on('error', () => console.log(err));
        });
}

para();


