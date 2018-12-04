const path = require("path");

const resources = [
  "./shared/_variables.scss",
  "./shared/_mixins.scss"
];

module.exports = resources.map(file => path.resolve(__dirname, file));