const morgan = require('morgan');
const express = require('express');
const helemt = require('helmet');
const mongoose = require('mongoose');
const cors = require ('cors');
const jwt_decode = require('jwt-decode');


const port = process.env.Port || 3052;
const app = express();

mongoose.connect('mongodb+srv://exposedbee:epitanode@cluster0.yy9tt.mongodb.net/moviesdb?retryWrites=true&w=majority',{
   useNewUrlParser : true,
   useUnifiedTopology:true,
});



const db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
   console.log('Connected to db');
})

app.use(helemt());
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static('./public'));

const movieRoute= require('./routes/movieRouter');
const watchRoute=require('./routes/watchRouter');
const ratingRouter=require('./routes/ratingRouter');
app.use('/movies',movieRoute);
app.use('/watch',watchRoute);
app.use('/rating',ratingRouter);



app.get('/',(req, res) => {
   var decoded = jwt_decode(req.headers.token);
   console.log(decoded);
   if(decoded.aud.includes("admin"))
      res.status(200).json({'message':"Hello world"});
   res.status(400).json({'message':"Hello world"});
});

app.listen(port, () => {
   console.log(`server is listening in port http://localhost:${port}`);
});
