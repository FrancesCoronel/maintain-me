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
	// Create .github folder
	createDirectory('.github');
	// Create ISSUE_TEMPLATE folder
	createDirectory('.github/ISSUE_TEMPLATE');
	// README
	writeStandard('README', 'vendor/README.md', 'README.md');
	// LICENSE
	writeStandard('LICENSE', 'vendor/LICENSE', 'LICENSE');
	// CONTRIBUTING
	writeStandard('CONTRIBUTING', 'vendor/.github/CONTRIBUTING.md', '.github/CONTRIBUTING.md');
	// CODE OF CONDUCT
	writeStandard(
		'CODE_OF_CONDUCT',
		'vendor/.github/CODE_OF_CONDUCT.md',
		'.github/CODE_OF_CONDUCT.md'
	);
	// DEFAULT ISSUE TEMPLATE
	writeStandard(
		'ISSUE_TEMPLATE (Default)',
		'vendor/.github/ISSUE_TEMPLATE.md',
		'.github/ISSUE_TEMPLATE.md'
	);
	// BUG REPORT ISSUE TEMPLATE
	writeStandard(
		'ISSUE_TEMPLATE (Bug report)',
		'vendor/.github/ISSUE_TEMPLATE/Bug_report.md',
		'.github/ISSUE_TEMPLATE/Bug_report.md'
	);
	// FEATURE REQUEST ISSUE TEMPLATE
	writeStandard(
		'ISSUE_TEMPLATE (Feature request)',
		'vendor/.github/ISSUE_TEMPLATE/Feature_request.md',
		'.github/ISSUE_TEMPLATE/Feature_request.md'
	);
	// PULL REQUEST TEMPLATE
	writeStandard(
		'PULL_REQUEST_TEMPLATE',
		'vendor/.github/PULL_REQUEST_TEMPLATE.md',
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
