# 1 Qubit Quantum Simulator

Minimal client-side quantum computer simulator.

## Features

- Vue 3 CDN
- Vue Router CDN
- Web Worker quantum computation
- HTML Canvas visualization
- IndexedDB persistence
- GitHub Pages compatible

## Run Locally

Use any static server.

Example:

```bash
python -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Deploy To GitHub Pages

1. Create GitHub repository
2. Upload all files
3. Push to GitHub
4. Open repository settings
5. Enable GitHub Pages
6. Deploy from `main` branch root

## Quantum Gates

- H = Hadamard
- X = Pauli-X
- Z = Pauli-Z

## State Representation

Qubit state:

```math
|ψ⟩ = α|0⟩ + β|1⟩
```

Probabilities:

```math
|α|² + |β|² = 1
```
