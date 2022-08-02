import React from 'react';
import { Link } from 'react-router-dom';
import Slider from '../components/Slider';
import Footer from '../components/Footer';
import Nav from '../components/Nav';

function Home() {
    return (
      <div className="bg-black flex flex-col w-full">
        <Nav className="fixed"/>       
        <section className="w-full flex flex-col justify-center items-center">
          <div className="grid grid-cols-2 md:grid-cols-4 w-full">
            <div className="h-60vh md:h-85vh row-span-2 col-span-2 md:col-span-4 p-1">
              <Slider
                list={['01.jpg','02.jpg','03.jpg','04.jpg','05.jpg']}
                direction="horizontal"
                reverseDirection={false}
                delay={5000}
              />
              {/* <img
                src={require('../imagens/Pokémon_logo.png')}
                className="w-4/5 md:w-3/5 md:w-2/5 object-contain p-2 z-40"
                alt="Logo Pokémon"
              /> */}
            </div>
            <div className="row-span-1 md:h-60vh h-30vh p-1 relative">
              <div className="flex items-end w-full h-full bg-mini-transp hover:bg-transp transition duration-500 absolute z-40">
                <p className="text-white bg-gradient-to-r w-full contorno text-2xl font-bold p-3">Seu Time</p>
              </div>
              <Slider
                list={['venusaur.jpg','charizard.jpg','clefable.jpg','muk.jpg','hydreigon.jpg']}
                direction="vertical"
                reverseDirection={true}
                delay={6000}
              />
            </div>
            <div className="row-span-2 h-60vh md:h-120vh p-1 relative">
              <div className="flex items-end w-98% md:w-99% h-full bg-mini-transp hover:bg-transp transition duration-500 absolute z-40">
                <p className="text-white bg-gradient-to-r w-full from-min-transp to-transp text-xl font-bold p-3">Notícias</p>
              </div>
                <Slider
                  list={['mew.png','exeggutor.png','greninja.jpg','Lycanroc.jpeg','tyrantrum.jpg']}
                  direction="horizontal"
                  reverseDirection={false}
                  delay={4000}
                />
              </div>
            <Link to="/search" className="col-span-1 md:col-span-2 h-30vh md:h-60vh p-1 relative">
              <div className="flex items-end w-99% md:w-98.7% p-1 h-full bg-mini-transp hover:bg-transp transition duration-500 absolute z-40">
                <p className="text-white bg-gradient-to-r w-full from-min-transp to-transp text-xl font-bold p-3">Busca</p>
              </div>
              <Slider
                list={['salamence.jpg','suicune.jpg','entei.jpg','lugia.jpg','aurorus.jpeg']}
                direction="vertical"
                reverseDirection={true}
                delay={5000}
              />
            </Link>
            <div className="row-span-1 col-span-2 md:col-span-1 h-30vh md:h-60vh p-1 relative">
              <div className="flex items-end w-98% md:w-99% h-full bg-mini-transp hover:bg-transp transition duration-500 absolute z-40">
                <p className="text-white bg-gradient-to-r w-full bg-from-min-transp to-transp text-xl font-bold p-3">Site Oficial</p>
              </div>
                <Slider
                  list={['dragonite.jpg','nidoking.png','umbreon.jpg','Noctowl.jpeg','mewtwo.jpg']}
                  direction="horizontal"
                  reverseDirection={false}
                  delay={6000}
                />
              </div>
            <div className="row-span-1 h-30vh md:h-60vh p-1 relative">
              <div className="flex items-end w-99% h-full bg-mini-transp hover:bg-transp transition duration-500 absolute z-40">
                <p className="text-white bg-gradient-to-r w-full from-min-transp to-transp text-xl font-bold p-3">Favoritos</p>
              </div>
              <Slider
                list={['garchomp.jpg','haxorus.jpg','steelix.jpg','rhydon.jpg', 'ninetales.jpg']}
                direction="vertical"
                reverseDirection={true}
                delay={4000}
              />
            </div>
            <div className="row-span-2 h-30vh md:h-60vh p-1 relative">
              <div className="flex items-end w-98% md:w-98.7% h-full bg-mini-transp hover:bg-transp transition duration-500 absolute z-40">
                <p className="text-white bg-gradient-to-r from-min-transp to-transp text-xl font-bold p-3">Cards</p>
              </div>
              <Slider
                list={['alakazam.jpg','espeon.png','Carracosta.jpeg','lycanrock2.jpg','snorlax.jpg']}
                direction="horizontal"
                reverseDirection={false}
                delay={5000}
              />
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

export default Home;