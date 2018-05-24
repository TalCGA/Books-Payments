const express = require ('express'),
      bodyParser = require ('body-parser'),
      book = require ('./books-module'),
      app = express(),
      port = process.env.PORT || 3000,
      data = book();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//allowing access control API

//default page to for API instructions
app.get('/', (req,res) => {
    //send API
    res.sendFile(`${__dirname}/api.html`);
});

app.set('port',port);
app.use(
    (req,res,next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept");
        res.set("Content-Type", "application/json");
        next();
});

//get route
app.get('/getAllBooks/', (req,res) => {
    data.getAllBooks().then((result, error) => {
        res.status(200).send(result);
    })
});
//post route
app.post('/getBookById/', (req,res) => {
    data.getBookById(req.body.id).then((result, error) => {
        res.status(200).send(result);
    })
});
//get route
app.get('/getBooksByPrice/:min_price/:max_price', (req,res) => {
    data.getBooksByPrice(req.params.min_price,req.params.max_price).then((result)=>{
        res.status(200).send(result);
    })
});

//global handler
app.all('*', (req, res) => {
    res.send(`error: route not found, global handler`);
});

app.listen(port);
console.log(`listening on port ${port}`);