'use strict';

import { strict as assert } from 'assert';
import deepChange from "../index.js";

const data = {
  a: 1,
  b: [
    {
      c: 2,
    },
  ],
  d: {
    e: 1,
  },
  f: [1],
};

describe('deepChange', () => {
  it('changes the keys according to the callback function', () => {
    const answer = {
      A: 1,
      B: [
        {
          C: 2,
        },
      ],
      D: {
        E: 1,
      },
      F: [1],
    };
    assert.deepEqual(deepChange(data, key => key.toUpperCase()), answer);
  });

  it('changes the values according to the callback function', () => {
    const answer = {
      a: 'xxx',
      b: [
        {
          c: 'xxx',
        },
      ],
      d: {
        e: 'xxx',
      },
      f: ['xxx'],
    };
    assert.deepEqual(deepChange(data, null, () => 'xxx'), answer);
  });

  it('changes both keys and values according to the callback functions', () => {
    const answer = {
      A: 'xxx',
      B: [
        {
          C: 'xxx',
        },
      ],
      D: {
        E: 'xxx',
      },
      F: ['xxx'],
    };;
    assert.deepEqual(deepChange(data, key => key.toUpperCase(), () => 'xxx'), answer);
  });

  it('does not change anything without any callback function', () => {
    const answer = {
      A: 1,
      B: [
        {
          C: 2,
        },
      ],
      D: {
        E: 1,
      },
      F: [1],
    };
    assert.deepEqual(deepChange(data), data);
  });
});
