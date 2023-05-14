const { generateOptions } = require('./util');
const https = require('https');
require('dotenv').config()
const { default: axios } = require('axios');
const constants = require('./constants');
const CircularJSON = require('circular-json')

const getUser= async function (req, res) {
    const user = req.params.user;
    const options = generateOptions('/users/' + user)
    const config = {
        url: "http://api.github.com/users/" + user,
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': constants.user_agent,
            'Authorisation': 'Bearer ' + process.env.GITHUB_ACCESS_TOKEN,
            // 'OAUth': process.env.GITHUB_ACCESS_TOKEN
        },
    }
    console.log(config);
    axios(config)
        .then((response) => {
            res.status(200).send(CircularJSON.stringify(response.data))
            // console.log(response);
        })
        .catch((error) => {
            res.send(CircularJSON.stringify(error))
            // console.log(error);
        })
    // https.get(options, function (apiResponse) {
    //     apiResponse.pipe(res);
    //     console.log(apiResponse)
    // }).on('error', (e) => {
    //     console.log(e);
    //     res.status(500).send(constants.error_message);
    // })
}

///repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches
const dispatcheWorkflow= async function (req, res) {
    const user = req.params.user;
    const reponame = req.params.reponame;
    const workflow_id = req.params.workflow_id;
    const config = {
        url: "http://api.github.com/repos/" + user + '/' + reponame + '/actions/workflows/' + workflow_id ,
        // method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': constants.user_agent,
            // 'Authorization': 'Bearer ' + process.env.GITHUB_ACCESS_TOKEN
            // 'OAUth': process.env.GITHUB_ACCESS_TOKEN
        },
    }

    axios(config)
        .then((response) => {
            res.status(200).send(CircularJSON.stringify(response.data))
            console.log(response);
        })
        .catch((error) => {
            res.status(500).send(CircularJSON.stringify(error))
            console.log(error);
        })
    const options = generateOptions('/repos/' + user + '/' + reponame) 

    // https.get(options, function (apiResponse) {
    //     apiResponse.pipe(res);
    // }).on('error', (e) => {
    //     console.log(e);
    //     res.status(500).send(constants.error_message);
    // })
}

const postWorkFlow= async function (req, res) {
    const user = req.params.user;
    const reponame = req.params.reponame;
    const workflow_id = req.params.workflow_id;
    const options = generateOptions('/repos/' + user + '/' + reponame + '/commits')
    const config = {
        url: "http://api.github.com/repos/" + user + '/' + reponame + '/actions/workflows/' + workflow_id +'/enable',
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': constants.user_agent,
            'Authorization': 'Bearer ' + process.env.GITHUB_ACCESS_TOKEN,
            'X-GitHub-Api-Version': '2022-11-28'
            // 'OAUth': process.env.GITHUB_ACCESS_TOKEN
        },
    }
    axios(config)
    .then((response) => {
        res.status(200).send(CircularJSON.stringify(response.data))
        console.log(response);
    })
    .catch((error) => {
        res.send(CircularJSON.stringify(error))
        console.log(error);
    })
    // https.get(options, function (apiResponse) {
    //     apiResponse.pipe(res);
    // }).on('error', (e) => {
    //     console.log(e);
    //     res.status(500).send(constants.error_message);
    // })
}

module.exports = { getUser, dispatcheWorkflow, postWorkFlow }