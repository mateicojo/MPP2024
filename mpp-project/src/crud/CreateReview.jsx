import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Create() {
    const [inputData, setInputData] = useState({
        reviewer: "",
        content: '',
        food_id:''
    })
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputData)
        axios.post('https://mpp2024.onrender.com/review', inputData)
        .then(res => {
            alert("Created")
            navigate('/') //go back to home
        })
    }
  return (
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
        <div className='w-50 border bg-secondary text-white p-5'>
            <form onSubmit={handleSubmit}>
            <div style={{ textAlign: 'right' }}>
    <div>
        <label htmlFor="reviewer" style={{ textAlign: 'left', marginRight: '10px' }}>Reviewer:</label>
        <input type="text" name='reviewer' className='form-control'
               style={{ textAlign: 'right' }}
               onChange={e => setInputData({...inputData, reviewer: e.target.value})}/>
    </div>
    <div>
        <label htmlFor="content" style={{ textAlign: 'left', marginRight: '10px' }}>Content:</label>
        <input type="text" name='content' className='form-control'
               style={{ textAlign: 'right' }}
               onChange={e => setInputData({...inputData, content: e.target.value})}/>
    </div>
    <div>
        <label htmlFor="food_id" style={{ textAlign: 'left', marginRight: '10px' }}>Reviewed food id:</label>
        <input type="text" name='food_id' className='form-control'
               style={{ textAlign: 'right' }}
               onChange={e => setInputData({...inputData, food_id: e.target.value})}/>
    </div>
</div>


                <br />
                <button className='btn btn-info'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default Create