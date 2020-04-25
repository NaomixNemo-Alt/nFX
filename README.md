# nFX
[Questions](https://github.com/NaomixNemo/nFX/tree/alpha#questions)

## Questions
### What is this?
Naomi's File Explorer (or nFX for short) is a system-friendly and user-friendly file explorer.\
It's purpose is to help the user automate the system's code more, as an All-In-One file explorer.\
You can easily load multiple files, and exclude certain ones from a directory, and plans to do specific tasks with files you chose.\
Want to make a directory tree in text? The plan is to make that so easy, it should be just a few lines of small input code.\
Want to restore a version of a JavaScript file (that you saved the cache of)? Easy as `File.refresh ($file, $cache)`\
Want to load all files in your system matching a certain RegExp? (Note that all parent folders will have to be loaded too) We're talking baby steps easy here.\
Want to load all files in sub-folders, and easily get the name of all sub-folders and files? We have that.\
Want to use require for multiple files and be able to easily get them out? Easy.

#### Why isn't this an npm package?
Multiple reasons;
1. I don't want to use Node.JS for this forever, I plan to move it to pure JS.\
2. I make constant updates that I don't want to be auto-updated because it could easily break the code.\
3. It's much simpler to just keep my changes here and just send in a new .zip whenever I have an update.

#### What version of Node.JS does this use?
This project is in development stage, and as such I'll be using different functions from time to time so I can't give an exact Node.JS requirement without stressing myself too much.\
Try to keep it at the latest version if possible, if it's not please open up an issue and let me know.

#### I can't understand the code you made!!
You're not meant to modify it. If you want to, you're at risk of all your changes being replaced by updates and / or your changes being incompatable with future versions of the code.\
If you can understand it, you can probably also understand that messing with about any of the code can mess up the entire package.

## How to use nFX
- Download the latest release of nFX.zip
- Extract it and place the "src" folder in the root of your code
- In any file (that doesn't go "out of the root folder", point to the location of the "module.js" file)
- Follow the code line-by-line for more information.
```js
// This file is "index.js" in the "root folder".
const nFX = require ("./src/pkg/nFX/module.js");
// To load a single file, do the following:
// Please do not use "." right now, it is not yet fully built in.
/* const File = nFX.main ("~/path/to/file"); */
const config = nFX.main ("~/config.json"); // Config exists in the root folder as "config.json"
// To use the loaded file, do the following:
config.file (); // Outputs the json file
// The folder class is still very much a wip though, but here are some examples
const Commands = nFX.main ("~/Commands").loadChildren ({ whitelist: /\.js$/, endless: true });
for (var i = 0; i < Commands.length; i++) {
  console.log (command.path.file.name);
};
```
- Load children ({ whitelist }) is a RegExp that is -required- to load children matching the said RegExp.
- Load children ({ endless }) is a Boolean that tells the system if it should load any and all sub-folders.
- Load children ({ blacklist }) is a RegExp that has priority over the whitelist.
- Load children ({ }, include) is an Array that tells the system "If the child's name is this, then load it anyway."
- Important! When using include, add "keep children" to the start of the array unless you want to remove all loaded children (that fail to match the provided RegExp) in that folder from the cache.
