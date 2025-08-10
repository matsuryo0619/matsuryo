const Cities = document.getElementById('Cities');

Cities.addEventListener('change', () => {
  console.log(Cities.value);
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
  })
  .catch(error => {
    console.error('エラー:', error);
  });
