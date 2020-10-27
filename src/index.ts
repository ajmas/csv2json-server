import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import URL from 'url';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';

const app = express();
const port = 3000;

const fsReadFile = promisify(fs.readFile);

const config = {
  source: "./test-data.csv",
  mapping: [{
    fieldName: '',
    jsonPath: []
  }]
};

async function loadSpreadsheetFromUrl ( spreadsheetUrl: any ) {
  const response = await axios.get(config.source);
  if (response && response.data) {
    return response.data;
  }
  return undefined;
}

async function loadSpreadsheetFromFile ( spreadsheetPath: string ) {
  return fsReadFile(spreadsheetPath, 'UTF8');
}

async function loadSpreadsheet () {
  let data;
  if (config.source) {
    const sourceUrl = URL.parse(config.source);
    if (!sourceUrl.protocol) {
      const filePath = config.source;;
      data = await loadSpreadsheetFromFile(filePath);
    } else {
      data = await loadSpreadsheetFromUrl(sourceUrl);
    }

    console.log(data);
    // TODO deal with parsing the spreadsheet;
    return {};
  } else {
    return undefined;
  }
}

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const json = await loadSpreadsheet ();
    res.json(json);
  } catch (error) {
    next(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});


