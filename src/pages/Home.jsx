import React from 'react';
import Footer from '../components/Footer';
import Nav from '../components/Nav';
import Header from '../components/Header';

function Home() {
    return (
      <div className="flex flex-col w-full">
        <Nav color="black" className="fixed"/>       
        <section className="w-full flex flex-col justify-center items-center">
          <Header />
        </section>
        <Footer />
      </div>
    );
  }

export default Home;