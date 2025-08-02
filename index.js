const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Meta OAuth Callback Server Running');
});

app.get('/oauth/callback', (req, res) => {
  const code = req.query.code;
  const error = req.query.error;
  if (code) {
    res.send(`✅ Authorization code received: <strong>${code}</strong>`);
  } else if (error) {
    res.send(`❌ Authorization failed: ${error}`);
  } else {
    res.send('No code or error in query');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
