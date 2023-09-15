// import fs from 'fs'; // Core Modules
// const cetakNama = require('./coba'); // Export function cetakNama dari file coba.js -> Local Module
// const moment = require('moment'); // Third-Party Modules / npm module / node_modules

const coba = require('./coba');
console.log(coba.cetakNama('Fahrezi'), coba.PI, coba.mahasiswa.cetakMhs(), new coba.Orang());