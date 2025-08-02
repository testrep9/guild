const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('✅ Meta OAuth Redirect Server is running');
});

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
