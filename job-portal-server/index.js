const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const UserModel = require('./model/user');


dotenv.config();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS configuration
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your client's origin
    credentials: true // Enable credentials
};
app.use(cors(corsOptions));

// MongoDB connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@job-portal.bobhriv.mongodb.net/?retryWrites=true&w=majority&appName=job-portal`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

// Middleware to verify user
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json("Token is missing");
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.json("Error with token");
            } else {
                if (decoded.role === "admin") {
                    next();
                } else {
                    return res.json("Not admin");
                }
            }
        });
    }
};

// Route to handle dashboard
app.get('/dashboard', verifyUser, (req, res) => {
    res.json("Success");
});

// Route to POST a job
app.post("/post-job", async (req, res) => {
    const job = req.body;
    job.createdAt = new Date();
    try {
        const result = await client.db("Job-portal").collection("jobs").insertOne(job);
        if (result.insertedId) {
            return res.status(200).send(result);
        } else {
            return res.status(400).send({
                message: "Something went wrong",
                status: false
            });
        }
    } catch (error) {
        return res.status(500).send({
            message: "Internal Server Error",
            error: error.message
        });
    }
});

// GET all jobs
app.get('/all-jobs', async (req, res) => {
    try {
        const jobs = await client.db("Job-portal").collection("jobs").find({}).toArray();
        res.send(jobs);
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            error: error.message
        });
    }
});

// GET single job by id
app.get('/all-jobs/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const job = await client.db("Job-portal").collection("jobs").findOne({
            _id: new ObjectId(id)
        });
        if (job) {
            res.send(job);
        } else {
            res.status(404).send({ message: "Job not found" });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", error: error.message });
    }
});

// GET jobs by email
app.get('/myJobs/:email', async (req, res) => {
    try {
        const jobs = await client.db("Job-portal").collection("jobs").find({ postedBy: req.params.email }).toArray();
        res.send(jobs);
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            error: error.message
        });
    }
});

// DELETE a job
app.delete("/job/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const filter = { _id: new ObjectId(id) };
        const result = await client.db("Job-portal").collection("jobs").deleteOne(filter);
        res.send(result);
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            error: error.message
        });
    }
});

// Update a job
app.patch("/update-job/:id", async (req, res) => {
    const id = req.params.id;
    const jobData = req.body;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updateDoc = {
        $set: {
            ...jobData
        },
    };
    try {
        const result = await client.db("Job-portal").collection("jobs").updateOne(filter, updateDoc, options);
        res.send(result);
    } catch (error) {
        res.status(500).send({
            message: "Internal Server Error",
            error: error.message
        });
    }
});

// Route to handle user sign-in
app.post('/sign-in', (req, res) => {
    const { name, email, password } = req.body;
    bcrypt.hash(password, 10)
        .then(hash => {
            UserModel.create({ name, email, password: hash })
                .then(user => res.json("Success"))
                .catch(err => res.json(err));
        }).catch(err => res.json(err));
});

// Route to handle user login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        const token = jwt.sign({ email: user.email, role: user.role }, "jwt-secret-key", { expiresIn: '1d' });
                        res.cookie('token', token, { httpOnly: true, sameSite: 'Lax' }); // Set cookie options
                        return res.json({ Status: "Success", role: user.role });
                    } else {
                        return res.json("The password is incorrect");
                    }
                });
            } else {
                return res.json("No record existed");
            }
        });
});


async function run() {
    try {
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // Listen to the server
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
}

run().catch(console.dir);

module.exports = app;