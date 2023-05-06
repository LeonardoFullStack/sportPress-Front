import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getLastNews } from '../store/slices/news/thunk';
import { CarruselItems } from './CarruselItems';

export const Home = () => {
  const { news1, requestState } = useSelector((state) => state.news)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getLastNews())
    
    
  },[])
  return (
    <section id="mainNews">
  <div id="parent">
    {
      requestState == 'successfull' && 
      news1.map((item, index)=> (
        <CarruselItems item={item} index={index} key={item.id_new}/>
      ))
    }
  </div>
</section>

  )
}
