import { exec } from 'child_process';

const command = async (port:number) => {
  const pids:number[] = await new Promise((resolve) => {
    exec(`lsof -n -i :${port} | grep LISTEN`, (err, stdout) => {
      if (err) throw new Error('port is sleeping');
      const result = stdout.split(/\s/g).filter((e) => e !== '');
      resolve(result.filter((data, index) => index % 10 === 1).map((e) => parseInt(e, 10)));
    });
  });
  return pids;
};

export default command;
