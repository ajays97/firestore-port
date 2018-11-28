"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require('firebase-admin');
exports.admin = admin;
const importService = require('./import');
const exportService = require('./export');

/**
 * Init Firebase App
 * @param {any} serviceAccount
 * @param {any} databaseURL
 */
exports.initializeApp = (serviceAccount, databaseURL) => {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: databaseURL
    });
    admin.firestore().settings({
        timestampsInSnapshots: true
    });
    return true;
};

/**
 * Export Firestore Data
 * @param {any} collectionName
 * @param {any} subCollectionName
 * @return {json}
 */
exports.export = (collectionName, subCollectionName) => {
    return exportService.export(collectionName, subCollectionName);
};

/**
 * Import Data into Firestore
 * @param {any} fileName
 */
exports.import = (fileName, data = []) => {
    importService.import(fileName, data);
};

/**
 * Get Imported Data
 * @param {Array<string>} collectionArray
 */
exports.imports = (collectionArray = []) => {
    return exportService.getAllCollections(collectionArray);
};