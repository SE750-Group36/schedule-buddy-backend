# Schedule buddy Server

An API server containing endpoints CRUD endpoints required for scheduling in the client.

This server runs on http://localhost:3001/

## Installation

Install node.js from https://nodejs.org/en/.

Run the following commands:

```bash
git clone https://github.com/SE750-Group36/schedule-buddy-backend.git


npm i
```

## Usage

### IMPORTANT:

To run the server, you must put the provided .env file provided into the root directory of the project. The file should be provided to you by the tutor, if you do not have this then please feel free to contact <a href="xyan765@aucklanduni.ac.nz">Charlie</a>

```bash
npm start
```

### Endpoints:

---

-   Crud endpoints for the Calendar:
    http://localhost:3001/api/calendar

-   Crud endpoints for the Schedule:
    http://localhost:3001/api/schedule

---

## Testing

For unit testing, Jest and Supertest are being used.

To run tests:

```
npm test
```



# Project Meeting Minutes

## Main responsibilities
### Backend
- Oliver Chamberlain (ocha817): Algorithm research, Implementing testing with Jest, Algorithm development work.
- Charlie Yang (xyan765): Algorithm development work, Implementation of database tests, setting up endpoints, database work.

### Frontend
- Andrew Donovan (adon946): Redux work, API call work, FE state management, Parsing of ICS files, routing, preference page, Import/export actions.
- Ingemar Watt (iwat053): Styling, Calendar components, Converting ICS data to calendar, routing.

## 24/3/2021

-   Initial project ideation

-   Food menu app

-   Blood alcohol estimator

-   Study schedule app

-   Bar/club heat map

-   Begin setting up proposal.

## 5/4/2021

-   Initial design ideation

-   Figma designs created

## 6/4/2021

-   Initial development work set up

-   Organisation created with FE and BE projects

-   GH projects set up

-   Need to read up on technical viability

## 12/4/2021

-   Check in on current knowledge

-   Verified methods for scheduling and the app architecture.

## 22/4/2021

-   Clarified information to be passed between FE and BE

-   Scoped endpoint functionality

## 3/5/2021

Checked in where we are at

-   FE has calendar displaying and basic UI.

-   BE basic algorithm working. Some modifications (such as converting from UTC) and testing need to be carried out.

-   Opening ics displays events on calendar

-   Skeleton API calls for persisting calendars and scheduling are done

Next steps

-   Finalise algorithm.

-   Put up endpoints.

-   Set up persisted schedule and calendar storage.

-   Add styling to FE

-   Add preferences modal and schedule to FE and a mechanism for adding jobs.

-   Add auth in the FE.

-   Loading old calendars?

Feedback

FE:

-   Add start and end times for when the user wants to work every day.

-   Change preferences block

-   Start and End time that every user has

-   Blocked time array should be pairs of start and end times rather than an array of events.

## 7/5/2021

-   Discussed Linking FE and BE

-   Issues to be worked on

-   Date/time conversions between FE and BE

-   FE styling needs to be complete

## 9/5/2021

-   Final checks before submission

-   Peripheral documentation added
