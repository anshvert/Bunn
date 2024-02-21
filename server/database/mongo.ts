import mongoose from 'mongoose';

const mongoDBURI: string = process.env.MONGODB_URI ?? 'mongodb+srv://ansh:Ansh2222@radiant.vfzdf6u.mongodb.net/Buny';

mongoose.connect(mongoDBURI)
    .then((): void => {
        console.log(`MongoDB Connected to ${mongoDBURI}`)
    }).catch((err): void => {
        console.log(err)
    });