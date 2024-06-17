import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { auth, db, storage } from '../firebase/firebase';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function DashboardUpdate() {
    const navigate = useNavigate();
    const { register, handleSubmit, reset, setValue } = useForm();
    const [user, setUser] = useState(null);
    const [profilePicUrl, setProfilePicUrl] = useState("");

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
                        const data = docSnap.data();
                        for (const [key, value] of Object.entries(data)) {
                            setValue(key, value);
                        }
                        setProfilePicUrl(data.profilePicUrl || "");
                    }
                } catch (error) {
                    console.error("Error fetching document:", error);
                }
            }
        });

        return () => unsubscribe();
    }, [navigate, setValue]);

    const onSubmit = async (data) => {
        try {
            if (data.profilePic.length > 0) {
                const file = data.profilePic[0];
                const storageRef = ref(storage, `profilePics/${user.uid}`);
                await uploadBytes(storageRef, file);
                data.profilePicUrl = await getDownloadURL(storageRef);
            } else {
                data.profilePicUrl = profilePicUrl;
            }
            delete data.profilePic;

            const docRef = doc(db, "users", user.uid);
            await setDoc(docRef, data, { merge: true });
            alert("Profile updated successfully!");
            reset();
            navigate('/dashboard');
        } catch (err) {
            console.error("Error updating profile:", err);
        }
    };

    return (
        <div className="flex justify-center items-center  bg-gradient-to-r from-blue to-purple-500 ">
            <div className="bg-gradient-to-r from-red-600 to-yellow-500 p-5 rounded shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-3 flex justify-center items-center">Update Profile</h2>
                {profilePicUrl && <img src={profilePicUrl} alt="Profile Pic" className="w-24 h-24 rounded-full mb-4 mx-auto"/>}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block mb-1">Name</label>
                        <input type="text" {...register("name")} className="w-full px-3 py-2 border rounded"/>
                    </div>
                    <div>
                        <label className="block mb-1">Email</label>
                        <input type="email" {...register("email")} className="w-full px-3 py-2 border rounded"/>
                    </div>
                    <div>
                        <label className="block mb-1">LinkedIn ID</label>
                        <input type="url" {...register("linkedinId")} className="w-full px-3 py-2 border rounded"/>
                    </div>
                    <div>
                        <label className="block mb-1">Address</label>
                        <input type="text" {...register("address")} className="w-full px-3 py-2 border rounded"/>
                    </div>
                    <div>
                        <label className="block mb-1">Experience</label>
                        <textarea {...register("experience")} className="w-full px-3 py-2 border rounded"></textarea>
                    </div>
                    <div>
                        <label className="block mb-1">Experience Level</label>
                        <select {...register("experienceLevel")} className="w-full px-3 py-2 border rounded">
                            <option value="">Select experience level</option>
                            <option value="Internship">Internship</option>
                            <option value="Junior">Junior</option>
                            <option value="Mid">Mid</option>
                            <option value="Senior">Senior</option>
                            <option value="Lead">Lead</option>
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1">Profile Picture</label>
                        <input type="file" {...register("profilePic")} className="w-full px-3 py-2 border rounded"/>
                    </div>
                    <div>
                        <label className="block mb-1">About</label>
                        <textarea {...register("about")} className="w-full px-3 py-2 border rounded"></textarea>
                    </div>
                    <button type="submit" className="w-full bg-blue text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">Save</button>
                </form>
                <button onClick={() => navigate('/dashboard')} className="mt-3 w-full bg-gray-500 text-white font-semibold py-2 rounded-md hover:bg-gray-600 transition duration-300">
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default DashboardUpdate;




