import { useState, useEffect } from 'react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useNavigate, useParams } from 'react-router-dom'
import { showPost } from '../../features/post/postSlice'
import { addComment, fetchComments } from '../../features/comment/commentSlice'
import { AuthContext } from '../../context/AuthContext'

dayjs.extend(relativeTime)

const ShowPost = () => {
  const post = useSelector((state) => state.post.selectedPost)
  const error = useSelector((state) => state.post.error)
  const allComments = useSelector((state) => state.comment.comments)
  const comments = allComments.filter((comment) => 
    comment.post.id === post.id
  )
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const { id } = useParams()

  useEffect(() => {
    dispatch(showPost(id))
    dispatch(fetchComments())
  }, [id, dispatch])
 
  const [like, setLike] = useState(false)
  const handleLike = () => {
      setLike(!like)
  }

  const [comment, setComment] = useState("")
  const handleSubmit = (e, postId) => {

    e.preventDefault();

    const input = {
      comment: {
        content: comment,
        post_id: postId
      }
    }
    dispatch(addComment(input))
    navigate(`/posts/${postId}`)

    
  }

  if (!post) {
    return <div className="text-center mt-5">Loading post...</div>
  }
  return (
    <>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className='p-5 m-5 shadow bg-body-tertiary rounded ' key={post.id}>
        <div>  
          <h2>{post.title}</h2>
        </div>
        
        <div className='d-flex py-2 text-secondary fs-6 justify-content-between'>
          <span>{post.user.username}</span>
          <span>{dayjs(post.created_at).fromNow()}</span>
        </div>
        <p>
          {post.content}
        </p>   
      </div>

      <div className='fs-4 d-flex px-5'>
        <i className={like ? "fa-solid fa-heart pe-2 like" : "fa-regular fa-heart pe-2 "} 
          onClick={like ? () => handleLike(post.id, "unlike") : () => handleLike(post.id, "like")}></i>
        <i className="fa-regular fa-comment ps-2"></i>
      </div>

      <div className='px-5 pt-2'>
        <span className='text-secondary'>{post.like} likes</span>
      </div> 

      <div className='px-5 pt-3'>
        <form onSubmit={(e) => handleSubmit(e, post.id)} className='d-flex'>
          <input 
            type="text"   
            className="form-control w-25" 
            placeholder="Comment" 
            aria-label="Comment" aria-describedby="basic-addon1"
            value={comment}
            onChange={(e) => setComment(e.target.value)} 
          />

          <button type='submit' className='btn btn-success mx-5'>Add Comment</button>
        </form>
      </div>

      {comments.map((comment) => 
        <div className='d-flex flex-column px-5 pt-3'>
          <div className='px-2'>
            <span className='text-secondary'>{comment.user.username.toLowerCase()}</span>
            <span className='text-secondary px-3'>{dayjs(comment.created_at).fromNow()}</span>
          </div>
          <span className='px-2'>{comment.content}</span>
        </div>
      )}
    </>
  )
}

export default ShowPost