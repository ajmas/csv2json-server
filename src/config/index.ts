import * as dotenv from 'dotenv';
dotenv.config()

export default {
    apiUrl: process.env.API_URL,
    source: process.env.CSV_SOURCE,
    parse: process.env.PARSE,
    mappings: require('./mappings.json')
}