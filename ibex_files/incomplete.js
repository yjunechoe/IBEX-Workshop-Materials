//////////////////
//// Exercise ////
//
// There are a total of EIGHT tasks for you to complete in this script.
// The instructions for each task are written out as comments.
// Some parts of the task are completed for you and your job is to fill in the blanks ______.
//
// Make sure to consult the IBEX manual! - https://github.com/addrummond/ibex/blob/master/docs/manual.md
//
//////////////////


// Task #1: Send a completion message that says "Thank you for your participation!"
var ______ = ______

var showProgressBar = false

var defaults = [
    "AcceptabilityJudgment", {
       as: ______, // Task #2: Make the acceptability judgment scale from 1-5
       presentAsScale: true,
       instructions: "Use number keys or click boxes to answer.",
       leftComment: "(Bad)",
       rightComment: "(Good)"
    }]


var shuffleSequence = seq(
  "Intro",
  "Consent",
  "Directions",
  "______", // Task #3: Insert the trial that updates the participant counter
  ______("______"), // Task #4: Select all exposure trials
  ______(startsWith("Condition"), startsWith("Filler")) // Task #5: Use the function that randomly shuffle the critical and filler trials
)


var items = [

  ["Intro", "Message", {html:
    ["div",
      ["p", ["h1", "Title of Research Study: Example Acceptability Judgment Experiment"]],
      ["p", ["strong", "Investigator: John Doe"]],
      ["p", ["strong", "Supported by: The University"]],
      ["p"],
      ["p",
        ["strong", "Purpose of Study:"],
        `Enim quasi omnis occaecati laudantium repellendus culpa est. Ex fuga quisquam nam architecto nihil magni laudantium non.
        Eveniet consequuntur dolorem et dolorem quis vel est inventore.
        A ducimus nemo tempore consequatur. Laborum aspernatur eius laboriosam inventore iste inventore.
        Numquam quidem sapiente quas provident alias quia amet.`
      ]
    ]
  }],

  ["Consent", "Message", {
    html:
      ["div",
        ["p", "If you wish to participate, please click the “I Agree” button below and you will be taken to the survey."],
        ["p", "If you do not wish to participate in this study, please select X in the corner of your browser."],
      ],
    consentRequired: true,
    consentMessage: "I Agree"
  }],

  ["Directions", "Message", {html:
    ["div",
      ["p", "In this experiment, you will be reading sentences and judging them on how acceptable they sound."],
      ["p", "Please rate the sentences on a scale of 1 to 7."],
      ["p", "A few things to keep in mind:"],
      ["li", "You do not get to go back once you've made a decision."],
      ["li", "Go with your gut feeling. Do not overanalyze the sentences."],
      ["li", "There are no ", ["em", "correct"], " answers. We want to know what sounds the most appropriate to YOU."],
      ["p", "If you have understood the instructions, let's start with a couple practice trials."],
      ["em", "Press any key to continue."]
    ],
    transfer: "keypress"
  }],

  ["SetCounter", "__SetCounter__", { }],

  ["Exposure-1", "AcceptabilityJudgment", {s: "This is a good sentence."}],
  ["Exposure-2", "AcceptabilityJudgment", {s: "This are a bad sentence."}],

  // Task #6: Create a message that says "How was that for practice? Now let's start the experiment." in two lines. Then, add this trial after the exposure trials in the experiment sequence
  ["Transition", "______", {
    ______ : ["______", ["______", "How was that for practice?"], ["______", "Now let's start the experiment."]]
  }],

  [["ConditionA",1], "AcceptabilityJudgment", {s: "No duck that the goose chased has ever returned to our pond."}],
  [["ConditionB",1], "AcceptabilityJudgment", {s: "The duck that the goose chased has ever returned to our pond."}],

  // Task #7: Fill in the blanks such that these next two trials are from the second set of critical items
  [["ConditionA", ______], "AcceptabilityJudgment", {s: "No bill that the Democratic senators supported has ever become law."}],
  [["ConditionB", ______], "AcceptabilityJudgment", {s: "The bill that the Democratic senators supported has ever become law."}],

  // Task #8: Create a filler trial called "Filler-catch-01" that asks participants to "Select '2' for this sentence.".
  ______

  ["Filler-good-01","AcceptabilityJudgment", {s: "The way to happiness is never straightforward or obvious."}],

  ["Filler-bad-01","AcceptabilityJudgment", {s: "The bored schoolchild kicked dog the without any apparent remorse."}],

]
