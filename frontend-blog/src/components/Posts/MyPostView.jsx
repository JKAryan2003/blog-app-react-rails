import React from 'react'
import './Post.css'
import { useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useDispatch } from 'react-redux'
import { deletePost, editPosts, showPost, updatePosts } from '../../features/post/postSlice'
import { Link, useNavigate } from 'react-router-dom'

dayjs.extend(relativeTime)

const MyPostView = ({ post }) => {
  const dispatch = useDispatch()
  const [like, setLike] = useState(false)
  const navigate = useNavigate()
    
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

  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(post.title)
  const [editedContent, setEditedContent] = useState(post.content)

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditedTitle(post.title)
    setEditedContent(post.content)
  }

  const handleSave = () => {
    const input = {
      postId: post.id,
      post: {
        title: editedTitle,
        content: editedContent
      }
    }

    dispatch(editPosts(input))
    setIsEditing(false)
  }

  const handleDelete = (id) => {
    const confrimDelete = confirm("Are you sure you want to delete")
    if (confrimDelete){
      dispatch(deletePost(id))
      navigate('/posts')
    } 
  }

  return (
    <>
      <div className='p-5 m-5 shadow bg-body-tertiary rounded' key={post.id}>
        <div className='d-flex justify-content-between'>
          {isEditing ? (
            <input
              className="form-control w-75 me-2"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          ) : (
            <Link to={`/posts/${post.id}`} className='nav-link' onClick={() => handleShow(post.id)}>
              <h2>{post.title}</h2>
            </Link>
          )}
  
          <div>
            {!isEditing ? (
              <>
                <i className="fa-solid fa-pen px-3 fs-5 text-info" onClick={handleEditClick}></i>
                <i className="fa-solid fa-trash fs-5 text-danger" onClick={() => handleDelete(post.id)}></i>
              </>
              
            ) : (
              <>
                <button className="btn btn-sm btn-success me-2" onClick={handleSave}>Save</button>
                <button className="btn btn-sm btn-secondary" onClick={handleCancelEdit}>Cancel</button>
              </>
            )}
          </div>
        </div>
  
        <div className='d-flex py-2 text-secondary fs-6 justify-content-between'>
          <span>{post.user.username}</span>
          <span>{dayjs(post.created_at).fromNow()}</span>
        </div>
  
        {isEditing ? (
          <textarea
            className="form-control mt-2"
            rows="4"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        ) : (
          <p>{post.content}</p>
        )}
      </div>
  
      <div className='fs-4 d-flex px-5'>
        <i className={like ? "fa-solid fa-heart pe-2 like" : "fa-regular fa-heart pe-2 "}
          onClick={like ? () => handleLike(post.id, "unlike") : () => handleLike(post.id, "like")}></i>
        <i className="fa-regular fa-comment ps-2"></i>
      </div>
  
      <div className='px-5'>
        <span className='text-secondary'>{post.like} likes</span>
      </div>
    </>
  )

}

export default MyPostView
