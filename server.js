require('dotenv').config()

const express = require('express'),

app = express();
app.use(express.static(__dirname + '/webapp'));


//require('./routes/routes.js')(app);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../webapp/', 'index.html'));
})


const jwt = require('jsonwebtoken')
const path = require('path');

app.use(express.json())

const posts = [
    {
        username: 'gabo',
        title: 'Post 1'
    },
    {
        username: 'pepe',
        title: 'Post 2'
    }
]

app.get("/posts", authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name ))
})

app.post("/login", (req, res) => {
    // Authenticate user 

    const username = req.body.username
    const user = { name: username }

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken })
})

function authenticateToken (req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })

}


app.post('/loginx', function (req, res) {
    console.log("SAP RFC");
    const RFC = require('node-rfc');
    const abapSystem = {
        user: 'GLOPEZ',
        passwd: 'cocacola',
        ashost: 'sapr3',
        sysnr: '00',
        client: '001'
    };

    const SAP = new RFC.Client(abapSystem);
    const SELECTION_RANGE_STR = {
        PARAMETER: "USERNAME",
        SIGN: "I",
        OPTION: "CP",
        LOW: "*"
    };

    const SELECTION_RANGE_TAB = [SELECTION_RANGE_STR];

    SAP.connect(function (err) {
        if(err){
            return console.error('Errro on server connection', err);   
        }
            SAP.invoke('BAPI_USER_GETLIST', {
                //MAX_ROWS: 3,
                SELECTION_RANGE: SELECTION_RANGE_TAB
            },
                function (err, res) {
                    if (err) {
                    return console.error('Error invoking BAPI', err);
                }
                console.log('Result BAPI', res);                        
        }
    )
    });
});

app.listen(3000, function () {
    console.log( path.join(__dirname, '/webapp/index.html'));
    console.log('Escuchando puerto 3000');
});

