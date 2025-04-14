import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchMyPosts } from '../../features/post/postSlice'
import MyPostView from './MyPostView'
import { Link } from 'react-router-dom'

const MyPost = () => {
  const { user_id } = useParams()
  const dispatch = useDispatch()

  const myPosts = useSelector((state) => state.post.myPosts)

  console.log(myPosts)
  useEffect(() => {
    dispatch(fetchMyPosts(user_id))
  }, [user_id, dispatch])
  
  return (
    <div>
      <div className='d-flex flex-column'>
      <div className='d-flex justify-content-between px-5 pt-5'>
        <h1 className=''>Posts</h1>
        <div>
          <Link to="/posts/new" className='btn btn-info'>New Post +</Link>
        </div>  
      </div>
      
      <div className=''>
        {myPosts?.map((post) => 
          <MyPostView post={post}/>
        )}
      </div>
    </div>
    </div>
  )
}

export default MyPost