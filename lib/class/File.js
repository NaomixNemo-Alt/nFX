"use strict"; const Path = require ("../func/path.js"); const Base = require ("./Base.js").main; const Folder = require ("./Folder.js").main;
const fileSize = require ("filesize");
class File extends Base {
    constructor (path, options) {
        super (path, options); this.size = NaN; try {
            this.size = fileSize (this.stats ().size)
        } catch (error) { return this.errors.push (error) };
        if (this.constructor === File) this.promise = true;
    }; file () { try { return require (this.path) } catch(error) { return this.errors.push (error) }
    }; cache () {
        if (!this.file()) throw new Error ("Attempted to grab cache from an unloaded file.");
        return require.cache[require.resolve (this.path)];
    }; static refresh (file, cache = false) {
        let _cache = [cache]; delete require.cache[require.resolve (this.path)];
        if (!cache) return file.file (); require.cache[require.resolve (this.path)] = _cache[0]; return file.file ();
    };
}; exports.main = File;
