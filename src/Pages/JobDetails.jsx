import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import PageHeader from '../components/PageHeader';

const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState({});

    useEffect(() => {
        fetch(`http://localhost:3000/all-jobs/${id}`)
            .then(res => res.json())
            .then(data => setJob(data))
            .catch(err => console.error('Error fetching job:', err));
    }, [id]);

    const handleApply = async () => {
        const { value: url } = await Swal.fire({
            input: "url",
            inputLabel: "URL address",
            inputPlaceholder: "Enter the URL"
        });
        if (url) {
            Swal.fire(`Entered URL: ${url}`);
        }
    }

    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
            <PageHeader title={'Single Job Page'} path={"single job"} />
            <h2>Job Details: {id}</h2>
            {job ? (
                <>
                    <h1>{job.jobTitle}</h1>

                    {/* Benefits Section */}
                    <section>
                        <h3>Benefits</h3>
                        {job.benefits && job.benefits.map((benefit, index) => (
                            <p key={index}>{benefit}</p>
                        ))}
                    </section>

                    {/* Outline Section */}
                    <section>
                        <h3>Outline</h3>
                        <p>{job.outline}</p>
                    </section>

                    {/* Future Growth Section */}
                    <section>
                        <h3>Future Growth</h3>
                        <p>{job.futureGrowth}</p>
                    </section>

                    {/* Other Job Details */}
                    <p><strong>Company:</strong> {job.companyName}</p>
                    <p><strong>Location:</strong> {job.jobLocation}</p>
                    <p><strong>Salary:</strong> ${job.minPrice} - ${job.maxPrice} {job.salaryType}</p>
                    <p><strong>Employment Type:</strong> {job.employmentType}</p>
                    <p><strong>Experience Level:</strong> {job.experienceLevel}</p>
                    <p><strong>Description:</strong> {job.description}</p>

                    <button className='bg-blue px-8 py-2 text-white' onClick={handleApply}>Apply Now</button>
                </>
            ) : (
                <p>Loading job details...</p>
            )}
        </div>
    );
}

export default JobDetails;

