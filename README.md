<h1 align="center">YDO (You Deserve One) 💖</h1>

<p align="center">
  Crafting connections, byte by byte.
</p>

## ✨ Project Overview

**YDO (You Deserve One)**  is a revolutionary romantic matchmaking application **engineered to bring brilliant minds together.** It addresses the common challenge of finding genuine romantic connections within a focused community, like engineering college students, by offering a thoughtful approach to compatibility. The magic happens when users thoughtfully curate their top 5 choices; a mutual selection instantly reveals a promising match, fostering authentic relationships.

## ✨ Features

YDO is meticulously crafted with these core principles:

-   **Intuitive Design, Seamless Connections:** Navigate your romantic journey with an interface so smooth, it feels like it reads your mind – no complex algorithms to decipher, just pure intuition.
-   **Fortress-Level Privacy:** Your data is shielded with robust encryption, ensuring complete anonymity – even from us, the developers. Connect with absolute peace of mind.
-   **Lightning-Fast Discovery:** Effortlessly explore profiles and find potential matches in mere seconds, because time is precious, especially during crunch week.
-   **Profiles that Pop:** Craft a dynamic and insightful showcase of yourself, designed to highlight your unique brilliance and attract your ideal match.

## 🛠️ Tech Stack

YDO is built using:

-   **Frontend:**
    -   React
    -   JavaScript
    -   Lucide Icons
    -   Pure CSS/JS
-   **Backend:**
    -   Python
    -   Flask
    -   Supabase
    -   PostgreSQL
-   **Package Management:**
    -   npm / Yarn
    -   pip
-   **Version Control:**
    -   Git
    -   GitHub

## 🗺️ Roadmap Highlights

Our development roadmap is structured around key features:
Frontend: Home page, Login form, Dashboard, Toast notifications, Opt-out page, Dynamic search/select, Dynamic profile view.
Backend: Login logic (restrict to @iiitdmj.ac.in), Search endpoint, Dynamic opt-out, Profile management, Public key exchange, Choice selection, Fake requests/selects.
Research: Data extraction from iiitdmj.ac.in.
This roadmap guides our journey, and we anticipate numerous smaller, impactful issues will naturally arise as we progress, offering excellent opportunities for contribution.

## 📁 Project Structure

Our project is neatly organized into these key directories:

-   `backend/` - The robust Python Flask API, seamlessly interacting with Supabase.
-   `frontend/` - Your intuitive React application, bringing the user experience to life.
-   `supabase/` - Local Supabase configurations, powering our database and backend services.

## ⚙️ Installation

To get YDO up and running on your local machine, follow these comprehensive steps:

### Prerequisites
Before you start, ensure you have the following installed on your system. You can verify their presence first, and then proceed with installation if necessary:

