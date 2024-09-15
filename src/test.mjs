// src/test.mjs
import { parse, TokenType } from './parser.mjs';
import transform from './transformer.mjs';

const tokens = [
    { type: TokenType.PUNCTUATION, value: '<' },
    { type: TokenType.NAME, value: 'div' },
    { type: TokenType.PUNCTUATION, value: '>' },
    { type: TokenType.NAME, value: 'Hello' },
    { type: TokenType.PUNCTUATION, value: '<' },
    { type: TokenType.PUNCTUATION, value: '/' },
    { type: TokenType.NAME, value: 'div' },
    { type: TokenType.PUNCTUATION, value: '>' },
];

const ast = parse(tokens);
console.log('AST:', JSON.stringify(ast, null, 2));

const jsCode = transform(ast);
console.log('Generated JavaScript:', jsCode);
