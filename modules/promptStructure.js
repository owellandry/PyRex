const inquirer = require('inquirer').default;

async function promptStructure() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'structure',
      message: 'Elige la estructura del proyecto:',
      choices: ['src', 'app', 'page'],
    },
    {
      type: 'list',
      name: 'language',
      message: 'Elige el lenguaje del proyecto:',
      choices: ['JavaScript', 'TypeScript'],
    },
  ]);

  return answers;
}

module.exports = { promptStructure };
