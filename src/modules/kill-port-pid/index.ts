import { Command, Argument } from 'commander';
import command from './command';
import checkRequirements, { requirements } from '../../middlewares/checkRequirements';

// eslint-disable-next-line global-require
const reqs = require('./requirements.json') as requirements;

const app = (program:Command) => {
  const portArd = new Argument('<port>', 'port number')
    .argOptional()
    .argParser((port) => parseInt(port, 10))
    .default(8080);
  program
    .command('kill-port-pid')
    .addArgument(portArd)
    .action(async (port:number) => {
      await checkRequirements(reqs, program);
      const response = await command(port);
      // eslint-disable-next-line no-console
      console.log(response);
    });
};

export default app;
