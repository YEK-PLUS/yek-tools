import { spawn } from 'child_process';
import command from './command';

describe('find-port-pid module check', () => {
  it('check its working', async () => {
    const port = spawn('nc -l 8080', [], {
      detached: true,
      shell: true,
    });

    const response = await command(8080);
    port.kill();
    expect(Array.isArray(response)).toBe(true);
    response.map((e) => expect(typeof e).toBe('number'));
  });
});
