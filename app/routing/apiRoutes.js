
var friends = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });


  
  app.post("/api/friends", function(req, res) {

    var newFriend = req.body;
    newFriend.scores = newFriend.scores.map( element => parseInt(element));

    console.log(newFriend);

    // Loop through all friends and compare scores to find the most compatible
    var mostCompatible;
    var lowestTotalDifference;

    for (var i = 0; i < friends.length; i++) {
      var totalDifference = 0;
      // Compare each score
      for (let j = 0; j < newFriend.scores.length; j++){
        totalDifference += Math.abs(friends[i].scores[j] - newFriend.scores[j])
      }
      console.log("Total Difference for", friends[i].name, "is", totalDifference)
      if (!lowestTotalDifference || totalDifference < lowestTotalDifference){
        mostCompatible = friends[i];
        lowestTotalDifference = totalDifference;
      }
      console.log("Lowest total difference is", lowestTotalDifference, "friend is", mostCompatible.name)
    }

    // Return the the most compatible person
 
    friends.push(newFriend);

    res.json(mostCompatible);

  });
    
}
 
