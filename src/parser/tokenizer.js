function tokenize(input) {
    const tokens = [];
    let current = 0;

    while (current < input.length) {
        let char = input[current];

        if (char === '<') {
            tokens.push({ type: 'PUNCTUATION', value: '<' });
            current++;
            continue;
        }

        if (char === '>') {
            tokens.push({ type: 'PUNCTUATION', value: '>' });
            current++;
            continue;
        }

        if (char === '/') {
            tokens.push({ type: 'PUNCTUATION', value: '/' });
            current++;
            continue;
        }

        const WHITESPACE = /\s/;
        if (WHITESPACE.test(char)) {
            current++;
            continue;
        }

        const NAME = /[a-zA-Z]/;
        if (NAME.test(char)) {
            let value = '';

            while (NAME.test(char)) {
                value += char;
                char = input[++current];
            }

            tokens.push({ type: 'NAME', value });
            continue;
        }

        throw new TypeError(`Unknown character: ${char}`);
    }

    return tokens;
}

module.exports = { tokenize };
