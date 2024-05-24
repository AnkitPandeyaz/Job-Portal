import React, { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader'

const SalaryPage = () => {
    const [searchText, setSearchText] = useState("");
    const [salary, setSalary] = useState([]);
    const [allSalaries, setAllSalaries] = useState([]); // To store all salary data

    useEffect(() => {
        fetch("salary.json")
            .then(res => res.json())
            .then(data => {
                setSalary(data);
                setAllSalaries(data); // Store all salary data initially
            });
    }, []);

    const handleSearch = () => {
        const filteredSalaries = allSalaries.filter((job) =>
            job.title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
        );
        console.log(filteredSalaries);
        setSalary(filteredSalaries);
    };

    console.log(searchText);

    return (
        <div className='max-w-screen-2xl container mx-auto xl:px-24 py-4'>
            <PageHeader title={"Estimate Salary"} path={"Salary"} />

            <div className='mt-5'>
                <div className='search-box p-2 text-center mb-2'>
                    <input
                        type="text"
                        name='search'
                        id='search'
                        className='py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full'
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button
                        onClick={handleSearch}
                        className='bg-blue text-white font-semibold px-8 py-2 rounded-sm mb-4 cursor-pointer'
                    >
                        Search
                    </button>
                </div>
            </div>

            {/** Salary display card */}
            <div className='grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-12 my-12 items-center'>
                {salary.map((data) => (
                    <div key={data.id} className='shadow px-4 py-8'>
                        <h4 className='font-semibold text-xl'>{data.title}</h4>
                        <p className='my-2 font-medium text-blue text-lg'>{data.salary}</p>
                        <div>
                            <a href="/" className='underline'>{data.status}</a>
                            <a href="/" className='underline'>{data.skills}</a>
                        </div>
                    </div>
                ))}
            </div>
            <footer className="relative pt-8 pb-6 mt-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap items-center md:justify-between justify-center">
                        <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                            <div className="text-sm text-blueGray-500 font-semibold py-1">
                                Made by <a href="https://www.linkedin.com/in/ankit-pandey-6b85741a1/" className="text-blueGray-500 hover:text-blueGray-800" target="_blank">Ankit Pandey</a>.
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default SalaryPage;
