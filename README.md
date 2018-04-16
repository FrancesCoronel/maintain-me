# maintain-me

[![GitHub Issues](https://img.shields.io/github/issues/fvcproductions/maintain-me.svg?style=flat-square)](https://github.com/fvcproductions/maintain-me/issues) [![GitHub Pull Requests](https://img.shields.io/github/issues-pr/fvcproductions/maintain-me.svg?style=flat-square)](https://github.com/fvcproductions/maintain-me/pulls) [![MIT License](https://img.shields.io/github/license/fvcproductions/maintain-me.svg?style=flat-square)](http://badges.mit-license.org) [![Donate via PayPal](https://img.shields.io/badge/Donate-PayPal-blue.svg?style=flat-square)](http://paypal.me/fvcproductions) [![Become a Patron!](https://img.shields.io/badge/Patreon-Become%20a%20Patron!-orange.svg?style=flat-square)](https://www.patreon.com/fvcproductions)

Fulfill all of GitHub's community standards with one command.

**Currently a WORK IN PROGRESS - do not expect this to work yet.**

![Community Standards](https://i.imgur.com/JxRWP1g.png)

## Installation

```bash
# install module globally
npm i -g maintain-me
```

## Usage

```bash
maintain-me
```

This creates the following files:

* `README.md`
* `CONTRIBUTING.md`
* `LICENSE`
* `CODE_OF_CONDUCT.md`
* `ISSUE_TEMPLATE.md`
* `PULL_REQUEST_TEMPLATE.md`

```text
.
├── .github
│   ├── CODE_OF_CONDUCT.md
│   ├── ISSUE_TEMPLATE.md
│   └── PULL_REQUEST_TEMPLATE.md
├── CONTRIBUTING.md
├── LICENSE
└── README.md
```

You can also use this to update an existing Code of Conduct.

When generating a new Code of Conduct it will try to infer your email to use as contact email. If it can't, it will prompt for it. The email is persisted and only asked once. You can force update the email with `maintain-me --email=your@email.com`. When updating an existing Code of Conduct, it will use the existing contact email unless you pass the `--email` flag.

## Testing

```bash
npm run test
```

## Deployment

```bash
npm publish
np
```

## Contributing

> To get started...

1.  🍴 [Fork this repo](https://github.com/fvcproductions/maintain-me#fork-destination-box)
2.  🔨 View the contributing guidelines at [CONTRIBUTING.md](CONTRIBUTING.md)
3.  👥 Add yourself as a contributor under the credits section
4.  🔧 [Open a new pull request](https://github.com/fvcproductions/maintain-me/compare)
5.  🎉 Get your pull request approved - success!

Or just [create an issue](https://github.com/fvcproductions/maintain-me/issues) - any little bit of help counts! 😊

## Code of Conduct

In the interest of fostering an open and welcoming environment, we as contributors and maintainers pledge to making participation in our project and our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

More details can be found at this project's [code of conduct](.github/CODE_OF_CONDUCT.md).

## Further Resources

* [GitHub's Open Source Guide](https://opensource.guide/)
* [awesome-github-templates](https://github.com/devspace/awesome-github-templates)
* [github-issue-templates](https://github.com/stevemao/github-issue-templates)
* [open-source-templates](https://github.com/TalAter/open-source-templates)
* [github-templates](https://github.com/tylucaskelley/github-templates)
* [inspiring-github-templates](https://github.com/VarCI/inspiring-github-templates)

## Credits

* [FVCproductions](https://github.com/fvcproductions) 🍓🍫
