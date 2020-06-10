import React, { Component } from 'react';
import { HashRouter} from "react-router-dom";
import './App.css';
import MusicList2 from './companents/MusicList2';

class App extends Component {
  render() {
    return (
      <HashRouter>      
           <div className = 'app-wrapper' >  
           <div className = 'app-wrapper-content'>            
           < MusicList2/>        
           </div>
    </div>
      </HashRouter>
    );
  }
}
export default App;

