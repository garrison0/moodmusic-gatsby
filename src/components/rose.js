import React, { useState } from 'react';
import styled from 'styled-components';
import dictionary from '../../content/assets/rose.json';

export default function Rose(props) {
    var [count, setCount] = useState(0);
    var [classes, setClasses] = useState('blurry-text');
    var [final, setFinal] = useState(false);

    // let dictionary = props.dictionary;
    // dictionary = {'words': ['rose', 'ok', 'yes', 'mama', 'meme'], 'partsOfSpeech': ['noun', 'adjective', 'noun', 'noun', 'verb'], 'definitions': [['pepee', 'meeeee'], ['mamamamam'], ['memememe', 'mama', 'wowowow'], ['mimimimi'], ['mameskmdso']]};

    setTimeout( () => { 
        setCount( Math.min(count + 1, dictionary['words'].length - 2) );
        if (count + 1 >= dictionary['words'].length - 2) { 
            setTimeout( () => { 
                setFinal(true);
            }, 4300);
            setTimeout( () => {
                setClasses('');
            }, 6000);
        }
    }, 5000);

    let definitions = dictionary['definitions'].filter( (cur, index) => { return index <= count + 1; } );
    definitions = definitions.map( (cur, index) => { 
        return (<li className="list-group-item" key={cur}> 
                    <p> {dictionary['words'][index]}, <span style={{fontStyle: 'italic'}}>{dictionary['partsOfSpeech'][index]}</span> </p>
                    <ul> {cur.map( (dfn) => (<li key={dfn}>{dfn}</li>) )} </ul>
                </li>) 
    });

    let vowels = ['a', 'e', 'i', 'o', 'u'];
    return (
        <div className="text-center px-3 py-5 w-100">
            <p> 
                <span className={classes}>
                    { ((final && dictionary['partsOfSpeech'][0] === 'adjective') || (!final && dictionary['partsOfSpeech'][count] === 'adjective')) ? "" : 
                      ((final && vowels.includes(dictionary['words'][0].charAt(0))) || !final && vowels.includes(dictionary['words'][count].charAt(0)) ? 'An ' : 'A ')}
                    { (final ? dictionary['words'][0] : dictionary['words'][count]) + ' '}
                </span> 
                {'is '}
                <span className={classes}>
                    {dictionary['partsOfSpeech'][count+1] === 'adjective' ? "" : vowels.includes(dictionary['words'][count+1].charAt(0)) ? 'an ' : 'a '}
                    {dictionary['words'][count+1]}
                </span> 
            </p>
            <ul className="text-left list-group list-group-flush" style={{'listStyle': 'devanagari', 'marginRight': '1.5rem'}}>
                {definitions}
            </ul>
        </div>
    );
  }