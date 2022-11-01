'use strict';

document.addEventListener('DOMContentLoaded', () => {
    
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против...",
        ],
    };
    movieDB.movies.forEach((el, i, array) => array[i] = el.toUpperCase());
    const adv = document.querySelectorAll('.promo__adv img'),
        poster = document.querySelector('.promo__bg'),
        genre = poster.querySelector('.promo__genre'),
        movieList = document.querySelector('.promo__interactive-list'),
        addForm = document.querySelector('form.add'),
        addInput = addForm.querySelector('.adding__input'),
        checkbox = addForm.querySelector('[type="checkbox"]');

    // addForm.addEventListener('submit', (event) => {
    //     event.preventDefault();

    //     let newFilm = addInput.value.trim();
    //     const favorite = checkbox.checked;

    //     if (newFilm) {
    //         if (newFilm.length > 21) {
    //             newFilm = `${newFilm.substring(0, 22)}...`;
    //         }

    //         if (favorite) {
    //             console.log('Добавляем любимый фильм');
    //         }

    //         movieDB.movies.push(newFilm);
    //         sortArr(movieDB.movies);
    
    //         createMovieList(movieDB.movies, movieList);
    //     }

    //     event.target.reset();
    // });

    // const deleteAdv = (array) => {
    //     array.forEach(adv => adv.remove());
    // };

    // const makeChanges = () => {
    //     genre.textContent = 'драма';
    
    //     poster.style.backgroundImage = 'url("img/bg.jpg")';
    // };

    // const sortArr = (arr) => {
    //     arr.sort();
    // };

    // function createMovieList(films, parent) {
    //     parent.innerHTML = '';
    //     sortArr(films);
        
    //     films.forEach((film, i) => {
    //         parent.innerHTML += `
    //             <li class="promo__interactive-item">${i + 1} ${film}
    //                 <div class="delete"></div>
    //             </li>
    //         `;
    //     });

    //     document.querySelectorAll('.delete').forEach((btn, i) => {
    //         btn.addEventListener('click', () => {
    //             btn.parentElement.remove();
    //             films.splice(i, 1);

    //             createMovieList(films, parent);
    //         });
    //     });
    // }

    // deleteAdv(adv);
    // makeChanges();
    // createMovieList(movieDB.movies, movieList);
    
    
    const sortArr = arr => {
        arr.sort();
    };

    const lastIndex = (array, item) => {
        const index = [...array,].reverse().indexOf(item) + 1;
        return array.length - index;
    };

    const updateMovieList = (index, movies) => {
        const interactiveList = document.querySelectorAll('.promo__interactive-item');
        for (let i = index; i < interactiveList.length; i++) {
            interactiveList[i].firstChild.nodeValue = `${i + 1}. ${movies[i]}`;
        }
    };

    const deleteMovie = (event, movies) => {
        const index = movies.indexOf(event.target.parentElement.textContent.slice(3).trim());
        
        movies.splice(index, 1);
        event.target.parentElement.remove();
        updateMovieList(index, movies);
    };

    addForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const favorite = checkbox.checked;
        let newFilm = addInput.value.trim();

        if (newFilm) {
            if (favorite) {
                console.log('Добавляем любимый фильм');
            }

            newFilm = (newFilm.length > 21 ? newFilm.slice(0, 21) + '...' : newFilm).toUpperCase();
            movieDB.movies.push(newFilm);
            sortArr(movieDB.movies);
            
            const index = lastIndex(movieDB.movies, newFilm),
                  div = Object.assign(document.createElement('div'), {classList: 'delete',}),
                  li = Object.assign(document.createElement('li'), {classList: 'promo__interactive-item', textContent: 'movie',});
            
            div.addEventListener('click', event => deleteMovie(event, movieDB.movies));
            movieList.appendChild(li).append(div);
            updateMovieList(index, movieDB.movies);
        }

        event.target.reset();
    });

    const createMovieList = (movies, parent) => {
        parent.innerHTML = '';
        sortArr(movies);
        movies.forEach((movie, i) => {
            movieList.innerHTML += ` 
                <li class="promo__interactive-item">${i + 1}. ${movie}
                    <div class="delete"></div>
                </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((button) => {
            button.addEventListener('click', event => deleteMovie(event, movies));
        });
    };

    createMovieList(movieDB.movies, movieList);
});