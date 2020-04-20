"use strict";
function getPathLocation () {
	var root = process.cwd ().split (/[\\\/]+/g).reverse ()[0], element = this.path[0],
	rootRegExp = new RegExp (`^(~)|(\/${root.replace (/([.?*+^$[\]\\(){}|-])/g, "\\$1")})`);
	if (element == "/" && this.path.startsWith (`/${root}`)) element = "root";
	switch (element) {
		case "root":
			var safePath = `${process.cwd ()}/${this.path.replace (rootRegExp, "")}`.replace (/[\\\/]+/g, "/");
			this.path = this.path.replace (/[\\\/]+/g, "/"); break;
		case "~":
			var safePath = `${process.cwd ()}/${this.path.replace (rootRegExp, "")}`.replace (/[\\\/]+/g, "/");
			this.path = `/${root}${this.path.slice (1)}`.replace (/[\\\/]+/g, "/"); break;
		case ".":
			var safePath = `callerpath${this.path.slice (1)}`.replace (/[\\\/]+/g, "/");
			this.path = `/${root}/callerpathCut${this.path.slice (1)}`.replace (/[\\\/]+/g, "/"); break;
		default: var safePath = this.path;
	}; return safePath;
};
function Path (path, options = { resolve: true }) {
	path = path.replace (/[\\|\/]+/g, "/"); Object.assign (this, { errors: this.errors || [], path });
	Object.assign (options, { resolve: options.resolve === true || false }); try {
		if (this.path == "") throw new Error ("path argument is left as an empty string");
		var safePath = getPathLocation.call (this);
		if (exports.blacklist.find (item => item.useRegExp === true ? this.path.match (item.value) : this.path == item.value)) throw new Error (`${this.path} <-- Blacklisted path found!`);
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
		this.path = [this.path[0]]; Object.assign (this.path, { file: [], parents: groups.parents.split (/[\\\/]+/).slice (0).filter (parent => parent)
		}); this.path.file.name = groups.name; this.path.file.extensions = groups.extensions ? groups.extensions.split ('.').slice (1).filter (parent => parent) : []
		delete this.path.name; delete this.path.extensions; this.path.push (safePath) } catch (error) { console.error (error); return this.errors.push (error) };
	return this;
}; exports.main = Path; exports.blacklist = [/node\_modules/];
exports.RegExp = /(?<start>(?<=^|[^A-z0-9\\\/:]))(?<root>(([A-z]\:)|(~?\.*))[\\\/]+)(?<parents>([^<>:"\\\/|\?*\n ][^<>:"\\\/|\?*\n]*?[\\\/]+)*)(?<file>(?<name>[^<>:"\\\/|\?*\n .][^<>:"\\\/|\?*\n.]*?)?(?<extensions>\.([^<>:"\\\/|\?*\n]*?))*)(?<end> *?(?=[<>:"\\\/|\?*\n]|$))/;
// exports.experimentalRegExp = /((?<=(^)|((?=([^ \n]+ +[^ \n]*))^[()"'`\[\]{}<>]|[()"'`\[\]{}<>])|((?=([^A-z][^ \n]+([\n]+(\n|$)|\n|$)))[^A-z])))(?<root>(([A-z]\:)|(~?\.*))[\\\/]+)(?<folders>([^<>:"\\\/|\?*\n ][^<>:"\\\/|\?*\n]*?[\\\/]+)*)(?<file>(?<name>[^<>:"\\\/|\?*\n .][^<>:"\\\/|\?*\n.]*)?(?<extensions>\.([^<>:"\\\/|\?*\n]*))*)(?<end>(?=[^A-z0-9\\\/]|$))/gs;
exports.experimental = /((?<=(^)|((?=([^ \n]+ +[^ \n]*))^[()"'`\[\]{}<>]|[()"'`\[\]{}<>])|((?=([^A-z][^ \n]+([\n]+(\n|$)|\n|$)))[^A-z])))(?<root>(([A-z]\:)|(~?\.*))[\\\/]+)(?<folders>([^<>:"\\\/|\?*\n ][^<>:"\\\/|\?*\n]*?[\\\/]+)*)(?<file>(?<name>[^<>:"\\\/|\?*\n .][^<:"\\\/|\?*\n.]*)?(?<extensions>\.([^<>:"\\\/|\?*\n]*))*)(?<end>(?=[^A-z0-9\\\/]|$))/gs;
