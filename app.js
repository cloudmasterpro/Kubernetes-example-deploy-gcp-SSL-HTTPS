const express = require('express');
const app = express();
const port = 8080;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Welcome to the future with our amazing futuristic app">
  <meta name="keywords" content="future, app, technology, innovation">
  <meta name="author" content="Your Name">
  <title>Welcome to your sample APP</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');

    body {
      margin: 0;
      font-family: 'Montserrat', sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #ffffff;
    }

    h1 {
      font-size: 4rem;
      background: linear-gradient(45deg, #FF4A4A, #FFA94D);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  </style>
</head>
<body>
  <h1>Welcome to to your sample APP</h1>
</body>
</html>
  `);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
