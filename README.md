# PoseLab

A single-page personal 3D pose reference editor.

## Run

You can open `index.html` directly in a browser or serve the folder with `./serve.sh`. The editor loads a pinned Three.js build from jsDelivr at runtime, so internet access is required for the 3D engine.

For a local HTTP run:

```sh
./serve.sh
```

Then open `http://127.0.0.1:4173/`.

## Features

- articulated human-style mannequin built from Three.js primitives
- Basic / Male / Female / Child proportions
- Bend / Tilt / Rotate controls
- conservative joint limits with dynamic shoulder twist limits
- constrained random poses and presets
- local save and shareable pose URLs
- PNG export
- props, figure color, lighting and orbit camera

The implementation is independent of SetPose's proprietary source code and assets.
