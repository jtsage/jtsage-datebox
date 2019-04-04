# Contributing to DateBox

First off, thanks for taking the time to contribute!

The following is a set of guidelines for contributing to DateBox, which is hosted in the [jtsage-datebox Repository](https://github.com/jtsage/jtsage-datebox) on GitHub. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

#### Table Of Contents

[Code of Conduct](#code-of-conduct)

[I don't want to read this whole thing, I just have a question!!!](#i-dont-want-to-read-this-whole-thing-i-just-have-a-question)

[How Can I Contribute?](#how-can-i-contribute)
  * [Reporting Bugs](#reporting-bugs)
  * [Suggesting Enhancements](#suggesting-enhancements)
  * [Pull Requests](#pull-requests)

[Styleguides](#styleguides)
  * [Git Commit Messages](#git-commit-messages)
  * [JavaScript Styleguide](#javascript-styleguide)

## Code of Conduct

This project and everyone participating in it is governed by the [DateBox Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [jtsage+datebox@gmail.com](mailto:jtsage+datebox@gmail.com).

## I don't want to read this whole thing I just have a question!!!

Questions should be e-mailed directly, or, prefereably, posted to stack overflow. The [datebox](https://stackoverflow.com/questions/tagged/datebox) tag works pretty well.  As with all code related questions, including a jsFiddle or the like with your question is very, very helpful.

* [Documentation](https://datebox.jtsage.dev)

If chat is more your speed, you can join the Atom and Electron Slack team:

## How Can I Contribute?

### Reporting Bugs

When you are creating a bug report, please [include as many details as possible](#how-do-i-submit-a-good-bug-report). Please use the bug report template and include as many details as you can.  The most important detail you can provide is the browser/OS combo, __and the version of DateBox__ you are using.

> **Note:** If you find a **Closed** issue that seems like it is the same thing that you're experiencing, open a new issue and include a link to the original issue in the body of your new one.

Explain the problem and include additional details to help maintainers reproduce the problem:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as many details as possible. 
* **Provide specific examples to demonstrate the steps**. Include links to files or GitHub projects, or copy/pasteable snippets, which you use in those examples. If you're providing snippets in the issue, use [Markdown code blocks](https://help.github.com/articles/markdown-basics/#multiple-lines).
* **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
* **Explain which behavior you expected to see instead and why.**
* **Include screenshots and animated GIFs** which show you following the described steps and clearly demonstrate the problem. If you use the keyboard while following the steps, You can use [this tool](https://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux.


### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for DateBox, including completely new features and minor improvements to existing functionality.

Please us the feature request template and provide as many details as possible.  For instance, if suggesting addition callbacks, include when it would fire, what paramaters or context it would pass, and what it could / should affect.

* **Use a clear and descriptive title** for the issue to identify the suggestion.
* **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
* **Provide specific examples to demonstrate the steps**. Include copy/pasteable snippets which you use in those examples, as [Markdown code blocks](https://help.github.com/articles/markdown-basics/#multiple-lines).
* **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
* **Include screenshots and animated GIFs** which help you demonstrate the steps or point out the part of Atom which the suggestion is related to. You can use [this tool](https://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux.


### Pull Requests

The process described here has several goals:

- Maintain DateBox's quality
- Fix problems that are important to users

Please follow these steps to have your contribution considered by the maintainers:

1. Follow all instructions in [the template](PULL_REQUEST_TEMPLATE.md)
2. Follow the [styleguides](#styleguides)

While the prerequisites above must be satisfied prior to having your pull request reviewed, the reviewer(s) may ask you to complete additional design work, tests, or other changes before your pull request can be ultimately accepted.

## Styleguides

### Git Commit Messages

These are suggestions.  Even the maintainer doesn't do a very good job following these.

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less 
* Reference issues and pull requests liberally after the first line


### JavaScript Styleguide

Please adhere to the style defined in the existing JavaScript files.  ESLint has been configured for this repository, and will force most of what is important to the maintainer.  Many popular editing packages can or will autoatically run ESLint as you type.  You may also run "npm test" before you commit to double check.  

If you installed all the devDependancies, you will actually be forece to run the test function as a git hook.
