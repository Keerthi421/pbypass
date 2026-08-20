# PremiumGate Lab

A controlled interview-preparation project demonstrating a core security principle: **client-side UI state is not authorization**.

## Repository contents

- `interview-target/` — a realistic coding-platform-style mock target. One deliberately vulnerable premium editorial is already delivered to the browser and only hidden by client-side state.
- `extension/` — a Manifest V3 extension restricted to the authorized local practice target.
- `vulnerable-demo/` — a simpler visual demonstration of the same design flaw.
- `secure-demo/` — a minimal server-side entitlement service where protected data is returned only after the server checks the user's plan.

## Mock interview workflow

Start the target from the repository root:

```bash
npx serve interview-target -l 5173
```

Open:

```text
http://localhost:5173
```

Then practice as if you were given an unknown target:

1. Inspect the DOM.
2. Inspect loaded JavaScript and browser state.
3. Determine whether premium data has already reached the browser.
4. Write or adapt the practice extension against this authorized target.
5. Explain why the approach works.
6. Compare it with `secure-demo/`, where the server returns `403` before protected data is sent.

## Interview takeaway

A user controls the browser. HTML, CSS, JavaScript state, and local storage are not trusted authorization boundaries. Protected data should only be returned after server-side authentication and entitlement checks.
