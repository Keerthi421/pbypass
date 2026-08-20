# PremiumGate Lab

A controlled, local demonstration of an important security principle: **client-side UI state is not authorization**.

This repository contains:

- `vulnerable-demo/` — a page that deliberately ships demo premium data to every browser and only hides it with client-side state.
- `extension/` — a Manifest V3 browser extension restricted to the local demo origin. It demonstrates that changing the presentation layer cannot be treated as authorization.
- `secure-demo/` — a minimal server-side entitlement service where protected data is returned only after the server checks the user's plan.

> This project is for localhost security education and interview preparation. The extension is intentionally restricted to `http://localhost:5173/*` and is not designed for third-party websites.

## Quick start

### 1. Vulnerable demo

Open `vulnerable-demo/index.html` in a browser or serve the repository with a local static server.

The page contains a free/premium UI gate. The premium report is already present in the browser document, illustrating the design flaw.

### 2. Demo extension

Load `extension/` as an unpacked extension in Chrome or Firefox's compatible developer mode. It only requests access to the local demo origin.

### 3. Secure demo

```bash
cd secure-demo
npm install
npm start
```

Then call the server using the supplied demo tokens shown in the API documentation.

## Interview takeaway

A user controls the browser. They can modify HTML, CSS, JavaScript state, storage, and even extension-injected presentation code. Therefore premium authorization must be enforced at the server boundary, before protected data is returned.
