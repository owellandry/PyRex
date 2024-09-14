#!/usr/bin/env node

// index.js

const { Command } = require('commander');
const { createApp } = require('./modules/createApp');
const { promptStructure } = require('./modules/promptStructure');
const { execSync } = require('child_process');

const program = new Command();

program
  .version('1.0.0')
  .command('create-pyrex-app <appName>')
  .description('Crea una nueva aplicación Pyrex')
  .action(async (appName) => {
    await createApp(appName, promptStructure);
  });

program
  .command('start')
  .description('Inicia el servidor de desarrollo')
  .action(() => {
    try {
      execSync('node modules/server.js', { stdio: 'inherit' });
    } catch (error) {
      console.error('Error al iniciar el servidor:', error.message);
    }
  });

program.parse(process.argv);
