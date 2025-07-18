
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features'
import Subjects from './components/Subjects'
import FeaturedTutors from './components/FeaturedTutors'
import About from './components/About'
import Footer from './components/Footer'


const HomePage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Features/>
      <Subjects/>
      <FeaturedTutors/>
      <About/>
      <Footer/>
    </div>
  );
};

export default HomePage;
