function getQuestions() {
    const questionsQuantity = document.getElementById('questions-number').value
    const questionsCategory = document.getElementById('questions-category').value
    const questionsDifficulty = document.getElementById('questions-difficulty').value
    const questionsType = document.getElementById('questions-type').value
    fetch(`https://opentdb.com/api.php?amount=${questionsQuantity}&category=${questionsCategory}&difficulty=${questionsDifficulty}&type=${questionsType}`)
        .then(response => response.json())
        .then(data => printCards(data.results))
}

// poner las preguntas en mi página web
function printCards(questions) {
    const container = document.getElementById('container-cards');
    container.innerHTML = '';
    questions.forEach((question, index) => {
        const card = returnCardHTML(question, index);
        container.innerHTML += card;
    });
}

function returnCardHTML(q, indexCard) {
    const card = `<div class="card">
                    <div class="card-body">
                    <h5 class="card-title">${q.category}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${q.question}</h6>
                        ${returnAnswersHTML(q.correct_answer, q.incorrect_answers, indexCard)}           
                    </div>
                </div>`
    return card;
}


function returnAnswersHTML(correct, incorrects, indexCard) {
    //const correctHTML = `<div class="form-check">
    //                        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
    //                        <label class="form-check-label" for="exampleRadios1">
    //                        ${correct}
    //                        </label>
    //                    </div>`;

    //  incorrects.push(correct)
    //  correct = 1
    //  incorrects = [2 ,3, 4, 1]

    incorrects.push(correct)
    //  incorrects = [2, 3, 4, 1]

    let incorrectHTML = '';
    incorrects.forEach((incorrect, index) => {
        incorrectHTML += `<div class="form-check">
                            <input class="form-check-input" type="radio" name="exampleRadios" id="answer-${indexCard}-${index}" value="option1" checked>
                            <label class="form-check-label" for="answer-${indexCard}-${index}">
                            ${incorrect}
                            </label>
                        </div>`;
    })


    return incorrectHTML;
}
