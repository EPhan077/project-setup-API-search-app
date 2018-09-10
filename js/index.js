// To set the event to listen to
const form = document.querySelector('.js-search-form');

// To listen when user hits submit or press enter
form.addEventListener('submit', (e) => {

//  Start of the query string
const base = `https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&`;

// Extension of the query string
const searchTerm = document.querySelector('#searchTerm').value;
const language = `en-US&`;
const api_key = `7ab3cb18b4ad4a07bbd8bb01acfa7091`;

// The complete build of the url
const url = `${base}query=${searchTerm}&language=${language}api_key=${api_key}`;

// The get method
const option = {
    method: 'GET'
}

// Stops the default action
e.preventDefault()

    
fetch(url)
    
  //Parse data
  .then( response => {
    if (response.ok) {
        return response.json()
    } else {
        throw response
    }
})
    
 // Do something with data
  .then( data => {
    
    console.log(data)


// Output results
let resultElement = '';
    
    if(data.results.length > 1) {
        resultElement += `
                        <h2><span>Results for ${searchTerm}</span></h2>
                        <section class="js-search-results clearfix">
                        `;
        
        if(data.results)
        
        data.results.forEach(function(results){
            
            resultElement += `<article class="item">
                             <div class="container">
                             <img src="https://image.tmdb.org/t/p/w500${results.poster_path}"/>
                             <div class="content">`;
            if(results.title.length > 17) {
               resultElement += `<h3>${results.title.substr(0,17)}...</h3>`; 
            } else {
                resultElement += `<h3>${results.title}</h3>`;             
              }
             
            resultElement += `<p>Released: ${results.release_date}</p>`;
            resultElement += `</div>
                              </div>
                              </article>`;
        });
        
        resultElement += `</section>`;

// To store input via local storage        
var pastSearch = document.getElementsByTagName('input') [0], search;
        
localStorage.setItem('search', searchTerm);

search = localStorage.getItem('search');

pastSearch.innerHTML = search;
        
console.log(search);
        
    } else {
        resultElement += '<p class="no-results">No results</p>';
    }
    
    document.querySelector('.js-search-results').innerHTML = resultElement;
})
    
    .catch(err => {
    console.log(err)
    })
    
})

