// Options and Other Variables //

//// Generates random number assigned to participants (Participant ID)
var randomCode = Math.random().toString(36).substr(2,9)
//// A message to show to participants at completion (useful for confirmation, raffle entry, etc.)
var completionMessage = "Thank you for your participation. Your participation code is: " + randomCode

//// Show a progress bar at the top? (true/false)
var showProgressBar = false

//// Override default settings for controllers (parameters go inside the curly braces { })
var defaults = [
    "AcceptabilityJudgment", {
       as: ["1", "2", "3", "4", "5", "6", "7"],           
       presentAsScale: true,                             
       instructions: "Use number keys or click boxes to answer.",    
       leftComment: "(Bad)",
       rightComment: "(Good)"
    }]


// Presentation Order //

var shuffleSequence = seq(
  "setcounter",
  startsWith("practice"),
  rshuffle(startsWith("gp"), startsWith("filler"))
)


// Experiment Materials //

var items = [

  //// Counter
  ["setcounter", "__SetCounter__", { }],

  //// Practice
  ["practice-1", "AcceptabilityJudgment", {s: "The car drove like a dream."}],

  // Critical Trials //

  //// Set #1
  [["gp.trans",1], "AcceptabilityJudgment", {s: "While Anna trained the kitten paid attention."}],
  [["gp.intrans",1], "AcceptabilityJudgment", {s: "While Anna dressed the kitten paid attention."}],

  //// Set #2
  [["gp.trans",2], "AcceptabilityJudgment", {s: "Since Dave improved the department was satisfied."}],
  [["gp.intrans",2], "AcceptabilityJudgment", {s: "Since Dave worried the counselor devised a plan."}],

  //// Fillers (Good)
  ["filler-good-01","AcceptabilityJudgment", {s: "When Harry fell, the audience was shocked."}],

  //// Fillers (Bad)
  ["filler-bad-01","AcceptabilityJudgment", {s: "When Tyler sneezed the driver, he passed a tissue."}],

  //// Fillers (Catch)
  ["filler-catch-01", "AcceptabilityJudgment", {s: "Please select 4 for this sentence."}]

]