var express = require("express");
const { request } = require("../app");
var router = express.Router();
var apis = require("../models/apis");


/* GET home page. */
router.get("/apis", function (req, res, next) {
  console.log("here");
  apis.find({},null,{ skip: 20*parseInt(req.query.page) ,limit:20}, function (err, apilist) {
    var result = {result:apilist};
    result.totalrecord = apis.count();
    result.currentpage = req.query.page;
    result.pagesize= 20;
    res.send(result);
  });
});

router.get("/apis/:apiId", function (req, res, next) {
    console.log("here");
    apis.find({ _id: req.params.apiId }, function (err, apilist) {
      res.send(apilist);
    });
  });

router.post("/apis", function (req, res, next) {
    var swagger = {
        "openapi": "3.0.2",
        "info": {
            "title": req.body.apiname,
            "version": req.body.version
        }
    }
  var napi = new apis({ name: req.body.apiname, version: req.body.version, Swagger:swagger });
  napi.save();
  res.send(napi);
});

router.put("/apis/:apiId", function (req, res, next) {    
    apis.findByIdAndUpdate(req.params.apiId,{ name: req.body.apiname, version: req.body.version, Swagger:req.body.Swagger }, function (err, apilist) {
        res.send(apilist);
      });
});

module.exports = router;
