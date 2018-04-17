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
 * If there is an email
 */
if (cli.flags.email) {
	config.set('email', cli.flags.email);
}

/**
 * TODO: Refactor
 */
function generateCommunityStandards() {
	// README
	const templateREADME = 'README.md';
	const templateREADMESrc = fs.readFileSync(
		path.join(__dirname, 'vendor/README.md'),
		'utf8'
	);
	fs.writeFileSync(templateREADME, templateREADMESrc);
	console.log(`${logSymbols.info} Added README`);

	// LICENSE
	const templateLicense = 'LICENSE';
	const templateLicenseSrc = fs.readFileSync(
		path.join(__dirname, 'vendor/LICENSE'),
		'utf8'
	);
	fs.writeFileSync(templateLicense, templateLicenseSrc);
	console.log(`${logSymbols.info} Added LICENSE`);

	// CONTRIBUTING
	const templateContributing = 'CONTRIBUTING.md';
	const templateContributingSrc = fs.readFileSync(
		path.join(__dirname, 'vendor/CONTRIBUTING.md'),
		'utf8'
	);
	fs.writeFileSync(templateContributing, templateContributingSrc);
	console.log(`${logSymbols.info} Added CONTRIBUTING`);

	// Create .github folder
	mkdirp('.github', err => {
		if (err) {
			console.error(err);
		}
	});

	// CODE OF CONDUCT
	const templateCodeOfConduct = '.github/CODE_OF_CONDUCT.md';
	const templateCodeOfConductSrc = fs.readFileSync(
		path.join(__dirname, 'vendor/CODE_OF_CONDUCT.md'),
		'utf8'
	);
	fs.writeFileSync(templateCodeOfConduct, templateCodeOfConductSrc);
	console.log(`${logSymbols.info} Added CODE_OF_CONDUCT`);

	// ISSUE TEMPLATE
	const templateIssue = '.github/ISSUE_TEMPLATE.md';
	const templateIssueSrc = fs.readFileSync(
		path.join(__dirname, 'vendor/ISSUE_TEMPLATE.md'),
		'utf8'
	);
	fs.writeFileSync(templateIssue, templateIssueSrc);
	console.log(`${logSymbols.info} Added ISSUE_TEMPLATE`);

	// PULL REQUEST TEMPLATE
	const templatePullRequest = '.github/PULL_REQUEST_TEMPLATE.md';
	const templatePullRequestSrc = fs.readFileSync(
		path.join(__dirname, 'vendor/PULL_REQUEST_TEMPLATE.md'),
		'utf8'
	);
	fs.writeFileSync(templatePullRequest, templatePullRequestSrc);
	console.log(`${logSymbols.info} Added PULL_REQUEST_TEMPLATE`);

	// Congrats
	console.log(
		`\n${
			logSymbols.success
		} Congrats! Your project now adheres to GitHub's recommended community standards. 💛️️
	`
	);
}

generateCommunityStandards();
