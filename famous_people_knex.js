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

const second = process.argv.slice(2)[0];
const db = require('./db');

function printResults(rows) {
    const queryOutput = rows;
    console.log(`Found ${queryOutput.length} person(s) by the name of ${second}:`);

    for (let i = 0; i < queryOutput.length; i++) {
        console.log(`- ${i + 1} : ${queryOutput[i].first_name}, ${queryOutput[i].last_name}, born ${createDate(queryOutput[i].birthdate)}`);
        process.exit();
    };
}

function getFamousPeople(done) {
    db.connect((err, client) => {
        if (err) {
            return console.error("Connection Error", err);
        }
        console.log('Searching...');

        knex('famous_people')
        .select(
            'id',
            'first_name',
            'last_name',
            'birthdate'
        )
        .where('first_name', second)
        .orWhere('last_name', second)
        .asCallback(function (err, rows) {
            if (err) {
                return console.error("error running query", err);
            }
            done(rows);
            client.end();
        });
    });
};

getFamousPeople(printResults);

function createDate(date){
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate(date);
    var formattedTime = year + '/' + month + '/' + day;
    return formattedTime;
}