import chalk from "chalk";
import boxen from "boxen";
import fs from "fs";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const argv = yargs(hideBin(process.argv)).argv;
const log = console.log;
const jsonData = [];

const toNumber = (intStr) => {
  let num = Number(intStr) ? Number(intStr) : intStr;
  if (num === "0") {
    num = 0;
  }
  return num;
};

if (argv.file) {
  log(chalk.blue(boxen("Converting CSV to JSON...", { padding: 1 })));
  let filename = argv.file.substr(0, argv.file.length - 4);
  let data = fs.readFileSync(`./input/${argv.file}`, "utf-8");
  let lines = data.split(/\r?\n/);
  let header = lines.shift();
  let jsonHeaders = header.split(/\r?[,]+/);

  lines.forEach((line) => {
    let jsonobj = {};
    let lineData = line.split(/\r?[,]+/);

    jsonHeaders.forEach((headerJson, index) => {
      jsonobj[headerJson] = toNumber(lineData[index]);
    });
    jsonData.push(jsonobj);
  });

  log(chalk.green(boxen("Finished Converting...", { padding: 1 })));

  fs.writeFileSync(`./output/${filename}.json`, JSON.stringify(jsonData));
} else {
  log(chalk.red("No --file=foo.csv specified !!"));
}
