const express = require('express');
const controllers=require('./controllers');

const router = express.Router();

router.get('/user/:user', controllers.getUser)

router.get('/dispatch/:user/:reponame/:workflow_id', controllers.dispatcheWorkflow)

router.get('/workflow/:user/:reponame/:workflow_id', controllers.postWorkFlow)

module.exports = router;