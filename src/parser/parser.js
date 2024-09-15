function parse(tokens) {
    const ast = {
        type: 'Program',
        body: []
    };

    while (tokens.length > 0) {
        ast.body.push(parseElementOrExpression(tokens));
    }

    return ast;
}

function parseElementOrExpression(tokens) {
    const token = tokens[0];

    if (token.type === 'PUNCTUATION' && token.value === '<') {
        return parseHTMLElement(tokens);
    } else {
        throw new TypeError(`Unexpected token type: ${token.type} with value: ${token.value}`);
    }
}

function parseHTMLElement(tokens) {
    const token = tokens.shift(); // Elimina el token de apertura "<"
    
    if (tokens[0].type !== 'NAME') {
        throw new TypeError(`Expected tag name after '<', but got: ${tokens[0].value}`);
    }

    const element = {
        type: 'HTMLElement',
        name: tokens.shift().value, // Elimina el nombre del elemento
        body: []
    };

    if (tokens[0].type !== 'PUNCTUATION' || tokens[0].value !== '>') {
        throw new TypeError(`Expected '>' but got: ${tokens[0].value}`);
    }

    tokens.shift(); // Elimina el token de cierre '>'

    // Parsear el cuerpo del elemento
    while (tokens[0] && !(tokens[0].type === 'PUNCTUATION' && tokens[0].value === '<')) {
        element.body.push(parseTextOrReference(tokens));
    }

    // Verificar etiqueta de cierre
    if (tokens[0].type === 'PUNCTUATION' && tokens[0].value === '<') {
        tokens.shift(); // Elimina el token de apertura de cierre
        if (tokens[0].type === 'PUNCTUATION' && tokens[0].value === '/') {
            tokens.shift(); // Elimina el token de "/"
            if (tokens[0].type === 'NAME' && tokens[0].value === element.name) {
                tokens.shift(); // Elimina el nombre del elemento de cierre
                if (tokens[0].type === 'PUNCTUATION' && tokens[0].value === '>') {
                    tokens.shift(); // Elimina el token de cierre ">"
                } else {
                    throw new TypeError(`Expected '>' but got: ${tokens[0].value}`);
                }
            } else {
                throw new TypeError(`Expected closing tag for ${element.name} but got: ${tokens[0].value}`);
            }
        } else {
            throw new TypeError(`Expected '/' but got: ${tokens[0].value}`);
        }
    }

    return element;
}

function parseTextOrReference(tokens) {
    const token = tokens[0];
    if (token.type === 'NAME') {
        return {
            type: 'Reference',
            name: tokens.shift().value,
            body: []
        };
    } else if (token.type === 'PUNCTUATION') {
        return {
            type: 'Text',
            value: tokens.shift().value
        };
    }
    throw new TypeError(`Unexpected token in body: ${token.type}`);
}

module.exports = { parse };
