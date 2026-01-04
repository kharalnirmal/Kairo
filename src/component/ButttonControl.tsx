// Importing necessary libraries and components

import { Button } from './Button';
import { FaRegCirclePause, FaRegCirclePlay } from "react-icons/fa6";
import { RiResetLeftFill } from 'react-icons/ri';
import { IoSettings } from 'react-icons/io5';

// Defining the props interface for ButtonControl component
interface ButtonControlProps{
    onPlay?:()=>void; // Function to handle play action
    onPause?:()=>void; // Function to handle pause action
    onRepeat?:()=>void; // Function to handle repeat action
    onSetting?:()=>void; // Function to handle settings action
}

// ButtonControl functional component
export function ButttonControl  ({onPlay,onPause,onRepeat,onSetting}:ButtonControlProps)  {

  return (
    <div className='flex justify-center items-center gap-2 md:gap-3 pl-0 md:pl-32 lg:pl-20 xl:pl-0'>
        {/* Play Button - Triggers the onPlay function when clicked */}
        <Button onClick={onPlay} className="btn-round"><FaRegCirclePlay  className='md:text-4xl text-6xl' /></Button>
        {/* Pause Button - Triggers the onPause function when clicked */}
        <Button onClick={onPause} className="btn-round"><FaRegCirclePause  className='md:text-4xl text-6xl' /></Button>
        {/* Repeat Button - Triggers the onRepeat function when clicked */}
        <Button onClick={onRepeat} className="btn-round"><RiResetLeftFill  className='text-4xl md:text-4xl' /></Button>
        {/* Settings Button - Triggers the onSetting function when clicked */}
        <Button onClick={onSetting} className="btn-round"><IoSettings   className='text-4xl md:text-4xl' /></Button>
    </div>
  )
}

