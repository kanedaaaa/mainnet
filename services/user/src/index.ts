import authRouter from './routers/auth.router';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("OK")
})

app.use('/auth', authRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
