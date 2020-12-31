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
  "intro",
  "consent",
  "directions",
  startsWith("practice"),
  "setcounter",
  sepWith("sep", rshuffle(startsWith("gp"), startsWith("filler")))
)


// Experiment Materials //

var items = [

  //// Introduction
  ["intro", "Message", {html:
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

  //// Consent
  ["consent", "Message", {
    html:
      ["div",
        ["p", "If you wish to participate, please click the “I Agree” button below and you will be taken to the survey."],
        ["p", "If you do not wish to participate in this study, please select X in the corner of your browser."],
      ],
    consentRequired: true,
    consentMessage: "I Agree"
  }],

  //// Directions
  ["directions", "Message", {html:
    ["div",
      ["p", "In this experiment, you will be reading sentences and judging them on how acceptable they sound."],
      ["p", "Please rate the sentences on a scale of 1 to 7."],
      ["p", "A few things to keep in mind:"],
      ["li", "You do not get to go back once you've made a decision."],
      ["li", "Go with your gut feeling. Do not overanalyze the sentences."],
      ["li", "There are no ", ["em", "correct"], " answers. We want to know what sounds the most appropriate to YOU."],
      ["p", "If you have understood the instructions, please continue."]
    ]
  }],

  //// Practice
  ["practice-start", "Message", {html:
    ["div",
      ["p", "Let's try a couple trials for practice."],
      ["em", "Press any key to continue."]
    ],
    transfer: "keypress"
  }],

  ["practice-1", "AcceptabilityJudgment", {s: "The car drove like a dream."}],
  ["practice-1-feedback", "Message", {html:
    ["div",
      ["p", "How was that? Many people rate that sentence pretty good."],
      ["em", "Press any key to continue."]
    ],
    transfer: "keypress"
  }],

  ["practice-2", "AcceptabilityJudgment", {s: "The cat ever has eaten cheese the."}],
  ["practice-2-feedback", "Message", {html:
    ["div",
      ["p", "That sentence usually receives pretty poor ratings."],
      ["p", "OK! That's it. It's time to begin"],
      ["em", "Press any key to continue."]
    ],
    transfer: "keypress"
  }],


  //// Counter
  ["setcounter", "__SetCounter__", { }],

  //// Separator
  ["sep", "Message", {
    html: ["em", "Press any key to continue."],
    transfer: "keypress"
  }],


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
