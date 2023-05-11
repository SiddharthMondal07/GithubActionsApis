const axios = require('axios');
const express = require('express');
const cors = require('cors');
const middlewares = require('./middleware');
const routes = require('./routes');
const bodyParser = require('body-parser');
require('dotenv').config();
const token = process.env.GITHUB_ACCESS_TOKEN;
const PORT = '8080';

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(middlewares.setHeaders);
app.use('/github_api', routes);

app.get('/', (req,res)=>{
    res.send('Welcome to Github NodeJS API app!')
})

app.listen(PORT,()=>console.log(`Server started on port ${PORT}...`))

// const config = {
//     method: 'post',
//     url: 'https://api.github.com/orgs/github-practice-org/actions/required_workflows',
//     headers: { 
//         'Authorization': 'Bearer ' + token ,
//         'workflow_file_path': '.github/workflows/blank.yaml'
//     },
// }

// axios(config)
//     .then(resp => {
//         console.log(resp);
//     })
//     .catch(error => console.log(error))