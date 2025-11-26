const link = `/api`;



const loadButton = document.body.querySelector(".load");
loadButton.addEventListener("click", fetchData);

const clearButton = document.body.querySelector(".clear");
clearButton.addEventListener("click", clear);

const loginForm = document.getElementById('login-form');


function handleLogin(cb = () => {}) {
    loginForm.style.display = "block";
    const reset = () => {
        loginForm.style.display = "none";
    }
    const handler = async (event) => {
        event.stopPropagation();
        event.preventDefault();

        const data = new FormData(event.target);

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    login: data.get("login"),
                    password: data.get("password"),
                })
            })

            if (!response.ok) {
                throw Error('Error occured');
            }
            const { token } = await response.json();
            window.sessionStorage.setItem("token", token);

            loginForm.removeEventListener('submit', handler);
            loginForm.removeEventListener('submit', reset);
            loginForm.style.display = "none";
            cb()
        } catch (error) {
            alert(error.message);
        }


    }
    loginForm.addEventListener('submit', handler)
    loginForm.addEventListener('reset', reset)
}

function clear() {
    const parent = document.body.querySelector(".cat-list");
    parent.innerHTML = "";
}

async function fetchData() {
    const parent = document.body.querySelector(".cat-list");
    const loader = createLoader();
    parent.appendChild(loader);
    const headers = {};
    const token = sessionStorage.getItem("token");

    if (token) {
        headers['Authorization'] = 'Bearer ' + token;
    }

    try {
        const response = await fetch(link, {
            headers: new Headers(headers)
        })

        if(response.ok) {
            const data = await response.json();
            data.forEach((breed) => {
                const {name, description, image: {url} = {url: "/img.png"}} = breed;
                const li = createItem(name, description, url);

                parent.appendChild(li);
            });
        } else if (response.status === 401) {
            handleLogin(fetchData);
        } else {
            throw new Error(response.statusText);
        }
    } catch(error) {
        const parent = document.body.querySelector(".cat-list");
        parent.innerHTML = "<li>Error! Please try later</li>";
    } finally {
        loader.remove();
    }
}

function createLoader() {
    const loader = document.createElement("li");
    loader.innerText = "Loading...";
    loader.classList.add("loader")
    return loader;
}

function createItem(name, description, url) {
    const li = document.createElement("li");
    li.classList.add("cat-item");

    const img = document.createElement("img");
    img.classList.add("cat-item-photo");
    img.src = url;
    img.alt = name;
    li.appendChild(img);

    const h2 = document.createElement("h2");
    h2.classList.add("cat-item-title");
    h2.innerText = name;
    li.appendChild(h2);

    const p = document.createElement("p");
    p.classList.add("cat-item-description");
    p.innerText = description;
    li.appendChild(p);
    return li;
}


function render(name, description, url) {
    return `
    <li class="cat-item">
        <img class="cat-item-photo" src="${url}" alt="${name}">
        <h2 class="cat-item-title">${name}</h2>
        <p class="cat-item-description">${description}</p>
    </li>
    `;
}


