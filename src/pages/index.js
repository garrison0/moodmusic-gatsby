import React from "react"
import { Router } from "@reach/router"
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-alice-carousel/lib/alice-carousel.css";
import '../App.css'

import Home from "./home"
import Blog from "./blog"
import Projects from './projects'
import About from './about'

const App = () => (
  <div> 
    <Router>
      <Home path="/" />
      <Blog path="/blog" />
      <Projects path="/projects" />
      <About path="/about" />
    </Router>
  </div>
)

export default App;
