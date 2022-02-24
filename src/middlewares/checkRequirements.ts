import { exec } from 'child_process';
import compareVersions from 'compare-versions';
import { Command } from 'commander';

export interface requirements {
    [osname:string]: {
        [program:string]: {
            option:string|null,
            version:string|null,
            regex:string|''
        }
    }
}

const checkRequirements = async (reqs :requirements, program: Command) => {
  const cv = program.opts().checkVersion === 'true';
  const check = Object.entries(reqs[process.platform]);
  // eslint-disable-next-line no-promise-executor-return
  await Promise.all(check.map(([script, { option, version, regex }]) => (version ? new Promise((resolve) => exec(`${script} ${option}`, (error, stdout, stderr) => {
    if (error) throw error;
    if (!cv) return resolve(true);
    const out = stdout.length > 0 ? stdout : stderr;
    const recivedVersion = new RegExp(regex, 'gm').exec(out)?.[1] || '';
    const result = compareVersions(recivedVersion, version);
    if (result < 0) {
      throw Error(
        `Version mismatching on '${script}' version should be ${version} or newer version`,
      );
    }
    return resolve(true);
  }))
    : true)));
  return true;
};

export default checkRequirements;
