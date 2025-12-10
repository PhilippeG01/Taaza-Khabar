var btn = document.querySelector('.btn');
var inputField = document.querySelector('.inputPlace');
var heroContainer = document.getElementById('hero-container'); 
var newsGrid = document.getElementById('news-grid'); 
var section_title = document.querySelector('.section_title')

function fetchCategory(catName) {
    inputField.value = catName; 
    btn.click(); 
}

function createPage(data) {
    
    heroContainer.innerHTML = "";
    newsGrid.innerHTML = "";

    var articles = data.response.results;

    if(articles.length===0){
        section_title.textContent="NO DATA FOUND";
    }else{
        section_title.textContent="Top Stories";
    }

    for (var i = 0; i < articles.length; i++) {
        var article = articles[i];
        
        var imgSrc = "https://via.placeholder.com/800x400?text=No+Image";
        if (article.fields && article.fields.thumbnail) {
            imgSrc = article.fields.thumbnail;
        }

        if (i === 0) {
            var heroCard = document.createElement('div');
            heroCard.className = "hero-card";

            var img = document.createElement('img');
            img.className = "hero-img";
            img.src = imgSrc;

            var contentDiv = document.createElement('div');
            contentDiv.className = "hero-content";

            var tag = document.createElement('p');
            tag.className = "section-tag";
            tag.textContent = article.sectionName;

            var titleLink = document.createElement('a');
            titleLink.href = article.webUrl;
            titleLink.target = "_blank";
            titleLink.style.textDecoration = "none";

            var title = document.createElement('h1');
            title.className = "hero-title";
            title.textContent = article.webTitle;

            titleLink.appendChild(title);
            contentDiv.appendChild(tag);
            contentDiv.appendChild(titleLink);

            heroCard.appendChild(img);
            heroCard.appendChild(contentDiv);
            heroContainer.appendChild(heroCard);

        } else {
            
            var card = document.createElement('article');
            card.className = "card";

            var img = document.createElement('img');
            img.className = "card-img";
            img.src = imgSrc;

            var bodyDiv = document.createElement('div');
            bodyDiv.className = "card-body";

            var tag = document.createElement('p');
            tag.className = "section-tag";
            tag.textContent = article.sectionName;

            var titleLink = document.createElement('a');
            titleLink.href = article.webUrl;
            titleLink.target = "_blank";
            titleLink.className = "card-title";
            titleLink.textContent = article.webTitle;

            bodyDiv.appendChild(tag);
            bodyDiv.appendChild(titleLink);
            card.appendChild(img);
            card.appendChild(bodyDiv);

            newsGrid.appendChild(card);
        }
    }
}


function onload() {
    var query = inputField.value;
    inputField.value="";
    
    btn.textContent = "Loading";
    
    var url = `https://content.guardianapis.com/search?api-key=03648588-df3c-4897-91f0-fd496e5a829c&show-fields=thumbnail&page-size=13`;
    
    if (query !== "") {
        url += `&q=${query}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            btn.textContent = "Search";
            createPage(data);
        })
        .catch(error => {
            console.log(error);
            btn.textContent = "Error";
            btn.style.backgroundColor = "red";
        });
}


btn.addEventListener("click", onload);
inputField.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        onload();
    }
    
});

window.addEventListener('load', onload);