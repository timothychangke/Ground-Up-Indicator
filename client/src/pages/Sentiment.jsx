import '../styles/tracker.css';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

function Sentiment() {

    const [text, setText] = useState("");

    async function query(data) { // Label 2 - positive, label 1 - neutral, label 0 - negative
        const response = await fetch(
            "https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment",
            {
                headers: { Authorization: "Bearer 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" }, // someone please blur out the key here please - in an .env file, i have no idea how to do this in JS
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        const result = await response.json();
        return result;
    }

    function analyze(){
        query({"inputs": text}).then((response) => {
            console.log(JSON.stringify(response[0])); // can send the data here back to the database
        });
        setText("");
    } 

    return (
        <div className="App">
            <div className="container mx-auto max-w-6xl text-center drop-shadow-lg text-gray-800">
                <h1 className="text-4xl py-8 mb-10 bg-slate-800 text-white rounded">
                    Opinion Column
                </h1>
                <div className="grid md:grid-rows-2 gap-4">
                   <div>
                        <h1>
                            Question
                        </h1>
                        <h3>
                            What do you think of planting trees?
                        </h3>
                    </div>
                    <div className = "container max-w-4xl">
                        <TextField onChange={(e) => setText(e.target.value)} value = {text} id="outlined-basic" label="Reply" variant="outlined" helperText="Let us know what you think!" multiline rows={4} fullWidth/>
                        <Button variant="outlined" onClick={() => {analyze();}} endIcon={<SendIcon />}>Submit</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sentiment;