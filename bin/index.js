#!/usr/bin/env node

import dotenv from 'dotenv';
import { Command } from 'commander';
import init from '../src/index.js';

dotenv.config();

const program = new Command();

program  
  .command('start')
  .description('Start the proxy server')
  .action(() => {    
    init();
  });

program.parse(process.argv);
