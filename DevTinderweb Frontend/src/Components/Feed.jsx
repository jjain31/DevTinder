import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/const';
import { addFeed } from '../utils/feedSlice';
import ErrorPage from './ErrorPage';
import UserCard from './UserCard';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector(store => store.feed);
  
  const [error, setError] = useState(false);

  const getFeed = async () => {
    try {
      if (feed) return;
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      dispatch(addFeed(res.data));
    } catch (err) {
      setError(true); 
    
    }
  };

  useEffect(() => {
    getFeed();
  }, []); 

  if (error) {
    return <ErrorPage />; 
  }

  if (!feed || feed.length <= 0) {
    return <h1 className='text-center text-xl font-semibold my-10'>No More Users To Show 🧑‍💻</h1>;
  }

  return (
    <div className='flex justify-center my-10 flex-grow'>
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
