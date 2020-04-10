"use strict"; const Base = require ("../class/Base.js").main, File = require ("../class/File.js").main, Folder = require ("../class/Folder.js").main;
function getType (stats) {
    var type = [undefined]; try {
        if (!(stats && stats.constructor.name == "Stats")) throw new Error ("Stats argument is either undefined or not a direct instance of Stats class.");
        if (stats.isSymbolicLink ()) return type[0] = "Symbolic Link";
        if (stats.isDirectory ()) return type[0] = Folder;
        if (stats.isFile ()) return type[0] = File;
        type[0] = Base;
    } catch (error) { type[1] = error };
    return type;
}; module.exports = getType;
