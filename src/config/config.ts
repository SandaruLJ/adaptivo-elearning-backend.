// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export default {
    port: parseInt(process.env.PORT||"3005", 10),
    dbURL: process.env.MONGODB_URI,
    secret: process.env.SECRET,
    version:process.env.BE_VERSION
}