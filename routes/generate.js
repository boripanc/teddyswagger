var express = require("express");
const { request } = require("../app");
var router = express.Router();
var apis, operations = require("../models/apis");


/* GET home page. */
router.get("/apis", function(req, res, next) {
    var page = req.query.page;
    if (page == null) page = 1;
    if (page == 0) page = 1;
    var s = 20 * parseInt(page - 1);
    apis.find({}, null, { skip: s, limit: 20 }, async function(err, apilist) {
        var result = { result: apilist };
        result.pageinfo = {};
        result.pageinfo.totalrecord = await apis.count({});
        result.pageinfo.currentpage = page;
        result.pageinfo.pagesize = 20;
        res.send(result);
    });
});

router.get("/apis/:apiId", function(req, res, next) {
    console.log("here");
    apis.find({ _id: req.params.apiId }, function(err, apilist) {
        res.send(apilist);
    });
});

router.post("/apis", function(req, res, next) {
    var swagger = {
        "openapi": "3.0.2",
        "info": {
            "title": req.body.apiname,
            "version": req.body.version
        }
    }
    var napi = new apis({ name: req.body.apiname, version: req.body.version, Swagger: swagger });
    napi.save();
    res.send(napi);
});
router.post("/apis/:apiId/operation", function(req, res, next) {
    var noperation = new operations({ apiid: req.params.apiId, HTTPMethod: req.body.HTTPMethod, Resource: req.body.Resource, Parameters: req.body.Parameters, RequestBody: req.body.RequestBody, ResponseBody: req.body.ResponseBody });
    noperation.save();
    res.send(noperation);
});

router.put("/apis/:apiId", function(req, res, next) {
    apis.findByIdAndUpdate(req.params.apiId, { name: req.body.apiname, version: req.body.version, Swagger: req.body.Swagger }, function(err, apilist) {
        res.send(apilist);
    });
});

module.exports = router;