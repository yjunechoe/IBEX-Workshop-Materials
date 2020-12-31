// Options and Other Variables //

//// Generates random number assigned to participants (Participant ID)
var randomCode = Math.random().toString(36).substr(2,9)
//// A message to show to participants at completion (useful for confirmation, raffle entry, etc.)
var completionMessage = "Thank you for your participation. Your participation code is: " + randomCode

//// Show a progress bar at the top? (true/false)
var showProgressBar = false

//// Override default settings for controllers (parameters go inside the curly braces { })
var defaults = [
    "DashedSentence", {
       mode: "self-paced reading",
       display: "dashed"
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
      ["p", ["h1", "Title of Research Study: Example Self-Paced Reading"]],
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
      ["p", "In this experiment, you will be reading sentences word-by-word, with the press of the ", ["strong", "spacebar key"], "."],
      ["p", "A few things to keep in mind:"],
      ["li", "You do not get to go back once you've revealed the next word in the sentence."],
      ["li", "Proceed at your normal reading pace. Do not overanalyze the sentences."],
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

  ["practice-1", "DashedSentence", {s: "The car drove like a dream."}],
  ["practice-1-feedback", "Message", {html:
    ["div",
      ["p", "Let's try another one."],
      ["em", "Press any key to continue."]
    ],
    transfer: "keypress"
  }],

  ["practice-2", "DashedSentence", {s: "The cat ever has eaten cheese the."}],
  ["practice-2-feedback", "Message", {html:
    ["div",
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
  [["gp.trans",1], "DashedSentence", {s: "While Anna trained the kitten paid attention."}],
  [["gp.intrans",1], "DashedSentence", {s: "While Anna dressed the kitten paid attention."}],

  //// Set #2
  [["gp.trans",2], "DashedSentence", {s: "Since Dave improved the department was satisfied."}],
  [["gp.intrans",2], "DashedSentence", {s: "Since Dave worried the counselor devised a plan."}],

  //// Fillers (Good)
  ["filler-good-01","DashedSentence", {s: "When Harry fell, the audience was shocked."}],

  //// Fillers (Bad)
  ["filler-bad-01","DashedSentence", {s: "When Tyler sneezed the driver, he passed a tissue."}],

  //// Fillers (Catch)
  ["filler-catch-01", "DashedSentence", {s: "This sentence is an attention check. Please_Wait_Three_Seconds_Before_Proceeding"}]

]
