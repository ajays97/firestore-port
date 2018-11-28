"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const fs = require("fs");
/**
 * Restore data to firestore
 *
 * @param {string} fileName
 * @param {Array<string>} dateArray
 */
exports.restore = (fileName, dateArray) => {
    const db = admin.firestore();
    fs.readFile(fileName, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
        // Turn string from file to an Array
        let dataArray = JSON.parse(data);
        updateCollection(db, dataArray, dateArray);
    });
};
/**
 * Update Data to Firestore
 *
 * @param {any} db
 * @param {Array<any>} dataArray
 * @param {Array<string>} dateArray
 */
const updateCollection = (db, dataArray, dateArray) => __awaiter(this, void 0, void 0, function* () {
    for (var index in dataArray) {
        var collectionName = index;
        for (var doc in dataArray[index]) {
            if (dataArray[index].hasOwnProperty(doc)) {
                yield startUpdating(db, collectionName, doc, dataArray[index][doc], dateArray);
            }
        }
    }
});
/**
 * Write Data to Document
 *
 * @param {any} db
 * @param {any} collectionName
 * @param {any} doc
 * @param {any} data
 * @returns
 */
const startUpdating = (db, collectionName, doc, data, dateArray) => {
    // convert date from unix timestamp 
    let parameterValid = true;
    if (typeof dateArray === 'object' && dateArray.length > 0) {
        dateArray.map(date => {
            if (data.hasOwnProperty(date)) {
                data[date] = new Date(data[date]._seconds * 1000);
            }
            else {
                console.log('Please check your date parameters!!!', dateArray);
                parameterValid = false;
            }
        });
    }
    if (parameterValid) {
        return new Promise(resolve => {
            db.collection(collectionName).doc(doc)
                .set(data)
                .then(() => {
                console.log(`${doc} is successfully added to Firestore!`);
                resolve('Data wrote!');
            })
                .catch(error => {
                console.log(error);
            });
        });
    }
    else {
        console.log(`${doc} is not imported to Firestore. Please check your parameters and try again.`);
        return false;
    }
};