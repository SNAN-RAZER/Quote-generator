
const quoteConatiner = document.querySelector('#quote-contianer');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader=document.getElementById('loader');
// Get quotes from API
let apiQuotes =[];



//Show loading
function loading(){
    loader.hidden=false;
    quoteConatiner.hidden=true;
}

//Hide Loading
function complete()
{
    quoteConatiner.hidden=false;
    loader.hidden = true;
}

function newQoute()
{
    loading();
    const quote=apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
   
    

    if(!quote.author)
    {
        authorText.textContent='Unkown';
    }
    else{
        authorText.textContent=quote.author;
    }

    ///Check quote length to determine styline
    if(quote.text.length >50)
    {
        quoteText.classList.add('long-quote');
    }
    else
    {
        quoteText.classList.remove('long-quote');
    }

    // Set quote , Hide Loader
    quoteText.textContent=quote.text;
    complete();


}
async function getQuotes()
{
    loading();
    const API_URL=`https://type.fit/api/quotes`;
    try
    {
        const response= await fetch(API_URL);
        apiQuotes=await response.json();
        newQoute();
        
    }
    catch(err)
    {
        console.log(err);
    }
}

// Tweet Quote
function tweetQuote()
{
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl,'_blank')
}
// On load


getQuotes();
// Adding event listener to buttons
newQuoteBtn.addEventListener('click',()=>{
    newQoute();
});

twitterBtn.addEventListener('click',()=>{
    tweetQuote();
})

