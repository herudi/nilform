# Nilform

Tiny ~400b to parse form-data.

## Features

- Just a small code ~400b.
- Easy to use.
- Automatic parsing of multiple fields/files.

## Install

```bash
npm i nilform

// or

yarn add nilform
```

## Usage

```js
const http = require("http");
const form = require("nilform");

http.createServer(async (req, res) => {
  const [field, file] = await form.parse(req);
  console.log(field, file);
  res.end("Nilform is simple");
}).listen(3000);
```

## Example

```js
const http = require("http");
const form = require("nilform");
const fs = require("node:fs/promises");

http.createServer(async (req, res) => {
  if (req.url === "/api/upload" && req.method === "POST") {
    const [field, file] = await form.parse(req);

    // save file
    const ab = await file.image.arrayBuffer();
    await fs.writeFile(file.image.name, Buffer.from(ab));

    res.setHeader("Content-Type", "text/html");
    res.end(`<h1>Title: ${field.title}</h1>`);
    return;
  }
  res.setHeader("Content-Type", "text/html");
  res.end(`
    <h2>Nilform Demo</h2>
    <form action="/api/upload" enctype="multipart/form-data" method="post">
      <div>Title: <input type="text" name="title" /></div>
      <div>File: <input type="file" name="image" /></div>
      <input type="submit" value="Upload" />
    </form>
  `);
}).listen(3000);
```
## Express Middleware
```js
const express = require("express");
const form = require("nilform");

const app = express();

const nilform = async (req, res, next) => {
  if (form.hasForm(req)) {
    const [field, file] = await form.parse(req);
    req.body = field;
    req.file = file;
  }
  next();
};

app.post("/", nilform, (req, res) => {
  console.log(req.body, req.file);
  res.send("success");
});

app.listen(3000);
```
## License

[MIT](LICENSE)
