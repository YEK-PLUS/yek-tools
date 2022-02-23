import { Command, Argument } from 'commander';
import command from './command';

const app = (program:Command) => {
  const portArg = new Argument('<port>', 'port number')
    .argOptional()
    .argParser((port) => parseInt(port, 10))
    .default(8080);
  program
    .command('find-port-pid')
    .addArgument(portArg)
    .action(command(program));
};

export default app;
