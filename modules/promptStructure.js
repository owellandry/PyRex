const inquirer = require('inquirer').default;

async function promptStructure() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'structure',
      message: 'Elige la estructura del proyecto:',
      choices: ['src', 'app', 'page'],
    },
  ]);

  return answers;
}

module.exports = { promptStructure };
