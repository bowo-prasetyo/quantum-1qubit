function complex(re, im) {
  return { re, im };
}

function multiplyMatrixVector(m, v) {
  return [
    {
      re: m[0][0].re * v[0].re - m[0][0].im * v[0].im +
          m[0][1].re * v[1].re - m[0][1].im * v[1].im,
      im: m[0][0].re * v[0].im + m[0][0].im * v[0].re +
          m[0][1].re * v[1].im + m[0][1].im * v[1].re
    },
    {
      re: m[1][0].re * v[0].re - m[1][0].im * v[0].im +
          m[1][1].re * v[1].re - m[1][1].im * v[1].im,
      im: m[1][0].re * v[0].im + m[1][0].im * v[0].re +
          m[1][1].re * v[1].im + m[1][1].im * v[1].re
    }
  ];
}

const SQRT2 = Math.sqrt(2);

const gates = {
  X: [
    [complex(0, 0), complex(1, 0)],
    [complex(1, 0), complex(0, 0)]
  ],

  Z: [
    [complex(1, 0), complex(0, 0)],
    [complex(0, 0), complex(-1, 0)]
  ],

  H: [
    [complex(1 / SQRT2, 0), complex(1 / SQRT2, 0)],
    [complex(1 / SQRT2, 0), complex(-1 / SQRT2, 0)]
  ]
};

function probability(a) {
  return a.re * a.re + a.im * a.im;
}

self.onmessage = (e) => {
  const { type, gate, state } = e.data;

  if (type === 'gate') {
    const result = multiplyMatrixVector(gates[gate], state);

    self.postMessage({
      type: 'state',
      state: result
    });
  }

  if (type === 'measure') {
    const p0 = probability(state[0]);
    const rnd = Math.random();

    const measured = rnd < p0 ? 0 : 1;

    const collapsed = measured === 0
      ? [complex(1, 0), complex(0, 0)]
      : [complex(0, 0), complex(1, 0)];

    self.postMessage({
      type: 'measurement',
      measured,
      state: collapsed
    });
  }
};
