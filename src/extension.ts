import * as vscode from 'vscode';
import * as path from 'path';
import fs from "fs";
import generator from "./generator";
import icons from "./icons";

// Write the icons.json file
fs.writeFile(
  "icons.json",
  JSON.stringify({
    hidesExplorerArrows: true,
    iconDefinitions: icons,
    ...generator,
  }),
  (err) => {
    if (err) {
      console.log("error", err);
    }
  }
);

export function activate(context: vscode.ExtensionContext) {
  // Register language configuration for .pyx files
  vscode.languages.setLanguageConfiguration('pyx', {
    comments: {
      lineComment: "//",
      blockComment: [ "/*", "*/" ]
    },
    brackets: [
      ["{", "}"],
      ["[", "]"],
      ["(", ")"]
    ],
    autoClosingPairs: [
      { open: "{", close: "}" },
      { open: "[", close: "]" },
      { open: "(", close: ")" }
    ]
  });

  // Register grammar for .pyx files
  const legend = new vscode.SemanticTokensLegend(
    ['keyword', 'variable', 'function'],
    []
  );

  vscode.languages.registerDocumentSemanticTokensProvider(
    { language: 'pyx' },
    new class implements vscode.DocumentSemanticTokensProvider {
      public provideDocumentSemanticTokens(document: vscode.TextDocument, token: vscode.CancellationToken): vscode.ProviderResult<vscode.SemanticTokens> {
        const builder = new vscode.SemanticTokensBuilder(legend);

        // Example: Adding tokens with proper parameters
        builder.push(0, 0, 10, 0); // Line 0, Char 0, Length 10, TokenType 0 (keyword)
        builder.push(1, 5, 20, 1); // Line 1, Char 5, Length 20, TokenType 1 (variable)

        return builder.build();
      }
    },
    legend
  );

  // Handle file changes for .pyx and pyxconfig
  vscode.workspace.onDidChangeTextDocument((event) => {
    const filePath = event.document.uri.fsPath;
    if (filePath.endsWith('.pyx') || path.basename(filePath) === 'pyxconfig') {
      // Handle .pyx files and pyxconfig file
      // For example, compile or process them
    }
  });

  // Add any additional commands or functionality as needed
}
