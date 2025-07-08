import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

function Home() {
  // You can update this logic with real auth later
  const isLoggedIn = false;
  const username = "Manas";

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} username={username} />
      <Hero />
      <Features />
      <CTA />
      <Footer />
      
    </>
  );
}

export default Home;
