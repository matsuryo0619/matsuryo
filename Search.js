document.getElementById('search-btn').addEventListener('click', () => {
    const query = document.getElementById('search-input').value;
    if (query) {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
    } else {
        alert('Please enter a search term!');
    }
});

document.getElementById('lucky-btn').addEventListener('click', () => {
    window.open('https://www.google.com/doodles', '_blank');
});
