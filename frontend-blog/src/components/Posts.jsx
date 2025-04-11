import React from 'react'
import { fetchPosts } from '../features/post/postSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const Posts = () => {
  const posts = useSelector((state) => state.post.posts)
  const dispatch = useDispatch()

  useEffect(() => {
   dispatch(fetchPosts())
  }, [])
  
  console.log(posts)
  return (
  <>
      <div className='d-flex flex-column'>
        <h1 className='px-5 pt-5'>Posts</h1>
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
    </>
  )
}

export default Posts