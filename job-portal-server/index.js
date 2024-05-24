// const express = require('express');
// const mongoose = require('mongoose')
// const app = express();
// const cors = require('cors');
// const port = process.env.PORT || 3000;
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const cookieParser = require('cookie-parser')
// const UserModel = require('./models/User')
// require('dotenv').config();
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// // Middleware
// app.use(express.json());
// app.use(cors());

// // MongoDB connection
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@job-portal.bobhriv.mongodb.net/?retryWrites=true&w=majority&appName=job-portal`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });

// async function run() {
//     try {
//         // Connect the client to the server (optional starting in v4.7)
//         await client.connect();

//         // Create database
//         const db = client.db("Job-portal");
//         const jobCollection = db.collection("jobs");

//         // POST a job
//         app.post("/post-job", async (req, res) => {
//             const job = req.body;
//             job.createdAt = new Date();  // Corrected variable name
//             try {
//                 const result = await jobCollection.insertOne(job);
//                 if (result.insertedId) {
//                     return res.status(200).send(result);
//                 } else {
//                     return res.status(400).send({
//                         message: "Something went wrong",
//                         status: false
//                     });
//                 }
//             } catch (error) {
//                 return res.status(500).send({
//                     message: "Internal Server Error",
//                     error: error.message
//                 });
//             }
//         });

//         // GET all jobs
//         app.get('/all-jobs', async (req, res) => {
//             try {
//                 const jobs = await jobCollection.find({}).toArray();
//                 res.send(jobs);
//             } catch (error) {
//                 res.status(500).send({
//                     message: "Internal Server Error",
//                     error: error.message
//                 });
//             }
//         });

//         // get single job using id
//         app.get('/all-jobs/:id', async (req, res) => {
//             const id = req.params.id; // Corrected from res.params.id to req.params.id
//             try {
//                 const job = await jobCollection.findOne({
//                     _id: new ObjectId(id)
//                 });
//                 if (job) {
//                     res.send(job);
//                 } else {
//                     res.status(404).send({ message: "Job not found" });
//                 }
//             } catch (error) {
//                 res.status(500).send({ message: "Internal Server Error", error: error.message });
//             }
//         });

//         // GET all jobs by email
//         app.get('/myJobs/:email', async (req, res) => {
//             try {
//                 const jobs = await jobCollection.find({ postedBy: req.params.email }).toArray();
//                 res.send(jobs);
//             } catch (error) {
//                 res.status(500).send({
//                     message: "Internal Server Error",
//                     error: error.message
//                 });
//             }
//         });




//         // DELETE a job
//         app.delete("/job/:id", async (req, res) => {
//             try {
//                 const id = req.params.id;
//                 const filter = { _id: new ObjectId(id) };
//                 const result = await jobCollection.deleteOne(filter);
//                 res.send(result);
//             } catch (error) {
//                 res.status(500).send({
//                     message: "Internal Server Error",
//                     error: error.message
//                 });
//             }
//         });

//         // Update a job
//         app.patch("/update-job/:id", async (req, res) => {
//             const id = req.params.id;
//             const jobData = req.body;
//             const filter = { _id: new ObjectId(id) };
//             const options = { upsert: true };
//             const updateDoc = {
//                 $set: {
//                     ...jobData
//                 },
//             };
//             try {
//                 const result = await jobCollection.updateOne(filter, updateDoc, options);
//                 res.send(result);
//             } catch (error) {
//                 res.status(500).send({
//                     message: "Internal Server Error",
//                     error: error.message
//                 });
//             }
//         });

//         app.get('/dashboard', varifyUser, (req, res) => {
//             res.json("Success")
//         })

//         //dashboard and login sign up
//         const app = express()
//         app.use(express.json())
//         app.use(cors({
//             origin: ["http://localhost:5173"],
//             methods: ["GET", "POST"],
//             credentials: true
//         }))

//         app.use(cookieParser())

//         mongoose.connect('mongodb://127.0.0.1:27017/employee');

//         app.use(cookieParser())
//         const varifyUser = (req, res, next) => {
//             const token = req.cookies.token;
//             if (!token) {
//                 return res.json("Token is missing")
//             } else {
//                 jwt.verify(token, "jwt-secret-key", (err, decoded) => {
//                     if (err) {
//                         return res.json("Error with token")
//                     } else {
//                         if (decoded.role === "admin") {
//                             next()
//                         } else {
//                             return res.json("not admin")
//                         }
//                     }
//                 })
//             }
//         }

//         app.post('/sign-in', (req, res) => {
//             const { name, email, password } = req.body;
//             bcrypt.hash(password, 10)
//                 .then(hash => {
//                     UserModel.create({ name, email, password: hash })
//                         .then(user => res.json("Success"))
//                         .catch(err => res.json(err))
//                 }).catch(err => res.json(err))
//         })

//         app.post('/login', (req, res) => {
//             const { email, password } = req.body;
//             UserModel.findOne({ email: email })
//                 .then(user => {
//                     if (user) {
//                         bcrypt.compare(password, user.password, (err, response) => {
//                             if (response) {
//                                 const token = jwt.sign({ email: user.email, role: user.role },
//                                     "jwt-secret-key", { expiresIn: '1d' })
//                                 res.cookie('token', token)
//                                 return res.json({ Status: "Success", role: user.role })
//                             } else {
//                                 return res.json("The password is incorrect")
//                             }
//                         })
//                     } else {
//                         return res.json("No record existed")
//                     }
//                 })
//         })

//         app.listen(3001, () => {
//             console.log("Server is Running")
//         })

//         // Send a ping to confirm a successful connection
//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } catch (error) {
//         console.error("Failed to connect to MongoDB", error);
//     }
// }

// run().catch(console.dir);

// app.get('/', (req, res) => {
//     res.send('Hello World Ankit!');
// });

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
// });


const express = require('express');
const mongoose = require('mongoose')
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const UserModel = require('./model/user');

// Middleware
app.use(express.json());
app.use(cors());

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

// async function run() {
//     try {
//         // Connect the client to the server (optional starting in v4.7)
//         await client.connect();

        // Create database
        const db = client.db("Job-portal");
        const jobCollection = db.collection("jobs");

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
            res.json("Success")
        });

        
         // Route to POST a job
         app.post("/post-job", async (req, res) => {
            const job = req.body;
            job.createdAt = new Date();  // Corrected variable name
            try {
                const result = await jobCollection.insertOne(job);
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
                const jobs = await jobCollection.find({}).toArray();
                res.send(jobs);
            } catch (error) {
                res.status(500).send({
                    message: "Internal Server Error",
                    error: error.message
                });
            }
        });

         // get single job using id
         app.get('/all-jobs/:id', async (req, res) => {
            const id = req.params.id; // Corrected from res.params.id to req.params.id
            try {
                const job = await jobCollection.findOne({
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
        // GET all jobs by email
        app.get('/myJobs/:email', async (req, res) => {
            try {
                const jobs = await jobCollection.find({ postedBy: req.params.email }).toArray();
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
                const result = await jobCollection.deleteOne(filter);
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
                const result = await jobCollection.updateOne(filter, updateDoc, options);
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
                        .catch(err => res.json(err))
                }).catch(err => res.json(err))
        })

         // Route to handle user login
         app.post('/login', (req, res) => {
            const { email, password } = req.body;
            UserModel.findOne({ email: email })
                .then(user => {
                    if (user) {
                        bcrypt.compare(password, user.password, (err, response) => {
                            if (response) {
                                const token = jwt.sign({ email: user.email, role: user.role },
                                    "jwt-secret-key", { expiresIn: '1d' })
                                res.cookie('token', token)
                                return res.json({ Status: "Success", role: user.role })
                            } else {
                                return res.json("The password is incorrect")
                            }
                        })
                    } else {
                        return res.json("No record existed")
                    }
                })
        })

    //     app.listen(3000, () => {
    //         console.log("Server is Running")
    //     })

    //     // Send a ping to confirm a successful connection
    //     await client.db("admin").command({ ping: 1 });
    //     console.log("Pinged your deployment. You successfully connected to MongoDB!");
    // } catch (error) {
    //     console.error("Failed to connect to MongoDB", error);
//     }
// }


async function run() {
    try {
        await client.connect();
        const db = client.db("Job-portal");
        const jobCollection = db.collection("jobs");
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
// run().catch(console.dir);

// app.get('/', (req, res) => {
//     res.send('Hello World Ankit!');
// });

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
// });
