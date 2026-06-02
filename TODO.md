# TODO - Fix upload/download accuracy and display

- [ ] Backend: add endpoint(s) to support duration-based upload/download measurement and return authoritative metrics.
- [ ] Frontend: refactor speed test to call backend for upload/download metrics and only use results for display.
- [ ] Backend: ensure /api/upload-large and download logic returns consistent numeric `speed`.
- [ ] Frontend: remove fragile client-side download sampling; update history graph using backend-provided samples (or compute a stable series from backend metrics).
- [ ] Smoke test: run backend + frontend and confirm Upload card updates and Download value is stable.
