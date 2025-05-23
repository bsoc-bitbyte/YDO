# 🤝 Contributing to YDO (You Deserve One)

Thank you for your interest in contributing to **YDO**! This document provides guidelines to help you get started and ensure a smooth collaboration process.

## ✨ Project Overview

**YDO (You Deserve One)** is a unique matchmaking application. Users select 5 choices, and if two users mutually select the same individual, they are revealed as a match.

### Key Focus Areas:

* **Extreme Data Privacy & Security**: Implementing public-private key encryption to keep user data unintelligible, even to developers.

* **Smooth Performance**: Efficient loading and searching through large datasets of student names and roll numbers.

* **Robust Profile System**: A comprehensive and user-friendly profile system.

* **Attractive & Fluid UI**: Intuitive and visually appealing interface with smooth interactions.

## 🛠️ Tech Stack

**Backend**: Python, Supabase, Flask

**Frontend**: React, Lucide (icons), JavaScript (no TypeScript)

### Frontend Development Notes:

* **Animations**: We prioritize pure CSS/JS solutions for animations.

* **Component Reusability**: Designed for modularity and easy component reuse.

* **Component Library**: Prefer custom components.


## 🚀 How to Contribute

We welcome all contributions, including:

* Bug reports

* Feature requests

* Documentation improvements

* Code contributions

## 🐛 Reporting Bugs

If you find a bug, please open an issue on our GitHub repository. Include:

* A clear and concise description.

* Steps to reproduce the behavior.

* Expected behavior.

* Screenshots or error messages (if applicable).

* Your operating system and browser information.

## 💡 Suggesting Enhancements

Have an idea for a new feature or improvement? Open an issue and describe your suggestion in detail, explaining its value to YDO.

## 💻 Your First Code Contribution

Follow this general workflow for code contributions:

```bash
# Fork the repository and clone your fork
git clone [your-fork-url]

# Create a new branch
git checkout -b feature/your-feature-name
# or
git checkout -b bugfix/issue-description

# Make your changes

# Commit your changes following our commit message guidelines

# Push your branch
git push origin feature/your-feature-name
```

Then, open a Pull Request (PR) to the `main` branch. Provide a clear description and reference related issues.

## 📝 Commit Message Guidelines

We use **Conventional Commits**. Our Commitlint configuration enforces the following format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Rules Explained:**

* **`<type>` (Mandatory):** Must be one of the following (lower-case):

  * `build`: Build system or external dependencies

  * `chore`: Routine tasks (e.g., updating dependencies)

  * `ci`: CI configuration changes

  * `docs`: Documentation-only changes

  * `feat`: New feature

  * `fix`: Bug fix

  * `perf`: Performance improvements

  * `refactor`: Code restructuring without behavior change

  * `revert`: Reverting a previous commit

  * `style`: Code formatting, white-space, etc.

  * `test`: Adding/correcting tests

* **`<scope>` (Optional):** Short description of the scope (e.g., `frontend`, `backend-auth`).

* **`<subject>` (Mandatory):** Concise description of the change:

  * Use imperative, present tense (e.g., add not added)

  * No capitalization at the beginning

  * No period (.) at the end

  * Max 100 characters

* **`<body>` (Optional):** Longer description of the commit:

  * Start with a blank line after subject

  * Describe what and why

  * Max line length: 100 characters


* **`<footer>` (Optional):** Information like breaking changes or issue references:

  * Start with a blank line after body

  * Reference issues (e.g., `Closes #123`, `Fixes #456`)

**✅ Example Commit Message:**

```
feat(frontend): add responsive navigation bar

This commit introduces a new responsive navigation bar for better user experience on mobile devices.

Closes #789
```

To perform multiline commit message you could use `git commmit` and then write the message in your editor.

**Remember :** In the commit messages, you do not need to explain what you did, we can read that in the code, but it's usually very useful to explain why you did things.

---

## 📂 Project Structure

* `backend/` - Python Flask API and Supabase interactions

*  `fronted` - The rest of the code apart from the backend folder is the complete frontend 


## 🗺️ Issue Timeline & Roadmap

Our development roadmap is structured around key features:

* **Frontend**

  * Home page

  * Login form

  * Dashboard layout

  * Toast notification system

  * Opt-out page

  * Dynamic search/select view

  * Dynamic profile view

* **Backend**

  * Login logic (restrict to `@iiitdmj.ac.in`)

  * Search endpoint

  * Dynamic opt-out

  * Opt-out functionality

  * Profile load/edit

  * Public key exchange

  * Choice select/deselect

  * Fake requests/selects

* **Research**

  * Data extraction and insertion from `iiitdmj.ac.in` (under consideration)

Expect many smaller, in-between issues as we progress.

## 🎨 Design Resources

* [**Figma Link**](https://www.figma.com/design/qaiNixV0TQvIu2v2L6bdv6/YDO---BSoC?node-id=0-1&p=f&t=hRvzdbSnt4uHBvhs-0)

## ❓ Getting Help

If you have questions or need assistance:

* Open an issue on the GitHub repository.

* Reach out to the project maintainers directly.

Thank you for helping us build YDO!
We look forward to your contributions. 🚀
