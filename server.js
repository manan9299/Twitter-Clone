const { sendMessage, receiveMessage  } = require('./routes/user');

app.get('/api/user/receiveMessage', receiveMessage);
app.post('/api/user/sendMessage', sendMessage);