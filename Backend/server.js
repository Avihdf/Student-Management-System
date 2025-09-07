const dotenv=require('dotenv');
const path=require('path');
dotenv.config({ path: path.resolve(__dirname, '.env') });

const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const cookieParser = require('cookie-parser');


const app=express();

// CORS configuration
const allowedOrigins = [ 
  'http://localhost:5173',            // Local dev frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`Blocked CORS request from origin: ${origin}`);
      callback(new Error('CORS Not Allowed'));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI,{}).then(()=>{
  console.log('Connected to MongoDB');
}).catch((error)=>{
  console.error('MongoDB connection error:',error);
});



const authRoutes=require('./Routes/auth');


// Auth API routes for both admin and student
app.use('/api/auth',authRoutes);



app.listen(process.env.PORT,()=>{
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
