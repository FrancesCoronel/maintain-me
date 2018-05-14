const fs = require('fs');
const path = require('path');
const test = require('ava');
const tempy = require('tempy');
const execa = require('execa');

const bin = path.join(__dirname, 'cli.js');

test('generateCommunityStandards', async t => {
	const cwd = tempy.directory();
	await execa(bin, {
		cwd
	});
	const src = fs.readFileSync(path.join(cwd, '.github/CONTRIBUTING.md'), 'utf8');
	t.true(src.includes('To get started'));
});
