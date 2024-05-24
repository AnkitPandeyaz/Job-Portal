import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Dashboard() {
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        axios.get('http://localhost:3000/dashboard', { withCredentials: true })
            .then(res => {
                console.log("dashboard: " + res.data);
                if (res.data === "Success") {
                    setSuccess("Succeeded OK");
                } else {
                    navigate('/');
                }
            })
            .catch(err => {
                console.log(err);
                navigate('/');
            });
    }, [navigate]);

    return ( 
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-500">
            <div className="bg-white p-5 rounded shadow-lg">
                <h2 className="text-2xl font-bold mb-3">Dashboard</h2>
                <p>{success}</p>
            </div>
        </div>
    );
}

export default Dashboard;
