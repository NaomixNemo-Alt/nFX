"use strict"; const config = require ("../../config.json"), { srcFolder, pkgFolder, nFXFolder } = config.folderNames;
function Path (path, options = { resolve: true }) {
	path = path.replace(/[\\|\/]+/g, "/"); Object.assign(this, { errors: this.errors || [], path });
	Object.assign(options, { resolve: options.resolve === true || false }); try {
		if (this.path == "") throw new Error ("path argument is left as an empty string");
		if (options.resolve) {
			let _tempParents = __dirname.split("/"), _indexOfSelf = _tempParents.lastIndexOf(nFXFolder);
			if (_tempParents.length == 0) throw new Error (`${nFXFolder} folder is found -as- the root folder of __dirname`);
			if (_tempParents.length > _indexOfSelf + 2) throw new Error (`${nFXFolder} folder (or it's contents) is found broken / out of place. Please re-download it, place the contents in their proper place or edit this code`);
			let _hasPkgFolder = _tempParents[_indexOfSelf - 1] == pkgFolder ? { boolean: true, value: _tempParents.lastIndexOf(pkgFolder) } : { boolean: false, value: _indexOfSelf },
				_hasSrcFolder = _hasPkgFolder.boolean ? _tempParents[_hasPkgFolder.value - 1] == srcFolder ? { boolean: true, value: _tempParents.lastIndexOf(srcFolder) } : { boolean: false, value: _indexOfSelf } : _indexOfSelf,
				_finalizedPath = _tempParents.slice (0, _hasSrcFolder.boolean ? _hasSrcFolder.value : _hasPkgFolder.boolean ? _hasPkgFolder.value : _indexOfSelf); this.path = _finalizedPath;
		}; if (blacklist.find (item => item.useRegExp === true ? this.path.match (item.value) : this.path == item.value)) throw new Error(`${this.path} <-- Blacklisted path found!`);
		this.path = this.path.match (/(?<root>^(([^\<\>\:\"\/\\\|\?\*]+\:[\\|\/]+)|(\.*[\\|\/]+))?)(?<parents>([^\<\>\:\"\/\\\|\?\*]+[\\|\/]\+)*)(?<file>(?<name>([^\<\>\:\"\/\\\|\?\*\.]+)?)(?<extensions>(\.[^\<\>\:\"\/\\\|\?\*]+)*)?)/);
		let { groups } = this.path; groups.file = []; path = [this.path[0].replace (/(?<=\/)\.\//g).slice (groups.root.length).split ("/").filter (item => item)];
		for (let index in this.path[0]) {
			if (path[0][index].match (/^\.{2,}$/)) {
				for (let i in path[0][index].slice (1).split ("")) {
					let itemArray = [].concat (path[0].slice (0, index)), item = itemArray .reverse ().find (item => item && !item.match (/^\.{2,}$/));
					path[0][index] = path[0][index - (itemArray.indexOf (item) + 1)] = null;
				};
			};
		}; this.path = [`${groups.root}${path[0].filter(item => item && `${item}/` != groups.root).join ("/")}`];
		Object.assign(this.path, groups); Object.assign(this.path.file, { name: this.path.name, extensions: this.path.extensions });
		delete this.path.file.name; delete this.path.file.extensions } catch (error) { return this.errors.push(error) };
	return this;
}; Object.assign (exports, { Path, regexp: "wip" });

/**
 * @name Path
 * @type Function
 * @typedef Path
 * @this 'this' is used here for adding errors in async to the parent object with ease.
 * @example (location: /app/) Path ("./path/to/file.js", { resolve: true });
 * @param {string} path - The user-inputted path to work with
 * @param {Object} [options={resolve:false}] - Options, most options are not user-options and are just for the system to tell itself what it needs to do.
 * @param {boolean} [options.resolve=false] - Whether the system requests to resolve the path or not.
 * @returns ["/app/path/to/file.js", root: ".", parents: ["path", "to"], file: "file.js", name: "file", extensions: ["js"]]
 */
