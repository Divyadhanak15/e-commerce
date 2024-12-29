const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Category = require('./models/Category');
require('dotenv').config();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

const app = express();
app.use(bodyParser.json());
app.use('/api', authRoutes);


app.use(cors());
app.use(express.json());

const MONGO_URI = "mongodb+srv://Divya:12345@cluster0.yaqta.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();

app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const { name, image } = req.body;
    const newCategory = new Category({ name, image });
    await newCategory.save();
    res.json(newCategory);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
