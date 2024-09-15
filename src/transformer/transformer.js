function transform(ast) {
    function traverseNode(node) {
        if (node.type === 'HTMLElement') {
            const children = node.body.map(traverseNode).join('');
            return `<${node.name}>${children}</${node.name}>`;
        }

        if (node.type === 'Reference') {
            return node.name;
        }

        throw new TypeError(`Unknown node type: ${node.type}`);
    }

    return traverseNode(ast.body[0]);
}

module.exports = { transform };
