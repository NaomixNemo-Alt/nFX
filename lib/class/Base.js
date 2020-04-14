"use strict"; var nFX = require ("../../helper.js");
let defineOpts = value => { return { value, enumerable: false, configurable: true, writable: true } };
class Base {
  constructor (path, options = { resolve: true }) {
    this.errors = []; Object.defineProperties (this, { "loaded at": defineOpts (process.uptime ()), "promise": defineOpts (false) });
    this.Symbol = Symbol (this["loaded at"]); Object.assign (options, { resolve: options.resolve === true || false }); try {
      if (typeof path != "string" || !path) throw new Error ("Path argument is not a valid string.");
      nFX.lib.func.path.main.call (this, path, { resolve: options.resolve }); if (this.errors[0]) throw this.errors[0];
      if (this.stats ().constructor.name == "Stats") {
        let type = nFX.lib.func.typeof (this.stats ());
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
  }; static getStack (stack, options = { match: "paths", blacklist: [] }) {
    let helpString = "{String} stack, {Object} options = { {String} match: 'paths' || 'all' || 'help', {Array} blacklist: [], file }",
        errorString = `Incorrect usage! Please look here: ${helpString}`;
    if (typeof options != "object" || !options) throw new Error (`(No options) ${errorString}`); if (!options.match == "help") return helpString;
    if (typeof stack != "string" || !stack) throw new Error ("stack for static getStack is not a valid string.");
    if (!this.path) throw new Error ("Please bind / call (etc) this function to re-define the this keyword, using either a FileExplorer item or a Path object.");
    Object.assign (options, { match: typeof options.match == "string" && options.match || "paths", blacklist: Array.isArray (options.blacklist) && options.blacklist || [] });
    switch (options.match.toLowerCase ()) {
      case "all": this.stack = stack; return this;
      case "paths": this.stack = stack.match (exports.regexp)
      .filter (path => options.blacklist.filter (blacklistedPath => !path.match (blacklistedPath)))
      .filter (path => nFX.lib.func.path.blacklist.filter (blacklistedPath => !path.match (blacklistedPath))); return this;
      default: this.errors.push (new Error (errorString)); this.stack = false; return this;
    };
  }; stats () {
    try { return nFX.node_modules.fs.lstatSync (this.path[0]);
    } catch (error) { this.errors.push (error) }
  }; parent () {
    return new nFX.lib.class.Folder ("../");
    // Note to self; I can't do this because circular requires.
    // WARNING TO SELF; Possible huge memory leak!!
    // In order to fix this, store all files made later and then request to find the parent file from there instead of creating a new one.
  }; 
}; exports.main = Base;