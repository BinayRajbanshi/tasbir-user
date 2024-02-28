This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm install
# and
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Project Structure Documentation

### Overview

This documentation outlines the project structure for a Next.js application using Next.js version 13. The chosen structure is designed to promote organization, isolation, and clarity when dealing with routes and non-route related components, libraries, and files.

All the non-routes folders will be Private Folders by prefixing their name with an underscore (as stated in the link above). This tells the Next router that this folder is not part of the routes. (e.g. \_components, \_libs, ...)

### Project Structure

| Directory     | Description                                                                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| app/          | The main directory of the project, containing all components, libraries, and route-related folders.                                               |
| \_components/ | A private folder containing reusable components that are not directly related to routes.                                                          |
| \_assets/     | This directory stores static assets such as images, fonts, stylesheets, and other resources used in the application.                              |
| \_types/      | The types/ directory houses custom TypeScript declaration files (.d.ts) or user-defined type definitions.                                         |
| \_utils/      | A private folder for utility functions, helper classes, and other non-route-specific logic.                                                       |
| \_hooks/      | The hooks/ directory contains custom React hooks, which are reusable functions that encapsulate stateful logic and can be used across components. |
| (routes)/     | An organizational group for route-related pages. Content is not included in the route's URL path.                                                 |
| folder1/      | Represents a specific route with an `index.tsx` file as the entry point for the corresponding page.                                               |
| folder2/      | Represents another route with an `index.tsx` file as the entry point for the corresponding page.                                                  |
