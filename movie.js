const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNjlmYzUwZTIzMjQxOWM3ZDU3Y2RiNDQ0Y2UwM2FjNCIsInN1YiI6IjY1MmYzODE1MGNiMzM1MTZmNjQwYTE3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xGVFf0zlLh7GdUqjn1b4fAE1dC0Nw5n9mPxJ0IYnJbQ",
  },
};
const url =
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

// api 데이터 긇어오기
fetch(url, options)
  .then((response) => response.json())
  .then((data) => {
    const rows = data["results"];
    const cardList = document.querySelector(".card-list");
    cardList.innerHTML = "";

    const input = document.querySelector(".search-input");

    let title_Lower = rows.map((item) => {
      return item.title.toLowerCase();
    });

    console.log(title_Lower); //소문자로 변경되었는지 확인

    input.addEventListener("keyup", function () {
      let lowerInput = input.value.toLowerCase();

      let find_title = title_Lower.filter((item) => {
        return item.includes(lowerInput);
      });

      console.log(find_title);

      if (input.value.length > 0) {
        console.log(lowerInput); //입력한 데이터가 정상적으로 들어갔는지 확인

        //console.log(find_title);
        cardList.innerHTML = "";

        for (let i of find_title) {
          console.log(i); //데이터 확인용
          rows.forEach((b) => {
            let _title = b["title"];
            let _overview = b["overview"];
            let _poster_path = b["poster_path"];
            let _vote_average = b["vote_average"];
            let _id = b["id"];

            if (i == b["title"].toLowerCase()) {
              let temp_html = `
            <div class="col">
                <div class="card movie-card" data-id="${_id}">
                    <img src="https://image.tmdb.org/t/p/w500${_poster_path}">
                    <h3>${_title}</h3>
                    <p>${_overview}</p>
                    <p>Rating: ${_vote_average}</p>
                </div>
              </div>
            `;
              cardList.insertAdjacentHTML("beforeend", temp_html);
            }
          });
        }
        idEvent();
      } else {
        cardList.innerHTML = "";
        main();
        idEvent();
      }
    });

    function main() {
      rows.forEach((a) => {
        let _title = a["title"];
        let _overview = a["overview"];
        let _poster_path = a["poster_path"];
        let _vote_average = a["vote_average"];
        let _id = a["id"];

        let temp_html = `
              <div class="col">
                <div class="card movie-card" data-id="${_id}">
                    <img src="https://image.tmdb.org/t/p/w500${_poster_path}">
                    <h3>${_title}</h3>
                    <p>${_overview}</p>
                    <p>Rating: ${_vote_average}</p>
                </div>
              </div>
            `;

        cardList.insertAdjacentHTML("beforeend", temp_html);
        //console.log(temp_html);
      });
    }

    function idEvent() {
      const movieCards = document.querySelectorAll(".movie-card"); // :CSS 선택자를 이용하여 모든 요소를 선택합니다.
      movieCards.forEach((card) => {
        card.addEventListener("click", function () {
          let movieId = this.getAttribute("data-id"); // : 해당 요소의 속성 값을 가져옵니다.
          alert(`영화 id: ${movieId}`);
        });
      });
    }

    main();
    idEvent();
  });
