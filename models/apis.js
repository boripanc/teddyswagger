const mongoose = require('mongoose');
const GUID = require('mongoose-guid')(mongoose);
const Schema = mongoose.Schema;
const url = 'mongodb+srv://boripanc:hzoeZtmHwl8xCOE4@cluster0.apftb.mongodb.net/swaggergen';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const apiSchema = new Schema({
    name: { type: String },
    version: { type: String },
    Swagger: { type: Object },
    APIId: { type: GUID.type }
});
const apis = mongoose.model('apis', apiSchema);
const operationSchema = new Schema({
    apiid: { type: String },
    HTTPMethod: { type: String },
    Resource: { type: String },
    Parameters: { type: Objects },
    RequestBody: { type: Object },
    ResponseBody: { type: Object }
});
const operations = mongoose.model('operation', operationSchema);
module.exports = apis, operations;