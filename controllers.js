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
            'Authorisation': 'Bearer ' + process.env.GITHUB_ACCESS_TOKEN
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

const getRepo= async function (req, res) {
    const user = req.params.user;
    const reponame = req.params.reponame;
    const config = {
        url: "http://api.github.com/repos/" + user + '/' + reponame,
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

const getCommit= async function (req, res) {
    const user = req.params.user;
    const reponame = req.params.reponame;
    const options = generateOptions('/repos/' + user + '/' + reponame + '/commits')

    https.get(options, function (apiResponse) {
        apiResponse.pipe(res);
    }).on('error', (e) => {
        console.log(e);
        res.status(500).send(constants.error_message);
    })
}

module.exports = { getUser, getRepo, getCommit }