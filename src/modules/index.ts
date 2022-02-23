import { Command } from 'commander';
import findPortPid from './find-port-pid';
import killPortPid from './kill-port-pid';

const createModules = (program:Command) => ({
  findPortPid: findPortPid(program),
  killPortPid: killPortPid(program),
});

export default createModules;
