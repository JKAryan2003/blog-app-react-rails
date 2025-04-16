import React from 'react'
import { fetchPosts } from '../../features/post/postSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { data, Link } from 'react-router-dom'
import './Post.css'
import PostView from './PostView'

import ReactPaginate from 'react-paginate';
import './Pagination.css';
import { useState } from 'react'

dayjs.extend(relativeTime)

const Posts = () => {
  const posts = useSelector((state) => state.post.posts)
  const [currentItems, setCurrentItems] = useState(null)
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0)
  const itemsPerPage = 2

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage
    setCurrentItems(posts.slice(itemOffset, endOffset))
    setPageCount(Math.ceil(posts.length / itemsPerPage))
  }, [itemOffset, itemsPerPage, posts])
  
  const dispatch = useDispatch()

  useEffect(() => {
   dispatch(fetchPosts())
  }, [dispatch])

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % posts.length
    setItemOffset(newOffset)
  };
  
  return (
    
    <div className='d-flex flex-column'>
      
      <div className='d-flex justify-content-between px-5 pt-3'>
        <h1 className=''>Posts</h1>
        <div>
          <Link to="/posts/new" className='btn btn-info'>New Post +</Link>
        </div>  
      </div>
      
      <div className=''>
        {currentItems?.map((post) => 
          <PostView post={post}/>
        )}
      </div>

      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageLinkClassName='page-num'
        nextLinkClassName='page-num'
        renderOnZeroPageCount={null}
        containerClassName='pagination'
        activeClassName='active'
        previousClassName='page-num'
        nextClassName='page-num'
        breakClassName='page-num'
      />
    </div>
    
  )
}

export default Posts