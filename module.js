const nFX = require ("./helper.js");
exports.main = (path, options = undefined) => {
    var _this = { errors: [] };
    if (typeof path != "string" || !path) throw new Error ("path is not a string");
    nFX.lib.func.path.main.call (_this, path, options); if (_this.errors[0]) throw _this.errors[0];
    var _type = nFX.lib.func.typeof (nFX.node_modules.fs.lstatSync (_this.path[0]));
    return new _type (path, options);
};
