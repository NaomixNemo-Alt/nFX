"use strict"; const config = require ("../../config.json"), { srcFolder, pkgFolder, nFXFolder } = config.folderNames;
function Path (path, options = { resolve: true }) {
	let safePath = ["../../"]; path = path.replace (/[\\|\/]+/g, "/"); Object.assign (this, { errors: this.errors || [], path });
	Object.assign (options, { resolve: options.resolve === true || false }); try {
		if (this.path == "") throw new Error ("path argument is left as an empty string");
		if (this.path.startsWith ("~")) {
			this.path = this.path.replace (/^\~/, ".");
			let _tempParents = __dirname.split (/[\\\/]+/g), _indexOfSelf = _tempParents.lastIndexOf (nFXFolder);
			if (_tempParents.length == 0) throw new Error (`${nFXFolder} folder is found -as- the root folder of __dirname`);
			if (_tempParents.length > (_indexOfSelf + 3)) throw new Error (`${nFXFolder} folder (or it's contents) is found broken / out of place. Please re-download it, place the contents in their proper place or edit this code`);
			let _hasPkgFolder = _tempParents[_indexOfSelf - 1] == pkgFolder ? { boolean: true, value: (_indexOfSelf + 1) } : { boolean: false, value: (_indexOfSelf - 1) },
				_hasSrcFolder = _hasPkgFolder.boolean ? _tempParents[_hasPkgFolder.value - 1] == srcFolder ? { boolean: true, value: (_hasPkgFolder.value + 2) } : { boolean: false, value: _indexOfSelf } : { boolean: false, value: _hasPkgFolder.value },
				_finalizedPath = this.path; if (_hasPkgFolder.boolean) delete _finalizedPath[_hasPkgFolder.value]; if (_hasSrcFolder.boolean) delete _finalizedPath[_hasSrcFolder.value];
				this.path = _finalizedPath; if (_hasPkgFolder.boolean) safePath[0] = `../${safePath[0]}`; if (_hasSrcFolder.boolean) safePath[0] = `../${safePath}`;
		}; if (exports.blacklist.find (item => item.useRegExp === true ? this.path.match (item.value) : this.path == item.value)) throw new Error (`${this.path} <-- Blacklisted path found!`);
		this.path = this.path.match (exports.RegExp); delete this.path.groups.end; delete this.path.groups.start;
		let { groups } = this.path; groups.file = [groups.file]; path = [this.path[0].replace (/(?<=\/)\.\//g).slice (groups.root.length).split ("/").filter (item => item)];
		for (let index in this.path[0]) {
			if (index == path[0].length) break;
			if (path[0][index].match (/^\.{2,}$/)) {
				for (let i in path[0][index].slice (1).split ("")) {
					let itemArray = [].concat (path[0].slice (0, index)), item = itemArray .reverse ().find (item => item && !item.match (/^\.{2,}$/));
					path[0][index] = path[0][index - (itemArray.indexOf (item) + 1)] = null;
				};
			};
		}; this.path = `${groups.root}${path[0].filter (item => item == this.path[0] || (item && `${item}/` != groups.root)).join ("/")}`.match (exports.RegExp); groups = [this.path.groups][0];
		this.path = [this.path[0]]; Object.assign (this.path, { file: {
			name: groups.name, extensions: groups.extensions ? groups.extensions.split ('.').slice (1).filter (parent => parent) : []
			}, parents: groups.parents.split (/[//\\]+/).slice (0, 1).filter (parent => parent)
		}); // Base.getStack.call (this, new Error ().stack); console.log (this); I am NOT going to make a full on path regexp right now. No. It. Can. Wait. pleasedontmakemesufferanymore
		delete this.path.name; delete this.path.extensions; } catch (error) { console.error (error); return this.errors.push (error) };
	Object.defineProperty (this, "safe path", { value: `${safePath[0]}${this.path}`.replace (/[\\\/]\.(?=[\\\/])/g, ""), writable: true, configurable: true, enumerable: false }); return this;
}; exports.main = Path; exports.blacklist = [/node\_modules/];
exports.RegExp = /(?<start>(?<=^|[^A-z0-9\\\/:]))(?<root>(([A-z]\:)|(~?\.*))[\\\/]+)(?<parents>([^<>:"\\\/|\?*\n ][^<>:"\\\/|\?*\n]*?[\\\/]+)*)(?<file>(?<name>[^<>:"\\\/|\?*\n .][^<>:"\\\/|\?*\n.]*?)?(?<extensions>\.([^<>:"\\\/|\?*\n]*?))*)(?<end> *?(?=[^A-z0-9\\\/]|$))/;
// exports.experimentalRegExp = /((?<=(^)|((?=([^ \n]+ +[^ \n]*))^[()"'`\[\]{}<>]|[()"'`\[\]{}<>])|((?=([^A-z][^ \n]+([\n]+(\n|$)|\n|$)))[^A-z])))(?<root>(([A-z]\:)|(~?\.*))[\\\/]+)(?<folders>([^<>:"\\\/|\?*\n ][^<>:"\\\/|\?*\n]*?[\\\/]+)*)(?<file>(?<name>[^<>:"\\\/|\?*\n .][^<>:"\\\/|\?*\n.]*)?(?<extensions>\.([^<>:"\\\/|\?*\n]*))*)(?<end>(?=[^A-z0-9\\\/]|$))/gs;
exports.experimental = /((?<=(^)|((?=([^ \n]+ +[^ \n]*))^[()"'`\[\]{}<>]|[()"'`\[\]{}<>])|((?=([^A-z][^ \n]+([\n]+(\n|$)|\n|$)))[^A-z])))(?<root>(([A-z]\:)|(~?\.*))[\\\/]+)(?<folders>([^<>:"\\\/|\?*\n ][^<>:"\\\/|\?*\n]*?[\\\/]+)*)(?<file>(?<name>[^<>:"\\\/|\?*\n .][^<:"\\\/|\?*\n.]*)?(?<extensions>\.([^<>:"\\\/|\?*\n]*))*)(?<end>(?=[^A-z0-9\\\/]|$))/gs;