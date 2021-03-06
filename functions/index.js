const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase)

exports.helloWorld = functions.https.onRequest((req,res)=>{
  res.send('hello FSB world')
})

const createNotification = (notification => {
  return admin.firestore().collection('notifications')
  .add(notification)
  .then(doc => console.log('notification added', doc))
})

exports.concertCreated = functions.firestore
  .document('concerts/{concertId}')
  .onCreate(doc => {
    const concert = doc.data();
    const notification = {
      content: 'Added a new concert',
      user: `${concert.authorFirstName} ${concert.authorLastName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    }
    return createNotification(notification);
});
// create trigger when a user has been created
exports.userJoined = functions.auth.user()
  .onCreate(user => {

    return admin.firestore().collection('users')
      .doc(user.uid).get().then(doc => {
        const newUser = doc.data()
        const notification = {
          content: 'Joined the party!',
          user: `${newUser.firstName} ${newUser.lastName}`,
          time: admin.firestore.FieldValue.serverTimestamp()
        }
      return createNotification(notification);
      })
  })
