import React from 'react'

const Channel = ({channel}) => {
  return( 
        <tr>
            <td>{channel.channel}</td>
            <td>{channel.video.video_id}</td>
            <td>{channel.video.id}</td>
            <td>{channel.video.measurement_date}</td>
            <td>{channel.video.subscribers_count}</td>
            <td>{channel.video.comments}</td>
            <td>{channel.video.subscribers_gained}</td>
            <td>{channel.video.subscriberslost}</td>
            <td>{channel.video.unsub_dislikes}</td>
            <td>{channel.video.unsub_likes}</td>
            <td>{channel.video.unsub_shares}</td>
            <td>{channel.video.unsub_views}</td>
        </tr>
    )
}
export default Channel