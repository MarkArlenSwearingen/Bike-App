'use strict'

require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const superagent = require('superagent');
const pg = require('pg');
const methodOverride = require('method-override');
const ejs = require('ejs');
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(cors());

//Database Connection
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('err', err => console.error(err));

//Middleware between client and server
app.use(methodOverride((request, response) => {
  if (request.body && typeof request.body === 'object' && '_method' in request.body) {
    let method = request.body._method;
    delete request.body._method;
    return method;
  }
}))
// https://dev.to/moz5691/method-override-for-put-and-delete-in-html-3fp2
// https://github.com/expressjs/method-override

//view engine
app.use('public', express.static('public'));
app.set('view engine', 'ejs');

//API routes
app.get('/' , homePage);
app.get('/search', getLocation);
// app.post('/shops', saveShop);
// app.get('/shops/:id', getOneShop);
// app.put('/shops/:id', updateShop);
// app.delete('/ships/:id', deleteShop)
// app.get('/favorites', getShops);
// app.get('/about', aboutMe);

//Shop Constructor
// function BikeShop(data){
//   this.name = data.summary;

// }

function getLocation(request, response){
  const embeddedMap = `https://www.google.com/maps/embed/v1/search?key=${process.env.GEOCODE_API_CODE}&q=bicycle+stores+in+${request.query.data}`;
  // const embeddedData = {};
  // https://visionmedia.github.io/superagent/
  return superagent.get(embeddedMap) //CORS is required with superagent to use URLs.
    .then(result => {
      console.log('this is the result body' + result.body);
    })
    .catch(err => console.log(err,response));
}




//Home Page
function homePage(request,response){
  response.render('index');
}

//Application Listener
app.listen(PORT, console.log(`Listening on PORT: ${PORT}`))
