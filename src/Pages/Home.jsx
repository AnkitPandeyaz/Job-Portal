import Banner from '../components/Banner'
import React, { useEffect, useState } from 'react'
import Card from '../components/card';
import Jobs from './Jobs';
import Sidebar from '../Sidebar/Sidebar';
import Newsletter from '../components/Newsletter';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemPerPage = 6;

  useEffect(() => {
    setIsLoading(true);
    fetch("jobs.json")
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setIsLoading(false);
      });
  }, []);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  }

  // Filtering job by title
  const filteredItems = jobs.filter((job) => job.jobTitle && job.jobTitle.toLowerCase().includes(query.toLowerCase()));

  // Radio filtering
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  }

  // Button based filtering
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  }

  {/**Calculate the index range */ }
  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    return { startIndex, endIndex };
  }

  //function for next page

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  }

  //function for the previous page
  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }



  // Main function for filtering data
  const filteredData = (jobs, selected, query) => {
    let filteredJobs = jobs;

    // Filtering input items
    if (query) {
      filteredJobs = filteredItems;
    }

    // Category filtering
    if (selected) {
      filteredJobs = filteredJobs.filter(({ jobLocation = '', maxPrice = '', experienceLevel = '', salaryType = '', employmentType, postingDate = '' }) => 
        (
        jobLocation.toLowerCase() === selected.toLowerCase() ||
        parseInt(maxPrice) === parseInt(selected) ||
        postingDate >= selected ||
        experienceLevel.toLowerCase() === selected.toLowerCase() ||
        salaryType.toLowerCase() === selected.toLowerCase() ||
        employmentType.toLowerCase() === selected.toLowerCase()
      )
      
    );
      console.log(filteredJobs);
    }

    //slice the data based on current page
    const { startIndex, endIndex } = calculatePageRange();
    filteredJobs = filteredJobs.slice(startIndex, endIndex);

    return filteredJobs.map((data, i) => <Card key={i} data={data} />);
  }

  const result = filteredData(jobs, selectedCategory, query);

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} />

      {/* Main contents */}
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        {/* left sideCards */}
        <div className=" bg-white p-4 rounded "><Sidebar handleChange={handleChange} handleClick={handleClick} /></div>
        {/* Job Cards */}
        <div className=" col-span-2 bg-white p-4 rounded-sm ">
          {
            isLoading ? (<p className='font-medium'>Loading......</p>) : result.length > 0 ? (<Jobs result={result} />) : <> <h3 className='text-lg font-bold mb-2'>{result.length} Jobs</h3>
              <p>No data Found</p>
            </>
          }

          {/** pagination here */}
          {
            result.length > 0 ? (
              <div className="flex justify-center  mt-4 space-x-8">
                <button onClick={previousPage} disabled={currentPage === 1} className='hover:underline'>Previous</button>
                <span className='mx-2'>Page {currentPage} of {Math.ceil(filteredItems.length / itemPerPage)}</span>
                <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredItems.length / itemPerPage)} className='hover:underline'>Next</button>
              </div>
            ) : ""
          }


        </div>
        {/* Right side Cards */}
        <div className=" bg-white p-4 rounded "><Newsletter/></div>
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

export default Home;

