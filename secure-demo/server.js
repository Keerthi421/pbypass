import express from 'express';

const app = express();
const port = 3000;

// Demo-only identity source. In production this would be verified JWT/session data.
const users = {
  'free-demo-token': { id: 'user-free', plan: 'free' },
  'premium-demo-token': { id: 'user-premium', plan: 'premium' },
};

const premiumReport = {
  title: 'Q3 Growth Intelligence',
  conversionGrowth: '18%',
  enterpriseRetention: '94%',
  recommendedAction: 'Prioritize self-serve onboarding',
};

function authenticate(req, res, next) {
  const token = req.header('authorization')?.replace(/^Bearer\s+/i, '');
  const user = users[token];

  if (!user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  req.user = user;
  next();
}

function requirePremium(req, res, next) {
  if (req.user.plan !== 'premium') {
    return res.status(403).json({
      error: 'Premium entitlement required',
      userId: req.user.id,
    });
  }
  next();
}

app.get('/health', (_req, res) => res.json({ ok: true }));

app.get('/api/me', authenticate, (req, res) => {
  res.json({ id: req.user.id, plan: req.user.plan });
});

// The protected resource is never sent to a free user.
app.get('/api/premium-report', authenticate, requirePremium, (_req, res) => {
  res.json(premiumReport);
});

app.listen(port, () => {
  console.log(`Secure demo listening on http://localhost:${port}`);
  console.log('Free token: free-demo-token');
  console.log('Premium token: premium-demo-token');
});
