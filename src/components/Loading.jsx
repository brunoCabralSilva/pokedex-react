import React from 'react';
import '../index.css';

export default function Loading() {
  return (
    <div className="flex flex-row w-full h-full items-center justify-center">
      <div className="w-full flex flex-col h-40 items-center justify-center text-5xl text-white z-20">
        <div className="relative w-full h-20 m-5 z-20 flex flex-row items-center justify-center">
          <div className="loading w-4 h-4 bg-white rounded-full absolute"/>
          <div className="loading w-4 h-4 bg-white rounded-full absolute"/>
          <div className="loading w-4 h-4 bg-white rounded-full absolute"/>
        </div>
      </div>
    </div>
  );
}