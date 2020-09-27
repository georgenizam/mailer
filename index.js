const express = require('express');
const bodyParser = require('body-parser');
const mailer = require('./nodemailer')
 

const app = express();

const PORT = 3001;

let user = undefined;

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use(bodyParser.urlencoded({ extended: false }))
app.post('/registration', (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.sendStatus(400);
  }
  const message = {
    from: 'Mailer test: <nodemailer123test@gmail.com>',
    to: req.body.email,
    subject: 'Congratulations',
    text: `Вы зарегистрировались на сайте, ваши данные для авторизации: 
      login: ${req.body.email}
      password: ${req.body.password}

      Данное письмо не требует ответа.`
  }
  mailer(message)
  user = req.body
  res.redirect('/registration')
  
  
});
app.get('/', (req, res) => {
  
  res.sendFile(__dirname + '/index.html');  
});
app.get('/registration', (req, res) => {
  if (typeof user !== 'object') return res.sendFile(__dirname + '/registration.html');
  res.send(`Регистрация прошла успешно! Данные отправлены на email ${user.email}`);  
  user = undefined;
});

app.listen(PORT, () => console.log(`server listen at http://localhost:${PORT}`));