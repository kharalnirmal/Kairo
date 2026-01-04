import React from 'react'
import { Button } from './Button';
import { FaRegCirclePause, FaRegCirclePlay } from "react-icons/fa6";
import { FaRegArrowAltCircleRight } from 'react-icons/fa';
import { RiResetLeftFill } from 'react-icons/ri';
import { IoSettings } from 'react-icons/io5';

interface ButtonControlProps{
    onPlay?:()=>void;
    onPause?:()=>void;
    onRepeat?:()=>void;
    onSetting?:()=>void;
}

export function ButttonControl  ({onPlay,onPause,onRepeat,onSetting}:ButtonControlProps)  {

  return (
    <div className='flex justify-center items-center gap-2 md:gap-3'>
        <Button onClick={onPlay} className="btn-round"><FaRegCirclePlay  className='w-6 h-6' /></Button>
        <Button onClick={onPause} className="btn-round"><FaRegCirclePause  className='w-6 h-6' /></Button>
        <Button onClick={onRepeat} className="btn-round"><RiResetLeftFill  className='w-6 h-6' /></Button>
        <Button onClick={onSetting} className="btn-round"><IoSettings   className='w-6 h-6' /></Button>
    </div>
  )
}

