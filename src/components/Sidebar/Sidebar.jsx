import React, { useContext, useState } from 'react'
import './Sidebar.css'
import {assets} from '../../assets/assets/assets'
import { context } from '../../context/Context';

export default function Sidebar() {

  // Create useState for expending feature for sidebar element , by deafult it will be false
  const [extended , setExtended] = useState(false);

  const {onSent,prevPrompts,setRecentPrompt,newChat} = useContext(context);

  async function loadPrompt(prompt){
      setRecentPrompt(prompt);
      await onSent(prompt);
  }

  return (
    <div className='sidebar'>
   <div className="top">
<img onClick={()=>setExtended(prev=>!prev)} className='menu' src={assets.menu_icon} alt=""  />
{/* Sidebar chat feature  implement */}
<div onClick={()=>newChat()} className="new-chat"> 
<img src={assets.plus_icon} alt="" />
 {extended?<p> New Chat </p>:null} 
</div>
{/* Showing recent chat */}
    {extended?
   <div className="recent"> 
   <p className="recent-title">Recent</p>
   {
    prevPrompts.map((item,index)=>{
      return(
        <div onClick={()=>onSent(item)} className="recent-entry">
        <img src={assets.message_icon} alt="" />
        <p>{item.slice(0,18)} ...</p>
    </div>
      )
    })
   }

   </div>:null  
  }
   </div>
   {/* Implementing the bottam part in react js  */}
   <div className="bottom">
    <div className="bottom-item recent-entry">
        <img src={assets.question_icon} alt="" />
        {extended?<p>Help</p>:null}
            </div>

            <div className="bottom-item recent-entry">
        <img src={assets.history_icon} alt="" />
         {extended?<p>Activities</p>:null} 
            </div>

            <div className="bottom-item recent-entry">
        <img src={assets.setting_icon} alt="" />
             {extended?<p>Settings</p>:null}
            </div>
   </div>  
    </div>
  )
}
