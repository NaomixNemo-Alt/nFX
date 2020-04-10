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
}).then ((root, originalInput) => {
  // console.log (originalInput); <-- for easier debugging
  let children = root['/Client']['/Commands'].children;
  let allChildren = children.map (children => children.map (child => child.children)).flat (Infinity).reduce((a, b) => a + b, 0);
  console.log (`Loaded ${allChildren} commands and ${root['/Client']['/Events'].children.size} events!`);
  root['/Client']['/Commands']['/Bot Owner']['/eval.js'].file.run (Client, message);
});
// Please note this is 100% untested and undeveloped code and is just an example of my plans / a reminder to myself.
