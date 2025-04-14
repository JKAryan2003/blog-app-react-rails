import React from 'react'
import './Post.css'
import { useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useDispatch } from 'react-redux'
import { showPost, updatePosts } from '../../features/post/postSlice'
import { Link } from 'react-router-dom'

dayjs.extend(relativeTime)

const MyPostView = ({ post }) => {
  const dispatch = useDispatch()
  const [like, setLike] = useState(false)
    
  const handleLike = (postId, type) => {
    setLike(!like)
    dispatch(updatePosts({
      postId: postId,
      type: type
    }))
  }
  
  const handleShow = (id) => {
    dispatch(showPost(id))
  }
  return (
    <>
      <Link to={`/posts/${post.id}`} className='nav-link' onClick={() => handleShow(post.id)}>
        <div className='p-5 m-5 shadow bg-body-tertiary rounded ' key={post.id}>
          <h2>{post.title}</h2>
          <div className='d-flex py-2 text-secondary fs-6 justify-content-between'>
            <span>{post.user.username}</span>
            <span>{dayjs(post.created_at).fromNow()}</span>
          </div>
          <p>
            {post.content}
          </p>   
        </div>
      </Link>

      <div className='fs-4 d-flex px-5'>
        <i class={like ? "fa-solid fa-heart pe-2 like" : "fa-regular fa-heart pe-2 "} 
          onClick={like ? () => handleLike(post.id, "unlike") : () => handleLike(post.id, "like")}></i>
        <i class="fa-regular fa-comment ps-2"></i>
      </div>

      <div className='px-5'>
        <span className='text-secondary'>{post.like} likes</span>
      </div> 
    </>  
  )
}

export default MyPostView