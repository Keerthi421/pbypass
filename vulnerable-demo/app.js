const state = {
  isPremium: false,
};

const section = document.getElementById('premium-section');
const overlay = document.getElementById('lock-overlay');
const badge = document.getElementById('plan-badge');
const upgradeButton = document.getElementById('upgrade-button');

function render() {
  section.classList.toggle('locked', !state.isPremium);
  section.setAttribute('aria-hidden', String(!state.isPremium));
  badge.textContent = state.isPremium ? 'PREMIUM' : 'FREE';
  upgradeButton.textContent = state.isPremium ? 'Premium active' : 'Upgrade';
  upgradeButton.disabled = state.isPremium;
}

upgradeButton.addEventListener('click', () => {
  // Demo only: this mimics a frontend-only entitlement flag.
  state.isPremium = true;
  render();
});

// The local demo extension can dispatch this event to demonstrate presentation-layer tampering.
window.addEventListener('premiumgate-demo-enable', () => {
  state.isPremium = true;
  render();
});

render();
