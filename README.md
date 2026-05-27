# 1 Qubit Quantum Simulator

A minimal client-side quantum computer simulator built with modern browser technologies.

The application demonstrates the fundamental behavior of a single qubit quantum computer directly inside the browser without requiring any backend server.

## Live Demo

- Demo: https://bowo-prasetyo.github.io/quantum-1qubit/
- Repository: https://github.com/bowo-prasetyo/quantum-1qubit/

---

## Features

- Vue 3 CDN architecture
- Vue Router multi-page navigation
- Web Worker quantum computation
- HTML Canvas visualization
- IndexedDB persistence
- GitHub Pages compatible
- Client-only application
- Educational user manual
- Beginner-friendly quantum explanations
- Quantum state persistence across browser refreshes

---

## Supported Quantum Gates

The simulator currently supports the common single-qubit gates:

| Gate | Name | Description |
|---|---|---|
| I | Identity Gate | Leaves the qubit unchanged |
| H | Hadamard Gate | Creates quantum superposition |
| X | Pauli-X Gate | Quantum NOT gate |
| Y | Pauli-Y Gate | Quantum rotation using imaginary phase |
| Z | Pauli-Z Gate | Quantum phase flip |
| S | Phase Gate | 90° quantum phase shift |
| T | π/8 Gate | 45° quantum phase shift |

---

## Quantum Concepts Demonstrated

The simulator demonstrates:

- Qubit state representation
- Superposition
- Quantum phase
- Quantum measurement
- Wavefunction collapse
- Reversible quantum operations
- Complex-number amplitudes
- Probability amplitudes
- Quantum gate transformations

---

## Technology Stack

### Frontend

- HTML5
- CSS3
- JavaScript ES Modules
- [Vue.js](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/)

### Browser APIs

- Web Workers
- HTML Canvas
- IndexedDB

### Deployment

- [GitHub Pages](https://pages.github.com/)

---

## Project Structure

```text
quantum-1qubit/
├── index.html
├── app.js
├── router.js
├── worker.js
├── db.js
├── styles.css
└── README.md
```

---

## Run Locally

Use any static web server.

Example using Python:

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

---

## Deploy To GitHub Pages

1. Create a GitHub repository
2. Upload all project files
3. Commit and push to GitHub
4. Open repository settings
5. Go to Pages
6. Select:
   - Branch: `main`
   - Folder: `/root`
7. Save settings

GitHub Pages will automatically deploy the application.

---

## Quantum State Representation

The qubit state is represented as:

```text
|ψ⟩ = α|0⟩ + β|1⟩
```

Where:

- α and β are complex probability amplitudes
- The total probability must equal 1

Normalization rule:

```text
|α|² + |β|² = 1
```

---

## Architecture

### Main Thread

Responsible for:

- Vue UI rendering
- Canvas visualization
- Router navigation
- IndexedDB persistence
- User interaction

### Web Worker

Responsible for:

- Quantum gate computation
- Matrix-vector multiplication
- Quantum measurement
- State collapse

This separation keeps the UI responsive while performing quantum calculations.

---

## Persistence

The simulator automatically saves the latest qubit state using IndexedDB.

Refreshing the browser restores the previous quantum state automatically.

---

## Educational Use Cases

The included User Manual demonstrates:

1. Classical bit flipping
2. Quantum superposition
3. Quantum collapse
4. Double Hadamard reversibility
5. Quantum phase manipulation
6. Identity operations
7. Complex quantum rotation
8. 90° phase shifting
9. π/8 fine phase control
10. Browser persistence

---

## Future Improvements

Possible future enhancements:

- True Bloch sphere rendering
- Multi-qubit simulation
- Entanglement visualization
- Quantum circuit editor
- Quantum Fourier Transform
- Bell state demonstrations
- WebGPU acceleration
- WASM math backend
- OPFS binary snapshots
- Noise and decoherence simulation
- Probability histograms
- Quantum algorithm playground

---

## License

MIT License

## Assisted By

[ChatGPT](https://chatgpt.com)
