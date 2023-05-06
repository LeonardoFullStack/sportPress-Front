import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getLastNews } from '../store/slices/news/thunk'

export const CarruselItems = ({ item, index }) => {
    const { news1, requestState } = useSelector((state) => state.news)
    const dispatch = useDispatch()
    useEffect(() => {
        if ( requestState == 'successfull') {
    
          const childNodes = document.querySelectorAll('.child');
          console.log(childNodes)
          let activeIndex = 0;

      setInterval(() => {
    
    
      childNodes[activeIndex].classList.remove('active');
      activeIndex = (activeIndex + 1) % childNodes.length;
      childNodes[activeIndex].classList.add('active');
    
    }, 9000);
        }
        
      },[])
    return (
        <>
        {index == 0  ?
        <div className="child active">
        <h1 className='imageTitle'>
            {item.title}
        </h1>
        <img src={item.image} alt={item.altimage} />
    </div>
        :
        <div className="child">
            <h1 className='imageTitle'>
                {item.title}
            </h1>
            <img src={item.image} alt={item.altimage} />
        </div>
        }
        
        </>
    )
}
