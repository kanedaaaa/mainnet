import express from "express"
import {
    createProxyMiddleware,
} from "http-proxy-middleware"

const app = express()
const port = 4000

const USER_SERVICE_URL = "http://localhost:3000"

app.get(`/ping`, (req, res) => {
    res.send("pong")
})

app.use('/api/v1/user', createProxyMiddleware({
    target: 'http://localhost:3000',
    changeOrigin: true,
    pathRewrite: {
        '^/api/v1/user': '/'  
    },
    onError: (err, req, res) => {
        console.error(err);
        res.status(500).send("Something went wrong");
    }
}));

app.listen(port, () => {
    console.log(`Gateway listening at http://localhost:${port}`)
})