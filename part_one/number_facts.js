// Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. 
// (Make sure you get back JSON by including the json query key, specific to this API.
let baseURL = "http://numbersapi.com";

// 1.
let favNum = 7;
$.getJSON(`${baseURL}/${favNum}?json`).then(data => {
    console.log(data);
});

// 2.
let numbers = [1,2,3,4];
$.getJSON(`${baseURL}/${numbers}?json`).then(data => {
    console.log(data);
});

// 3.

let numberFacts = [];

for (let i = 1; i < 5; i++) {
    numberFacts.push(
        axios.get(`${baseURL}/${favNum}?json`)
    );
}

Promise.all(numberFacts)
    .then(facts => (
        facts.forEach(data => $("body").append(`<p>${data.data.text}</p>`))
    ))
    .catch(err => console.log(err));


