
const allowedOrigin = ['http://127.0.0.1:5500']

const corsOptions = {
    origin: (origin, callback) => {
        // !origin to allow postman calls
        if (allowedOrigin.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}

module.exports = corsOptions