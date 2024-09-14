const inquirer = require('inquirer').default;

async function promptLanguage() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'language',
      message: 'Elige el lenguaje de programación:',
      choices: ['javascript', 'typescript'],
    },
  ]);

  return answers;
}

module.exports = { promptLanguage };
