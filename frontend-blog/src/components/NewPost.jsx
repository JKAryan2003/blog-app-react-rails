import React from 'react'
import { useState } from 'react'
import { createPosts } from '../features/post/postSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const NewPost = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault()
    const input = {
      post: {
        title: title,
        content: content,
      }
    }
    dispatch(createPosts(input))
    navigate('/posts')
  }
  return (
    <div>
      <h1 className='px-4 pt-4'>Post your Blog</h1>
      <div className=''>
          <form onSubmit={handleSubmit} className=''>

            <div className='p-4'>
              <input 
                type="text"   
                class="form-control" 
                placeholder="Title" 
                aria-label="Title" aria-describedby="basic-addon1"
                value={title}
                onChange={(e) => setTitle(e.target.value)} 
              />
            </div>

            <div className='p-4'>
              <textarea name="" id="" rows={20} cols={178} className='form-control' placeholder='Content' onChange={(e) => setContent(e.target.value)}></textarea>
            </div>

            <div className='p-4'>
              <button type='submit' className='btn btn-info'>Post it</button>
            </div>

          </form> 
        </div>
    </div>
  )
}

export default NewPost