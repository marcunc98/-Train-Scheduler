// alert("js connection is good!");
var config = {
    apiKey: "AIzaSyCVdA4ZIU6oOPpha9gwm6oYTnkm7REh7RE",
    authDomain: "train-scheduler-hm-assignment.firebaseapp.com",
    databaseURL: "https://train-scheduler-hm-assignment.firebaseio.com",
    projectId: "train-scheduler-hm-assignment",
    storageBucket: "train-scheduler-hm-assignment.appspot.com",
    messagingSenderId: "175452640383"
};
firebase.initializeApp(config);

var database = firebase.database();
// 2. Button for adding trains
$("#add-NewTrain-btn").on("click", function (event) {
    event.preventDefault();
    // Grabs user input
    var trainName = $("#Train-name-input").val().trim();
    var destination = $("#Destination-input").val().trim();
    var frequency = $("#Frequency-input").val().trim();
    var firstTrain = $("#FirsTrain-input").val().trim();
    
    // Creates local "temporary" object for holding employee data
    var newTrain = {
        name: trainName,
        goingTo: destination,
        trainBegin: firstTrain,
        occurrence: frequency,
    };
    // Uploads new Train input data to the database
    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.goingTo);
    console.log(newTrain.trainBegin);
    console.log(newTrain.occurrence);

    alert("Employee successfully added");
    // Clears all of the text-boxes
    $("#Train-name-input").val("");
    $("#Destination-input").val("");
    $("#Frequency-input").val("");
    $("#FirsTrain-input").val("");
    
})
// 3. Create Firebase event for adding new train data to the database and a row in the html when a user adds an entry
database.ref().on("child_added",function(childSnapshot, prevChildKey) {
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().goingTo;
    var frequency = childSnapshot.val().occurrence;
    var firstTrain = childSnapshot.val().trainBegin;
    

    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    var trnStartPretty = moment.unix(firstTrain).format("HH:mm - military time");

    // First Time
    var firstTrainConverter = moment(firstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTrainConverter)

    // Current Time
    var currentTime = moment();
    console.log("Current Time "+ moment(currentTime).format("HH:mm"));

     // Difference between the times
    var diffTime = moment().diff(moment(firstTrainConverter), "minutes");
    console.log("Difference in Time " + diffTime)

    // Time apart (remainder)
    var tRemainder = diffTime % frequency; //??
    console.log(tRemainder);

    // Minute Until Train
    var tminutesTilTrain = frequency -tRemainder;
    console.log("Minutes Til Next Train " + tminutesTilTrain);

    // Next Train
    var nextTrain = moment().add(tminutesTilTrain, "minutes");
    var nextTrainTime = moment(nextTrain).format("LT");
    console.log("Next Train Arrival Time " +  moment(nextTrain).format("HH:mm"));


// Add each train's data into the table
$("#schedule-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>"+ nextTrainTime + "</td><td>" + tminutesTilTrain + "</td></tr>") // + firstTrain + "<td><td>" 
});