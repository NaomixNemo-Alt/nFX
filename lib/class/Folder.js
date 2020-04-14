"use strict"; const nFX = require ("../../helper.js");
let defineOpts = value => { return { value, enumerable: false, configurable: true, writable: true } };
class Folder extends nFX.lib.class.Base () {
    constructor (path, options) {
        super (path, options); Object.defineProperty (this, "children", defineOpts ([]));
        if (this.constructor == Folder) this.promise = true;
    }; loadChildren (options = { }, includes = ["keep children"]) {
        try {
            if (typeof options != "object") throw new Error ("options is not a valid object.");
            options = Object.assign ({ }, { blacklist: nFX.lib.func.path.blacklist, whitelist: /^$/, endless: false }, options || { });
            let children = nFX.node_modules.fs.readdirSync (this.path[0]).filter (child => (!child.match (options.blacklist) && child.match (options.whitelist)) || include.includes (child));
            Object.keys (this.children).filter (key => include[0] === "keep children" ? false : !children.includes (key.slice (1)).map (child => delete this.children[child]));
            this.children = this.children.filter (child => child); for (let i in children) {
                let child = { name: children[i], path: `${this.path[0]}/${children[i]}` };
                child.type = require ("../func/typeof.js") (nFX.node_modules.fs.lstatSync (child.path));
                if (child.type[1]) throw new Error ("unknown child type");
                (async function () {
                    this[`/${child.name}`] = new child.type (child.path);
                    if (child.type == Folder && options.endless === true) this[`/${child.name}`].loadChildren (options);
                }.bind (this)()); Object.defineProperty (this.children, "size", {
                    get: function () { return this[`/${child.name}`] }.bind (this),
                    enumerable: true, configurable: true });
            }; return this;
        } catch (error) { this.errors.push (error) };
    };
}; exports.main = Folder;