import { exec } from 'child_process';
import { Command } from 'commander';
import checkRequirements, { requirements } from '../../middlewares/checkRequirements';
// eslint-disable-next-line global-require
const reqs = require('./requirements.json') as requirements;

const command = (program:Command) => async (port:number) => {
  await checkRequirements(reqs, program);
  const pid = await new Promise((resolve) => {
    exec(`lsof -n -i :${port} | grep LISTEN`, (err, stdout) => {
      if (err) throw err;
      const result = stdout.split(/\s/g).filter((e) => e !== '')[1];
      resolve(result);
    });
  });
  // eslint-disable-next-line no-console
  console.log(pid);
};

export default command;
