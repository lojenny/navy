const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client(settings);

module.exports = {
    connect: (done /* our callback */) => {
    //   const client = new pg.Client(config);
      client.connect((error) => {
        done(error, client);
      });
    }
  }