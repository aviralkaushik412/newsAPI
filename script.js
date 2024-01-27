const API_KEY = "dfa9f3f3dcdd4c4db26a876b3af85e32";
const LINK = "https://newsapi.org/v2/everything?q=";
const searchbtn = document.getElementById("submitbtn");
const searchInput = document.getElementById("search-input");
// const srchtext = document.getElementById("search-input").value.trim();


searchbtn.addEventListener("click", () => {
    const srchtext = searchInput.value.trim();
    // if()
    OnLoad(srchtext);
});

window.addEventListener("load", () => OnLoad("India"));

async function OnLoad(qry){
    const result = await fetch(`${LINK}${qry}&apiKey=${API_KEY}`);
    const data = await result.json();
    // const data.article[title] = ded
    BindData(data.articles);
}


function BindData(articles){
    const Cardcontainer = document.getElementById("main-content");
    const template = document.getElementById("template-box");
    


    Cardcontainer.innerHTML= '';

    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = template.content.cloneNode(true);
        // const cardClone.title = "ded";
        fillData(cardClone, article);
        Cardcontainer.appendChild(cardClone);
    });
}

function fillData(cardClone, article){
    const title = cardClone.querySelector("#news-title");
    const image = cardClone.querySelector("#news-img"); // Query within cardClone
    const source = cardClone.querySelector("#news-srcdt");
    const content = cardClone.querySelector("#news-content");
    const mdate = new Date(article.publishedAt).toLocaleString('en-US', {
        timeZone: "Asia/Jakarta"
    });

    image.src = article.urlToImage;
    title.innerHTML = article.title;
    // source.innerHTML = article.source.name;
    source.innerHTML = `${article.source.name} · ${mdate}` // Fill in description
    content.innerHTML = article.description;
    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank")
    }) // Fill in content
}
