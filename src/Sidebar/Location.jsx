import React from 'react';
import InputField from '../components/InputField';

const Location = ({ handleChange }) => {
  return (
    <div>
      <h4 className='text-lg font-medium mb-2'>Location</h4>

      <div>
        <label className='sidebar-label-container'>
          <input type="radio" name="test" id='test' value="" onChange={handleChange} />
          <span className='checkmark'></span>All
        </label>
        <InputField handleChange={handleChange} value="noida" title="Noida" name="test" />
        <InputField handleChange={handleChange} value="mumbai" title="Mumbai" name="test" />
        <InputField handleChange={handleChange} value="channai" title="Channai" name="test" />
        <InputField handleChange={handleChange} value="pune" title="Pune" name="test" />
        <InputField handleChange={handleChange} value="delhi" title="Delhi" name="test" />
        <InputField handleChange={handleChange} value="greater noida" title="Greater Noida" name="test" />

      </div>
    </div>
  )
}

export default Location;
