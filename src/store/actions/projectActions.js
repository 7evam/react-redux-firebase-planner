export const createProject = (project) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
  // async call to database
  // store reference to firebase DB in this variable
  const firestore = getFirestore();
  const profile = getState().firebase.profile;
  const authorId = getState().firebase.auth.uid;
  firestore.collection('projects').add({
    ...project,
    authorFirstName: profile.firstName,
    authorLastName: profile.lastName,
    authorId: authorId,
    createdAt: new Date()
   }).then(() => {
    dispatch({ type: 'CREATE_PROJECT_SUCCESS', project })
   }).catch((err) => {
    dispatch({ type: 'CREATE_PROJECT_ERROR', err })
   })
  }
};
