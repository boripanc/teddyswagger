const mongoose = require('mongoose');
const GUID = require('mongoose-guid')(mongoose);
const Schema = mongoose.Schema;
const url = 'mongodb+srv://boripanc:hzoeZtmHwl8xCOE4@cluster0.apftb.mongodb.net/swaggergen';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const apiSchema = new Schema({
    name: { type: String },
    version: { type: String },
    Swagger: { type: Object },
    APIId: { type: GUID.type },
    Operations: { type: Object }
});
const apis = mongoose.model('apis', apiSchema);
module.exports = apis;