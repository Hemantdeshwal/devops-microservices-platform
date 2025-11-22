const express = require('express');
const app = express();
const port = 3003;

app.get('/', (req, res) => res.send('Hello from Service A!'));

app.listen(port, () => console.log(`Service A running on port ${port}`));
