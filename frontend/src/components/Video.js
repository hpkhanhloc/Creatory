import React from 'react'

const Video = ({video}) => {
  return( 
        <tr>
            <td>{video.video_id}</td>
            <td>{video.id}</td>
            <td>{video.measurement_date}</td>
            <td>{video.subscribers_count}</td>
            <td>{video.comments}</td>
            <td>{video.subscribers_gained}</td>
            <td>{video.subscriberslost}</td>
            <td>{video.unsub_dislikes}</td>
            <td>{video.unsub_likes}</td>
            <td>{video.unsub_shares}</td>
            <td>{video.unsub_views}</td>
        </tr>
    )
}
export default Video