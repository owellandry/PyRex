#!/usr/bin/env node

const { Command } = require('commander');
const { createApp } = require('./modules/createApp');
const { promptStructure } = require('./modules/promptStructure');
const { promptLanguage } = require('./modules/promptLanguage'); // Nueva función para lenguaje
const path = require('path');
const { execSync } = require('child_process');

const program = new Command();

program
  .version('1.0.0')
  .command('create-pyrex-app <appName>')
  .description('Crea una nueva aplicación Pyrex')
  .action(async (appName) => {
    await createApp(appName, promptStructure, promptLanguage);
  });

program
  .command('start')
  .description('Inicia el servidor en el puerto 3000')
  .action(() => {
    const serverPath = path.join(__dirname, 'server.js');
    try {
      execSync(`node ${serverPath}`, { stdio: 'inherit' });
    } catch (error) {
      console.error('Error al iniciar el servidor:', error.message);
    }
  });

program.parse(process.argv);
