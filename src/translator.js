import { tokenize } from "./tokenizer.js";
import { parse } from "./parser.js";
import { emit } from "./emitter.js";
import { KEYWORDS, MEMBERS } from "./languages/indo/keywords.js"; // atau dinamis

export function translate(code, customKeywords = KEYWORDS, customMembers = MEMBERS) {
  const tokens = tokenize(code, customKeywords);
  const ast = parse(tokens, customMembers);
  return emit(ast);
}