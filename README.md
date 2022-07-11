# Dev Search - Looking for a Dev?

## About the project

In this project, I developed a research application using the [REST API](https://docs.github.com/en/rest) from Github integrated with [ReactJS](https://reactjs.org/) and [Tailwindcss](https://tailwindcss.com/). With it is possible to Find developers, take a look at their repositories, commits history and follow what they are working on.

I tried to be as careful as possible to create an accessible application and for that I use the [Headless UI](https://headlessui.com/) library and keyboard navigation for all the application. In addition, the application is fully responsive and can be accessed on any device.

## How it works

With this application, the user will be able to search for any username found on Github and through the Github's [REST API](https://docs.github.com/en/rest), the information from this user will be returned, such as the number of repositories, informational data and a link to learn more about him.

When clicking on the repositories tab, this user's public repositories will be shown (currently only the last 100 repositories are shown).

Each repository gives the user the possibility to browse through the branches and see details of each commit, such as who the commiter was, date, description and link to code details.

## Usage

```bash
# Clone this repository
git clone https://github.com/guizioliveira/dev-search.git

# Install all dependences
yarn

# Run the application
yarn run dev
```

## What coming next?

It was a fun project that gave me the idea to create a developer platform, where you can make a list of your favorite developers and share their profiles.

So, the next steps will be:

- Sharing system (use parameterized routers instead of a single page);
- Login system (registration and information storage);
- Create a list of favorite developers for each profile;
- More detailed search with possibility to filter by developers with more back and frontend repositories (maybe)
- Bring 100+ repositories per developer

:star: Hope you like it!
