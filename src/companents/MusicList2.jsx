import React from 'react';
import axios from 'axios';
import MusicPlayer from './MusicPlayer';
import { Card} from 'antd';
import s from './MusicList2.module.css';


  class MusicList2 extends React.Component {
    state = {
        musicList: [],
        currentSong: null,
        music: "stopped"
      };
      componentDidMount() {
      axios.get(`https://avdeevaelena.github.io/json/music3.json`)
      .then(res => {
        const musicList = res.data;
        this.setState({ musicList });
      }) 
      }

       render() {    
        const playList = this.state.musicList.map(song => {
          return (
              <div className={s.child}>
                <img className={s.mus_pic} src={song.url} 
                 onClick={() => this.setState({ currentSong: song.title })}
                />
                  <Card
                    className={s.mus_title}
                    key={song.id}
                    onClick={() => this.setState({ currentSong: song.title })}
                     title={song.title} 
                    />    
            </div>     
          );
        });
        return (
          <div>
            <div className={s.header}>
            <h1 className={s.h1}>MUSIC PLAYER </h1>   
            </div>
            <div className={s.parent}>
            <div className="playlist">   {playList}</div>
            </div>
             <MusicPlayer song={this.state.currentSong}
                         status={this.state.music}
            /> 
            <div className={s.footer}>
                          made by React and me 
                    <p> avdeevaelena5@gmail.com  </p> 
            </div>
          </div>
        )
  }
}
export default MusicList2;