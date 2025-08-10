const Cities = document.getElementById('Cities');
const Screen = document.getElementById('weather');

function displayWeather(data) {
  // 例：都市名と今日の天気を表示
  const cityName = data.location.city;
  const forecast = data.forecasts[0].telop;
  Screen.textContent = `${cityName}の天気は「${forecast}」です。`;
}

Cities.addEventListener('change', () => {
  console.log(Cities.value);
  localStorage.setItem('city', Cities.value);

  fetch(`https://weather.tsukumijima.net/api/forecast/city/${Cities.value}`)
    .then(res => {
      if (!res.ok) throw new Error('読み込み失敗');
      return res.json();
    })
    .then(json => {
      displayWeather(json);
    })
    .catch(err => {
      Screen.textContent = '天気情報の取得に失敗しました。';
      console.error(err);
    });
});

fetch('./Cities.min.json')
  .then(response => {
    if (!response.ok) throw new Error('ファイル読み込み失敗');
    return response.json();
  })
  .then(cities => {
    console.log('読み込んだ都市一覧:', cities);
    cities.forEach(city => {
      const option = document.createElement('option');
      option.value = city.code;
      option.textContent = city.name;
      Cities.appendChild(option);
    });

    const savedCity = localStorage.getItem('city');
    if (savedCity && cities.some(city => city.code === savedCity)) {
      Cities.value = savedCity;
    } else {
      Cities.value = cities[0].code;
    }
    
    // 初期選択に合わせて天気も表示
    Cities.dispatchEvent(new Event('change'));
  })
  .catch(error => {
    console.error('エラー:', error);
  });
