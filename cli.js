#!/usr/bin/env node

'use strict';

const path = require('path');
const fs = require('fs');
const meow = require('meow');
const Conf = require('conf');
const logSymbols = require('log-symbols');
const mkdirp = require('mkdirp');

const config = new Conf();
const cli = meow(`
	Usage
	  $ maintain-me
`);

/**
 * Sets email if already configured previously
 */
if (cli.flags.email) {
	config.set('email', cli.flags.email);
}

/**
 * Writes file to directory and logs addition to console
 *
 * @param {string} fileName
 * @param {string} source
 * @param {string} destination
 */
const writeStandard = (fileName, source, destination) => {
	const sourceFilePath = fs.readFileSync(path.join(__dirname, source), 'utf8');
	fs.writeFileSync(destination, sourceFilePath);
	console.log(`${logSymbols.info} Added ${fileName}`);
};

/**
 * Creates a directory and logs error if any
 *
 * @param {string} directoryName
 */
const createDirectory = directoryName => {
	mkdirp(directoryName, err => {
		if (err) {
			console.error(err);
		}
	});
};

/**
 * Writes 6 pre-defined templates to fulfill GitHub's community standards
 */
function generateCommunityStandards() {
	// README
	writeStandard('README', 'vendor/README.md', 'README.md');
	// LICENSE
	writeStandard('LICENSE', 'vendor/LICENSE', 'LICENSE');
	// CONTRIBUTING
	writeStandard('CONTRIBUTING', 'vendor/CONTRIBUTING.md', 'CONTRIBUTING.md');
	// Create .github folder
	createDirectory('.github');
	// CODE OF CONDUCT
	writeStandard(
		'CODE_OF_CONDUCT',
		'vendor/CODE_OF_CONDUCT.md',
		'.github/CODE_OF_CONDUCT.md'
	);
	// ISSUE TEMPLATE
	writeStandard(
		'ISSUE_TEMPLATE',
		'vendor/ISSUE_TEMPLATE.md',
		'.github/ISSUE_TEMPLATE.md'
	);
	// PULL REQUEST TEMPLATE
	writeStandard(
		'PULL_REQUEST_TEMPLATE',
		'vendor/PULL_REQUEST_TEMPLATE.md',
		'.github/PULL_REQUEST_TEMPLATE.md'
	);
	// Congrats
	console.log(
		`\n${
			logSymbols.success
		} Congrats! Your project now adheres to GitHub's recommended community standards. 💛️️
	`
	);
}

generateCommunityStandards();
