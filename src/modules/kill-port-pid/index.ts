import { Command, Argument } from 'commander';
import command from './command';

const app = (program:Command) => {
  const portArd = new Argument('<port>', 'port number')
    .argOptional()
    .argParser((port) => parseInt(port, 10))
    .default(8080);
  program
    .command('kill-port-pid')
    .addArgument(portArd)
    .action(command(program));
};

export default app;
