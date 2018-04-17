#!/usr/bin/env node

'use strict';
const path = require('path');
const fs = require('fs');
const meow = require('meow');
const inquirer = require('inquirer');
const globby = require('globby');
const getEmails = require('get-emails');
const chalk = require('chalk');
const Conf = require('conf');
const execa = require('execa');
const logSymbols = require('log-symbols');
var mkdirp = require('mkdirp');
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
 * Find Email
 */
function findEmail() {
	let email;
	try {
		email = execa.sync('git', ['config', 'user.email']).stdout.trim();
	} catch (err) {}

	return email;
}

/**
 * Generate code of conduct
 * @param {any} filepath
 * @param {any} email
 */
function write(filepath, email) {
	const src = fs.readFileSync(
		path.join(__dirname, 'vendor/CODE_OF_CONDUCT.md'),
		'utf8'
	);
	let emailAddressPattern = '[INSERT EMAIL ADDRESS]';
	let emailAddressRegex = new RegExp(emailAddressPattern, 'g');
	fs.writeFileSync(filepath, src.replace(emailAddressRegex, email));
}

function generate(filepath, email) {
	write(filepath, email);
	console.log(`${logSymbols.success} Added a Code of Conduct to your project!
		\n\n${chalk.bold(
			'Please carefully read this document and be ready to enforce it.'
		)}\n\nIt can be found at ${filepath}.`);
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
	mkdirp('.github', function(err) {
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

function init() {
	const results = globby.sync(
		[
			'code_of_conduct.*',
			'code-of-conduct.*',
			'.github/code_of_conduct.*',
			'.github/code-of-conduct.*'
		],
		{
			nocase: true
		}
	);

	// Update existing
	if (results.length > 0) {
		const filepath = results[0];
		const existingSrc = fs.readFileSync(filepath, 'utf8');
		const email = Array.from(getEmails(existingSrc))[0];
		write(filepath, cli.flags.email || email);
		console.log(`${logSymbols.success} Updated your Code of Conduct file`);
		return;
	}

	const templateCodeOfConduct = 'CODE_OF_CONDUCT.md';

	if (config.has('email')) {
		generate(templateCodeOfConduct, config.get('email'));
		return;
	}

	const email = findEmail();
	if (email) {
		config.set('email', email);
		generate(templateCodeOfConduct, email);
		return;
	}

	if (process.stdout.isTTY) {
		inquirer
			.prompt([
				{
					type: 'input',
					name: 'email',
					message: `Couldn't infer your email. Please enter your email:`,
					validate: x => x.includes('@')
				}
			])
			.then(answers => {
				generate(templateCodeOfConduct, answers.email);
			});
	} else {
		console.error(
			`Run \`${chalk.cyan(
				'maintain-me --email=your@email.com'
			)}\` once to save your email.`
		);
		process.exit(1);
	}
}

// init();
generateCommunityStandards();
