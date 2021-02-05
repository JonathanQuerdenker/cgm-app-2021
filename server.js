const express = require('express');
const {graphqlHTTP} = require('express-graphql');

const bodyParser = require("body-parser");
const {buildSchema} = require('graphql');
const cors = require('cors');

//   company: () => 'SpaceX',
//   firstName: () => 'Elon',
//   lastName: () => 'Musk',
//   preferredPronoun: () => 'Him',
//   address: () => 'WalkingStreet',
//   city: () => 'Papertown',
//   country: () => 'Nirvana',
//   postalCode: () => '123456',
//   phoneNumber: () => '1213141516'
// };


// GraphQL schema to define the operations with types of data elements involved
const schema = buildSchema(`
type Query {
    allContacts:[Contact]
    contact(contact_id:Int!):Contact
  },

  type Contact {
                company: String,
                firstName: String,
                lastName: String,
                preferredPronoun: String,
                address: String,
                city: String,
                country: String,
                postalCode: Int,
                phoneNumber: Int
  }
`);
// Resolver logic to respond to the query
const root = {
  contact: async ({contact_id}) => {
    const empQuery = `select * from wtt.contact where contact_id=` + contact_id;
    return psql.oneOrNone(empQuery);
  },

  allContacts : async (parent, args, ctx) => {
    const empQuery = `select contact_id, firstName, lastName from wtt.contact`;
    return psql.manyOrNone(empQuery); //using pgsql connection to get data
  },

}
// pg connection details
const pgPromise = require('pg-promise');
// Postgresql connection string details
const connStr = 'postgres://qhwsgrdulioewp:f87fd6940052a1a87afd0892e226bb9b6d68cc5b04bd2af751a7a0e7ab1e688b@ec2-52-55-62-6.compute-1.amazonaws.com:5432/d27r09s8rkurdm';
const pgp = pgPromise({}); // empty pgPromise instance
const psql = pgp(connStr); // get connection to PG db instance


let corsOptions = {
  origin: "http://localhost:4200"
};

// Create an express server and a GraphQL endpoint
const app = express().use('*', cors(corsOptions));//cors included to enable CORS requests

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


const db = require('./src/app/models');
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hello contact world" });
});



app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));


const PORT = process.env.PORT || 4000;

require('./src/app/routes/contact.routes')(app)

app.listen(PORT, () => console.log(`Express GraphQL Server Now Running On localhost:${PORT}/graphql`));
