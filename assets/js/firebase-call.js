  // Initialize Firebase
  var config = {
      apiKey: "AIzaSyCv7xBTitrjB5fjlMOdoMLv1Uyqd9NhZMg",
      authDomain: "tbd-music.firebaseapp.com",
      databaseURL: "https://tbd-music.firebaseio.com",
      storageBucket: "tbd-music.appspot.com",
      messagingSenderId: "896961646987"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  //global variables
  var queueArray = [];
  var qId = 0;


  function addVideoToDatabase(youtubeId, name, dedication, title) {
      var queue = firebase.database().ref('itemsInQueue');
      queue.transaction(function(currentData) {
          // If users/ada/rank has never been set, currentRank will be `null`.
          if (currentData === null) {
              return currentData;
          } else {
              var numObjects = Object.keys(currentData).length;
              currentData[numObjects] = { "itemId": numObjects, "queueID": numObjects, "name": name, "title": title, "id": youtubeId, "dedication": dedication, played: false };
              currentData.numItems = numObjects;
              return currentData;
          }
      });

  }

  function videoPlayed(itemId) {
      var queue = firebase.database().ref('itemsInQueue');
      queue.transaction(function(currentData) {
          // If users/ada/rank has never been set, currentRank will be `null`.
          if (currentData === null) {
              return currentData;
          } else {
              currentData[itemId].played = true;
              return currentData;
          }
      });
  }

  function swap(upId, downId) {
      var queue = firebase.database().ref('itemsInQueue');
      queue.transaction(function(currentData) {
          // If users/ada/rank has never been set, currentRank will be `null`.
          if (currentData === null) {
              return currentData;
          } else {

              var downQueueId = currentData[downId].queueID;
              var upQueueID = currentData[upId].queueID;

              currentData[upId].queueID = downQueueId;
              currentData[downId].queueID = upQueueID;

              return currentData;
          }
      });

  }

  function resetQueued() {
      database.ref("itemsInQueue").set({
          numItems: 0
      }).then(function() {
          window.location = "collaborator.html";
      });
  }

  function resetPlayed() {
      var queue = firebase.database().ref('itemsInQueue');
      queue.transaction(function(currentData) {
              // If users/ada/rank has never been set, currentRank will be `null`.
              if (currentData === null) {
                  return currentData;
              } else {
                  console.log(currentData);

                  var numObjects = Object.keys(currentData).length;
                  console.log(numObjects);
                  for (i = 1; i < numObjects; i++) {
                      console.log(currentData[i]);
                      currentData[i].played = false;
                  }
                  return currentData;
              }
          },
          function() {
              window.location = "index.html";
          });
  }

  function finale() {
      var queue = firebase.database().ref('itemsInQueue');
      queue.transaction(function(currentData) {
              // If users/ada/rank has never been set, currentRank will be `null`.
              if (currentData === null) {
                  return currentData;
              } else {
                  currentData = {
                      "1": {
                          "dedication": "You guys have been an awesome team to work with. Keep up all the good work.",
                          "id": "BOWSCwLJfzE",
                          "itemId": 1,
                          "name": "TBD",
                          "played": false,
                          "queueID": 1,
                          "title": "TBD: Totally BadAss Dudes/ette"
                      },
                      "numItems": 3
                  }
                  return currentData;
              }
          },
          function() {
              window.location = "index.html";
          });
  }

  function entrance() {
      var queue = firebase.database().ref('itemsInQueue');
      queue.transaction(function(currentData) {
              // If users/ada/rank has never been set, currentRank will be `null`.
              if (currentData === null) {
                  return currentData;
              } else {
                  currentData = {
                      "1": {
                          "dedication": "UCLA CODING BOOTCAMP CLASS",
                          "id": "jQYVoHZRYI0",
                          "itemId": 1,
                          "name": "MR ROGERS",
                          "played": false,
                          "queueID": 1,
                          "title": "Amazing Babies Dancing - Very Funny"
                      },
                      "2": {
                          "dedication": "THE MOON",
                          "id": "6xlsR1c8yh4",
                          "itemId": 2,
                          "name": "RORO",
                          "played": false,
                          "queueID": 2,
                          "title": "Zion - Zun Da Da"
                      },
                      "3": {
                          "dedication": "EVERYONE",
                          "id": "mmu93BAmA9I",
                          "itemId": 3,
                          "name": "THE CLASS",
                          "played": false,
                          "queueID": 3,
                          "title": "EXTREMELY Funny Arabian Kid Dance!"
                      },
                      "4": {
                          "dedication": "ME AS A BABY",
                          "id": "Lqzg0mU9wLc",
                          "itemId": 4,
                          "name": "OMAR PATEL",
                          "played": false,
                          "queueID": 4,
                          "title": "Funny pakistani kid dancing"
                      },
                      "5": {
                          "dedication": "YEE HAW CLASS",
                          "id": "pfxB5ut-KTs",
                          "itemId": 5,
                          "name": "YALL",
                          "played": false,
                          "queueID": 5,
                          "title": "evian baby&me"
                      },

                      "numItems": 3
                  }
                  return currentData;
              }
          },
          function() {
              window.location = "index.html";
          });
  }

  //on value change, update queue array

  function logArray() {
      console.log(queueArray);
  }


  $(function() {

      database.ref("itemsInQueue").orderByChild("queueID").on("value", function(snapshot) {
          queueArray = [];
          snapshot.forEach(function(childSnapshot) {

              if (!childSnapshot.val().played)
                  queueArray.push(childSnapshot.val());
          })
          qId = snapshot.numChildren();
          try {
              getFromDatabase(queueArray);

          } catch (error) {
              console.log(error);
          }

          logArray();

      }, function(errorObject) {
          console.log("The read failed: " + errorObject.code);
      });

  })



  // Initialize Firebase
  // var config = {
  //     apiKey: "AIzaSyCv7xBTitrjB5fjlMOdoMLv1Uyqd9NhZMg",
  //     authDomain: "tbd-music.firebaseapp.com",
  //     databaseURL: "https://tbd-music.firebaseio.com",
  //     storageBucket: "tbd-music.appspot.com",
  // };
  // firebase.initializeApp(config);
