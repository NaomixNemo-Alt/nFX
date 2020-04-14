"use strict"; const nFX = require ("../../helper.js");
class File extends nFX.lib.class.Base () {
    constructor (path, options) {
        super (path, options); this.size = NaN; try {
            this.size = nFX.node_modules.filesize (this.stats ().size)
        } catch (error) { this.errors.push (error); return this };
        if (this.constructor === File) this.promise = true;
    }; file () { try { return require (this["safe path"]) } catch(error) { return this.errors.push (error) }
    }; cache () {
        if (!this.file()) throw new Error ("Attempted to grab cache from an unloaded file.");
        return require.cache[require.resolve (this["safe path"])];
    }; static refresh (file, cache = false) {
        let _cache = [cache]; delete require.cache[require.resolve (this["safe path"])];
        if (!cache) return file.file (); require.cache[require.resolve (this["safe path"])] = _cache[0]; return file.file ();
    };
}; exports.main = File;
