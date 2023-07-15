let isloading = true;
let isLimit = true;
const seeMore = document.getElementById("see-more");


const loadData = async () => {
    const url = "https://openapi.programming-hero.com/api/ai/tools"
    try {
        const res = await fetch(url);
        const data = await res.json();
        cardData(data.data.tools)
    } catch (error) {
        console.log(error);
    }
}
loadData()

const cardData = (data) => {
    const cards = document.getElementById("cards");
    if (isLimit) {
        data = data.slice(0, 10);
    }
    if (isloading) {
        console.log("isloading")
         cards.innerHTML = `
                        <div class="d-flex justify-content-center">
                            <div class="spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    `
    }
    let cardItems = "";
    // console.log(data)
    data.forEach(element => {
        const feature = element.features.map(fearture => `<li>${fearture}</li>`);
        cardItems += `
                    <div id="card" class="col">
                        <div class="card h-100">
                            <img src="${element.image}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h3 class="card-title fw-bold">Features</h3>
                                <ol id="fearture-list">
                                    ${feature.join('')}
                                </ol>
                            </div>
                            <div class="card-footer d-flex align-items-center justify-content-between">
                                <div>
                                    <h4 class="fw-bold">${element.name}</h4>
                                    <small class="text-body-secondary">${element.published_in}</small>
                                </div>
                                <div>
                                    <a class="" onclick="loadAiDetails('${element.id}')" data-bs-toggle="modal" data-bs-target="#detailsModal"><i class="fa-solid fa-arrow-right pe-auto"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
        `
        cards.innerHTML = cardItems;
    });
    isloading = false;
}

// See more
seeMore.addEventListener('click', () => {
    isLimit = false;
    loadData();
    seeMore.style.display = 'none'
});

// Details data load
const loadDeatails = async (id) => {
    console.log(id);
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    try {
        const res = await fetch(url);
        const data = await res.json();
        return setData(data.data);
    } catch (error) {
        console.log(error);
    }
}

// Load Details
const loadAiDetails = (id) => {
    loadDeatails(id)
}
const setData = (data) => {
    const feature_numberOne = "1";
    const feature_numberTwo = "2";
    const feature_numberThree = "3";
    const feature_nameOne = data.features[feature_numberOne]["feature_name"];
    const feature_nameTwo = data.features[feature_numberTwo]["feature_name"];
    const feature_nameThree = data.features[feature_numberThree]["feature_name"];
    console.log(data.logo)

    document.getElementById("details-card").innerHTML = `
                                <div class="bg-body-tertiary p-2 w-50">
                                    <p class="fw-bold fs-5">${data.description}</p>
                                    <div>
                                        <div class="d-flex">
                                            <p class="m-3 fw-bold text-danger bg-white">${data.pricing[0].price ?data.pricing[0].price : "No data found"}</p>
                                            <p class="m-3 fw-bold text-danger bg-white">${data.pricing[1].price ?data.pricing[1].price : "No data found"}</p>
                                            <p class="m-3 fw-bold text-danger bg-white">${data.pricing[2].price ?data.pricing[2].price : "No data found"}</p>
                                        </div>
                                    </div>
                                    <div class="d-flex">
                                        <div>
                                            <h2>Features</h2>
                                            <ul>
                                                <li>${feature_nameOne ? feature_nameOne : "No Data Found"}</li>
                                                <li>${feature_nameTwo ? feature_nameTwo : ""}</li>
                                                <li>${feature_nameThree ? feature_nameThree : ""}</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h2>Integrations</h2>
                                            <ul>
                                                <li>${data.integrations[0] ? data.integrations[0] :"No Data Found"}</li>
                                                <li>${data.integrations[1] ? data.integrations[1] :""}</li>
                                                <li>${data.integrations[2] ? data.integrations[2] :""}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="w-50">
                                    <div class="card h-100">
                                        <img src="${data.image_link[0]}" class="card-img-top" alt="...">
                                        <div class="card-body">
                                            <h3 class="card-title fw-bold">
                                            ${data.input_output_examples[0].input ? data.input_output_examples[0].input : "No data found"}
                                            </h3>
                                            <p>
                                            ${data.input_output_examples[0].output ? data.input_output_examples[0].output : "No data found"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
    `
}