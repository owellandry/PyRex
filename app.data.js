const TokenType = {
    NAME: 'name',
    PUNCTUATION: 'punctuation',
    NUMBER: 'number',
};

const NodeType = {
    PROGRAM: 'Program',
    COMPONENT_DECLARATION: 'ComponentDeclaration',
    HTML_ELEMENT: 'HTMLElement',
    TEXT: 'Text',
    EXPRESSION: 'Expression',
    REFERENCE: 'Reference',
    NUMBER: 'Number',
};

function parse(tokens) {
    let current = 0;

    function advance() {
        return tokens[current++];
    }

    function expect(type, value) {
        let token = tokens[current];
        if (!token || token.type !== type || (value && token.value !== value)) {
            throw new TypeError(`Expected ${value ? `"${value}"` : type} but found: ${token ? token.value : 'end of input'}`);
        }
        return advance();
    }

    function parseComponent() {
        expect(TokenType.NAME, 'component');
        let name = expect(TokenType.NAME).value;
        expect(TokenType.PUNCTUATION, '{');

        const node = {
            type: NodeType.COMPONENT_DECLARATION,
            name,
            body: [],
        };

        while (tokens[current] && !(tokens[current].type === TokenType.PUNCTUATION && tokens[current].value === '}')) {
            const childNode = parseElementOrExpression();
            if (childNode) node.body.push(childNode);
        }

        expect(TokenType.PUNCTUATION, '}');
        return node;
    }

    function parseElement() {
        expect(TokenType.PUNCTUATION, '<');

        let elementName = '';
        while (tokens[current] && (tokens[current].type === TokenType.NAME || tokens[current].type === TokenType.NUMBER)) {
            elementName += advance().value;
        }

        expect(TokenType.PUNCTUATION, '>');

        const node = {
            type: NodeType.HTML_ELEMENT,
            name: elementName,
            body: [],
        };

        if (tokens[current]?.type === TokenType.PUNCTUATION && tokens[current]?.value === '/') {
            expect(TokenType.PUNCTUATION, '/');
            expect(TokenType.PUNCTUATION, '>');
            return node;
        }

        while (tokens[current] && !(tokens[current].type === TokenType.PUNCTUATION && tokens[current].value === '<' && tokens[current + 1]?.value === '/')) {
            const childNode = parseElementOrExpression();
            if (childNode) node.body.push(childNode);
        }

        if (tokens[current]?.type === TokenType.PUNCTUATION && tokens[current].value === '<' && tokens[current + 1]?.value === '/') {
            expect(TokenType.PUNCTUATION, '<');
            expect(TokenType.PUNCTUATION, '/');

            let closingElementName = '';
            while (tokens[current] && (tokens[current].type === TokenType.NAME || tokens[current].type === TokenType.NUMBER)) {
                closingElementName += advance().value;
            }

            if (closingElementName !== elementName) {
                throw new TypeError(`Closing tag name "${closingElementName}" does not match opening tag name "${elementName}"`);
            }

            expect(TokenType.PUNCTUATION, '>');
            return node;
        }

        throw new TypeError('Expected closing tag');
    }

    function parseExpression() {
        expect(TokenType.PUNCTUATION, '{');

        const node = {
            type: NodeType.EXPRESSION,
            body: [],
        };

        while (tokens[current] && !(tokens[current].type === TokenType.PUNCTUATION && tokens[current].value === '}')) {
            const childNode = parseElementOrExpression();
            if (childNode) node.body.push(childNode);
        }

        expect(TokenType.PUNCTUATION, '}');
        return node;
    }

    function parseElementOrExpression() {
        const token = tokens[current];

        if (token.type === TokenType.NAME) {
            return {
                type: NodeType.REFERENCE,
                name: advance().value,
                body: [],
            };
        }

        if (token.type === TokenType.PUNCTUATION) {
            if (token.value === '.') {
                advance();
                return {
                    type: NodeType.TEXT,
                    value: '.',
                    body: [],
                };
            }

            if (token.value === ',') {
                advance();
                return {
                    type: NodeType.TEXT,
                    value: ',',
                    body: [],
                };
            }

            if (token.value === ';') {
                advance();
                return null; // Consider handling this properly
            }

            if (token.value === '{') {
                return parseExpression();
            }

            if (token.value === '<') {
                return parseElement();
            }

            throw new TypeError(`Unexpected punctuation: ${token.value}`);
        }

        if (token.type === TokenType.NUMBER) {
            return {
                type: NodeType.NUMBER,
                value: advance().value,
                body: [],
            };
        }

        throw new TypeError(`Unexpected token type: ${token.type} with value: ${token.value}`);
    }

    const ast = {
        type: NodeType.PROGRAM,
        body: [],
    };

    while (current < tokens.length) {
        const node = parseComponent() || parseElementOrExpression();
        if (node) {
            ast.body.push(node);
        }
    }

    return ast;
}

module.exports = { parse, TokenType, NodeType };
