var Trello = require("node-trello");
var t = new Trello("4f66406ccbbdd37004e985b4e6100eb8", "468774572d4f796da32d6745c2d6555db8830d69caae44add76fa538e60bb1bd");
 
// t.get("/1/members/me", function(err, data) {
//   if (err) throw err;
//   console.log(data);
// });
 
// URL arguments are passed in as an object. 
// t.get("/member/me/cards/", null, function(err, data) {
//   if (err) throw err;
//   console.log(data);
// });