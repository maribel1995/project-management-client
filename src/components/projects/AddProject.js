// components/projects/AddProject.js

import React, { Component } from 'react';
import axios from 'axios';
import service from '../../api/service';

class AddProject extends Component {
  constructor(props){
      super(props);
      this.state = { 
        title: "", 
        description: "",
        imageUrl: "" 
      };
  }

  // this method handles just the file upload
  handleFileUpload = e => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("imageUrl", e.target.files[0]);
    
    service.handleUpload(uploadData)
    .then(response => {
        // console.log('response is: ', response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
        this.setState({ imageUrl: response.secure_url });
      })
      .catch(err => {
        console.log("Error while uploading the file: ", err);
      });
}
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    

    service.saveNewProject(this.state)
        .then(res => {
            console.log('added: ', res);
            // here you would redirect to some other page 
        })
        .catch(err => {
            console.log("Error while adding the thing: ", err);
        });

    
  }

  handleChange = (event) => {  
      const {name, value} = event.target;
      this.setState({[name]: value});
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Title:</label>
          <input type="text" name="title" value={this.state.title} onChange={e => this.handleChange(e)}/>
          <label>Description:</label>
          <textarea name="description" value={this.state.description} onChange={e => this.handleChange(e)} />
          <input 
                    type="file" 
                    onChange={(e) => this.handleFileUpload(e)} /> 
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default AddProject;