import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getLastNews } from '../store/slices/news/thunk';
import { CarruselItems } from './CarruselItems';
import { AlterInfoHome } from './AlterInfoHome';
import { TeamInfo } from './TeamInfo';
import { AlterNews } from './AlterNews';
import { checkCookie } from '../store/slices/users/thunk';

export const Home = () => {
  const { news1, news2, requestState } = useSelector((state) => state.news)
  const { email } = useSelector((state) => state.users)
  const [logged, setLogged] = useState('')
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getLastNews())
    if (!email) {
      dispatch(checkCookie(document.cookie, setLogged))
    }
    
  },[])
  console.log(news1)
  return (
    <>
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

  
  <section id='alterInfoHome'>
  <div id='alterNews'>
  {
      requestState == 'successfull' && 
      news2.map((item, index)=> (
        <AlterNews item={item} index={index} key={item.id_new}/>
      ))
    }
  </div>
  <AlterInfoHome/>
  </section>
  </>
  )
}
