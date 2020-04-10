"use strict"; const Path = require ("../func/path.js"); const File = require ("./File.js").main; const Folder = require ("./Folder.js").main;
let defineOpts = value => { return { value, enumerable: false, configurable: true, writable: true } };
class Base {
  constructor (path, options = { resolve: true }) {
    this.errors = []; Object.defineProperties (this, { "created at": defineOpts (process.uptime ()), "promise": defineOpts (false) });
    this.Symbol = Symbol (this["created at"]); Object.assign (options, { resolve: options.resolve === true || false }); try {
      if (typeof path != "string" || !path) throw new Error ("Path argument is not a valid string.");
      Path.call (this, path, { resolve: options.resolve }); if (this.errors[0]) throw this.errors[0];
      this.Symbol = Symbol (this.path[0]); if (this.stats ().constructor.name == "Stats") {
        let type = require ("../func/typeof.js").main (this.stats ());
        if (type[1]) throw type[1]; Object.defineProperty (this, "type", defineOpts (type[0]));
      }; // 
    } catch (error) { if (!this.errors.includes (error)) this.errors.push (error) };
    if (this.constructor === Base) this.promise = true;
  }; static promise (requestType = "load", requestObject) {
    if (typeof requestType != "string" || !path) throw new Error ("requestType for promise is not a valid string.");
    if (typeof requestObject != "object") throw new Error ("requestOptions for promise is not an object.");
    switch (requestType.toLowerCase ()) {
      case "load": return new Promise ((resolve, reject) => {
        while (!requestObject.promise && !requestObject.errors) { };
        if (requestObject.errors[0]) reject (requestObject);
        resolve (requestObject);
      }); case "new": return new Promise ((resolve, reject) => {
        let requestFile = new requestObject.class (requestType.path, requestObject.options || undefined);
        while (!requestFile.promise && !requestFile.errors) { };
        if (requestFile.errors[0]) reject (requestFile);
        resolve (requestFile);
      }); default: throw new Error ("requestType is not valid, try 'load' or 'new'.");
    };
  }; static stack (stack, options = { match: "all", blacklist: [] }) {
    let helpString = "{String} stack, {Object} options = { {String} match: 'all' || 'help', {Array} blacklist: [], file }",
        errorString = `Incorrect usage! Please look here: ${helpString}`;
    if (!typeof options != "object" || !options) throw new Error (errorString); if (!options.match == "help") return helpString;
    if (!typeof stack != "string" || !stack) throw new Error ("stack for static stack is not a valid string.");
    if (!options.file) throw new Error ("file property could not be found as a valid FileExplorer item in options.");
    Object.assign (options, { match: typeof options.match == "string" && options.match || "all", blacklist: Array.isArray (options.blacklist) && options.blacklist || [] });
    switch (options.match.toLowerCase ()) {
      case "all": return stack;
      case "paths": return stack.match (/((?<=\()\/app[^()]+(?=\)))/g)
      .filter (path => options.blacklist.filter (blacklistedPath => !path.match (blacklistedPath)))
      .filter (path => Path.blacklist.filter (blacklistedPath => !path.match (blacklistedPath)));
      default: options.file.errors.push (new Error (errorString)); return options.file;
    };
  }; stats () {
    try { return fs.lstatSync (this.path[0]);
    } catch (error) { this.errors.push (error) }
  }; parent () {
    return new Folder ("../");
    // WARNING TO SELF; Possible huge memory leak!!
    // In order to fix this, store all files made later and then request to find the parent file from there instead of creating a new one.
  }; 
}; exports.main = Base;
