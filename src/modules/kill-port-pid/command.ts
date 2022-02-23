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
  await new Promise((resolve) => {
    exec(`kill -9 ${pid}`, (err, stdout) => {
      if (err) throw err;
      resolve(stdout);
    });
  });
};

export default command;
