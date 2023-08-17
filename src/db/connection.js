import config from '../config.js';
import { MongoClient } from 'mongodb';
export default async function conn() {
    try {
        const uri = `mongodb+srv://${config.username}:${config.password}@cluster0.tnoihx3.mongodb.net/${config.database}`;
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        const client = await MongoClient.connect(uri, options);
        return client.db();
    } catch (error) {
        return { status: 500, message: error };
    }
}