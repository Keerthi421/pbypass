# Secure Demo API

Start the service:

```bash
npm install
npm start
```

## Free user

```bash
curl -H "Authorization: Bearer free-demo-token" http://localhost:3000/api/premium-report
```

Expected response:

```json
{
  "error": "Premium entitlement required",
  "userId": "user-free"
}
```

## Premium user

```bash
curl -H "Authorization: Bearer premium-demo-token" http://localhost:3000/api/premium-report
```

The report is returned only after authentication and entitlement checks succeed.

## Design principle

The browser may claim anything about its plan. The server treats the authenticated identity and its own entitlement data as the source of truth.
