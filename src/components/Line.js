import React from 'react'
import child_process from "child_process" 


function Line({ lists }) {
    const spawn = require('child_process').spawn;   
    const result = spawn('python', ['print.py']); 
    console.log(typeof(spawn))
    result.stdout.on('data', function(data) { 
        console.log(data.toString()); 
    }); 
    result.stderr.on('data', function(data) { 
        console.log(data.toString());
    });
    
    return(
        <>
            <div>{result}</div>
        </>
    );
}

export default Line;
