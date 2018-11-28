# firestore-port
NPM module to export and import Firebase's Firestore data.

[![npm version](https://badge.fury.io/js/firestore-port.svg)](https://www.npmjs.com/package/firestore-port)

## Installation 

Install using [__npm__](https://www.npmjs.com/).

```sh
npm install firestore-port
```
[![NPM](https://nodei.co/npm/firestore-port.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/firestore-port/)

## Get Google Cloud Account Credentials from Firebase

You can __Generate New Private Key__ from Project Settings from [Firebase Console](https://console.firebase.google.com).

After that you need to copy the __databaseURL__ for initiating the App. 

## Usage 

You have to import this package in a JavaScript file and work from there.

### Export data from firestore 

You can export collection and sub collection from your data. The sub collection is optional.

```
// In your index.js 

const firestorePorter = require('firestore-port');
const serviceAccount = require('./serviceAccountKey.json');

// Initiate Firebase App
firestorePorter.initializeApp(serviceAccount, databaseURL);

// Start exporting your data
firestorePorter
  .export('collection-name', 'sub-collection-name-optional')
  .then(data => console.log(JSON.stringify(data)))
```

### Get all collections data

Pass in an array of collection names to get data from the collections.

The result is an object of collection's data.

```
firestorePorter
  .exports(['collection1', 'collection2'])
  .then(collections => {
    // You can do whatever you want with collections
    console.log(JSON.stringify(collections));
  })

```

### Import data to firestore 

This code will help you to import data from a JSON file to firestore

```
// In your index.js 

const firestorePorter = require('firestore-port');
const serviceAccount = require('./serviceAccountKey.json');

// Initiate Firebase App
firestorePorter.initializeApp(serviceAccount, databaseURL);

// Start importing your data
// The array of date fields is optional
firestorePorter.import('your-file-path.json', ['field1', 'field2']);
```

## Contributions

This project is inspired by suggestions from jcummings2 and leningsv. Feel free to report bugs and make feature requests in the [Issue Tracker](https://github.com/ajays97/firestore-port/issues), fork and create pull requests!
