# shiftswap

## Flex Project-Proposal

### About
Shift swap is designed to fill a need in the ever changing retail and service industries. Those who work in these spheres are plagued with schedules that change from week to week, and often find that their their assigned schedule conflicts with prior commitments and obligations. Shift Swap solves this issue by allowing employees to trade shifts with one another. It allows users to request to trade shifts, drop shifts, and pick up shifts. It handles the handoff between request and response between two employees as well as updating the store schedule.

There are multiple layers of functionality which will build on one another depending on time available to work. These will occur in phases as outlined below.


#### Phase 1
* Users can be created and/or login
* Workplace can be created/added by users
* Users can create and add their schedule to a store
* Users can view schedule at their store for all employees

#### Phase 2
* Users can request shift trade and receive trade requests (email/text)
* Shifts can be swapped
* Users can login with Facebook or Google

#### Phase 3
* Users can modify their schedule
* Users can add schedule of other users
* Stores are validated via Google maps
* Personal calendars are updated by application

#### Phase 4
* Users can authenticate one another (after several have designated a store)
* Schedule can be added via picture/ocr
* Calendar can be sorted by people working

#### Phase 5
* Multiple shift types can exist (busser, server, manager) and shift swaps depend on position
* Users can work at multiple locations

### Technologies & Technical Challenges
Backend: Node.js
Frontend: REact/JavaScript


## Accomplished over the Weekend
* Complete a Node.js tutorial
* Create database according to scheme
* Implement user athentication

## Wireframes

![shift_swap](https://user-images.githubusercontent.com/32603834/36323949-9dbcb00a-1307-11e8-9300-bae4dbcc2c23.jpg)



## Group Members & Work Breakdown
#### Kyle Brackebusch, Dylan McCapes, Arpan NLN

#### Day 1
* complete auth tutorial **Arpan**
* complete node tutorial **Kyle, Dylan, Arpan**
* set up user auth **Arpan**
* set up frontend 
* research Full Calendar API **Kyle**
#### Day 2
* set up database with MySQL **Kyle**
* users can make basic requests to each other on backend **Arpan**
* set up basic home page frontend **Dylan**
#### Day 3
* connect backend to frontend **TBD**
* implement functionality for user to enter shifts **TBD**
* implement functionality for user to see shifts for workplace **TBD**
#### Day 4
* users can send requests on frontend **TBD**
* requests are sent via text message **TBD**
* users can accept requests updating the database **TBD**
#### Day 5
* add manager admin functionality
* improve UI/UX
* host site on heroku
* make production README


## Datbase Scheme

### Users
| Column Name  | Data Type |
| ------------- | ------------- |
| id  | integer  |
| name  | string  |
| email | string |
| phone_number | integer |
| password_digest | string |
| session_token | string |

### Workplaces
| Column Name  | Data Type | 
| ------------- | ------------- | 
| id  | integer  |
| name  | string  |
| address | string |

### Shifts
| Column Name  | Data Type | 
| ------------- | ------------- | 
| id  | integer  |
| user_id  | integer  |
| workplace_id | integer |
| date | date 	(ISO 8601)| 
| start_time | time (ISO 8601)|
| end_time | time (ISO 8601)|

## Project Structure
```
|-- server/
|  |-- server.js                            // The entry point for running the backend server locally, and main server for production
|  |-- passport/                             // Configuration files used to connect to different machines or set settings
|     |-- index.js                     // Overloads the passport object and defines serialize and deserialize
|     |-- localStrategy.js            // Defines a local strategy
|     |-- googleStrategy.js           // Defines google OAuth stratgey
|     ....
|  |-- db/                             
|     |-- index.js                  // Configures the connection to the database
|     |-- models/                   // represents data from our database, and defines schemas for each collection
|        |-- user.js                // Schema for the User collection
| -- src/                           // Entry for the React client side application
```

## Note
* In order to set the google authentication up, you must register your app @ [https://console.developers.google.com](https://console.developers.google.com) & set `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET` as environmental variables
* In development mode (i.e. `npm run dev`), OAuth google callback is not being proxied to the google servers. Therefore in order to test the google OAuth on your local machine do the following:
1) `npm run build`
2) `npm run prod`
