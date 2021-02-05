import React,{useState,useEffect} from "react"

class FetchQuote extends React.Component {
    // const [quote,setQuote] = useState('');
    // const [author,setAuthor]= useState('');
    // const [setState] = useState({});
    state ={
        quote: "",
        author: "",
    }

    componentDidMount(){
        this.getQuote()
    }

    // useEffect(()=>{
    //     getQuote();
    //    const intervalID = setInterval(()=>{
    //     getQuote()
    //    }, 24 * 60 * 60 * 1000);
    // return ()=>{
    //     clearInterval(intervalID);
    //     setState({});
    // }
    // },[])
    
    getQuote = ()=> {
        fetch('http://quotes.rest/qod.json?category=inspire')
        .then(res=> res.json())
        .then(data=>{
            console.log(data);
            this.setState({
                quote: data.contents.quotes[0].quote,
                author: data.contents.quotes[0].author
            })
            // setQuote(data.contents.quotes[0].quote);
            // setAuthor(data.contents.quotes[0].author);
           
        })
    }
    render() {
        return (
            <>
            <div id="quote">
                <h2>{this.state.quote}</h2>
                <p>- {this.state.author}</p>
            </div>
            </>
        );
    }
}
export default FetchQuote