import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Creatable from 'react-select/creatable';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';

const PostJob = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.skills = selectedOption.map(option => option.value);
    data.createdAt = new Date();

    fetch("http://localhost:3000/post-job", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        if (result.insertedId) {
          alert("Job Posted Successfully!!!");
          reset();
          setSelectedOption([]);
        }
      })
      .catch(error => {
        console.error('Failed to post job:', error);
      });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const options = [
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'Java', label: 'Java' },
    { value: 'C++', label: 'C++' },
    { value: 'HTML', label: 'HTML' },
    { value: 'CSS', label: 'CSS' },
    { value: 'Python', label: 'Python' },
    { value: 'React.js', label: 'React.js' },
  ];

  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
      <div className='bg-[#FAFAFA] py-10 px-4 lg:px-16'>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
          <div className='flex flex-col lg:flex-row item-center justify-between gap-8'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Job Title</label>
              <input 
                type="text" 
                defaultValue="Web Developer" 
                {...register("jobTitle", { required: true })} 
                className='create-job-input' 
              />
              {errors.jobTitle && <span className="text-red-500">Job Title is required</span>}
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Company Name</label>
              <input 
                type="text" 
                placeholder='Ex: Microsoft' 
                {...register("companyName", { required: true })} 
                className='create-job-input' 
              />
              {errors.companyName && <span className="text-red-500">Company Name is required</span>}
            </div>
          </div>

          <div className='flex flex-col lg:flex-row item-center justify-between gap-8'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Minimum Salary</label>
              <input 
                type="text" 
                placeholder='$20k' 
                {...register("minPrice", { required: true })} 
                className='create-job-input' 
              />
              {errors.minPrice && <span className="text-red-500">Minimum Salary is required</span>}
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Maximum Salary</label>
              <input 
                type="text" 
                placeholder=' $100k' 
                {...register("maxPrice", { required: true })} 
                className='create-job-input' 
              />
              {errors.maxPrice && <span className="text-red-500">Maximum Salary is required</span>}
            </div>
          </div>

          <div className='flex flex-col lg:flex-row item-center justify-between gap-8'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Salary Type</label>
              <select 
                {...register("salaryType", { required: true })} 
                className='create-job-input'
              >
                <option value="">Choose your salary type</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
              {errors.salaryType && <span className="text-red-500">Salary Type is required</span>}
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Job Location</label>
              <input 
                type="text" 
                placeholder='Ex: New Delhi' 
                {...register("jobLocation", { required: true })} 
                className='create-job-input' 
              />
              {errors.jobLocation && <span className="text-red-500">Job Location is required</span>}
            </div>
          </div>

          <div className='flex flex-col lg:flex-row item-center justify-between gap-8'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Job Posting Date</label>
              <input 
                type="date" 
                {...register("postingDate", { required: true })} 
                className='create-job-input' 
              />
              {errors.postingDate && <span className="text-red-500">Job Posting Date is required</span>}
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Experience Level</label>
              <select 
                {...register("experienceLevel", { required: true })} 
                className='create-job-input'
              >
                <option value="">Choose your experience level</option>
                <option value="Any Experience">Any Experience</option>
                <option value="Internship">Internship</option>
                <option value="Work Remotely">Work Remotely</option>
              </select>
              {errors.experienceLevel && <span className="text-red-500">Experience Level is required</span>}
            </div>
          </div>

          <div>
            <label className='block mb-2 text-lg'>Required Skill Sets</label>
            <Creatable
              isMulti
              options={options}
              value={selectedOption}
              onChange={setSelectedOption}
              className='create-job-input'
            />
          </div>

          <div className='flex flex-col lg:flex-row item-center justify-between gap-8'>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Company Logo</label>
              <input 
                type="url" 
                placeholder='Paste your company logo URL here' 
                {...register("companyLogo")} 
                className='create-job-input' 
              />
            </div>
            <div className='lg:w-1/2 w-full'>
              <label className='block mb-2 text-lg'>Employment Type</label>
              <select 
                {...register("employmentType", { required: true })} 
                className='create-job-input'
              >
                <option value="">Choose your employment type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Temporary">Temporary</option>
              </select>
              {errors.employmentType && <span className="text-red-500">Employment Type is required</span>}
            </div>
          </div>

          <div className='w-full'>
            <label className='block mb-2 text-lg'>Job Description</label>
            <textarea 
              className='create-job-input' 
              rows={6} 
              placeholder='Job Description - Write here.' 
              {...register("description", { required: true })}
            />
            {errors.description && <span className="text-red-500">Job Description is required</span>}
          </div>

          <div className='w-full'>
            <label className='block mb-2 text-lg'>Job Posted By</label>
            <input 
              type='email' 
              name='email' 
              id='email' 
              placeholder='madebyAnkitPandey@gmail.com' 
              {...register("postedBy", { required: true })} 
              className='create-job-input' 
            />
            {errors.postedBy && <span className="text-red-500">Email is required</span>}
          </div>

          <input 
            type="submit" 
            className='block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer' 
          />
        </form>
      </div>
      <footer className="relative pt-8 pb-6 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-6/12 px-4 mx-auto text-center">
              <div className="text-sm text-blueGray-500 font-semibold py-1">
                Made by <a href="https://www.linkedin.com/in/ankit-pandey-6b85741a1/" className="text-blueGray-500 hover:text-blueGray-800" target="_blank" rel="noopener noreferrer">Ankit Pandey</a>.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PostJob;
