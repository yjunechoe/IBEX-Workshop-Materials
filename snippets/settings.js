// Definitions of main variables //

//// Generates random number assigned to participants (Participant ID)
var randomCode = Math.random().toString(36).substr(2,9);
//// A message to show to participants at completion (useful for verification, raffle entry, etc.)
var completionMessage = "Thank you for your participation. The results were successfully transmitted. Your participation code is: " + randomCode;

//// Show a progress bar at the top? (true/false)
var showProgressBar = false;

//// Override default settings for a controller (parameters go inside the curly braces { })
var defaults = ["AcceptabilityJudgment", {
       as: ["1", "2", "3", "4", "5", "6", "7"],           
       presentAsScale: true,                             
       instructions: "Use number keys or click boxes to answer.",    
       leftComment: "(Bad)",
       rightComment: "(Good)"
    }];