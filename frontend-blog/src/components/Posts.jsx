import React from 'react'
import { fetchPosts } from '../features/post/postSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'

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
        <div className='text-center p-5'>
          {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Create Post
          </button>

          <div class="modal fade modal-dialog-centered" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  ...
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div> */}

        </div>
        <div className='row'>
          <div className='p-5 shadow bg-body-tertiary rounded col-md-4'>
            <h3>Lorem, ipsum dolor</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum nisi sapiente culpa excepturi nihil. Quas assumenda illum minus repellendus at, consequatur, quisquam nihil blanditiis ullam vel laudantium! Fugiat corporis et fugit tempora distinctio id velit ad itaque sit rem vel excepturi consequatur, modi nobis ipsa? Inventore eveniet alias magni veniam?
            </p>
          </div>

          <div className='p-5 shadow bg-body-tertiary rounded col-md-4'>
            <h3>Lorem, ipsum dolor</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum nisi sapiente culpa excepturi nihil. Quas assumenda illum minus repellendus at, consequatur, quisquam nihil blanditiis ullam vel laudantium! Fugiat corporis et fugit tempora distinctio id velit ad itaque sit rem vel excepturi consequatur, modi nobis ipsa? Inventore eveniet alias magni veniam?
            </p>
          </div>

          <div className='p-5 shadow bg-body-tertiary rounded col-md-4'>
            <h3>Lorem, ipsum dolor</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum nisi sapiente culpa excepturi nihil. Quas assumenda illum minus repellendus at, consequatur, quisquam nihil blanditiis ullam vel laudantium! Fugiat corporis et fugit tempora distinctio id velit ad itaque sit rem vel excepturi consequatur, modi nobis ipsa? Inventore eveniet alias magni veniam?
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Posts