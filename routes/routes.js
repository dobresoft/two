'use strict';
const path = require('path');

module.exports = function (oApp) {
    oApp.get('/', function (req, res) {
        
 
        res.sendFile(path.join(__dirname, '../webapp/', 'index.html'));




    });

//    oApp.get('/rfc', function (req, res) {
        //res.render(path.join(__dirname, '../webapp/', 'rfc.js'));
      // res.render('../webapp/rfc.js');
  //  })
}
