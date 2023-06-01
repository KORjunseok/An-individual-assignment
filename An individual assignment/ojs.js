const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZjMyM2Y3NzY0ODEyNDI3M2I2ZDVlZWFiNjhjYzIxOSIsInN1YiI6IjY0NWM5OGE2ZmUwNzdhNWNhZWRhZjg0NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y-JaKYLuKQMP11IMnf1uf66lOOFfkWD-jDzKtUJHzg0'
  }
};

const cardsBox = document.getElementById('cards-box'); // 외부에서 데이터를 갖고 와서 cards-box에 할당  

fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=cf323f77648124273b6d5eeab68cc219&language=en-US&page=1', options)
  .then(response => response.json())
  .then(data => {
    let rows = data['results'];

    cardsBox.innerHTML = ''; // cardsBox로 설정하여 기존 콘텐츠를 지운다.

    rows.forEach((a) => {
      let id = a['id'];
      let original_title = a['original_title'];
      let overview = a['overview'];
      let poster_path = "https://image.tmdb.org/t/p/w500" + a['poster_path'];
      let vote_average = a['vote_average'];

      let tempDiv = document.createElement('div');
      tempDiv.dataset.id = id;
      tempDiv.className = 'col';
      tempDiv.innerHTML = `
        <div class="card h-100">
          <img src=${poster_path}>
          <div class="card-body">
            <h5 class="card-title">${original_title}</h5>
            <p class="card-text">${overview}</p>
            <p class="card-average">Rating : ${vote_average}</p>
          </div>
        </div>
      `; // forEach를 사용하여 영화 객체를 반복, API에 추출한 데이터를 적용
         // 선언된 변수를 활용해서 tempDiv.innerHTML = ``HTML에 데이터를 붙인다. 

      tempDiv.addEventListener('click', function() {
        let id = this.dataset.id;
        hello(id);
      }); // 클릭 이벤트 연결 DIV를 클릭했을 때 hello 함수 추출하여 영화 id 값 나올 수 있게 적용

      cardsBox.appendChild(tempDiv);
    });
  });

function hello(id) {
  window.alert("영화 ID: " + id);
}

const searchForm = document.querySelector('.search');
const searchInput = document.querySelector('.search-input');

searchForm.addEventListener('submit', handleSearch);

function handleSearch(event) {
  event.preventDefault(); // Prevent form submission

  const searchTerm = searchInput.value.trim();

  if (searchTerm !== '') {
    // console.log(searchTerm);

    
    cardsBox.innerHTML = ''; // cardsBox로 설정하여 기존 콘텐츠를 지운다.

    fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=cf323f77648124273b6d5eeab68cc219&language=en-US&page=1', options)
      .then(response => response.json())
      .then(data => {
        let rows = data['results'];

        let filteredRows = rows.filter(a => a.original_title.toLowerCase().includes(searchTerm.toLowerCase()));
        // 검색된 영화 필터링

        filteredRows.forEach((a) => {
          let id = a['id'];
          let original_title = a['original_title'];
          let overview = a['overview'];
          let poster_path = "https://image.tmdb.org/t/p/w500" + a['poster_path'];
          let vote_average = a['vote_average'];

          let tempDiv = document.createElement('div');
          tempDiv.dataset.id = id;
          tempDiv.className = 'col';
          tempDiv.innerHTML = `
            <div class="card h-100">
              <img src=${poster_path}>
              <div class="card-body">
                <h5 class="card-title">${original_title}</h5>
                <p class="card-text">${overview}</p>
                <p>Rating: ${vote_average}</p>
              </div>
            </div>
          `;
          
          tempDiv.addEventListener('click', function() {
            let id = this.dataset.id;
            hello(id);
          }); // 영화 검색을 하고 div 클릭 했을 때 alert 창 띄움

          cardsBox.appendChild(tempDiv);
        });
      })
      .catch(error => {
        console.error('오류 내용 :', error);
      }); // 오류 메시지를 console 텝에 기록

    searchInput.value = ''; // 검색을 한 후 검색 칸을 지움, 화면 상에 중복으로 불러오는 것도 방지
  }
}

window.location.replace = "http://127.0.0.1:5500/index.html"; // window.location.href를 사용했을 땐 여러번 로딩 시도가 되어서 href()를 replace()로 교체하여 한 번만 시도하도록 변경


// JavaScript 평 : 상당히 어려웠습니다. 기본적으로 메서드 종류나 함수가 어떻게 작동되는지 정확히 알지 못했기에
// 구글링 등을 통해 결과물을 내고 그 결과물의 코드를 해석하는 걸로 이번 과제를 마무리했습니다. 
// 그렇다 보니 과제에 끌려다닌다는 생각도 들었습니다.
// 이번 과제는 어느 누가 보든 최대한 쉽게 코드를 구성하고 싶었는데, 그렇게 하지 못해 아쉽습니다. 

