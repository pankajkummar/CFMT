const express = require('express')
const cors = require('cors')
const CompanyFunding = require('./firebase-fonfig5')
const app = express()
app.use(express.json())
app.use(cors())
const csvToJson = require('convert-csv-to-json');

let inputCsvfile = "./Company_funding.csv";
let OutputJsonfile = "Campany_funding.json";


csvToJson.fieldDelimiter(',').generateJsonFileFromCsv(inputCsvfile,OutputJsonfile);
//console.log(csvToJson.fieldDelimiter(',').getJsonFromCsv(inputCsvfile));
let json = csvToJson.fieldDelimiter(',').getJsonFromCsv(inputCsvfile);
for(let i=0; i<json.length;i++){
    console.log(json[i]);
    CompanyFunding.add(json[i])
}
