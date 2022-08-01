import React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div className="flex sm:flex-row flex-col items-center sm:items-around sm:justify-around p-4 sm:p-1 sm:px-4 text-white relative z-20">
          <div className="my-3 sm:w-1/2">
            <p className="text-center md:text-left w-full"><strong>Contato:</strong> (83)9 9836-4408 / bruno.cabral.silva2018@gmail.com</p>
          </div>
          <div className="sm:w-1/2">
            <p className="text-center md:text-right my-3 w-full">© 2022 Copyright - Bruno Gabryell Cabral da Silva</p>
          </div>
        </div>
      </footer >
    );
  }
}