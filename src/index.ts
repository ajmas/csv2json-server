import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import URL from 'url';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';
import csv from 'csvtojson';

const app = express();
const port = 3000;

const fsReadFile = promisify(fs.readFile);

const config = {
  source: __dirname + "/test-data.csv",
  mapping: [
    {
      fieldName: 'day',
      jsonPath: 'day'
    },
    {
      fieldName: 'time',
      jsonPath: 'day.time'
    }
  ]
}

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

async function loadFromSource() {
  const sourceUrl = URL.parse(config.source);
  if (!sourceUrl.protocol) {
    const filePath = config.source;;
    return await loadSpreadsheetFromFile(filePath);
  } else {
    return await loadSpreadsheetFromUrl(sourceUrl);
  }
}

function parseSpreadsheet(data) {
  const map = data.reduce((map, timeslot) => {
    const { Day, Time, ...rest } = timeslot;
    if (!Day || !Time) return map;
    if (!map[Day]) {
      map[Day] = {
        [Time]: rest
      };
    } else {
      map[Day][Time] = rest
    }
    return map;
  }, {})

  return map
}

async function loadSpreadsheet () {
  const data = await loadFromSource();
  const json = await csv({ trim: true }).fromString(data);

  const parsedData = parseSpreadsheet(json);
  return parsedData;
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


