import './Recommended.css';
import { useState, useEffect } from 'react';
import { API_KEY } from '../../data';
import { value_converter } from '../../data'; // Ensure value_converter is correctly imported
import { Link, useParams } from 'react-router-dom';

const Recommended = ({ categoryId }) => {
  const { videoId } = useParams(); // Extract videoId to trigger useEffect when video changes
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!categoryId) {
      setError("Category ID is undefined.");
      setLoading(false);
      return;
    }

    try {
      const relatedVideoUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN&videoCategoryId=${categoryId}&maxResults=20&key=${API_KEY}`;

      const res = await fetch(relatedVideoUrl);
      if (!res.ok) throw new Error("Failed to fetch data");

      const data = await res.json();
      console.log("API Response:", data); // Debugging the API response

      if (data?.items?.length > 0) {
        setApiData(data.items);
      } else {
        setError("No videos found.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryId, videoId]); 
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='recommended'>
      {apiData.length > 0 ? (
        apiData.map((item, index) => {
          const { snippet, statistics } = item;
          return (
            <Link to={`/video/${item.snippet.categoryId}/${item.id}`} className="side-vedio-list" key={index}>
              <img src={snippet?.thumbnails?.medium?.url} alt={snippet?.title} />
              <div className="vid-info">
                <h4>{snippet?.title}</h4>
                <p>{snippet?.channelTitle}</p>
                <p>{statistics?.viewCount ? `${value_converter(statistics.viewCount)} Views` : "0 Views"}</p>
              </div>
            </Link>
          );
        })
      ) : (
        <p>No recommended videos available.</p>
      )}
    </div>
  );
};

export default Recommended;
