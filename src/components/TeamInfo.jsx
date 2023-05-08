import React, { useState } from 'react'
import { useForm } from '../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { selectTeam } from '../store/slices/users/thunk';
import { MyTeam } from './MyTeam';

export const TeamInfo = () => {
    const dispatch = useDispatch();
    const { requestState, team, email } = useSelector((state) => state.users)
    const [formTeam, setFormTeam] = useState('')
    const handleChange = (event) => {
        const selectedTeam = event.target.value;
        console.log(selectedTeam)
        setFormTeam(selectedTeam);
      };
    const handleSubmit = (ev) => {
        ev.preventDefault()

        dispatch(selectTeam(formTeam, email))
    }
console.log(team)
return (
    <div className='teamInfo'>
        {
            team == null ?
            <>
            <h1 className='teamHeader'>
            Aún no has escogido a tu equipo!
            </h1>
            <form onSubmit={handleSubmit}>
            <select onChange={handleChange}>
              <option value="" disabled selected>Escoger</option>
              <option value="Barcelona">Barcelona</option>
              <option value="Madrid">Real Madrid</option>
            </select>
            <input type='submit' className='classicButton' value='enviar'/>
          </form>
          
            </>
            :
            <div className='imgTeam'>
            <MyTeam/>
            </div>
        }
      
      
    </div>
  );
}

{/* <h1 className='teamHeader'>
        Aún no has escogido a tu equipo!
      </h1>
      {
        requestState === 'successfull' ?
          <h1>conseguido</h1> 
          :
          <form onSubmit={handleSubmit}>
            <select onChange={handleChange}>
              <option value="" disabled selected>Escoger</option>
              <option value="opcion1">Barcelona</option>
              <option value="opcion2">Real Madrid</option>
            </select>
            <input type='submit' className='classicButton' value='enviar'/>
          </form> */}
