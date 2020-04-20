"use strict"; const nFX = require ("../../helper.js");
function getType (stats) {
    var type = [undefined]; try {
        if (!(stats && stats.constructor.name == "Stats")) throw new Error ("Stats argument is either undefined or not a direct instance of Stats class.");
        if (stats.isSymbolicLink ()) return type[0] = "Symbolic Link";
        if (stats.isDirectory ()) return type[0] = nFX.lib.class.Folder ();
        if (stats.isFile ()) return type[0] = nFX.lib.class.File ();
        type[0] = nFX.lib.class.Base ();
    } catch (error) { type[1] = error };
    return type;
}; module.exports = getType;