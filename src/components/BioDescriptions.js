import React from 'react';
import { Link } from "gatsby"
import Image from 'gatsby-image/withIEPolyfill';
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
                        I’m a Full Stack Developer at TravelWits. Sometimes I’m also an Audio Engineer 
                        - I like to wear different hats. I have a B.Sc. in Logic and 
                        Computation and a minor in Sound Design from Carnegie Mellon 
                        University. 
                    </p>
                    <p>
                        I have a rotating laundry list of interests. Music, the humanities, and creative tech regularly top it.
                    </p>
                </div>);
        case 1:
            return (
                <div>
                    <p> 
                        At work, I use C# (.NET) with Angular, LESS, Bootstrap, CSS3, MySQL, AWS (Lambda, CloudWatch, EC2), Python, ES5, Node.js.
                    </p> 
                    <p>
                        For personal projects, I've used the following: vanilla ES6, React, Gatsby (e.g., this site), P5.js, ML5.js, Express, WebAudio, PortAudio, and LOVE.2D.
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
                        The proportion of music I've written and jammed on to music I've mastered and released is near infinite. This is a current focus of mine.
                        I play a certain brand of guitar and I carry around this unusable, plastic molded, 32 key thing in my backpack. I think it's supposed to be a keyboard.
                        My sound is evolving, but it involves a mixture of my guitar compositions and loops side-by-side with my favorite electronic sounds and VSTs. 
                    </p> 
                </div>);
        default:
            return "";
    }
}