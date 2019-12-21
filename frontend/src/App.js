import React, { useState, useEffect } from 'react';
import Video from './components/Video'
import Channel from './components/Channel'
import videoService from './services/videos'
import './App.css';

const App = () => {
  /*const [apiData, setApiData] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);*/
  const [listChannel, setListChannel] = useState([])
  const [listVideo, setListVideo] = useState([])

  useEffect(() => {
    videoService
      .getVideo()
      .then(response => {
        setListVideo(response)
      })
  },[])

  useEffect(() => {
    videoService
      .getChanel()
      .then(response => {
        setListChannel(response)
      })
  },[])

  return (
    <div className="App">
      <h1>Results</h1>
      <p>Visualization latest video measurement grouped by video and channel below.</p>
      <h2>Chanel</h2>
      <p>Grouped by channel and get the lastest video measurement belongs to correspond channel.</p>
      <ShowChannel listChannel={listChannel} />
      <h2>Video</h2>
      <p>Grouped by video and get the lastest video measurement.</p>
      <ShowVideo listVideo={listVideo} />
    </div>
  );
}
const ShowVideo = ({listVideo}) => {
  return(
    <table align='center'>
      <thead>
          <tr>
              <td>Video</td>
              <td>ID</td>
              <td>Measurement date</td>
              <td>Subscribers count</td>
              <td>Comments</td>
              <td>Subscribers gained</td>
              <td>Subscribers lost</td>
              <td>UnSubscriber dislikes</td>
              <td>UnSubscriber likes</td>
              <td>UnSubscriber shares</td>
              <td>UnSubscriber views</td>
          </tr>
      </thead>
      <tbody>
        {listVideo.map(video => <Video key={listVideo.indexOf(video)} video={video}/>)}
      </tbody>
    </table>    
  )
}
const ShowChannel = ({listChannel}) => {
  return(
    <table align='center'>
      <thead>
          <tr>
              <tr>Chanel</tr>
              <td>Video</td>
              <td>ID</td>
              <td>Measurement date</td>
              <td>Subscribers count</td>
              <td>Comments</td>
              <td>Subscribers gained</td>
              <td>Subscribers lost</td>
              <td>UnSubscriber dislikes</td>
              <td>UnSubscriber likes</td>
              <td>UnSubscriber shares</td>
              <td>UnSubscriber views</td>
          </tr>
      </thead>
      <tbody>
        {listChannel.map(channel => <Channel key={listChannel.indexOf(channel)} channel={channel}/>)}
      </tbody>
    </table>    
  )

}

export default App;
