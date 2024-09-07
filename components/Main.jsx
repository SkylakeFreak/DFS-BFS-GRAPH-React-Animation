"use client"
import React, { useState,useRef } from 'react'

function Main() {
    const [render,setrender]=useState(null)
    var adja=useRef([]);
    var curr=useRef(true);
    const [blink,setblink]=useState(false);
    const change=()=>{
        curr.current=!curr.current
        setrender(curr.current)
    }



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
        adja.current=ans
        
        console.log(ans,"o")


    }
    



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
            let current;
            if (curr.current===false){
                current=stack.shift();

            }
            else{
                current=stack.pop();

            }
            
            
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
                neighbours=adja.current;
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
        <div className='h-[40vh] w-[40vh] sm:h-[50vh] sm:w-[50vh] md:h-[80vh] md:w-[80vh] grid grid-cols-20  grid-rows-20 bg-white'>
            {boxes.map((box)=>(
                
                <div onClick={()=>{
                    handleclick(box)
                    adjacency(box)
                   
                    
                    
                }} key={box} className={`transition-all duration-100 hover:bg-green-400 p-1 outline outline-1   ${finalans.current.includes(box) ? 'bg-green-700' : ''}  ${box === startbox.current ? 'bg-green-400' : ''} ${box === endbox.current && blink==false ? 'bg-red-800' : ''} ${blink == true && box===endbox.current ? 'bg-green-700 animate-pulse' : ''}`}>

                </div>
            ))}
        
           

        </div>
        <button onClick={()=>{
                processor(startbox.current,endbox.current)
                

            }} className='text-white p-2 pl-6 pr-6 m-2 rounded-sm hover:bg-blue-900 transition-all duration-100 bg-blue-700'>Find</button>
           
            <div onClick={()=>{
                change()
            }} className='flex  p-2 pl-6 pr-6 m-2 flex-row'>
                <div className='flex flex-row items-center justify-center'>
                <a className={`p-1 ${curr.current === true ? 'bg-black text-white' : 'bg-white text-black'} hover:cursor-pointer`}>DFS</a>
                <a className={`p-1 hover:cursor-pointer ${curr.current===false ? 'bg-black text-white ': 'bg-white text-black'} `}>BFS</a>
                </div>
                <p className='flex items-center justify-center p-2'>Toggle Me</p>
                
                
            </div>
            

    </div>
  )
}

export default Main