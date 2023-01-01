import React, { useEffect } from 'react';
import Footer from '../components/Footer';
import Nav from '../components/Nav';

export default function Cards() {

  useEffect(() => { window.scrollTo(0, 0) }, []);

  return(
    <div>
      <Nav />
      <div>
        Cards
      </div>
      <Footer />
    </div>
  );
}