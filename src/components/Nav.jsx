import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import actionMenu from '../redux/action';
import Menu from '../components/Menu';


export default function Nav({ color }) {
  const [ showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch();
  const returnItemMenu = () => {
    if(showMenu) {
      return 'fixed top-0 right-0 bg-hTransp opacity-1 z-30 w-screen h-screen items-end pt-10 sm:pr-4 transition transition-width duration-500 flex flex-col text-white bg-t-transp justify-center'
    } else return 'bg-transp opacity-0 w-0 transition-opacity h-screen items-end p-3 transition duration-500 text-white';
  }
  return (
    <nav className="w-full font-andika text-base absolute 2xl:text-xl leading-6 z-30">
      <div
        className={`fixed right-0 top-0 z-40 mr-2 mt-3 flex flex-col ${ showMenu ? 'items-center justify-center' : 'items-end' }`}
        onClick={
          () => {
          setShowMenu(!showMenu);
          dispatch(actionMenu(showMenu));
        }}
      >
          <div className={`h-1 w-7 mb-1 z-40 transition duration-500 ${ showMenu ? 'rotate-45deg translate-y-2 bg-white' : `rotate-0 bg-${color}` }`} />
          <div className={`h-1 w-7 mb-1 z-40 transition duration-500 ${showMenu ? 'rotate-45 bg-white' : `bg-${color} rotate-0`}`} />
          <div className={`h-1 w-7 z-40 transition duration-500 ${ showMenu ? 'opacity-0 bg-white' : `opacity-1 bg-${color}`}`}> </div>
        <ul
          className={`${returnItemMenu()} ${ showMenu ? '' : 'hidden'}`}
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          exit={{ y: -30, opacity: 0, transition: { duration: 0.5 } }}
        >
          <Menu className="z-50" />
        </ul>
      </div>
    </nav> 
  );
}