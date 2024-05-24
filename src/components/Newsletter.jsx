import React from 'react'
import { FaEnvelopeOpenText, FaRocket } from 'react-icons/fa'

const Newsletter = () => {
    return (
        <div>
            <div>
                <h3 className='Text-lg font-bold mb-2 flex items-center gap-2'><FaEnvelopeOpenText />Email me for Jobs</h3>
                <p className='text-primary/75 text-base mb-4'>I am always looking for new opportunities to work with great people. If you have a job that you think I</p>

                <div className='w-full space-y-4'>
                    <input type="email" name='email' id='email' placeholder='madebyAnkitPandey@gmail.com' className='w-full block py-2 pl-3 border focus:outline-none' />
                    <input type="submit" value={"Subscribe"} className='w-full block py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-white cursor -pointer font-semibold' />
                </div>

            </div>

            {/**Second Part */}

            <div className='mt-20'>
                <h3 className='Text-lg font-bold mb-2 flex items-center gap-2'><FaRocket />Get Noticed Faster</h3>
                <p className='text-primary/75 text-base mb-4'>I am always looking for new opportunities to work with great people. If you have a job that you think I</p>

                <div className='w-full space-y-4'>
                    <input type="submit" value={"Upload Your Resume"} className='w-full block py-2 pl-3 border focus:outline-none bg-blue rounded-sm text-white cursor -pointer font-semibold' />
                </div>

            </div>


        </div>
    )
}

export default Newsletter
