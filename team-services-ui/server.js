const express = require("express");
const path = require("path");

const app = express();

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, "dist")));

// Handle all other requests by sending the 'index.html' file
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/index.html"));
});

const port = 80;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
