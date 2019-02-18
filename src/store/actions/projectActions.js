export const createProject = (project) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
  // async call to database
  // store reference to firebase DB in this variable
  const firestore = getFirestore();
  firestore.collection('projects').add({
    ...project,
    authorFirstName: 'Evam',
    authorLastName: 'Lane',
    authorId: 123,
    createdAt: new Date()
   }).then(() => {
    dispatch({ type: 'CREATE_PROJECT_SUCCESS', project })
   }).catch((err) => {
    dispatch({ type: 'CREATE_PROJECT_ERROR', err })
   })
  }
};
