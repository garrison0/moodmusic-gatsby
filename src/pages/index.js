import React from "react"
import { Router, Link } from "@reach/router"
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'

import Home from "./Home"
import Blog from "./blog"
import Projects from './Projects'
import About from './About'
import Header from '../components/Header.js'

const App = () => (
  <div> 
    <Header />
    <Router>
      <Home path="/" />
      <Blog path="/blog" />
      <Projects path="/projects" />
      <About path="/about" />
    </Router>
  </div>
)

export default App;
