export const createConcert = (concert) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
  // async call to database
  // store reference to firebase DB in this variable
  const firestore = getFirestore();
  const profile = getState().firebase.profile;
  const authorId = getState().firebase.auth.uid;
  firestore.collection('concerts').add({
    ...concert,
    authorFirstName: profile.firstName,
    authorLastName: profile.lastName,
    authorId: authorId,
    createdAt: new Date()
   }).then(() => {
    dispatch({ type: 'CREATE_CONCERT_SUCCESS', concert })
   }).catch((err) => {
    dispatch({ type: 'CREATE_CONCERT_ERROR', err })
   })
  }
};
