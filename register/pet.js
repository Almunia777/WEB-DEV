/*Importing the required modules*/
var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');

/*Getting Connection to MYSQL*/ 

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'sayan2000',
	database : 'project'
});
connection.connect(function(err){
    if(!err) {
        console.log("Database is connected");
    }
    else{
        console.log("error:"+err.message);
    }
});
module.exports=connection;

/*Setting up Express*/

const app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

/*Body-parsers*/
app.use(bodyParser.urlencoded({extended :'true'}));
app.use(bodyParser.json());

/*For css use*/
app.use('/static',express.static('public'))

/*Get request-response*/
app.get('/',function(req,res){
      res.sendFile(path.join(__dirname, '/startup.htm'))
  });

app.get('/login',function(req,res){
    res.sendFile(path.join(__dirname, '/login.htm'))
});

app.get('/user',function(req,res){
    res.sendFile(path.join(__dirname, '/user.htm'))
});

app.get('/interface', function(request, response) {
	if (request.session.loggedin) {
        response.sendFile(path.join(__dirname, '/interface.htm'));
        //console.log("App Open!!!");
	} else {
		response.send('Please login to view this page!');
	}
});

app.get('/rotweiller',function(req,res){
    res.sendFile(path.join(__dirname, '/dog1.htm'))
});

app.get('/saint',function(req,res){
    res.sendFile(path.join(__dirname, '/dog2.htm'))
});

app.get('/direct', function(req,res){
    if (req.session.loggedin) 
        res.sendFile(path.join(__dirname, '/interface.htm'));
    else
        res.sendFile(path.join(__dirname, '/login.htm'))
});

app.get('/lab',function(req,res){
    res.sendFile(path.join(__dirname, '/dog3.htm'))
});
/*POST Requests from user.htm*/

app.post('/auth/', function(request, response){
    
    //response.end(JSON.stringify(request.body));
    //console.log(request.body.fullname);
    var idno= 1;
	var username = request.body.fullname;
	var email = request.body.youremail;
    var password = request.body.password;
    var cpass = request.body.comfirmpassword;
    var mobile = request.body.Mobile;
    var address = request.body.Address;
    var city = request.body.City;
    var pin = request.body.PIN;
    if(username && email && (password===cpass) && cpass && mobile && address && city && pin){
        connection.query("INSERT INTO USERs(user_id, user_name, user_mobile, user_email, user_address, user_city, postal_code) VALUES ('?', ?, ?, ?, ?, ?, ?)", [idno++ , username, mobile, email, address, city, pin],  function(err, results) {
        if (err) throw err;
        console.log("1 record inserted"); });
        connection.query("INSERT INTO login(login_id, login_username, user_password) VALUES ('?', ?, ?)", [idno, username, password], function(err, results) {
        if (err) throw err;
        console.log("1 record inserted"); });
        response.redirect('/login');
    }
    else {
        response.send('Incorrect entry!!...');
    }			
});

/*POST requests from login.htm*/
app.post('/log', function(request, response){
    var name= request.body.name;
    var pass= request.body.pass;
    if(name && pass){
        connection.query('SELECT * FROM login WHERE login_username = ? AND user_password = ?', [name, pass], function(error, results, fields) {
            if(error)throw error;
            //console.log(result);
            if (results.length > 0) {
				request.session.loggedin = true;
                request.session.username = name;
                console.log("LOGGED IN!!");
				response.redirect('/interface');
			} else {
                response.send('Incorrect Username and/or Password!');
			}			
		});
    }
});

/*POST requests from login.htm*/
app.post('/find', function(request, response){
    var search= request.body.search;
    if(search){
        connection.query("SELECT id from product_details where descr like '%"+ search +"%'", function(error, results, fields) {
            if(error)throw error;
            if(results[0]!=undefined){
            if(((results[0].id).localeCompare("20first"))==0){
                response.redirect('/rotweiller');
            }
            else if(((results[0].id).localeCompare("20sec"))==0){
                response.redirect('/saint');
            }
            else if(((results[0].id).localeCompare("20third"))==0){
                response.redirect('/lab');
            }}
            else
                respose.send("Invalid Search!!");
    });}
    else
        response.send("Empty Search");
});


app.listen(3000);