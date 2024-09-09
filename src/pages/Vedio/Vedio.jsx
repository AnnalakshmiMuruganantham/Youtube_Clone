import PlayVedio from '../../Components/PlayVedio/PlayVedio';
import Recommended from '../../Components/Recommended/Recommended';
import './Vedio.css';
import { useParams } from 'react-router-dom';


const Vedio = () => {
  const { videoId, categoryId } = useParams();
  return (
    <div className='play-container'>
      <PlayVedio videoId={videoId} />
      <Recommended categoryId={categoryId} />
    </div>
  );
};

export default Vedio