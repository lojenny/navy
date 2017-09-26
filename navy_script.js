const pg = require('pg');

const client = new pg.Client();

client.connect((error) => {
  if(error) throw error;

  client.query("SELECT * FROM users WHERE id = 1", (error, results) => {
    if(error) throw error;

    console.log(results);

    client.end((error) => {
      if(error) throw error;
    });
  });
});


