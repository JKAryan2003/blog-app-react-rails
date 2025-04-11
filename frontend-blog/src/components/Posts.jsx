import React from 'react'
import { fetchPosts } from '../features/post/postSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Link } from 'react-router-dom'

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
          <div className='p-5 m-5 shadow bg-body-tertiary rounded '>
            <h2>{post.title}</h2>
            <div className='d-flex py-2 text-secondary fs-6 justify-content-between'>
              <span>{post.user.username}</span>
              <span>{dayjs(post.created_at).fromNow()}</span>
            </div>
            <p>
              {post.content}
            </p>
          </div>
        )}
        
      </div>
    </div>
    
  )
}

export default Posts