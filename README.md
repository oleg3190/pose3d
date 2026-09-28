# PoseLab

A single-page personal 3D pose reference editor.

## Run

You can open `index.html` directly in a browser or serve the folder with `./serve.sh`. If port 4173 is busy, the script automatically selects the next free port. You can also pass a starting port, for example `./serve.sh 8080`. The editor bundles a local Three.js r160 compatibility build so it works in environments that expose WebGL1 but not WebGL2; no external JavaScript CDN is required.

For a local HTTP run:

```sh
sh ./serve.sh
```

The script prints the exact URL to open.

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
