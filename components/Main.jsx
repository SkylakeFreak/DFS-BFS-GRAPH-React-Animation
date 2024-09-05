"use client"
import React, { useState,useRef } from 'react'

function Main() {
    var adja=useRef([]);
    const [blink,setblink]=useState(false);



    const adjacency=(box)=>{
        const rows=Math.floor((box-1)/20);
        const column=(box-1)%20
        console.log(box,"start")
        var ans=[]
        console.log("current"+box)

        if ((box)%20<=19 && Math.floor((box)/20)==rows){
            ans.push(box+1)
        }
        if (Math.floor((box+20-1)/20<=19)){
            ans.push(box+20)
        }
        if ((box-2)%20>=0 && Math.floor((box-2)/20)==rows){
            ans.push(box-1)
        }
        if (Math.floor((box-20-1)/20>=0)){
            ans.push(box-20)
        }
        adja=ans
        
        console.log(ans,"o")


    }
    const [render,setrender]=useState(null)



    const boxes=Array.from({length:400},(_,index)=>index+1);
    var startbox=useRef(null);
    var endbox=useRef(null);
    var finalans=useRef([]);
    const handleclick=(box)=>{
        
            if (startbox.current===null){
                startbox.current=box
                setrender(box)
            }
            else if(endbox.current===null){
                endbox.current=box
                setrender(box)
            }
            else{
                endbox.current=null
                startbox.current=null
                setrender(box)
            }
            
    }
    const sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    const processor=async(startbox,endbox)=>{
        var visited=[]
        var final=[]
        var neighbours=[]
        const stack=[startbox];
        while(stack.length>0){
            const current=stack.shift();
            if (current==endbox){
                setblink(true);
                return
            }
            setrender(current)
            if (visited.includes(current)){
                console.log("visited")
            }
            else{
                final.push(current);
                visited.push(current);
                adjacency(current)
                console.log(adja)
                neighbours=adja;
                for(let neighbour of neighbours){
                    stack.push(neighbour)
                }

            }await sleep(10);
            finalans.current=final
            
            


        }
        
        console.log(final,"ANS")


    }
  return (
    <div className='h-screen flex flex-col justify-center bg-gray-400 items-center'>
        <div className='h-[800px] w-[800px] grid grid-cols-20 gap-1 p-1 grid-rows-20 bg-black'>
            {boxes.map((box)=>(
                
                <div onClick={()=>{
                    handleclick(box)
                    adjacency(box)
                   
                    
                    
                }} key={box} className={`bg-white transition-all duration-100 hover:bg-green-500  ${finalans.current.includes(box) ? 'bg-green-700' : ''}  ${box === startbox.current ? 'bg-green-700' : ''} ${box === endbox.current && blink==false ? 'bg-red-800' : ''} ${blink == true && box===endbox.current ? 'bg-green-700 animate-pulse' : ''}`}>

                </div>
            ))}
           

        </div>
        <button onClick={()=>{
                processor(startbox.current,endbox.current)
                

            }} className='text-white p-2 pl-6 pr-6 m-2 rounded-sm hover:bg-blue-900 transition-all duration-100 bg-blue-700'>Find</button>
            <button typeof='toggle'></button>

    </div>
  )
}

export default Main