import React from 'react'
import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Cocktails from './components/Cocktails';
import Art from './components/Art';
import Menu from './components/Menu';
gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
    return (
        <main >
            <Navbar/>
            <Hero/>
            <Cocktails/>
            <About/>
            <Art/>
            <Menu/>
        </main>
    )
}

export default App