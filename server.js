const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Add bcrypt for password hashing
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// MongoDB connection string
const dbURI = 'mongodb://localhost:27017/car_management';

// Connect to MongoDB
async function connectDB() {
    try {
        await mongoose.connect(dbURI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
}

connectDB();

// Define user schema and model
const userSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: { type: String, unique: true },
    password: String,
});
const User = mongoose.model("User", userSchema);

// Define car schema and model
const carSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: { type: String, required: true },
    images: [{ type: String }],  // Array of image URLs
});
const Car = mongoose.model('Car', carSchema);

// Set up multer storage (storing images in a folder called 'uploads')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);  // Create the uploads folder if it doesn't exist
        }
        cb(null, uploadDir);  // Directory where the files will be stored
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);  // Get file extension
        const filename = Date.now() + ext;  // Create a unique filename
        cb(null, filename);
    }
});

// Initialize multer with the storage configuration
const upload = multer({ storage });

// API Routes

// User login route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password); // Compare hashed password
            if (isMatch) {
                res.send({ message: "Login successful", user });
            } else {
                res.status(401).send({ message: "Invalid password" });
            }
        } else {
            res.status(404).send({ message: "User not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Error occurred during login" });
    }
});

// User signup route
app.post("/signup", async (req, res) => {
    const { fname, lname, email, password } = req.body;
    if (!fname || !lname || !email || !password) {
        return res.status(400).send({ message: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ message: "User is already registered" });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ fname, lname, email, password: hashedPassword });
        await newUser.save();
        res.send({ message: "Account created successfully! Please login." });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Error occurred during signup" });
    }
});

// API Route to Fetch All Products (Cars)
app.get('/getproducts', async (req, res) => {
    try {
        const products = await Car.find().exec();  // Use Mongoose's `find` to get all products
        console.log(products);  // Now it will log after products are fetched
        res.status(200).json(products);  // Return the products as a JSON response
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});


// API Route to Add New Car (with image upload)
app.post("/api/products", upload.array('images', 5), async (req, res) => {
    const { title, description, tags } = req.body;
    
    const images = req.files.map(file => `/uploads/${file.filename}`);  // Save image paths

    if (!title || !description || !tags || !images.length) {
        return res.status(400).send({ message: "All fields and images are required" });
    }

    try {
        const newCar = new Car({
            title,
            description,
            tags,
            images,  // Save image URLs in the database
        });

        await newCar.save();
        res.status(201).send({ message: "Car added successfully!" });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Error occurred while adding the car" });
    }
});

// API Route to Fetch a Single Product by ID
app.get('/api/product/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find the product in MongoDB using the provided ID
        const product = await Product.findOne({ _id: id });
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json(product); // Return the product details
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
app.listen(8000, () => {
    console.log("Server starting at port 8000");
});
