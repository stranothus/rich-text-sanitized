const express = require("express");
const sanitizeHtml = require("sanitize-html");

const app = express();
const bodyParsing = express.json();
const formParsing = express.urlencoded({ extended: false });

app.use(bodyParsing);
app.use(formParsing);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/add.html");
});

app.post("/", (req, res) => {
    const html = req.body.content;
    const sanitized = sanitizeHtml(html);

    res.send(`
        <!DOCTYPE html>
        <html>
            <head>
                <title>View document</title>
                <meta charset="utf-8">
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/trix/1.3.1/trix.css">
                <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/trix/1.3.1/trix.js"></script>
                <style>
                    .trix-content {
                        margin: 50px;
                    }
                </style>
            </head>
            <body>
                <div class="trix-content">${sanitized}</div>
            </body>
        </html>
    `);
});

const PORT = process?.env?.PORT || 3030;

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
})