const pg = require("pg");
const settings = require("./settings"); // settings.json
const second = process.argv.slice(2)[0]; 

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});


client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT id,first_name,last_name,to_char(birthdate,'YYYY/MM/DD') as birthdate FROM famous_people WHERE last_name = $1 OR first_name= $1", [second], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    
    const queryOutput = result.rows;

    console.log(`Found ${queryOutput.length} person(s) by the name of ${second}:`);
    
    for (let i = 0; i < queryOutput.length; i++) {
      console.log(`- ${i+1} : ${queryOutput[i].first_name}, ${queryOutput[i].last_name}, born, ${queryOutput[i].birthdate}`);
    }
 //output: 1
    client.end();
  });
});
