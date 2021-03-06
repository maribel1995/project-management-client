import axios from 'axios';

const service = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api`,
  withCredentials: true // => you might need this when having the users in the app 
});

const errorHandler = err => {
  // console.error(err); 
  throw err;
};

export default {
  service,

  handleUpload (theFile) {
    // console.log('file in service: ', theFile)
    return service.post('/upload', theFile)
      .then(res => res.data)
      .catch(errorHandler);
  },

  saveNewProject(project) {
    // console.log('new thing is: ', newThing)
    return service.post('/projects', project)
      .then(res => res.data)
      .catch(errorHandler);
  }
}