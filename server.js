const { sendMessage, viewMessage  } = require('./routes/user');

app.get('/api/user/viewMessage', viewMessage);
app.post('/api/user/sendMessage', sendMessage);