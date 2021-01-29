import express, { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import URL from 'url';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';
import csv from 'csvtojson';
import config from './config';

const app = express();
const port = 3000;
const fsReadFile = promisify(fs.readFile);

async function loadSpreadsheetFromUrl ( spreadsheetUrl: string ) {
  const response = await axios.get(spreadsheetUrl);
  if (response && response.data) {
    return response.data;
  }
  return undefined;
}

async function loadSpreadsheetFromFile ( spreadsheetPath: string ) {
  return fsReadFile(spreadsheetPath, 'UTF8');
}

async function loadFromSource() {
  const { source } = config;
  const sourceUrl = URL.parse(source);
  if (!sourceUrl.protocol) {
    return await loadSpreadsheetFromFile(source);
  } else {
    return await loadSpreadsheetFromUrl(source);
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

  if (!config.parse) {
    return json;
  }

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
  console.log(`CVS2JSON Server listening on port ${config.port}`)
});


