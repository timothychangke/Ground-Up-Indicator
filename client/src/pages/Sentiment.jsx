import '../styles/tracker.css';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import GetScore from '../components/getScore';


function Sentiment() {

    const [text, setText] = useState("");
    const [e, setError] = useState(false);
    const [done,setDone]= useState(false)


    async function query(data) { // Label 2 - positive, label 1 - neutral, label 0 - negative
        const response = await fetch(
            "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment",
            {
                headers: { Authorization: "Bearer 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" },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        const result = await response.json();
        return result;
    }

    function analyze(){
        if (text.length < 30){
            setError(true);
        }
        else{ // only analyze sentiments if lenght is more than 30
            setError(false);
            query({"inputs": text}).then((response) => {
                console.log(JSON.stringify(response[0]));
                 // can send the data here back to the database
                 postScore((response[0]))
            });
        }
        setText("");
    } 

    function postScore(data){
        let positive = 0;
        let negative = 0;

        data.forEach(item => {
            switch(item.label){
                case "LABEL_2": 
                    positive = item.score;
                    break;
                case "LABEL_0": 
                    negative= item.score;
                    break;
                default:
                    break;
            }
        });
        const score = (positive-negative)*100;

        axios.get('/profile').then(({ data }) => {
            const email = data.email
           axios.post('/reflection',{email, score}).then((res)=>{
            console.log(res)
            setDone(true)
           })
        });
    }

    return (
        <div className="App">
            <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800">
                <h1 className="text-4xl py-8 mb-10 bg-custom-green text-white rounded">
                    Opinion Column
                </h1>
                <div className="grid md:grid-rows-2 gap-0 ">
                        <h1 >
                            Question: 
                        </h1>
                        <h3 className='pb-2'>
                            What do you think of planting trees?
                        </h3>
                    <div className = "container max-w-4xl pt-12" >
                        {e ? <TextField onChange={(e) => setText(e.target.value)} 
                                    value = {text} id="outlined-basic" 
                                    label="Reply" 
                                    variant="outlined" 
                                    helperText="Please write more than 30 characters"
                                    multiline rows={4} 
                                    fullWidth
                                    error/> : 
                                    <TextField onChange={(e) => setText(e.target.value)} 
                                    value = {text} id="outlined-basic" 
                                    label="Reply" 
                                    variant="outlined" 
                                    helperText="Let us know what you think!"
                                    multiline rows={4} 
                                    fullWidth/>}
                        <Button variant="outlined" onClick={() => {analyze();}} endIcon={<SendIcon />}>Submit</Button>
                    </div>
                </div>
            </div>
           { done &&
            <GetScore/>
        }
        </div>
    );
}

export default Sentiment;