import { Command } from 'commander';

const createProgram : () => Command = () => {
  const program = new Command();
  program
    .option('-cv, --check-version <boolean>', 'tool not check the program versions when this set false', 'true');
  return program;
};

export default createProgram;
