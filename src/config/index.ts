import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config()

const mappingsPath = process.env.CSV2JSON_MAPPING;

const data = fs.readFileSync(mappingsPath, 'utf-8');
const json = JSON.parse(data);

export default {
    port: process.env.CSV2JSON_PORT || 3000,
    source: process.env.CSV2JSON_SOURCE,
    parse: process.env.CSV2JSON_PARSE === '1',
    mappings: json
}