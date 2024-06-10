import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function Update(props) {
    const {id} = useParams();


    const [inputData, setInputData] = useState({
        id: id,
        reviewer: "",
        content: '',
        food_id:'',
    })
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get('https://mpp2024.onrender.com/review/'+id)
        .then(res =>setInputData(res.data))
        .catch(err => console.log(err))
    },[])


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputData)
        axios.put('http://localhost:3000/food/'+id, inputData)
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
        <label htmlFor="reviewer" style={{ textAlign: 'left', marginRight: '10px' }}>Reviewer:</label>
        <input type="text" name='reviewer' className='form-control' value={inputData.reviewer}
               onChange={e => setInputData({...inputData, reviewer: e.target.value})}/>
    </div>
    <div>
        <label htmlFor="content" style={{ textAlign: 'left', marginRight: '10px' }}>Content:</label>
        <input type="text" name='content' className='form-control' value={inputData.content}
               onChange={e => setInputData({...inputData, content: e.target.value})}/>
    </div>
    <div>
        <label htmlFor="food_id" style={{ textAlign: 'left', marginRight: '10px' }}>Reviewed Food ID:</label>
        <input type="text" name='food_id' className='form-control' value={inputData.food_id}
               onChange={e => setInputData({...inputData, food_id: e.target.value})}/>
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
