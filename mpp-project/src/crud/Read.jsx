import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function Read(props) {
    const {id} = useParams()
    const navigate = useNavigate()
    const [d, setData] = useState([])


    useEffect(()=>{
        axios.get('https://mpp2024.onrender.com/food/'+id)
        .then(res=>setData(res.data))
        .catch(err=>console.log(err))
    },[])
    return (
        <><div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
            <div >
                <p>{d.name}</p>
                <p>{d.calories}</p>
                <p>{d.fat}</p>
                <p>{d.carbs}</p>
                <p>{d.protein}</p>
                <Link to="/">Home</Link>
            </div>
        </div>
        </>
    )
}
