const Cities = document.getElementById('Cities');

Cities.addEventListener('change', () => {
  console.log(Cities.value);
  localStorage.setItem('city', Cities.value);
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
      Cities.value = cities[0].code; // なければ一番最初の都市を選択
    }
  });

  })
  .catch(error => {
    console.error('エラー:', error);
  });
