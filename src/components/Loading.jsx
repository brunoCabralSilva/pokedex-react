import React from 'react';
import '../index.css';

export default function Loading() {
  return (
    <div className="flex flex-col h-68 sm1:h-72 sm2:h-80 sm3:h-96 sm:h-40 md:h-48 md2:h-60 lg:h-60 2xl:h-80 w-40 sm1:w-72 sm2:w-80 sm3:w-96 sm:w-40 md:w-48 lg:w-48 2xl:w-80 items-center justify-center">
      <div className="w-full flex flex-col h-full items-center justify-center text-5xl text-white z-20">
        <div className="relative w-full z-20 flex flex-col items-center justify-center">
          <div className="loading w-4 h-4 bg-white rounded-full absolute"/>
          <div className="loading w-4 h-4 bg-white rounded-full absolute"/>
          <div className="loading w-4 h-4 bg-white rounded-full absolute"/>
        </div>
      </div>
    </div>
  );
}