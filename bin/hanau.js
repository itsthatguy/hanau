#!/usr/bin/env node

const fs = require('fs-extra');
const download = require('download-git-repo');

const FILES_TO_REMOVE = [
  'yarn.lock',
];

download('itsthatguy/base-react-app', '.', (error) => {
  if (error) return console.log('Error download repository.', error);

  FILES_TO_REMOVE.map((filename) => {
    fs.removeSync(filename);
  });

  console.log('Success!');
});
