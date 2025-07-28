## Djokwa SMS-client

addStudent:
![image](https://github.com/OpenTek-Startup/Djokwa-client/assets/65525163/d892b97d-c22f-49e1-afde-2927fac0d877)

addTeacherpage:
![image](https://github.com/OpenTek-Startup/Djokwa-client/assets/65525163/52ed0178-636a-412a-a5cd-3dfc0a7664a8)

## Getting Started

- **Perequisites: make sure you have docker & docker compose installed
  locally**
- Clone the staging branch of this repository.
- Open the project in your favourite code editor _preferrably Visual Studio
  Code_.

## Rules or Folders and Files Naming Conventions

- `Directories` with longer names should be named using
  `hyphens-to-seperate-each-word`.
- Each directory has an example of how each folder and file belonging to that directory is to be named. PLEASE FOLLOW THE SAME CONVENTION.

## Folder Structuring Explained (Most important files and folders)

DJKLOWA/
├── dist/ # Compiled production files
├── node_modules/ # Project dependencies
├── public/ # Public assets
│ ├── en/ # English localization files
│ ├── fr/ # French localization files
│ ├── favicon.png # Favicon for the website
│ └── index.html # Main HTML file
├── src/ # Source files
│ ├── assets/ # Static assets like images and icons
│ │ ├── images/ # Image files
│ │ └── svg/ # SVG files
│ ├── components/ # Reusable components
│ ├── config/ # Configuration files
│ ├── contexts/ # Context API for state management
│ ├── hooks/ # Custom React hooks
│ ├── pages/ # Page components
│ │ ├── dashboard/ # Dashboard related components
│ │ ├── landing/ # Landing page components
│ ├── services/ # API services
│ ├── teachers/ # Teacher-related components
│ ├── students/ # Student-related components
│ ├── ui/ # UI components and design elements
│ ├── types/ # TypeScript types (if applicable)
│ ├── App.tsx # Main App component
│ ├── index.tsx # Entry point of the application
│ ├── .editorconfig # Editor configuration
│ └── .env # Environment variables
├── .gitignore # Git ignore file
├── package.json # Project metadata and dependencies
└── README.md # Project documentation

## How to contribute

- Make sure to pull the latest changes from `development branch` and update your branch.
- Name your branch accordingly by your task name and with `_` if it is: `composed_of_may_words`.
- Before pushing, you should format your work using the command:

```bash
    $ npm run format
```

- Add and stage your changes using the command:

```bash
    $ git add .
```

OR

```bash
    $ git add <file-name>
```

- Commit your work by running:

```bash
    $ npm run commit
```

Please follow the questionaires that follow to commit your work (please make sure to provide descriptive commit messages).

## Branch Naming Convention

- If working on a page we have `<page_name>/feature`
- If working on a component `<component_name>/feature`

## Important Note

- PLEASE DO NOT TRY COMMITTING USING `git commit -m ...` or any other equivalent processes for commiting other that the one stated above, please use whats has been described above. That way we are consistent in our work.
- Incase of any warnings or errors during committing, please ensure to clear them out. Error messages will be provided and to some extent fix suggestions.
- Always open a PR to the `development` branch not the `main` or `staging` branches.

To run the application using docker:

- At the root of the project run `docker-compose up`

## Reporting

- Please follow the follow link to provide daily reporting on what you have accomplished on your respective tasks [Github discussion reference](https://github.com/World-Charity-Tour/payment-gateway-client/discussions/10)

## Project Board

- Refere to the following link for the project board and assigned tasks and issue labels. This also includes an automatic milestones tracker linked to issues [Project board reference](https://github.com/orgs/World-Charity-Tour/projects/5)
- cleanup unused dependencies: `depcheck`
