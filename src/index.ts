import createProgram from './program';
import createModules from './modules';

const program = createProgram();
createModules(program);
program.parse();
