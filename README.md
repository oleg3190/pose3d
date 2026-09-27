# PoseLab

A single-page personal 3D pose reference editor.

## Run

Open `index.html` through a static web server. The page uses Three.js and OrbitControls from jsDelivr at runtime, so the editor needs internet access to load its 3D engine.

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
