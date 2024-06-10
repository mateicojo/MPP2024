import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function Update(props) {
    const {id} = useParams();


    const [inputData, setInputData] = useState({
        id: id,
        name: "",
        calories: '',
        fat:'',
        carbs:'',
        protein:''
    })
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('https://mpp2024.onrender.com/food/'+id)
        .then(res =>setInputData(res.data))
        .catch(err => console.log(err))
    },[])


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputData)
        axios.put('https://mpp2024.onrender.com/food/'+id, inputData)
        .then(res => {
            alert("Updated")
            navigate('/') //go back to home
        })
    }

    return (
        <>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
        <div className='w-50 border bg-secondary text-white p-5'>
            <form onSubmit={handleSubmit}>
            <div style={{ textAlign: 'right' }}>
    <div>
        <label htmlFor="id" style={{ textAlign: 'left', marginRight: '10px' }}>ID:</label>
        <input type="text" disabled name='id' className='form-control' value={inputData.id} />
    </div>
    <div>
        <label htmlFor="name" style={{ textAlign: 'left', marginRight: '10px' }}>Name:</label>
        <input type="text" name='name' className='form-control' value={inputData.name}
               onChange={e => setInputData({...inputData, name: e.target.value})}/>
    </div>
    <div>
        <label htmlFor="calories" style={{ textAlign: 'left', marginRight: '10px' }}>Calories:</label>
        <input type="text" name='calories' className='form-control' value={inputData.calories}
               onChange={e => setInputData({...inputData, calories: e.target.value})}/>
    </div>
    <div>
        <label htmlFor="fat" style={{ textAlign: 'left', marginRight: '10px' }}>Fat:</label>
        <input type="text" name='fat' className='form-control' value={inputData.fat}
               onChange={e => setInputData({...inputData, fat: e.target.value})}/>
    </div>
    <div>
        <label htmlFor="carbs" style={{ textAlign: 'left', marginRight: '10px' }}>Carbs:</label>
        <input type="text" name='carbs' className='form-control' value={inputData.carbs}
               onChange={e => setInputData({...inputData, carbs: e.target.value})}/>
    </div>
    <div>
        <label htmlFor="protein" style={{ textAlign: 'left', marginRight: '10px' }}>Protein:</label>
        <input type="text" name='protein' className='form-control' value={inputData.protein}
               onChange={e => setInputData({...inputData, protein: e.target.value})}/>
    </div>
</div>


                <br />
                <button className='btn btn-info'>Update</button>
            </form>
        </div>
    </div>
        </>
    )
}
