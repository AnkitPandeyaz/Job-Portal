import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from '../firebase/firebase';
import { doc, getDoc } from "firebase/firestore";

function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [profileData, setProfileData] = useState({});

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (!user) {
                navigate('/login');
            } else {
                setUser(user);
                const docRef = doc(db, "users", user.uid);
                try {
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setProfileData(docSnap.data());
                    }
                } catch (error) {
                    console.error("Error fetching document:", error);
                }
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleLogout = () => {
        auth.signOut().then(() => {
            navigate('/login');
        }).catch(err => {
            console.log(err);
        });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue to-green-600">
            <div className="bg-white p-5 rounded shadow-lg w-full max-w-md ">
                <h2 className="text-2xl font-bold mb-3 flex justify-center items-center">Dashboard</h2>
                {profileData.profilePicUrl && <img src={profileData.profilePicUrl} alt="Profile Pic" className="w-24 h-24 rounded-full mb-4 mx-auto"/>}
                <div className="space-y-2">
                    <p><strong>Name:</strong> {profileData.name}</p>
                    <p><strong>Email:</strong> {profileData.email}</p>
                    <p><strong>LinkedIn ID:</strong> <a href="https://www.linkedin.com/">{profileData.linkedinId}</a></p>
                    <p><strong>Address:</strong> {profileData.address}</p>
                    <p><strong>Experience:</strong> {profileData.experience}</p>
                    <p><strong>Experience Level:</strong> {profileData.experienceLevel}</p>
                    <p><strong>About:</strong> {profileData.about}</p>
                </div>
                <Link to="/dashboard-update" className="mt-3 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300 block text-center">
                    Update Profile
                </Link>
                <button onClick={handleLogout} className="mt-3 w-full bg-red-500 text-white font-semibold py-2 rounded-md hover:bg-red-600 transition duration-300">
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Dashboard;

