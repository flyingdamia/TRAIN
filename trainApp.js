//Firebase//
var config = {
  apiKey: "AIzaSyAR8gHgxUzMN7aqUCX447rpqa1g54y6Nm4",
  authDomain: "choochoo-be9cf.firebaseapp.com",
  databaseURL: "https://choochoo-be9cf.firebaseio.com",
  projectId: "choochoo-be9cf",
  storageBucket: "choochoo-be9cf.appspot.com",
  messagingSenderId: "429799100531"
};

firebase.initializeApp(config);

var trnData = firebase.database();

//Grab User Data//
  $("#trn-btn").on("click", function() {
  var frstTrn = $("#frst-trn-input").val().trim();
  var freq = $("#freq-input").val().trim();
  var trnName = $("#trn-name-input").val().trim();
  var dest = $("#dest-input").val().trim();
 
  //Object container//
  var addedTrain = { name: trnName, desti: dest, frstTrn: frstTrn, freq: freq };

  trnData.ref().push(addedTrain);

//Alert and Clear Fields//
  alert("Train has been added");
  $("#trn-name-input").val("");
  $("#dest-input").val("");
  $("#frst-trn-input").val("");
  $("#freq-input").val("");
  return false;
});

//Add to Firebase//
trnData.ref().on("child_added", function(childSnapshot) {
  var chooDest = childSnapshot.val().desti; 
  var chooFreq = childSnapshot.val().freq;
  var chooFirst = childSnapshot.val().frstTrn;
  var chooName = childSnapshot.val().name;
  var arrv = chooFirst.split(":");
  var trntime = moment().hours(arrv[0]).minutes(arrv[1]);
  var mom = moment.max(moment(), trntime);
  var cMins;
  var cAr;

  //Moment//

  if (mom === trntime) {
    cAr = trntime.format("hh:mm A");
    cMins = trntime.diff(moment(), "minutes");
  } else {

    
     var tDiff = moment().diff(trntime, "minutes");
     var remaining = tDiff % chooFreq;
    cMins = chooFreq - remaining;
    cAr = moment().add(cMins, "m").format("hh:mm A");
  }

  $("#trn-table > tbody").append("<tr><td>" + chooName + "</td><td>" + chooDest + "</td><td>" +
          chooFreq + "</td><td>" + cAr + "</td><td>" + cMins + "</td></tr>");
});
