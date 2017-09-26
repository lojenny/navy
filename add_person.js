const knex = require("knex")({
    client: 'pg',
    version: '7.2',
    connection: {
        host: "localhost",
        user: "development",
        password: "development",
        database: "vagrant"
    }
});

const first = process.argv.slice(2)[0];
const last = process.argv.slice(2)[1];
const birthdate = process.argv.slice(2)[2];

function formatDate(birthdate){
var utc = new Date(birthdate).toUTCString();
return utc;
}

function insertFamousPeople(done) {
    console.log('Adding...');
    knex("famous_people")
        .insert({
            first_name: first,
            last_name: last,
            birthdate: formatDate(birthdate)
        })
        .asCallback(function (err, rows) {
            if (err) {
                return console.error("error running query", err);
            }
            done();
        });
};


insertFamousPeople(() => {
    console.log('Completed Insert');
    process.exit();
});