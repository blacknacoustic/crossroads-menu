// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// Set up multer for file uploads
const upload = multer({ dest: 'public/images/' });  // Store images in 'public/images' folder

// Middleware to serve static files
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));  // Serve images from 'public/images'

// Serve your React app's build files
app.use(express.static(path.join(__dirname, 'build')));  // Serving React build

// Route to handle image uploads
app.post('/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    const imageUrl = `/images/${req.file.filename}`;  // URL to access the uploaded image
    res.status(200).json({ imageUrl });  // Return image URL in response
  } else {
    res.status(400).send('No file uploaded.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
