#!/usr/bin/env node

import { readFileSync } from "node:fs";
import { translate } from "../src/translator.js";
import { KEYWORDS, MEMBERS } from "../src/languages/indo/keywords.js";

const file = process.argv[2];

if (!file) {
  console.log("Gunakan: indo <file.indo>");
  process.exit(1);
}

let source;
try {
  source = readFileSync(file, "utf8");
} catch (err) {
  if (err.code === "ENOENT") {
    console.error(`File tidak ditemukan: ${file}`);
    process.exit(1);
  }
  console.error(`Tidak dapat membaca file: ${err.message}`);
  process.exit(1);
}

let js;
try {
  js = translate(source, KEYWORDS, MEMBERS);
} catch (err) {
  if (err.name === "JawaError" && err.line != null) {
    console.error(`${err.message} (baris ${err.line}, kolom ${err.col})`);
  } else {
    console.error(`Error: ${err.message}`);
  }
  process.exit(1);
}

try {
  new Function(js)();
} catch (err) {
  console.error(`Error runtime: ${err.message}`);
  process.exit(1);
}