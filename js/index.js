const form = document.querySelector('.js-search-form');

form.addEventListener('submit', (e) => {

const base = `https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&`;

const searchTerm = document.querySelector('#searchTerm').value;
const language = `en-US&`;
const api_key = `7ab3cb18b4ad4a07bbd8bb01acfa7091`;

const url = `${base}query=${searchTerm}&language=${language}api_key=${api_key}`;

const option = {
    method: 'GET'
}


e.preventDefault()

fetch(url)
  .then( response => {
    if (response.ok) {
        return response.json()
    } else {
        throw response
    }
})
  .then( data => {
    
    console.log(data)
    
let resultElement = '';
    
    if(data.results.length > 1) {
        resultElement += `<section class="js-search-results clearfix">
                        <h2><span>Results for ${searchTerm}</span></h2>`;
        
        if(data.results)
        
        data.results.forEach(function(results){
            resultElement += `<article>
                             <div class="container">
                             <img src="https://image.tmdb.org/t/p/w500${results.poster_path}"/>
                             <div class="content">`;
            if(results.title.length > 20) {
               resultElement += `<h3>${results.title.substr(0,20)}...</h3>`; 
            } else {
                resultElement += `<h3>${results.title}</h3>`;             
              }
             
            resultElement += `<p>Released: ${results.release_date}</p>`;
            resultElement += `</div>
                              </div>
                              </article>`;
        });
        
        resultElement += `</section>`;
        console.log(data);
        
    } else {
        resultElement += '<p class="no-results">No results</p>';
    }
    
    document.querySelector('.js-search-results').innerHTML = resultElement;
})
    
    .catch(err => {
    console.log(err)
    })
    
})
