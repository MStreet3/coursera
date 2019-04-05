import React, {
  Component
} from 'react';
//import logo from './logo.svg';
import './App.css';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

class App extends Component {
  render() {
    return ( 
    <div className = "App" >
      <Header />
      <Footer />
    </div>
    );
  }
}

export default App;