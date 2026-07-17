const getLoadingSpinner = (message) => {
    return `<div class="spinner-container"><div class="spinner"></div><span>${message}</span></div>`;
};

// 1. Ask AI
const question = document.getElementById("question");
const askBtn = document.getElementById("askBtn");
const output = document.getElementById("output");

askBtn.addEventListener("click", async function(){
    if(question.value.trim() === "" ){
        output.innerHTML = "Please enter a question.";
        return;
    }
    output.innerHTML = getLoadingSpinner("AI is thinking...");

    try{
        const response = await fetch("/ask",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: question.value })
        });
        const data = await response.json();
        output.innerHTML = marked.parse(data.answer);
    }catch (error){
        output.innerHTML = "Error connecting to AI.";
    }
});

// 2. Summarize Notes
const notes = document.getElementById("notes");
const summaryBtn= document.getElementById("summaryBtn");
const summaryOutput = document.getElementById("summaryOutput");

summaryBtn.addEventListener("click", async function(){
    if(notes.value.trim() === ""){
         summaryOutput.innerHTML = "Please paste your notes.";
         return;
    }
    summaryOutput.innerHTML = getLoadingSpinner("Notes are being summarized...");

    try {
        const response = await fetch("/summary",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ notes: notes.value })
        });
        const data = await response.json();
        summaryOutput.innerHTML = marked.parse(data.summary);
    } catch (error) {
        summaryOutput.innerHTML = "Error connecting to AI.";
    }
});

// 3. Practice Quiz
const topic = document.getElementById("topic");
const quizBtn = document.getElementById("quizBtn");
const quizOutput = document.getElementById("quizOutput");

quizBtn.addEventListener("click", async function(){
    if(topic.value.trim() === ""){
        quizOutput.innerHTML = "Please enter a topic.";
        return;
    }
    quizOutput.innerHTML = getLoadingSpinner("Quiz is being generated...");

    try{
        const response = await fetch("/quiz",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topic: topic.value })
        });
        const data = await response.json();
        quizOutput.innerHTML = marked.parse(data.quiz);
    }catch (error){
        quizOutput.innerHTML = "Error connecting to AI.";
    }
});

// 4. Study Tips
const subject = document.getElementById("subject");
const tipsBtn = document.getElementById("tipsBtn"); 
const tipsOutput = document.getElementById("tipsOutput");

tipsBtn.addEventListener("click", async function() {
    if (subject.value.trim() === "") {
        tipsOutput.innerHTML = "Please enter a subject.";
        return;
    }
    tipsOutput.innerHTML = getLoadingSpinner("AI is preparing study tips...");

    try {
        const response = await fetch("/tips", {
            method: "POST",
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify({ topic: subject.value })
        });
        const data = await response.json();
        tipsOutput.innerHTML = marked.parse(data.tips);
    } catch (error) {
        tipsOutput.innerHTML = "Error connecting to AI.";
    }
});