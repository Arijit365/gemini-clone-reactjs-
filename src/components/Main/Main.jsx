import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets/assets'
import { context } from '../../context/Context'

export default function Main() {

    const {onSent,recentPrompt,showResult,loading,resultData,setInput,input} = useContext(context);


  return (
    <div className="main">
        {/* Implemt Nav elements */}
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon} alt="" />
        </div>
{/* Implemt the bottom element */}

<div className="main-container">


{
    !showResult?
    <>
    <div className="greet">
    {/* Implement greeting line */}
<p> <span> Hello, Dev </span> </p>
<p>How can i help you?</p>
</div>
{/* Implement cards */}
<div className="cards">

<div className="card">
    <p> Suggest beautiful places to see on an upcoming road trip </p>
    <img src={assets.compass_icon} alt="" />
</div>

<div className="card">
    <p> Briefly summarize this concept: urban planning </p>
    <img src={assets.bulb_icon} alt="" />
</div>

<div className="card">
    <p> Brainstorm team bonding activities for our work retreat </p>
    <img src={assets.message_icon} alt="" />
</div>

<div className="card">
    <p> Tell me about React js and React native </p>
    <img src={assets.code_icon} alt="" />
</div>

    </div>
    </>
    :
    // Display the result data from the API response
    <div className='result'>
   <div className="result-title">
    <img src={assets.user_icon} alt="" />
    <p>{recentPrompt}</p>
   </div>
   <div className="result-data">
    <img src={assets.gemini_icon} alt="" />
    {
        loading?
        <div className='loader'>
        <hr />
        <hr />
        <hr />
        </div>
        :  <p dangerouslySetInnerHTML={{__html:resultData}}></p>
    }
   </div>
    </div>
}


{/* bottom side search box implement */}
<div className="main-bottom">
<div className="search-box">
    <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt here' />
    <div>
        <img src={assets.gallery_icon} alt="" />
        <img src={assets.mic_icon} alt="" />
        {input?<img onClick={()=>onSent()} src={assets.send_icon} alt="" />:null}
    </div>
</div>
<p className="bottom-info">
Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps
</p>
</div>

</div>
    </div>
  )
}