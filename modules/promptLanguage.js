// modules/promptLanguage.js

const inquirer = require('inquirer').default;

async function promptLanguage() {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'language',
      message: '¿Qué lenguaje de programación prefieres?',
      choices: ['javascript', 'typescript'],
    },
  ]);

  return answer;
}

module.exports = { promptLanguage };
