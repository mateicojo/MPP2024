import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Create() {
    const [inputData, setInputData] = useState({
        name: "Frozen yoghurt",
        calories: '',
        fat:'',
        carbs:'',
        protein:''
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
        <label htmlFor="name" style={{ textAlign: 'left', marginRight: '10px' }}>Name:</label>
        <input type="text" name='name' className='form-control'
               style={{ textAlign: 'right' }}
               onChange={e => setInputData({...inputData, name: e.target.value})}/>
    </div>
    <div>
        <label htmlFor="calories" style={{ textAlign: 'left', marginRight: '10px' }}>Calories:</label>
        <input type="text" name='calories' className='form-control'
               style={{ textAlign: 'right' }}
               onChange={e => setInputData({...inputData, calories: e.target.value})}/>
    </div>
    <div>
        <label htmlFor="fat" style={{ textAlign: 'left', marginRight: '10px' }}>Fat:</label>
        <input type="text" name='fat' className='form-control'
               style={{ textAlign: 'right' }}
               onChange={e => setInputData({...inputData, fat: e.target.value})}/>
    </div>
    <div>
        <label htmlFor="carbs" style={{ textAlign: 'left', marginRight: '10px' }}>Carbs:</label>
        <input type="text" name='carbs' className='form-control'
               style={{ textAlign: 'right' }}
               onChange={e => setInputData({...inputData, carbs: e.target.value})}/>
    </div>
    <div>
        <label htmlFor="protein" style={{ textAlign: 'left', marginRight: '10px' }}>Protein:</label>
        <input type="text" name='protein' className='form-control'
               style={{ textAlign: 'right' }}
               onChange={e => setInputData({...inputData, protein: e.target.value})}/>
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