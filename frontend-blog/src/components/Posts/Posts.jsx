import React from 'react'
import { fetchPosts } from '../../features/post/postSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Link } from 'react-router-dom'
import './Post.css'
import PostView from './PostView'

dayjs.extend(relativeTime)

const Posts = () => {
  const posts = useSelector((state) => state.post.posts)
  const dispatch = useDispatch()

  useEffect(() => {
   dispatch(fetchPosts())
  }, [])

  return (
  
    <div className='d-flex flex-column'>
      <div className='d-flex justify-content-between px-5 pt-5'>
        <h1 className=''>Posts</h1>
        <div>
          <Link to="/posts/new" className='btn btn-info'>New Post +</Link>
        </div>
      </div>
      
      <div className=''>
        {posts?.map((post) => 
          <PostView post={post}/>
        )}
      </div>

     
    </div>
    
  )
}

export default Posts