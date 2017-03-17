//initialize firebase
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBBaJkUrHgWxjt3YIz9DYFhQDkHvoK1aF0",
    authDomain: "train-19286.firebaseapp.com",
    databaseURL: "https://train-19286.firebaseio.com",
    storageBucket: "train-19286.appspot.com",
    messagingSenderId: "519870165521"
};
firebase.initializeApp(config);

// create a on click to grab the user inputs
var database = firebase.database();
$('#submit').on("click", function() {
    // Grabs user input
    var trainName = $('#trainName').val().trim();
    var destination = $('#Destination').val().trim();
    var firstTrain = moment($("#firstTrain").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var frequency = $('#frequency').val().trim();
    console.log(trainName, destination, firstTrain, frequency);
    // Creates local "temporary" object for holding employee data
    var trainDatabase = {
            name: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency
        }
        // Uploads employee data to the database - "push"
    database.ref().push(trainDatabase);

    // Clears all of the text-boxes
    $('#trainName').val("");
    $('#Destination').val("");
    $('#firstTrain').val("");
    $('#frequency').val("");


});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {

    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrain);
    console.log(childSnapshot.val().frequency);

    var trnName = childSnapshot.val().name;
    var trnDestination = childSnapshot.val().destination;
    var firstTrn = childSnapshot.val().firstTrain;
    var trnFrequency = childSnapshot.val().frequency;

    var differenceTimes = moment().diff(moment.unix(firstTrn), "minutes");
    var trnRemainder = moment().diff(moment.unix(firstTrn), "minutes") % trnFrequency;
    var trnMinutes = trnFrequency - trnRemainder;

    var trnArrival = moment().add(trnMinutes, "m").format("hh:mm A");





    $("#train-table > tbody").append("<tr><td>" + trnName + "</td><td>" + trnDestination + "</td><td>" +
        trnFrequency + "</td><td>" + trnArrival + "</td><td>" + trnMinutes + "</td></tr>");

});
