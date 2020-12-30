/* Adopted from the 2018 LSA Institute Mini-course by Brian Dillon and Rodica Ivan */

// Counter override; uncomment if you wish to fix 
// var counterOverride = 1;



// Definitions of main variables //

//// Generates random number assigned to participants (Participant ID)
var randomCode = Math.random().toString(36).substr(2,9);   
//// Generates an completion code for the participants based on Participant ID
var completionCode = String("NPI-" + randomCode);          
//// A message to show to participants at completion (this notifies them of their completion code - used for verification, raffle entry, etc.)
var completionMessage = "Thank you for your participation. The results were successfully transmitted. Your participation code is: " + completionCode; 
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


// Define the presentation order of the elements defined inside `var items`
var shuffleSequence = seq(
      "set_counter",
      "demographics",
      "intro", 
      "practice",
       sepWith("sep", rshuffle(startsWith("gp"),startsWith("filler"))) // Shuffle the critical trials with filler trials, and place the Separator "sep" between them
    );



// Main `items` definition //

var items = [

// Pre-trials //
    
  // Set the randomized group that the participant is placed in
  ["setcounter", "__SetCounter__", { }],

  // Show the starting page (html is directly include here, but you can also point to a separate .html file)
  ["intro", "Message", {
     consentRequired: false,
     html: ["div",
             ["p", "Welcome! Here are some instructions to the experiment."],
             ["p", "Hope you have a great time! It’ll be a blast."] 
           ]
  }],

    
// Practice Trials //

  // Practice #1
    
  //// Message    
  ["practice", Message, {
     transfer: "keypress",
     html: ["div",
             ["p", "Before starting the questionnaire, let's do a couple of examples to get a feel for the task."]
           ]
  }],

  //// Trial
  ["practice", "AcceptabilityJudgment", {s: "The car drove like a dream."}],
  
  //// Feedback
  ["practice", Message, {
     transfer: "keypress",
     html: ["div",
             ["p", "How was that? Many people rate that sentence pretty good."]
           ]
  }],
    
    
  // Practice #2
  
  //// Message    
  ["practice", Message, {
     transfer: "keypress",
     html: ["div",
             ["p", "Let's try another one."]
           ]
  }],  
  
  //// Trial  
  ["practice", "AcceptabilityJudgment", {s: "The cat ever has eaten cheese the."}],

  //// Feedback
  ["practice", Message, {
     transfer: "keypress",
     html: ["div",
             ["p", "That sentence usually receives pretty poor ratings."],
             ["p", "OK! That's it. It's time to begin"]
           ]
  }],

    
    
// Experiment Body //

  // Define a Separator "sep" that consists of nothing (a blank page)
  ["sep", "Separator", {}],

    
  // Stimuli (Critical)
  
  //// Set #1
  [["gp.trans",1], "AcceptabilityJudgment", {s: "While Anna trained the kitten paid attention."}],
  [["gp.intrans",1], "AcceptabilityJudgment", {s: "While Anna dressed the kitten paid attention."}],

  //// Set #2
  [["gp.trans",2], "AcceptabilityJudgment", {s: "Since Dave improved the department was satisfied."}],
  [["gp.intrans",2], "AcceptabilityJudgment", {s: "Since Dave worried the counselor devised a plan."}],
    
  // Stimuli (Filler)
    
  ["filler-bad-01","AcceptabilityJudgment", {s: "When Tyler sneezed the driver, he passed a tissue."}],
  ["filler-good-01","AcceptabilityJudgment", {s: "When Harry fell, the audience was shocked."}],

  // A "catch trial" filler
  ["filler-catch-1","AcceptabilityJudgment", {s: "Please select 4 for this sentence; do not rate it like other sentences."}]

];


