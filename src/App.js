import {React, Component} from 'react';
import './App.css';
import FaceRecognition from './components/facerecognition/FaceRecognition';
import Logo from './components/logo/Logo'
import ImageLinkForm from './components/imagelinkform/ImageLinkForm';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

// API KEY
const app = new Clarifai.App({
  apiKey: '6fc32c9907094a588f42373c3c7e1552'
});

// particles-js options
const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 700
      }
    }
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl:'',
      box:{}
    }
  }

  //calculate location of face
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow:  height - (clarifaiFace.bottom_row * height)
    }
  }

  //get face box
  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  //get input for image url
  onInputChange = (event) => {
    this.setState({ input: event.target.value});
  }

  //actions taken after image url is submitted
  onSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
          .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
          .then(this.handleScroll)
          .catch(err => console.log(err));

  }

  //scroll to bottom of page
 handleScroll = () => {
    window.scroll({
      top: document.body.offsetHeight,
      left: 0, 
      behavior: 'smooth',
    });
  }

  //render app
  render(){
    return (
      <div className="App">
        <Particles
          className="particles"
          params={particlesOptions}
        />
        <Logo />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onSubmit={this.onSubmit}
        />
        <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box} />   
      </div>
    );
  }
}

export default App;
