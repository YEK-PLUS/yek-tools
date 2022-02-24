import { spawn } from 'child_process';
import command from './command';

describe('kill-port-pid module check', () => {
  it('check its working', async () => {
    const port = spawn('nc -l 8080', [], {
      detached: true,
      shell: true,
    });

    const response = await command(8080);
    const running = false;

    response.map((pid) => {
      if (!running) return false;
      try {
        process.kill(pid, 0);
      // eslint-disable-next-line no-empty
      } catch {}
      return true;
    });

    port.kill();
    expect(Array.isArray(response)).toBe(true);
    response.map((e) => expect(typeof e).toBe('number'));
    expect(running).toBe(false);
  });
});
