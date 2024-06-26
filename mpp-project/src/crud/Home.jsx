import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { PieChart } from '@mui/x-charts/PieChart';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TableHead } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";


function Home() {
    const [data, setData] = useState([]);
    const [dataReview, setDataReview] = useState([]);
    const [pieChartData, setPieChartData] = useState([]);
    const [name, setName] = useState('');
    const [showDiv1, setShowDiv1] = useState(true);
    const [isServerOnline, setIsServerOnline] = useState(true);
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    const navigate = useNavigate();

    const logOut = () => {
        Cookies.remove("token")
        navigate('/login');
    }

    useEffect(() => {
        // axios.get('http://localhost:3000')
        //     .then(res => {
        //         // if (res.data.valid) {
        //         //     setName(res.data.username);
        //         // } else {
        //         //     navigate('/login');
        //         // }
        //         setName(res.data.username);
        //     })
        //     .catch(err => {
        //         console.error('Error fetching session data:', err);
        //         navigate('/login');
        //     });

        axios.get('https://mpp2024.onrender.com/food')
            .then(res => {
                setIsServerOnline(true);
                setData(res.data.food);
                const pieData = res.data.food.map(item => ({
                    value: item.protein,
                }));
                setPieChartData(pieData);
            })
            .catch(err => {
                console.log(err);
                setIsServerOnline(false);
            });

        axios.get('https://mpp2024.onrender.com/review')
            .then(res => {
                setDataReview(res.data.review);
            })
            .catch(err => {
                console.log(err);
            });

        window.addEventListener('online', handleOnlineStatusChange);
        window.addEventListener('offline', handleOnlineStatusChange);

        return () => {
            window.removeEventListener('online', handleOnlineStatusChange);
            window.removeEventListener('offline', handleOnlineStatusChange);
        };
    }, [navigate]);

    const handleOnlineStatusChange = () => {
        setIsOnline(navigator.onLine);
    };

    const switchTables = () => {
        setShowDiv1(prevState => !prevState);
    };

    const sortedData = [...data].sort((a, b) => a.calories - b.calories);
    const lowestCaloriesItem = sortedData.length > 0 ? sortedData[0].name : '';

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this record?");
        if (confirmDelete) {
            axios.delete(`https://mpp2024.onrender.com/food/${id}`)
                .then(() => {
                    setData(prevData => prevData.filter(d => d.food_id !== id));
                })
                .catch(err => console.log(err));
        }
    };

    const handleDeleteReview = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this record?");
        if (confirmDelete) {
            axios.delete(`https://mpp2024.onrender.com/review/${id}`)
                .then(() => {
                    setDataReview(prevData => prevData.filter(d => d.review_id !== id));
                })
                .catch(err => console.log(err));
        }
    };
    if(Cookies.get('token') == undefined){
        return ("You are not logged in");
    }
    return (
        <>
        <br/>
        <div >
        Welcome {name}
        <button onClick={logOut}>Log out</button>

        </div>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>

                {!isOnline && ( //connection status
                    <div style={{ backgroundColor: 'red', color: 'white', padding: '10px' }}>
                        Warning: No internet connection!
                    </div>
                )}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                {!isServerOnline && ( //server status
                    <div style={{ backgroundColor: 'red', color: 'white', padding: '10px' }}>
                        Warning: Server is offline!
                    </div>
                )}</div>
                <div className='table' style={{ maxHeight: '400px', overflowY: 'auto' , marginTop: '100px'}}>
                    {showDiv1 ? (
                        <div>
                            <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 200 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Name
                                    </TableCell>
                                    <TableCell>
                                        Calories
                                    </TableCell>
                                    <TableCell>
                                        Fats
                                    </TableCell>
                                    <TableCell>
                                        Carbs
                                    </TableCell>
                                    <TableCell>
                                        Protein
                                    </TableCell>
                                    <TableCell>
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((d, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{d.name}</TableCell>
                                        <TableCell>{d.calories}</TableCell>
                                        <TableCell>{d.fat}</TableCell>
                                        <TableCell>{d.carbs}</TableCell>
                                        <TableCell>{d.protein}</TableCell>
                                        <TableCell>
                                            <button><Link to={`/update/${d.food_id}`}>Update</Link></button>
                                            <button onClick={e => handleDelete(d.food_id)}>Delete</button>
                                            <button><Link to={`/read/${d.food_id}`}>Read</Link></button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                        </div>
                    ) : (
                        <div>
                            <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Reviewer
                                    </TableCell>
                                    <TableCell>
                                        Content
                                    </TableCell>
                                    <TableCell>
                                        Food id
                                    </TableCell>
                                    <TableCell>
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataReview.map((d, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{d.reviewer}</TableCell>
                                        <TableCell>{d.content}</TableCell>
                                        <TableCell>{d.food_id}</TableCell>
                                        <TableCell>
                                            <button><Link to={`/updatereview/${d.review_id}`}>Update</Link></button>
                                            <button onClick={e => handleDeleteReview(d.review_id)}>Delete</button>
                                            <button><Link to={`/readreview/${d.review_id}`}>Read</Link></button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                        </div>
                    )}
                    
                </div>
                <br />
                <div>
                <button><Link to="/create" className="btn1">Add food</Link></button> 
                <button><Link to="/createreview" className="btn1">Add review</Link></button>
                <button onClick={switchTables}>Switch table</button> 
                </div>
                <br />
                <div style={{ backgroundColor: "gray" }}>
                    <PieChart
                        series={[{
                            data: pieChartData,
                            innerRadius: 30,
                            outerRadius: 100,
                            paddingAngle: 5,
                            cornerRadius: 5,
                            startAngle: -90,
                            endAngle: 180,
                        }]}
                        width={800}
                        height={200}
                    />
                </div>
                <p>Item with lowest calories: {lowestCaloriesItem}</p>
            </div>
        </>
    );
}

export default Home;