import express from "express"
import {
    createProxyMiddleware,
} from "http-proxy-middleware"

const app = express()
const port = 4000
const base = "/api/v1"

const USER_SERVICE_URL = "http://localhost:3000"

app.use(`${base}/user`, createProxyMiddleware({
    target: USER_SERVICE_URL,
    changeOrigin: true,
}));

app.listen(port, () => {
    console.log(`Gateway listening at http://localhost:${port}`)
})