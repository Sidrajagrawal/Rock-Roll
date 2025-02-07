import React, { useState, useEffect, useRef } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import './Dashboard.css';

const Dashboard = () => {
  const [tracks, setTracks] = useState([]);
  const [Trends, setTrends] = useState([]);
  const [dataFlag,setDataFlag] =useState(false);
  const [keyword, setkeyword] = useState("");
  const [Load, setLoad] = useState(false);
  const [TrackFlag, setTrackFlag] = useState(false);
  const [HomeFlag, setHomeFlag] = useState(true);
  const [TitleFlag, setTitleFlag] = useState(false);
  const [CurrentSong, setCurrentSong] = useState();
  const [CurrentName, setCurrentName] = useState("");
  const [CurrentImg, setCurrentImg] = useState();
  const [togglePause, setTogglePause] = useState("play");
  const audioRef = useRef();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const getTracks = async () => {
    setLoad(true);
    let data = await fetch(`https://v1.nocodeapi.com/siddharthrajag/spotify/EERpOKbXftPaDOGo/search?q=${keyword}&type=track`);
    let convertData = await data.json();
    if (convertData && convertData.tracks) {
      setTracks(convertData.tracks.items);
    }
    setLoad(false);
    setTrackFlag(true);
    setHomeFlag(false);
    setTitleFlag(false)
  }

  const getTrends = async () => {
    setLoad(true);
    let data = await fetch("https://v1.nocodeapi.com/siddharthrajag/spotify/EERpOKbXftPaDOGo/search?q=trending&type=track&perPage=20");
    let convertData = await data.json();
    setTrends(convertData.tracks.items);
    setLoad(false);
    setTitleFlag(true);
    setDataFlag(true);
  }

  const handleSongClick = (songName, song, images) => {
    setCurrentSong(song);
    setCurrentName(songName);
    setCurrentImg(images);
  }

  const PlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setTogglePause("play");

    } else {
      setTogglePause("pause");
      audioRef.current.pause();
    }
  }

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleSliderInput = (event) => {
    const newTime = event.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  useEffect(()=>{
    getTrends();
  },[])

  return (
    <div>
      <div className="main">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2 sidebar">
              <Sidebar />
            </div>
            <div className="col-md-10">
              <div className="nav">
                <div className="in">
                  <button onClick={getTracks}><i className="ri-search-line"></i></button>
                  <input type="text" placeholder='Search' value={keyword} onChange={(e) => setkeyword(e.target.value)} /></div>
                <select name="" id="">
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Punjabi">Punjabi</option>
                </select>
              </div>
              <div className="nav-division"></div>

              {/* ------------------------App---Loader---------------------------------------------- */}
              <div className={`row ${Load ? "" : "d-none"}`}>
                <div className="text-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
              {/* ----------------------------Trending--------------------------------------------*/}
              <h5 className={`mx-4 my-3 new ${TitleFlag ? "" : "d-none"}`}>Recommendations</h5>
              <div className={`card-container ${HomeFlag ? "" : "d-none"} my-4`} id="Trends">
                {Trends.map((ele) => (
                  <div className="card-wrapper ">
                    <div className="card" key={ele.id}>
                      <img src={ele.album.images[0].url} className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">{ele.name.length > 11 ? ele.name.substring(0, 11) + "..." : ele.name}</h5>
                        <p className="card-text">
                          <span className='artist-name'>Artist: {ele.album.artists[0].name.length > 11 ? ele.album.artists[0].name.substring(0, 8) + "..." : ele.album.artists[0].name}</span><br />
                          <span className="date">RealseDate: {ele.album.release_date}</span>
                        </p>
                        <button className="btn btn-outline-light" data-song-name={ele.name} data-song-track={ele.preview_url} data-song-img={ele.album.images[0].url} onClick={() => handleSongClick(ele.name, ele.preview_url, ele.album.images[0].url)}>Play Track</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* --------------------------Search-By-KeyWord--------------------------------------- */}
              <div className={`card-container ${TrackFlag ? "" : "d-none"} my-4`}>
                {tracks.map((ele) => (
                  <div className="card-wrapper ">
                    <div className="card" key={ele.id}>
                      <img src={ele.album.images[0].url} className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">{ele.name.length > 11 ? ele.name.substring(0, 11) + "..." : ele.name}</h5>
                        <p className="card-text">
                          <span className='artist-name'>Artist: {ele.album.artists[0].name.length > 11 ? ele.album.artists[0].name.substring(0, 8) + "..." : ele.album.artists[0].name}</span><br />
                          <span className="date">RealseDate: {ele.album.release_date}</span>
                        </p>
                        <button className="btn btn-outline-light" data-song-name={ele.name} data-song-track={ele.preview_url} data-song-img={ele.album.images[0].url} onClick={() => handleSongClick(ele.name, ele.preview_url, ele.album.images[0].url)}>Play Track</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className={`music-player ${dataFlag?"":"d-none"}`}>
                <div className="currenttitle">
                  <img src={CurrentImg} alt="" />
                  <h5>{CurrentName.length > 10 ? CurrentName.substring(0, 8) + "..." : CurrentName}</h5>
                </div>
                <i className={`ri-${togglePause}-line btn-play-pause`} onClick={PlayPause}></i>
                <div className="currenttrack">
                  <audio src={CurrentSong} controls ref={audioRef} onTimeUpdate={handleTimeUpdate}>
                  </audio>
                  <input type="range" min="0" max={duration} value={currentTime} onInput={handleSliderInput} />
                  <p className='duration'>{formatTime(currentTime)}/{formatTime(duration)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;