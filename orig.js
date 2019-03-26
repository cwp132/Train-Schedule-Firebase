var config = {
    apiKey: "AIzaSyCA6JRSoIL05yrNmKaM9RE9fJ846knXfTc",
    authDomain: "train-schedule-42a03.firebaseapp.com",
    databaseURL: "https://train-schedule-42a03.firebaseio.com",
    projectId: "train-schedule-42a03",
    storageBucket: "",
    messagingSenderId: "594858220543"
};
firebase.initializeApp(config);
var database = firebase.database();

$(document).ready(function () {
    console.log("ready!");

    $("#add-train-btn").on("click", function () {
        var nameText = $("#train-name-input").val();
        var destinationText = $("#destination-input").val();
        var frequencyText = $("#frequency-input").val();
        var trainTimeText = $("#start-input").val();
        database.ref().push({
            name: nameText,
            destination: destinationText,
            frequency: frequencyText,
            time: trainTimeText,


        })

    });


    database.ref().on("child_added", function (childSnapshot) {
        console.log(childSnapshot.val());
        var trainName = childSnapshot.val().name;
        var trainDestination = childSnapshot.val().destination;
        var trainFrequency = childSnapshot.val().frequency;
        var firstTime = childSnapshot.val().time
        // var trainTime = childSnapshot.val().time;
        //what time it is currently
        //frquency of the train 
        // last train that came through

        var tFrequency = trainFrequency;

        // var firstTime = "03:30";

        var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
        console.log("first time converted" + firstTimeConverted);



        // var timeFix = moment(firstTimeConverted).unix();
        // console.log(timeFix.format("hh:mm"));

        console.log(firstTimeConverted.format("hh:mm"));
        var currentTime = moment();
        console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));


        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        console.log("DIFFERENCE IN TIME: " + diffTime);


        var tRemainder = diffTime % tFrequency;
        console.log(tRemainder);


        var tMinutesTillTrain = tFrequency - tRemainder;
        console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);


        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

        var trainSchedule = $("<tr>").append(
            $("<td>").text(trainName),
            $("<td>").text(trainDestination),
            $("<td>").text(trainFrequency),
            $("<td>").text(nextTrain),
            $("<td>").text(tMinutesTillTrain),

        );

        $("#train-table > tbody").append(trainSchedule);

    });
});