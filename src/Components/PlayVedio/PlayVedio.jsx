import './PlayVedio.css';
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import jack from '../../assets/jack.png'
import user_profile from '../../assets/user_profile.jpg'
import { useState,useEffect } from 'react';
import {API_KEY} from '../../data';
import {value_converter} from '../../data';
import moment from 'moment';
import { useParams } from 'react-router-dom';

const PlayVedio = () => {

  const {videoId}=useParams();
  const [apiData,setApiData] = useState(null);
  const [channelData,setChannelData]=useState(null);
  const [commentData,setCommentData]=useState([]);
  const fetchData = async () => {
    //Fetching vedios data
    const vedioDetails_url=`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    await fetch(vedioDetails_url).then(res=>res.json()).then(data=>setApiData(data.items[0]));
  }
  const fetchOtherData = async () =>{
    //Fetching channel data
    const channelDetails_url=`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
    await fetch(channelDetails_url).then(res=>res.json()).then(data=>setChannelData(data.items[0]));

    //Fetching Comment Data
    const comment_url=`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
    await fetch(comment_url).then(res=>res.json()).then(data=>setCommentData(data.items));
  }
  useEffect(()=>{
    fetchData();
  },[videoId]);
  useEffect(()=>{
    fetchOtherData();
  },[apiData]);
  return (
    <div className='play-vedio'>
        {/* <video src={vedio1} controls autoPlay muted></video> */}
        <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=true`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
        <h3>{apiData?apiData.snippet.title:"Title Here"}</h3>
        <div className="play-vedio-info">
        <p>
  {apiData?.statistics?.viewCount 
    ? value_converter(apiData.statistics.viewCount)
    : "0"} 
  views &bull; 
  {apiData?.snippet?.publishedAt 
    ? moment(apiData.snippet.publishedAt).fromNow() 
    : "Unknown date"}
</p>
            <div className='play-vedio-info-div'>
                <span><img src={like} alt="" /> {apiData?value_converter(apiData.statistics.likeCount): "0"}</span>
                <span><img src={dislike} alt="" /></span>
                <span><img src={share} alt="" />Share</span>
                <span><img src={save} alt="" />Save</span>
            </div>
        </div>
        <hr />
        <div className="publisher">
            <img src={channelData?channelData.snippet.thumbnails.default.url:""} alt="" />
            <div>
                <p>{apiData?apiData.snippet.channelTitle:"Channel Title"}</p>
                <span>{channelData?value_converter(channelData.statistics.subscriberCount):"0"} Subscribers</span>
            </div>
            <button>Subscribe</button>
        </div>
        <div className="vid-description">
            <p>{apiData?apiData.snippet.description.slice(0,250):"Description Here"}</p>
            <hr />
            <h4>{apiData?value_converter(apiData.statistics.commentCount):"0"} Comments</h4>
           {commentData.map((item,index)=>{

            return(
                <div key={index} className="comment">
                <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                <div>
                    <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>{moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span></h3>
                    <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                    <div className="comment-action">
                        <img src={like} alt="" />
                        <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                        <img src={dislike} alt="" />
                    </div>
                </div>
            </div>     
            )
           })}
        </div>
    </div>
  )
}

export default PlayVedio