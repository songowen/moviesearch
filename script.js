const movieList = document.getElementById("movie-list");
const movies = document.querySelector(".movies");
const title = document.querySelector(".title");

// 사이트이름 클릭 시 새로고침
title.addEventListener("click", () => {
  location.reload();
});


const apiOptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMzBlMmM0Njc1NDMwYTkxODNkZDZkNTRlMDNjMzVkYyIsInN1YiI6IjY1MmY1ZjdiMzU4ZGE3NWI1ZDAwN2EwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.jtCLzasZ5F1wpxWmPcysEdnug_NTwPopK_GfCoMaYl4",
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
        
        <div class="movieInner">
          <div class="movieImg">
            <img src="${posterImageUrl}" alt="" />
      </div>
          <div class="movieContent">
            <div class="rating">Rating: ${voteAverage}</div>
            <div class="summary">${overview}</div>
           </div>
         </div>
        <div class="movieTitle">${title}
        </div>
      `;

      // 포스터 클릭시 알람창
      movieBox.addEventListener("click", () => {
        alert(`선택한 영화의 ID는 ${movie.id}입니다.`);
      });

      // 영화 정보 카드를 부모 요소에 추가
      movies.append(movieBox);
    });
  })
  .catch((err) => console.error(err));

  function getTitle(movieId) { 
    alert(`선택한 영화의 ID는 ${movieId}입니다.`);
  }
  

// 검색 폼과 결과를 가져옴
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");


let moviesData = []; // 영화 데이터를 저장할 배열

// API에서 영화 데이터 가져오기
fetch(
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
  apiOptions
)
  .then((response) => response.json())
  .then((data) => {
    moviesData = data.results; 
  })
  .catch((err) => console.error(err));

// 검색 폼 제출 이벤트 핸들러 추가
searchForm.addEventListener("submit", (e) => {
  e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

  const searchValue = searchInput.value;
  if (searchValue) {
    moviesearch(searchValue);
  } else {
    alert("검색어를 입력해주세요.");
  }
});

// 검색 결과 필터링 함수 (moviesearch)
function moviesearch(searchValue) {
  const filtering = moviesData.filter((movie) =>
    movie.original_title.toUpperCase().includes(searchValue.toUpperCase())
  );

  if (filtering.length === 0) {
    alert("일치하는 영화가 없습니다.");
  } else {
    // 기존의 영화 목록을 비움
    movies.innerHTML = "";

    // 필터링된 영화를 표시
    filtering.forEach((movie) => {
      const title = movie.original_title;
      const posterPath = movie.poster_path;
      const overview = movie.overview;
      const voteAverage = movie.vote_average;

      const posterImageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

      // 영화 정보 카드 생성
      const movieBox = document.createElement("div");
      movieBox.className = "movie";
      movieBox.innerHTML = `
        <div class="movieTitle">${title}</div>
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

      // 클릭 이벤트 핸들러 추가
      movieBox.addEventListener("click", () => {
        alert(`선택한 영화의 ID는 ${movie.id}입니다.`);
      });

      // 영화 정보 카드를 부모 요소에 추가
      movies.append(movieBox);
    });
  }
}



//상단 날씨

const apiKey = "ab16f2e6baea4dc5451c31fcdcd987b9";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const city = "Seoul";
const countryCode = "KR";

// API 엔드포인트 및 쿼리 매개변수 설정
const apiUrlWithParams = `${apiUrl}?q=${city},${countryCode}&appid=${apiKey}&units=metric`;


function getWeatherData() {
  fetch(apiUrlWithParams)
    .then((response) => response.json())
    .then((data) => {
      
      const temperature = Math.round(data.main.temp);
      const weatherDescription = data.weather[0].description;

      const timeBoard = document.getElementById("WhatTimeIsItNow");
      const weatherInfoElement = document.getElementById("weather");

      timeBoard.textContent = getCurrentTime(); // 현재 시간 설정 (아래에서 정의)
      weatherInfoElement.textContent = `${weatherDescription} ${temperature}°C`;
    })

    .catch((error) => {
      console.error("날씨 데이터를 불러오는 중 에러 발생:", error);
    });
}

// 페이지가 로드될 때 날씨 데이터 가져오기
window.addEventListener("load", getWeatherData);

// 주기적으로 날씨 데이터 업데이트 (예: 10초마다)
setInterval(getWeatherData, 10000);

// 현재 시간을 반환하는 함수
const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  return `${hours}:${minutes}`;
};
