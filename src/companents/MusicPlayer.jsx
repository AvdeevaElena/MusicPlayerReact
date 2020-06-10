
import React from 'react';
import axios from 'axios';
import s from './MusicPlayer.module.css';

const enslndasAdetag =require("./musicFiles/Bo Kaspers Orkester - En sl ndas andetag.mp3");
const whatAWonderfulWorld =require("./musicFiles/Israel Kamakawiwoole - What A Wonderful World.mp3");
const ourHouse =require("./musicFiles/Madness Mdness - Our House.mp3");
const coplasTelúricas =require("./musicFiles/Martin Fierro - Coplas Telúricas.mp3");
const burlesque =require("./musicFiles/Rapossa - Burlesque.mp3");
const mysteryOfLove =require("./musicFiles/Sufjan Stevens - Mystery of Love.mp3");


const freebird = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3";


let audio = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3");

function getTime(time) {
  if (!isNaN(time)) {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }
}
  
  class MusicPlayer extends React.Component {
    state = {
        currentSong: null,
        music: "stopped",
        currentTime: null,
        duration: null
      };  


      componentWillReceiveProps(nextProps) {
        console.log('next props', nextProps.song); 
        console.log('value pass', this.props.song);  
  
        this.setState({
            currentSong: nextProps.song
          });
      
    }  

      componentDidUpdate(prevProps, prevState) {
        if (this.state.currentSong !== prevState.currentSong) {
          let track;
          switch (this.state.currentSong) {
            case "Martin Fierro - Coplas Telúricas":
              track = coplasTelúricas;
              break;
            case "Rapossa - Burlesque":
              track = burlesque;
              break;
            case "Madness Madness - Our House":
              track = ourHouse;
              break;
            case "Sufjan Stevens - Mystery of Love":
              track = mysteryOfLove;
              break;
            case "Bo Kaspers Orkester - En sl ndas andetag":
              track = enslndasAdetag;
              break;
            case "Israel Kamakawiwoole - What A Wonderful World":
              track = whatAWonderfulWorld;
              break;  
            default:
              break;
          }
    
          if (track) {
            
            this.musicPlay.src = track;
            console.log('state.music src after', this.musicPlay.src); 
            this.musicPlay.play();
            this.setState({
              music: "playing"
            });
          }
        }
    
        if (this.state.music !== prevState.music) {
          if (this.state.music === "paused") {
            this.musicPlay.pause();
          }
          if (this.state.music === "playing" && prevState.music === "paused") {
            this.musicPlay.play();
          }
          if (this.state.music === "stop") {
            this.musicPlay.pause();
            this.currentTime = 0;
            this.setState({
              currentSong: null
            });
          }
        }
      }


      render() {
        const currentTime = getTime(this.state.currentTime);
        const duration = getTime(this.state.duration);
     
        return (
          <>
            <audio ref={ref => (this.musicPlay = ref)} />
              <div className = {s.playerLayout}>
                <div>
                  {this.state.music === "playing" ? (
                    <div>
                     {this.state.currentSong} is playing{" "}
                    </div>
                  ) : null}
                  {this.state.music === "paused" ? (
                    <div>
                      {this.state.currentSong} is paused{" "}
                    </div>
                  ) : null}
                  {this.state.music === "playing" ||
                  this.state.music === "paused" ? (
                    <div>
                      {currentTime} / {duration}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div >
                  {this.state.music === "paused" && (
                    <button className = {s.button}
                      onClick={() => this.setState({ music: "playing" })}
                    >
                      <i/>
                      Play
                    </button>
                  )}
                  {this.state.music === "playing" && (
                    <button className = {s.buttonTest}
                      onClick={() => this.setState({ music: "paused" })}
                    >
                      <i/>
                      Pause
                    </button>
                  )}
                  {this.state.music === "playing" ||
                  this.state.music === "paused" ? (
                    <button 
                      onClick={() => this.setState({ music: "stop" })}
                    >
                      <i/>
                      Stop
                    </button>
                  ) : null}
                </div>
            </div>
          </>
        );
      }


      componentDidMount() {
        this.musicPlay.addEventListener("timeupdate", e => {
          this.setState({
            currentTime: e.target.currentTime,
            duration: e.target.duration
          });
        });
      }
    
      componentWillUnmount() {
        this.music.removeEventListener("timeupdate", () => {});
      }
    
}
export default MusicPlayer;