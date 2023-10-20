const movieList = document.getElementById("movie-list");
const movies = document.querySelector(".movies");

// API 옵션 설정
const apiOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMzBlMmM0Njc1NDMwYTkxODNkZDZkNTRlMDNjMzVkYyIsInN1YiI6IjY1MmY1ZjdiMzU4ZGE3NWI1ZDAwN2EwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jtCLzasZ5F1wpxWmPcysEdnug_NTwPopK_GfCoMaYl4'
  },
};

// API에서 영화 데이터 가져오기
fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  apiOptions
)
  .then((response) => response.json())
  .then((data) => {
    const moviesData = data.results;

    moviesData.forEach((movie) => {
      const title = movie.original_title;
      const posterPath = movie.poster_path;
      const overview = movie.overview;
      const voteAverage = movie.vote_average;

      const posterImageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

      // 영화 정보 카드 생성
      const movieBox = document.createElement("div");
      movieBox.className = "movie";
      movieBox.innerHTML = `
        <div class="movieTitle">${title}
        </div>
        <div class="movieInner">
          <div class="movieImg">
            <img src="${posterImageUrl}" alt="" />
          </div>
          <div class="movieContent">
            <div class="rating">Rating: ${voteAverage}</div>
            <div class="summary">${overview}</div>
          </div>
        </div>
       
      `;


      // 클릭 이벤트 처리기를 추가
      movieBox.addEventListener("click", () => {
        alert(`선택한 영화의 ID는 ${movie.id}입니다.`);
      });

      // 영화 정보 카드를 부모 요소에 추가
      movies.append(movieBox);
    });
  })
  .catch((err) => console.error(err));




  //영화 검색
  // 영화 데이터 배열 (이미 가지고 있는 데이터)
const movieData = []; // 여기에 실제 영화 데이터를 추가해야 합니다.

// 검색 버튼 클릭 시 실행
document.getElementById("search-btn").addEventListener("click", () => {
  const searchInput = document.getElementById("search-input").value.toLowerCase(); // 검색어를 소문자로 변환

  // 검색어와 일치하는 영화를 필터링
  const filteredMovies = movieData.filter((movie) =>
    movie.original_title.toLowerCase().includes(searchInput)
  );

  // 기존 영화 카드를 모두 지우기
  while (movies.firstChild) {
    movies.firstChild.remove();
  }

  // 필터링된 영화 카드를 생성하여 추가
  filteredMovies.forEach((movie) => {
    const title = movie.original_title;
    const posterPath = movie.poster_path;
    const overview = movie.overview;
    const voteAverage = movie.vote_average;
    const posterImageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

    const movieBox = document.createElement("div");
    movieBox.className = "movie";
    movieBox.innerHTML = `
      <div class="movieInner">
        <div class="movieImg">
          <img src="${posterImageUrl}" alt="" />
        </div>
        <div class="movieDetails">
          <div class="movieTitle">${title}</div>
          <div class="rating ${getColor(voteAverage)}">${voteAverage}</div>
          <div class="summary">${overview}</div>
        </div>
      </div>
    `;

    movies.appendChild(movieBox);
  });
});

// getColor 함수 및 fetch API 등의 코드는 이전과 동일하게 사용합니다.
