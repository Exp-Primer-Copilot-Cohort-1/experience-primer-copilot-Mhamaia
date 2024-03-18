// Create web server for comments

// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

// Create express app
const app = express();

// Use body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set up static directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up comments route
app.get('/comments', (req, res) => {
    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading comments');
        }
        res.json(JSON.parse(data));
    });
});

app.post('/comments', (req, res) => {
    fs.readFile('comments.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading comments');
        }
        const comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile('comments.json', JSON.stringify(comments, null, 4), (err) => {
            if (err) {
                return res.status(500).send('Error writing comments');
            }
            res.json(comments);
        });
    });
});

// Set up server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
