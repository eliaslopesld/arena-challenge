import assert from 'assert';
import { describe, it } from 'node:test';
import { ipToId } from '../src/shared/utils/ip-to-id';

describe('ipToId', () => {
  it('should return a number', () => {
    const result = ipToId('0.0.0.0');
    assert(typeof result === 'number', 'it should be a number');
  });

  it('when receive 8.8.8.8 should return correct number', () => {
    const result = ipToId('8.8.8.8');

    assert.strictEqual(result, 134744072, 'should convert ip correctly');
  });
});
