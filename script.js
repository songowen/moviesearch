function getTitle(){
    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
          .then(response => response.json())
          .then(response => console.log(response))
          .catch(err => console.error(err));
}
        
        search-content
        
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMzBlMmM0Njc1NDMwYTkxODNkZDZkNTRlMDNjMzVkYyIsInN1YiI6IjY1MmY1ZjdiMzU4ZGE3NWI1ZDAwN2EwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jtCLzasZ5F1wpxWmPcysEdnug_NTwPopK_GfCoMaYl4'
          }
        };
        
        fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
          .then(response => response.json())
          .then(response => console.log(response))
          .catch(err => console.error(err));
                