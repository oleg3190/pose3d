#!/usr/bin/env sh
set -eu

cd "$(dirname "$0")"

REQUESTED_PORT="${1:-4173}"
PORT="$(REQUESTED_PORT="$REQUESTED_PORT" python3 - <<'PY'
import os
import socket

requested = int(os.environ["REQUESTED_PORT"])
for port in range(requested, requested + 50):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        try:
            sock.bind(("127.0.0.1", port))
        except OSError:
            continue
        print(port)
        break
else:
    raise SystemExit(f"No free port found in range {requested}-{requested + 49}")
PY
)"

echo "Serving PoseLab at http://127.0.0.1:$PORT/"
echo "Press Ctrl+C to stop."
exec python3 -m http.server "$PORT" --bind 127.0.0.1
