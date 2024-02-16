import mongoose from 'mongoose';

const mongoDBURI: string = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/Bunny';

mongoose.connect(mongoDBURI)
    .then((): void => {
        console.log(`MongoDB Connected to ${mongoDBURI}`)
    }).catch((err): void => {
        console.log(err)
    });