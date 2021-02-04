import React,{useState,useEffect} from "react"

function FetchQuote() {
    const [quote,setQuote] = useState('');
    const [author,setAuthor]= useState('');
    const [setState] = useState({});
    

    useEffect(()=>{
        getQuote();
       const intervalID = setInterval(()=>{
        getQuote()
       }, 24 * 60 * 60 * 1000);
    return ()=>{
        clearInterval(intervalID);
        setState({});
    }
    },[])
    function getQuote() {
        fetch('http://quotes.rest/qod.json?category=inspire')
        .then(res=> res.json())
        .then(data=>{
            console.log(data);
            setQuote(data.contents.quotes[0].quote);
            setAuthor(data.contents.quotes[0].author);
           
        })
    }
return(
    
    <>
    <div id="quote">
    <h2>{quote}</h2>
    <p>- {author}</p>
    </div>
    </>
    
)
}
export default FetchQuote