import { createApp } from './app.js';

const port = Number(process.env.PORT || 4104);
createApp().listen(port, () => {
  console.log('UPI Guardian Mode API listening on http://127.0.0.1:' + port);
});

