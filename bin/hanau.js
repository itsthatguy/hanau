#!/usr/bin/env node

const fs = require('fs-extra');
var svn = require('node-svn-ultimate');
const inquirer = require('inquirer');

const packageJson = require('../package.json');

const BASE_URL = 'https://github.com/itsthatguy/base-react-app/branches/master/';
const FILES_TO_REMOVE = [
  'yarn.lock',
];

console.log(`✌️️ Hanau - v${packageJson.version}`);
console.log();

inquirer
.prompt([
  {
    type: 'list',
    name: 'basePackage',
    message: 'Which base package do you want to install?',
    choices: [
      'react',
      'react-redux-router3',
      'react-redux-router4',
      new inquirer.Separator(),
      'Cancel'
    ]
  }
])
.then((answers) => {
  if (answers.basePackage === 'Cancel') return exiting();

  const pkgPath = `${BASE_URL}${answers.basePackage}`;

  svn.commands.export(pkgPath, process.cwd(), {force: true}, (error) => {
    if (error) return console.log('Error download repository.', error);

    FILES_TO_REMOVE.map((filename) => {
      fs.removeSync(filename);
    });

    console.log(`Successfully downloaded ${answers.basePackage}!`);
  });
});

const exiting = () => {
  console.log();
  console.log('Thank you for your love. Maybe next time?');
}
