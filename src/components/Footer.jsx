import React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="bg-wallpaper-lilas bg-cover font-bold relative">
        <div className="w-full h-full absolute bg-min-transp" />
        <div className="flex sm:flex-row flex-col items-center sm:items-around sm:justify-around p-3 sm:p-1 sm:px-4 text-white relative z-20">
          <div className="my-3 sm:w-1/2 hidden sm:flex">
            <p className="text-center md:text-left w-full"><strong>Contato:</strong> (83)9 9836-4408 / bruno.cabral.silva2018@gmail.com</p>
          </div>
          <div className="sm:w-1/2">
            <p className="text-center md:text-right my-1 w-full">© 2022 Copyright - Bruno Cabral</p>
          </div>
        </div>
      </footer >
    );
  }
}