const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const snippetRoutes = require('./routes/snippetRoutes');
const app = express();
app.use(cors());
require('dotenv').config();

app.use(express.json());

async function main() {
    await mongoose.connect(`mongodb+srv://patilsuyash545:${process.env.MONGO_URI}@snippetshare.byjyyyz.mongodb.net/?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
}

main().then(() => console.log('MongoDB connected')).catch(err => console.log(err));

//Routes

app.use('/api/user', userRoutes);
app.use('/api/snippet', snippetRoutes);


app.listen(3000, () => console.log('Server running on port 3000!'));