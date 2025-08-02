const express = require('express');
const app = express();

const VERIFY_TOKEN = '07053119018';

// Home route
app.get('/', (req, res) => {
  res.send('✅ Meta OAuth Redirect Server is running');
});

// OAuth Callback route
app.get('/oauth/callback', (req, res) => {
  const code = req.query.code;
  const error = req.query.error;
  const state = req.query.state;

  if (error) {
    return res.send(`❌ Login failed: ${error}`);
  }

  if (code) {
    res.send(`
      <h2>✅ Authorization Code Received</h2>
      <p><strong>Code:</strong> ${code}</p>
      ${state ? `<p><strong>State:</strong> ${state}</p>` : ''}
      <p>Use this code to exchange for an access token.</p>
    `);
  } else {
    res.send('⚠️ No code or error received.');
  }
});

// Webhook verification route
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('✅ Webhook verified');
    res.status(200).send(challenge);
  } else {
    console.log('❌ Webhook verification failed');
    res.sendStatus(403);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
