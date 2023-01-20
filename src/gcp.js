const Config = require('./config');
const GCP    = require('@zero65/gcp');

GCP.init(Config['@zero65'].gcp);

module.exports = GCP;
