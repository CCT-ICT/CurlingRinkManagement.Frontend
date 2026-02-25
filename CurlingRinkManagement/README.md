# CurlingRinkManagement

This project contains all the different front-ends for the curling rink management software. To run this locally you need to also have the CurlingRinkManagement.Backend running on the ip's specified in environment.development.ts. You also need to run authentic in the background. This can be done by using a program like Docker. Details for this can be found in auth.ts.

Running all pages can be done with npm run start:all

## Planner
The planner module is meant to contain all things related to planning activities in your curling rink and is mostly connected with the CurlingRinkManagement.Planner. Starting the planner can be done with npm run start:planner.