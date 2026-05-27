const Home = {
  template: `
    <div class="container">
      <div class="card">
        <h1>1 Qubit Quantum Simulator</h1>

        <p>
          Minimal quantum computer simulator using Vue, Web Worker,
          Canvas, and IndexedDB.
        </p>
      </div>

      <div class="card">
        <canvas ref="canvas" width="400" height="400"></canvas>
      </div>

      <div class="card">
        <button @click="applyGate('H')">Hadamard (H)</button>
        <button @click="applyGate('X')">Pauli-X</button>
        <button @click="applyGate('Z')">Pauli-Z</button>
        <button @click="measure">Measure</button>
        <button @click="reset">Reset</button>
      </div>

      <div class="card">
        <h3>Quantum State</h3>

        <pre>{{ prettyState }}</pre>

        <p>Measurement: {{ measurement }}</p>
      </div>
    </div>
  `,

  data() {
    return {
      state: [
        { re: 1, im: 0 },
        { re: 0, im: 0 }
      ],
      measurement: '-',
      worker: null
    };
  },

  computed: {
    prettyState() {
      return JSON.stringify(this.state, null, 2);
    }
  },

  async mounted() {
    this.worker = new Worker('./worker.js');

    this.worker.onmessage = async (e) => {
      const msg = e.data;

      if (msg.type === 'state') {
        this.state = msg.state;
      }

      if (msg.type === 'measurement') {
        this.measurement = msg.measured;
        this.state = msg.state;
      }

      await window.db.saveState(this.state);
      this.draw();
    };

    const saved = await window.db.loadState();

    if (saved) {
      this.state = saved;
    }

    this.draw();
  },

  methods: {
    applyGate(gate) {
      const plainState = structuredClone(Vue.toRaw(this.state));
    
      this.worker.postMessage({
        type: 'gate',
        gate,
        state: plainState
      });
    },
    
    measure() {
      const plainState = structuredClone(Vue.toRaw(this.state));
    
      this.worker.postMessage({
        type: 'measure',
        state: plainState
      });
    },
        
    async reset() {
      this.state = [
        { re: 1, im: 0 },
        { re: 0, im: 0 }
      ];

      this.measurement = '-';

      await window.db.saveState(this.state);

      this.draw();
    },

    draw() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = 200;
      const centerY = 200;
      const radius = 140;

      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      const alpha = this.state[0];
      const beta = this.state[1];

      const p0 = alpha.re * alpha.re + alpha.im * alpha.im;
      const p1 = beta.re * beta.re + beta.im * beta.im;

      const x = centerX + (p1 - p0) * radius;
      const y = centerY;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = '#2f6fed';
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#2f6fed';
      ctx.fill();

      ctx.fillStyle = 'white';
      ctx.fillText('|0⟩', 40, 205);
      ctx.fillText('|1⟩', 340, 205);
    }
  }
};

export const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: Home
    }
  ]
});
