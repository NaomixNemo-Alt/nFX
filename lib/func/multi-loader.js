// Code for final function here, still don't know how I'm going to do it.
// Thinking something like:
nFX.multiLoad ({
  "Files": [],
  "Folders": [".*"],
  "/(?<=(^|[\\\/]))Client[\\\/]$/i": {
    "Files": [],
    "Folders": [".*"],
    "/(?<=[\\\/])(Commands)|(Events)[\\\/]$/gi": {
      "Files": ["/(?<=[\\\/]Events[\\\/])[^\<\>\:\"\/\\\|\?\*\.]+\.js$/gi"],
      "Folders": [".*"],
      "(?<=[\\\/]Commands)[^\<\>\:\"\/\\\|\?\*]+/gi": {
        "Files": ["[^\<\>\:\"\/\\\|\?\*\.]+\.js$/gi"],
        "Folders": []
      }
    }
  }
}).then (root => root['/Client']['/Commands']['/Bot Owner']['/eval.js'].file.run (Client, message));
