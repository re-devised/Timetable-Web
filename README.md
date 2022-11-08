<h3 align="center"><img src="static/timetable_logo.svg" height="85px"></h3>
<h1 align="center">Timetable</h1>

* * *

Timetable is a app I created for students to help them keep track of their subjects. 

I designed it with the approach of only showing up the most important information on the screen.

This is the web based MongoDB database version of the ["Timetable" mobile app](https://play.google.com/store/apps/details?id=com.fsdev.timetable.lite).

* * *

# How to get it?

## Step 1 - Install Timetable

```bash
# Installation
$ git clone https://github.com/re-devised/Timetable-Web.git
$ cd Timetable-Web
$ npm install
```

## Step 2 - Database Connection

Timetable needs to be connected to a MongoDB Database to work properly. To achieve that you can run a Mongo-Instance inside a Docker Container or connect to an external Mongo-Database like the ones from [MongoDB-Atlas](https://www.mongodb.com/atlas).

### Change up Config

Open the default.json file in the config folder and change the details to your MongoDB-Connection-String.

```json
{
    "db": "mongodb+srv://username:password@mongodb.net/timetable"
}
```

## Step 3 - Run Application

```bash
# If you want to use the app, start the Production Server with
$ npm run build
$ npm run start

# If you want to change the code up, run in Development with
$ npm run dev
```

Timetable can then be accessed at [http://localhost:8000](http://localhost:8000) on your host system. To access it outside of your network you have to port-forward the application on your router.
