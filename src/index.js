const express = require('express');
const app     = express();

const Config        = require('./config');
const { Firestore } = require('./gcp');
const OAuth2Client  = new (require('google-auth-library').OAuth2Client)();



app.get('/session', async (req, res) => {

  let sessionRef = Firestore.USER_SESSION.doc(req.body.sessionId);
  let session = (await sessionRef.get()).data();

  delete session.$;

  res.send({ id:req.body.sessionId, ...session });

});

app.post('/session', async (req, res) => {

  let session = {
    user: null,
    device: {
      userAgent: req.body.userAgent
    },
    location: null,
    status: 'active',
    timestamp: {
      create     : Date.now(),
      login      : null,
      logout     : null,
      lastActive : Date.now()
    },
    $: {
      version: 1
    }
  };

  session.id = (await Firestore.USER_SESSION.add(session)).id;

  delete session.$;

  res.send(session);

});



app.post('/register', async (req, res) => {
  res.send(501);
});

app.post('/login', async (req, res) => {
  res.send(501);
});

app.post('/google-login', async (req, res) => {

  // Verfy idToken and extract payload

  let payload = (await OAuth2Client.verifyIdToken({
    idToken  : req.body.idToken,
    audience : '220251834863-p6gimkv0cgepodik4c1s8cs471dv9ioq.apps.googleusercontent.com',
  })).payload;

  const email = payload.email.toLowerCase();


  // Fetch or create USER doc

  let users = await Firestore.USER.where('email', '==', email).get();
  users = users.docs.map(doc => { return { id: doc.id, ...doc.data() } });

  if(users.length > 1) {
    // TODO: Report unexpected users.length > 1
    users.sort((a, b) => {
      if(a.timestamp.create != b.timestamp.create)
        return a.timestamp.create < b.timestamp.create ? -1 : 1;
      if(a.timestamp.update != b.timestamp.update)
        return a.timestamp.update < b.timestamp.update ? 1 : -1;
      return 0;
    });
  }

  let user = users[0];
  if(!user) {

    let firstName = payload.given_name;
    let lastName  = payload.family_name;
    let imageUrl  = payload.picture;

    if(imageUrl.endsWith('=s96-c'))
      imageUrl = imageUrl.substring(0, imageUrl.length - 6);

    user = {
      name: {
        first : firstName,
        last  : lastName
      },
      image: {
        url: imageUrl
      },
      email: email,
      password: null,
      totp: null,
      timestamp: {
        create: Date.now(),
        update: Date.now()
      },
      $: {
        version: 1,
        partition: Math.ceil(Math.random() * 100)
      }
    };

    user.id = (await Firestore.USER.add(user)).id;

  }


  // Update USER_SESSION doc
  
  let sessionRef = Firestore.USER_SESSION.doc(req.body.sessionId);

  let session = (await sessionRef.get()).data();
  if(session.user != null || session.status != 'active')
    return res.sendStatus(400);

  await sessionRef.update({
    user                   : user.id,
    status                 : 'loggedin',
    'timestamp.login'      : Date.now(),
    'timestamp.lastActive' : Date.now()
  });


  // Create and send response

  delete user.password;
  delete user.totp;
  delete user.$;

  res.send(user);

});

app.post('/logout', async (req, res) => {

  let sessionRef = Firestore.USER_SESSION.doc(req.body.sessionId);

  let session = (await sessionRef.get()).data();
  if(session.status != 'loggedin')
    return res.sendStatus(400);

  await sessionRef.update({
    user                   : user.id,
    status                 : 'loggedout',
    'timestamp.logout'     : Date.now(),
    'timestamp.lastActive' : Date.now()
  });

  res.sendStatus(200);

});



app.listen(process.env.PORT || 8080, console.log(`index: Server is up and listening at ${ process.env.PORT || 8080 } port.`));
