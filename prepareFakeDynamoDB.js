var dynalite = require('dynalite'),
    dynaliteServer = dynalite(),
    when = require('when');

module.exports = function (argument) {
  return when.promise(function(resolve, reject){
    dynaliteServer.listen(4567, function(err) {
      if (err) {
        reject(err)
      } else {
        console.log('Dynalite started on port 4567');
        resolve();
      }
    }); 
  });
}