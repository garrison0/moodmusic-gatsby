import React from 'react';
import { Link } from "gatsby"
import Button from 'react-bootstrap/Button'

export default function BioDescriptions(props) { 
    switch (props.index) {
        case 0:
            return (
                <div>
                    <p> 
                        My name is Garrison. 
                    </p>
                    <p>
                        I write music, play guitar, and code. Right now, I'm pushing the YouTube thing. 
                        Previously, I was a Full Stack developer, and before that, I ran live sound and
                        did odd jobs during my time at Carnegie Mellon University.  
                    </p>
                    <p className="mt-4">
                        <a href="https://www.youtube.com/channel/UCcZYyXLJ7yEH3lWm58RoKRA">
                            <Button variant="outline-primary">
                                Check out my YouTube channel!
                            </Button>
                        </a>
                    </p>
                </div>);
        case 1:
            return (
                <div>
                    <p> 
                        On large scale projects, I've used C# (.NET) with Angular, LESS, Bootstrap, CSS3, MySQL, AWS (Lambda, CloudWatch, EC2), Python, ES5, Node.js.
                    </p> 
                    <p>
                        I have extensive small scale experience with: vanilla ES6, React, Gatsby (e.g., this site), P5.js, ML5.js, Express, WebAudio, PortAudio, and LOVE.2D.
                    </p>
                    <p className="mt-4">
                        <Link to="projects">
                            <Button variant="outline-primary">
                                Check out some projects!
                            </Button>
                        </Link>
                    </p>
                </div>);
        case 2:
            return (
                <div>
                    <p> 
                        I've been playing music my whole life, starting from when I picked up the drums in elementary school band (which I quickly dropped!)
                    </p> 
                    <p>
                        Now, you'll see me playing fingerstyle guitar in a style I've created from piecing together all of my influences, such as Michael Hedges and Ted Greene.
                    </p>
                    <p className="mt-4">
                        <a href="https://www.youtube.com/channel/UCcZYyXLJ7yEH3lWm58RoKRA">
                            <Button variant="outline-primary">
                                Have I linked you to my YouTube channel yet?
                            </Button>
                        </a>
                    </p>
                </div>);
        default:
            return "";
    }
}