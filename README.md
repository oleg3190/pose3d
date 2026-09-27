# PoseLab

A self-contained SetPose-style personal pose reference landing page.

## No runtime CDN dependency

Open `index.html` directly or serve the folder with any static web server. For a simple local server: `python3 -m http.server 4173`. The mannequin renderer is self-contained Canvas2D, so the page works without internet access.

## Features

- pseudo-3D articulated mannequin with orbit + zoom
- Basic / Male / Female / Child proportions
- Bend / Tilt / Rotate controls
- joint-specific human-range limits with coupled shoulder/hip constraints
- presets and constrained random poses
- local save + shareable URL
- PNG export
- props, figure color and scene controls

This project is an independent implementation inspired by the interaction pattern of 3D pose-reference tools; it does not bundle SetPose's proprietary code or assets.
