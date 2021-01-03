// Defaults and other settings //

//// Generates random number assigned to participants (Participant ID)
var randomCode = Math.random().toString(36).substr(2,9)

//// Override default settings for controllers (parameters go inside the curly braces { })
var defaults = [
    "AcceptabilityJudgment", {
       as: ["1", "2", "3", "4", "5", "6", "7"],           
       presentAsScale: true,                             
       instructions: "Use number keys or click boxes to answer.",    
       leftComment: "(Bad)",
       rightComment: "(Good)"
    }]