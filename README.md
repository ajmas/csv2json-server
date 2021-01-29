# CSV2JSON Server

Welcome to "CSV2JSON Server". This is a simple bridge between a CSV
file, that is either located locally or on an HTTP server.

## Installing

This project is written in [Node.js](https://nodejs.org/) and should run
on any platform that can run nodejs.

Assuming you have Node.js installed, you then need to install the packages this project depends on:

```sh
npm install
```

## Running

Note, in basic mode the server simply does a direct mapping of CSV headers
to JSON fields names.

Basic running involves specifying the source of the CSV as follows:

```sh
export CSV2JSON_SOURCE="http://myserver/endpoint"
```

This may be specifed directly on the command line on in a `.env` file.

Then launching the server via:

```sh
npm run web
```

You can then access the data at http://localhost:3000/

## Using the Mapping File

If you wish to have more control over how the fields are named, then
you'll need to specify a mappings file, using the following
format:

```json
{
    "fields": [{
        "fieldName": "day",
        "jsonPath": "day"
    },
    {
        "fieldName": "time",
        "jsonPath": "time"
    },
    {
        "fieldName": "Track 1 language",
        "jsonPath": "track1Lang"
    }]
}
```

The properties are as follows:

  - **columnIndex**: the index of the column to take data from in the CSV
  - **columnName**: the name of the column to take the data from in the CSV
  - **jsonPath**: the json property name to use. Note, child paths
    are not supported.

Note, that either 'columnIndex' or 'columnName' should be used. If both
are specified for a given field, then 'columnIndex' will take precedence.

Next, let server know to use this

```sh
export CSV2JSON_MAPPING=./mappings.json
export CSV2JSON_PARSE=1

```

Then launch the server as in the basic mode.
