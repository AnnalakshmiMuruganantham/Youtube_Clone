import './Feed.css';
import { Link } from 'react-router-dom';
import { API_KEY, value_converter } from '../../data'; // value_converter used for formatting large numbers
import { useEffect, useState } from 'react';
import moment from 'moment';

const Feed = ({ category }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${category}&key=${API_KEY}`;
      const response = await fetch(videoList_url);
      const result = await response.json();
      setData(result.items || []); // Guard against empty response
    } catch (error) {
      console.error("Error fetching video data: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="feed">
      {data.map((item, index) => {
        const { snippet, statistics } = item;
        return (
          <Link to={`video/${snippet.categoryId}/${item.id}`} key={item.id} className="card">
            <img src={snippet.thumbnails.medium.url} alt={snippet.title} />
            <h2>{snippet.title}</h2>
            <h3>{snippet.channelTitle}</h3>
            <p>{value_converter(statistics.viewCount)} views &bull; {moment(snippet.publishedAt).fromNow()}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default Feed;
