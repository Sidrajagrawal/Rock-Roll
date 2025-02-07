import React from 'react'
import './Sidebar.css';

const Sidebar = () => {

    return (
        <div>
            <div className="logo">
                <i className="ri-netease-cloud-music-line"></i>
                <h2>Rock&Roll</h2>
            </div>
            <div className="menu">
                <a href=""><h5><i className="ri-home-5-line"></i> Home</h5></a>
                <a href=""><h5><i className="ri-fire-line"></i> Trending</h5></a>
                <h6 className='subhead'>Discover</h6>
                <a href=""><h5><i className="ri-album-fill"></i> Albums</h5></a>
                <a href=""><h5><i className="ri-account-circle-line"></i> Artists</h5></a>
                <h6 className='subhead'>Collection</h6>
                <a href=""><h5><i className="ri-disc-fill"></i> Genres</h5></a>
                <a href=""><h5><i className="ri-folder-music-line"></i> Playlists</h5></a>
            </div>
        </div>
    )
}

export default Sidebar
