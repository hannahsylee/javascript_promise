let baseURL = "https://pokeapi.co/api/v2";

// // 1.
// $.getJSON(`${baseURL}/pokemon?limit=1000`).then(data => {
//     console.log(data);
// });

// // 2.
// $.getJSON(`${baseURL}/pokemon/?limit=1000`)
//     .then(data => {
//         let random = [];
//         for (let i = 0; i < 3; i++) {
//             let randomIdx = Math.floor(Math.random() * data.results.length);
//             let url = data.results.splice(randomIdx, 1)[0].url;
//             random.push(url);
//         }
//         // return a bunch of URLs
//         return Promise.all(random.map(url => $.getJSON(url)));
//     })
//     .then(pokemon => {
//         pokemon.forEach(p => console.log(p));
//     });

// 3.
let names = null;
$.getJSON(`${baseURL}/pokemon/?limit=1000`)
    .then(data => {
        console.log(data);
        let random = [];
        for (let i = 0; i < 3; i++) {
            let randomIdx = Math.floor(Math.random() * data.results.length);
            let url = data.results.splice(randomIdx, 1)[0].url;
            random.push(url);
        }
        // return a bunch of URLs
        return Promise.all(random.map(url => $.getJSON(url)));
    })
    .then(data => {
        console.log(data);
        names = data.map(d => d.name);
        return Promise.all(data.map(d => $.getJSON(d.species.url)));
    })
    .then(data => {
        let descriptions = data.map(d => {
            let descriptionObj = d.flavor_text_entries.find(
                e => e.language.name == 'en'
            );
            return descriptionObj ? descriptionObj.flavor_text : "No description available."; 
        });
        descriptions.forEach((desc, i) => {
            console.log(`${names[i]}: ${desc}`);
        });
    });

// 4.
let $btn = $('button');
let $cardArea = $('#card-area');

$btn.click('on', function(){
    $cardArea.empty();
    let namesAndImages = [];
    $.getJSON(`${baseURL}/pokemon/?limit=1000`)
    .then(data => {
        console.log(data);
        let random = [];
        for (let i = 0; i < 3; i++) {
            let randomIdx = Math.floor(Math.random() * data.results.length);
            let url = data.results.splice(randomIdx, 1)[0].url;
            random.push(url);
        }
        // return a bunch of URLs
        return Promise.all(random.map(url => $.getJSON(url)));
    })
    .then(data => {
        namesAndImages = data.map(d => (
            {name: d.name,
            imgSrc: d.sprites.front_default}
        ));
        return Promise.all(data.map(d => $.getJSON(d.species.url)));
    })
    .then(data => {
        data.forEach((d,i) => {
            let descriptionObj = d.flavor_text_entries.find(function(e) {
                return e.language.name == 'en';
            });
            let description = descriptionObj ? descriptionObj.flavor_text : "No description available.";
            let { name, imgSrc } = namesAndImages[i];
            $cardArea.append(makePokemonHTML(name, imgSrc, description));
        });
    });
})




function makePokemonHTML(name, imgSrc, description){
    return `
      <div class="card">
        <h1>${name}</h1>
        <img src=${imgSrc} />
        <p>${description}</p>
      </div>
    `;
}





