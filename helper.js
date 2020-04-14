exports.lib = {
    class: {
        Base: function () { return require ("./lib/class/Base.js").main },
        File: function () { return require ("./lib/class/File.js").main },
        Folder: function () { return require ("./lib/class/Folder.js").main }
    }, func: {
        path: require ("./lib/func/path.js"),
        typeof: require ("./lib/func/typeof.js")
    }
}; exports.node_modules = {
    fs: require ("fs"), filesize: require ("filesize")
}
