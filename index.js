const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const morgan = require('morgan');
dotenv.config();
const app = express();

app.use(cors())
app.use(express.json)
app.use(morgan('dev'))
//app.use(express.static('public'));

app.use('/test', require("./routes/testRoutes"))

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
console.log(`Running on port ${PORT}`);
});
