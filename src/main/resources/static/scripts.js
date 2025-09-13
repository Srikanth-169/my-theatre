const movies = [
    { title: "Movie 1", image: "https://via.placeholder.com/200x300?text=Movie+1" },
    { title: "Movie 2", image: "https://via.placeholder.com/200x300?text=Movie+2" },
    { title: "Movie 3", image: "https://via.placeholder.com/200x300?text=Movie+3" }
];

const grid = document.getElementById("movieGrid");
movies.forEach(movie => {
    const div = document.createElement("div");
    div.classList.add("movie-item");
    div.innerHTML = `<img src="${movie.image}" alt="${movie.title}"><h3>${movie.title}</h3>`;
    grid.appendChild(div);
});

