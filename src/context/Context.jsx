import { createContext, useState } from "react";
import run from "../config/gemini";

export const context = createContext();

const ContextProvider = (props) =>{

    const [input , setInput] = useState("");
    const [recentPrompt,setRecentPrompt] = useState("");
    const [prevPrompts,setPrevPrompts] = useState([]);
    const [showResult,setShowResult] = useState(false);
    const [loading,setLoading] = useState(false);
    const [resultData,setResultData] = useState("");

    function delayPara(index,nextword){
            setTimeout(function (){
         setResultData(prev=>prev+nextword)
            }, 75*index)
    }

    const newChat = () =>{
        setLoading(false);
        setShowResult(false);
    }
    
    const onSent = async(prompt) =>{
        setResultData();
        setLoading(true);
        setShowResult(true);
        let response;
        if(prompt !== undefined){
            response =  await run(prompt);
            setRecentPrompt(response);
        }else{
            setPrevPrompts(prev=>[...prev,input]);
            setRecentPrompt(input);
            response = await run(input);
        }
        
       let responseArray = response.split("**");
       let newResponse="";
       for(let i = 0;i<responseArray.length;i++)
        {
        if(i === 0 || i%2 !== 1){
            newResponse += responseArray[i];
        }
        else{
            newResponse += "<b>"+responseArray[i]+"</b>";
        }
       }
       let newResponse2 = newResponse.split("*").join("</br>");
       let newResponse3 = newResponse2.split(" ")
       for(let i=0;i<newResponse3.length;i++)
       {
         const newWord = newResponse3[i];
         delayPara(i,newWord+" ");
       }
       setLoading(false);
       setInput("");

    }

    const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat
    }

    return (
        <context.Provider value={contextValue}>
            {props.children}
        </context.Provider>
    )
}

export default ContextProvider;