-   **Git**
    -   *Verification:* Open your terminal and run `git --version`.
    -   *Installation:* If Git is not found, download and install it from [Git SCM](https://git-scm.com/downloads).
-   **Docker**
    -   *Verification:* Ensure Docker Desktop (or daemon) is running. In your terminal, run `docker --version`.
    -   *Installation:* If not installed or running:
        -   **For Windows/macOS:** Follow the detailed instructions on [Get Docker Desktop](https://docs.docker.com/get-docker/).
        -   **For Linux:** It is highly recommended to install **Docker Engine** via your distribution's package manager rather than **Docker Desktop**. Follow the specific instructions for your distribution on [Install Docker Engine on Linux](https://docs.docker.com/engine/install/).
-   **Node.js (v22 or later) and npm/Yarn**
    -   *Verification:* Run `node -v` and `npm -v` (or `yarn -v`) in your terminal.
    -   *Installation:* If not present or an older version, download and install Node.js from [Node.js Official Website](https://nodejs.org/en/download/). (npm is typically included. Optionally, install Yarn globally via npm: `npm install -g yarn`).
-   **Python (v3.11 or later) and pip**
    -   *Verification:* Run `python3 --version` and `pip3 --version` in your terminal.
    -   *Installation:* If not present or an older version, download and install Python from [Python.org](https://www.python.org/downloads/).
-   **Supabase CLI**
    -   *Verification:* Run `supabase --version` in your terminal.
    -   *Installation:* If not found, follow the installation guide on [Supabase CLI: Getting Started](https://supabase.com/docs/guides/local-development/cli/getting-started).
    > **Note:** When installing Supabase CLI, ensure you use OS-specific commands as outlined in the official documentation, rather than nodejs commands.
    > **Warning** Don't use `supabase init` command as instructed in the documentation.

### Getting Started

1.  **Fork the Repository:**
    -   Start by forking the [YDO GitHub repository]

2.  **Clone Your Fork:**
    -   Open your terminal and clone your forked repository. Remember to replace `[your-fork-url]` with the URL of your forked repository.
        ```bash
        git clone [your-fork-url] YDO
        cd YDO
        ```

3.  **Supabase Configuration:**
    -   Navigate into the `supabase/` directory:
        ```bash
        cd supabase
        ```
    -   Create a `.env` file within `supabase/` and input the required environment variables for your local Supabase setup. (You might find a `.env.example` file in the repository to guide you, or you can ask on Discord/project channels for the specific variables needed.)
    -   Return to the root directory:
        ```bash
        cd ..
        ```
        **For the main application:**
        -   Create another `.env` file in the **root directory** of the YDO project. This file will hold environment variables needed by the application (e.g., API keys, client-side Supabase credentials).
    -   For the specific inputs needed for both `.env` files, you can refer to any `.env.example` files in the repository or ask for assistance on the project's Discord channel.

4.  **Start Supabase:**
    -   From the root of the `YDO` directory, start the local Supabase services using the Supabase CLI:
        ```bash
        supabase start
        ```
    -   This will initialize and run the Supabase stack (PostgreSQL, authentication, etc.) in Docker.

5.  **Run the Application:**
    -   From the root of the `YDO` directory, execute the `run.py` script. This script is designed to handle both frontend and backend setup and startup processes.
        ```bash
        python run.py
        # Or, if 'python' isn't aliased to python3 on your system:
        python3 run.py
        ```
    -   The script will typically guide you through the setup and then launch the application.
    > **Troubleshooting `pip3 install` errors:**
    > If `python run.py` (or `python3 run.py`) throws an error indicating `[ERROR] Command failed: pip3 install -r requirements.txt`, it might be due to dependency conflicts in your global Python environment. In such cases, it is highly recommended to use a Python virtual environment to isolate project dependencies. Learn how to use a virtual environment [here](https://www.w3schools.com/python/python_virtualenv.asp).

6.  **Stopping the Application:**
    -   To stop the running application, first stop the Supabase services by running:
        ```bash
        supabase stop
        ```
    -   Then, press `Ctrl + C` in the terminal where the `run.py` script is executing.

> **Note:** It is highly recommended to review the `run.py` script to understand the commands it executes and the underlying processes it manages for a smoother development experience.

---

## 🚀 Usage

Once the YDO application is up and running after following the installation steps, you can begin exploring and connecting!

1.  **Access the Application:**
    -   Open your web browser and navigate to the specific port displayed in your terminal output where the frontend is served.

2.  **Sign Up or Log In:**
    -   Upon your first visit, you'll be guided through the account creation process. Existing users can simply log in. (Remember the `@iiitdmj.ac.in` email restriction for signup if applicable).

3.  **Make Your Choices:**
    -   Explore the profiles presented and thoughtfully select your top 5 choices. This is the heart of YDO's unique matchmaking process.

4.  **Discover Matches:**
    -   The system reveals a match when there's a mutual selection: if you and another user both include each other in your respective top 5 choices.

5.  **Manage Your Profile & Connections:**
    -   Utilize your personal dashboard to update your profile information, review your current selections, and engage with your revealed matches.

Start connecting and see who you're meant to discover!

---

## 🤝 How to contribute
We heartily welcome all contributions to YDO, including bug reports, feature requests, documentation improvements, and code contributions.

Before you dive in, please take a moment to review our comprehensive [CONTRIBUTING.md](./CONTRIBUTING.md) guide. It contains all the detailed instructions you'll need to get started, including information on commit message formats, development workflows, and more!

---

## 🎨 Design Resources
* [**Figma Link**](https://www.figma.com/design/qaiNixV0TQvIu2v2L6bdv6/YDO---BSoC?node-id=0-1&p=f&t=hRvzdbSnt4uHBvhs-0)

---

## 📞 Contact

For any questions, issues, or collaboration inquiries regarding YDO, feel free to reach out through:

-   **Discord:** Join our community for discussions and quick support: [YDO Discord](https://discord.gg/9FeNzk4rZ5). Feel free to ask fellow mentors and contributors about any doubts you might have!
---

## 🙏 Acknowledgements

We extend our sincere gratitude to:

-   All **contributors** who have dedicated their time and effort to shaping YDO.
-   The broader **open-source community** for providing invaluable tools, libraries, and inspiration.
-   Our insightful mentors:
    -   [Zapper9982](https://github.com/Zapper9982)
    -   [Om-Thorat](https://github.com/Om-Thorat)
