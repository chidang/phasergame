/** @format */

global.ROOT_PATH = process.cwd();

const PATHS = {
  root: ROOT_PATH,
  src: ROOT_PATH + '/src/',
  build: ROOT_PATH + '/build/',
  script: ROOT_PATH + '/src/scripts/',
  style: ROOT_PATH + '/src/styles/',
  image: ROOT_PATH + '/src/images/',
  font: ROOT_PATH + '/src/fonts/',
};

let configs = {
  singleChunk: false,
  target: 'web',
  port: 8888,
  path: PATHS,
  ignorePage: [],
  ignoreLayout: [],
  externals: {},
  providePlugin: {},
};

let copyResource = [
  {
    from: 'src/images',
    to: 'images',
  },
  {
    from: 'src/sounds',
    to: 'sounds',
  },
  {
    from: 'src/data',
    to: 'data',
  }
];

configs.copyResource = copyResource;

module.exports = configs;
