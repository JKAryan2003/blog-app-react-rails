import { useState, useEffect } from 'react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useNavigate, useParams } from 'react-router-dom'
import { showPost } from '../../features/post/postSlice'
import { addComment, fetchComments } from '../../features/comment/commentSlice'

dayjs.extend(relativeTime)

const ShowPost = () => {
  const post = useSelector((state) => state.post.selectedPost)
  const comments = useSelector((state) => state.comment.comments)
  const navigate = useNavigate()
  console.log(comments)

  console.log(post)
  const dispatch = useDispatch()

  const { id } = useParams()

  useEffect(() => {
    dispatch(showPost(id))
    dispatch(fetchComments())
  }, [id])
  
  
  console.log(post)
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
    navigate(`/posts/${id}`)
  }

  if (!post) {
    return <div className="text-center mt-5">Loading post...</div>
  }
  return (
    <>
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

      <div className='fs-4 d-flex'>
        <i class={like ? "fa-solid fa-heart pe-2 like" : "fa-regular fa-heart pe-2 "} 
          onClick={like ? () => handleLike(post.id, "unlike") : () => handleLike(post.id, "like")}></i>
        <i class="fa-regular fa-comment ps-2"></i>
      </div>

      <div className='pt-3'>
        <span className='text-secondary'>{post.like} likes</span>
      </div> 

      <div>
        <form onSubmit={(e) => handleSubmit(e, post.id)} className=''>
          <input 
            type="text"   
            class="form-control" 
            placeholder="Comment" 
            aria-label="Comment" aria-describedby="basic-addon1"
            value={comment}
            onChange={(e) => setComment(e.target.value)} 
          />

          <button type='submit'>Add Comment</button>
        </form>
      </div>

      {comments.map((comment) => 
        <div>
          <span>{comment.content}</span>
          <span>{comment.user.username}</span>
        </div>
      )}
    </>
  )
}

export default ShowPost