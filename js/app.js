const APIURL  = "https://api.github.com/users/";
const cardHtml = document.getElementById('card');
const searchBox = document.getElementById('search');

const getUser = async (username) => {
    const response = fetch(APIURL + username);
    const data = await (await response).json();
    const {name, avatar_url, bio, followers, following, public_repos} = data;
    if(name == null){
        const text = `
            <div class="card">
                <h3>User Not Found. Try Another Name.</h3>
            </div>
        `
        cardHtml.innerHTML = text;
    }
    else{
        const card = `
            <div class="card">
                <div class="avatar">
                    <img src=${avatar_url} alt="">
                </div>
                <div class="user-info">
                    <h2>${name}</h2>
                    <p>${bio == null ? "..." : bio?.slice(0,50)}</p>

                    <ul class="info">
                        <li>${followers} Followers</li>
                        <li>${following} Following</li>
                        <li>${public_repos} Repos</li>
                    </ul>

                    <div id="repos">
                    </div>
                </div>
            </div>
        `
        cardHtml.innerHTML = card;
        getRepos(username);
    }
};

getUser("sajib-hossan1");

const getRepos = async (username) => {
    const repos = document.getElementById('repos');

    const response = await fetch(APIURL+username+"/repos");
    const data = await response.json();
    data.slice(0,4).forEach(
        (repo) => {
            const element = document.createElement('a');
            element.classList.add('repo');
            element.href = repo.svn_url;
            element.target = "_blank"
            element.innerText = repo.name;
            repos.appendChild(element);
        }
    );
};

const formSubmit = () => {
    if(searchBox != ""){
        getUser(searchBox.value);
    }
    return false;
};


searchBox.addEventListener(
    "focusout",
    function(){
        formSubmit();
    }
)