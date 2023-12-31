import React from 'react';
import Track from './Track';
import { currentStatusPackage } from '../../../utils/getSearchingPath';


const Search = () => {
  const [track, setTrack] = React.useState(false);
  const [packCode, setpackCode] = React.useState('');
  const [inFo, setInFo] = React.useState([]);
  const handleFindButton = () => {
    currentStatusPackage(packCode)
      .then((res) => {
        console.log("SS", res);
        if (res !== null) setInFo(res); else setInFo([]);
      });
    // console.log("RR",currentStatusPackage(packCode));
    // setInFo(currentStatusPackage(packCode));
  }
  return (
    <div className='w-full py-16 text-black px-4'>
      <div className='max-w-[1240px] mx-auto grid lg:grid-cols-5'>
        <div className='lg:col-span-2 my-4'>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>
            Tracking Your Packages
          </h1>
          <p>Enter your package's id</p>
        </div>
        <div className='lg:col-span-3  my-4'>
          <div className='flex flex-col sm:flex-row items-center justify-between w-full'>
            <input
              className='p-3 flex w-full rounded-md text-black'
              type='text'
              placeholder='Ex: 123456789'
              onChange={(e) => setpackCode(e.target.value)}
            />
            <button onClick={() => { setTrack(true); handleFindButton(); }} className='bg-blue-400 text-black rounded-md font-medium w-[200px] ml-4 my-6 px-6 py-3'>
              Find
            </button>
          </div>
          {track && <Track className={track} inFo={inFo} />}
          <p>
            We care about the protection of your data. Read our{' '}
            <span className='text-blue-400'>Privacy Policy.</span>
          </p>
        </div>
      </div>
      {/* Info table */}
    </div>
  );
};

export default Search;
