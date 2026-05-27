const Home = {
  template: `
    <div class="container">
      <div class="card">
        <button @click="$router.push('/')">Simulator</button>
        <button @click="$router.push('/manual')">User Manual</button>
      </div>
      
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
        <h2>Quantum Concepts</h2>
      
        <p>
          <strong>Quantum State</strong><br>
          The current mathematical state of the qubit.
          A qubit can exist in a combination of |0⟩ and |1⟩ simultaneously.
        </p>
      
        <p>
          <strong>Hadamard (H)</strong><br>
          Creates superposition.
          It transforms a definite state into a 50/50 quantum mixture.
        </p>
      
        <p>
          <strong>Pauli-X</strong><br>
          Similar to a classical NOT gate.
          It flips |0⟩ into |1⟩ and vice versa.
        </p>
      
        <p>
          <strong>Pauli-Z</strong><br>
          Changes the quantum phase.
          Unlike Pauli-X, it does not flip probabilities directly.
        </p>
      
        <p>
          <strong>Measure</strong><br>
          Observes the qubit.
          Superposition collapses into either |0⟩ or |1⟩.
        </p>
      
        <p>
          <strong>Measurement</strong><br>
          Shows the latest observed classical result after measurement.
        </p>
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

const Manual = {
  template: `
    <div class="container">
      <div class="card">
        <button @click="$router.push('/')">Simulator</button>
        <button @click="$router.push('/manual')">User Manual</button>
      </div>

      <div class="card">
        <h1>User Manual</h1>

        <p>
          This simulator demonstrates the basic behavior of a single quantum bit (qubit).
        </p>

        <p>
          Unlike a classical bit that is only 0 or 1,
          a qubit can exist in a quantum superposition of both states.
        </p>
      </div>
      
      <div class="card">
        <h2>Use Case 1 — Classical Bit Flip</h2>
      
        <p>
          This demonstrates how some quantum operations can behave similarly
          to ordinary classical logic gates.
        </p>
      
        <p><strong>Objective:</strong></p>
      
        <p>
          Understand how the Pauli-X gate flips the qubit state,
          similar to a classical NOT operation.
        </p>
      
        <p><strong>Why This Matters:</strong></p>
      
        <p>
          Quantum computers still perform operations that resemble classical logic,
          but they do so using quantum mathematics.
        </p>
      
        <p><strong>Steps:</strong></p>
      
        <ol>
          <li>Press Reset</li>
          <li>Press Pauli-X</li>
          <li>Press Measure</li>
        </ol>
      
        <p><strong>Expected Result:</strong></p>
      
        <p>
          The measurement consistently becomes 1 because
          Pauli-X transforms |0⟩ into |1⟩.
        </p>
      </div>
      
      <div class="card">
        <h2>Use Case 2 — Quantum Superposition</h2>
      
        <p>
          This demonstrates one of the most important ideas in quantum computing:
          superposition.
        </p>
      
        <p><strong>Objective:</strong></p>
      
        <p>
          Observe how a qubit can mathematically exist in both |0⟩ and |1⟩ simultaneously.
        </p>
      
        <p><strong>Why This Matters:</strong></p>
      
        <p>
          Superposition allows quantum computers to process information
          differently from classical computers.
        </p>
      
        <p><strong>Steps:</strong></p>
      
        <ol>
          <li>Press Reset</li>
          <li>Press Hadamard (H)</li>
          <li>Press Measure, then repeat 2 → 3</li>
        </ol>
      
        <p><strong>Expected Result:</strong></p>
      
        <p>
          Measurements randomly become either 0 or 1
          with approximately equal probability.
        </p>
      </div>

      <div class="card">
        <h2>Use Case 3 — Quantum Collapse</h2>
      
        <p>
          This demonstrates how quantum measurement changes the quantum state itself.
        </p>
      
        <p><strong>Objective:</strong></p>
      
        <p>
          Observe wavefunction collapse after measurement.
        </p>
      
        <p><strong>Why This Matters:</strong></p>
      
        <p>
          In quantum mechanics, observation is not passive.
          Measuring a qubit forces it into a definite classical state.
        </p>
      
        <p><strong>Steps:</strong></p>
      
        <ol>
          <li>Press Reset</li>
          <li>Press Hadamard (H)</li>
          <li>Press Measure</li>
          <li>Press Measure again</li>
        </ol>
      
        <p><strong>Expected Result:</strong></p>
      
        <p>
          The second measurement usually matches the first because
          the first measurement already collapsed the quantum state.
        </p>
      </div>

      <div class="card">
        <h2>Use Case 4 — Double Hadamard</h2>
      
        <p>
          This demonstrates reversible quantum operations.
        </p>
      
        <p><strong>Objective:</strong></p>
      
        <p>
          Observe how applying the same quantum gate twice
          can restore the original state.
        </p>
      
        <p><strong>Why This Matters:</strong></p>
      
        <p>
          Many quantum operations are reversible,
          unlike many ordinary classical processes.
        </p>
      
        <p><strong>Steps:</strong></p>
      
        <ol>
          <li>Press Reset</li>
          <li>Press Hadamard (H)</li>
          <li>Press Hadamard (H) again</li>
          <li>Press Measure</li>
        </ol>
      
        <p><strong>Expected Result:</strong></p>
      
        <p>
          The qubit returns to the original |0⟩ state.
        </p>
      </div>

      <div class="card">
        <h2>Use Case 5 — Quantum Phase Change</h2>
      
        <p>
          This demonstrates quantum phase manipulation using the Pauli-Z gate.
        </p>
      
        <p><strong>Objective:</strong></p>
      
        <p>
          Observe how quantum phase can change internally
          without immediately changing measurement probabilities.
        </p>
      
        <p><strong>Why This Matters:</strong></p>
      
        <p>
          Quantum computation depends not only on probabilities,
          but also on hidden phase relationships between amplitudes.
        </p>
      
        <p>
          Phase differences later influence interference effects
          in larger quantum algorithms.
        </p>
      
        <p><strong>Steps:</strong></p>
      
        <ol>
          <li>Press Reset</li>
          <li>Press Hadamard (H)</li>
          <li>Press Pauli-Z</li>
          <li>Press Measure repeatedly</li>
        </ol>
      
        <p><strong>Expected Result:</strong></p>
      
        <p>
          Measurements still appear approximately 50/50,
          even though the internal quantum phase changed.
        </p>
      </div>

      <div class="card">
        <h2>Use Case 6 — Persistence</h2>

        <p><strong>Objective:</strong></p>

        <p>
          Observe browser-based local persistence.
        </p>

        <p><strong>Steps:</strong></p>

        <ol>
          <li>Change the quantum state</li>
          <li>Refresh the browser page</li>
        </ol>

        <p><strong>Expected Result:</strong></p>

        <p>
          The previous quantum state is restored automatically.
        </p>
      </div>

    </div>
  `
};

export const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/manual',
      component: Manual
    }
  ]
});
