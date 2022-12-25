import React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
      <footer className="bg-marinho w-full bg-cover relative text-base sm:text-lg">
        <div className="w-full h-full absolute bg-min-transp" />
        <div className="flex lg:flex-row flex-col items-center lg:items-around sm:justify-around p-5 sm:p-1 sm:px-4 text-white relative z-20">
          <div className="my-3 lg:w-2/3 flex flex-col">
            <p className="text-center lg:text-left w-full flex flex-col lg:flex-row">
              <strong className="pr-2">
                Contato:
              </strong>
              <span className="text-sm sm:text-base pr-2">
                (83)9 9836-4408 e
              </span>
              <span className="text-sm sm:text-base">
                bruno.cabral.silva2018@gmail.com
              </span>
            </p>
            <p className="text-center lg:text-left w-full pt-5 lg:pt-0 flex flex-col lg:flex-row">
              <strong className="pr-2">
                Crédito das imagens:
              </strong>
              { ' ' }
              <a
                href="https://www.behance.net/vencyslao"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-anil transition-colors text-sm sm:text-base"
              >
                Vencys Lao
              </a>
            </p>
          </div>
          <div className="sm:w-1/2">
            <p className="text-sm sm:text-base text-center lg:text-right my-1 w-full">© 2022 Copyright - Bruno Cabral</p>
          </div>
        </div>
      </footer>
    );
  }
}