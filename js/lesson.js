
const tabItems = document.querySelectorAll('.tab_content_item');
const contentBlocks = document.querySelectorAll('.tab_content_block');
let currentIndex = 0;
let intervalId;

function showTab(index) {
    tabItems.forEach((item, i) => {
        item.classList.toggle('tab_content_item_active', i === index);
        contentBlocks[i].style.display = (i === index) ? 'flex' : 'none';
    });
    currentIndex = index;
}

contentBlocks.forEach((block, index) => {
    block.style.display = index === 0 ? 'flex' : 'none';
});

function startSlider() {
    intervalId = setInterval(() => {
        let nextIndex = (currentIndex + 1) % tabItems.length;
        showTab(nextIndex);
    }, 3000);
}

tabItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        clearInterval(intervalId);
        showTab(index);
        startSlider();
    });
});

startSlider();


// Конвертер волют


const somInput = document.querySelector('#som');
const usdInput = document.querySelector('#usd');
const eurInput = document.querySelector('#eur');

const converter = (element, targetElement1, targetElement2) => {
    element.oninput = () => {
        const request = new XMLHttpRequest();
        request.open('GET', '../converter.json');
        request.setRequestHeader('Content-type', 'application/json');
        request.send();

        request.onload = () => {
            const data = JSON.parse(request.response);

            if (element === somInput) {
                usdInput.value = (element.value / data.usd).toFixed(2);
                eurInput.value = (element.value / data.eur).toFixed(2);
            }

            if (element === usdInput) {
                somInput.value = (element.value * data.usd).toFixed(2);
                eurInput.value = ((element.value * data.usd) / data.eur).toFixed(2);
            }

            if (element === eurInput) {
                somInput.value = (element.value * data.eur).toFixed(2);
                usdInput.value = ((element.value * data.eur) / data.usd).toFixed(2);
            }

            if (element.value === '') {
                targetElement1.value = '';
                targetElement2.value = '';
            }
        };
    };
};

converter(somInput, usdInput, eurInput);
converter(usdInput, somInput, eurInput);
converter(eurInput, somInput, usdInput);


// Перекрутка card_switcher


const btnNext = document.querySelector('#btn-next');
const btnPrev = document.querySelector('#btn-prev');
const cardBlock = document.querySelector('.card');

let cardId = 1;
const maxCards = 200;

function loadCard(id) {
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then((response) => response.json())
        .then(({ title, completed, id }) => {
            cardBlock.innerHTML = `
        <div class="card_content">
          <p><strong>${title}</strong></p>
          <p style="color: ${completed ? 'limegreen' : 'tomato'}">
            ${completed ? 'Выполнено' : 'Не выполнено'}
          </p>
          <span>ID: ${id}</span>
        </div>
      `;
        })
        .catch(() => {
            cardBlock.innerHTML = `<p>Ошибка загрузки карточки</p>`;
        });
}

btnNext.onclick = () => {
    cardId = cardId >= maxCards ? 1 : cardId + 1;
    loadCard(cardId);
};

btnPrev.onclick = () => {
    cardId = cardId <= 1 ? maxCards : cardId - 1;
    loadCard(cardId);
};

loadCard(cardId);


// Fetch запрос который выводит в консоль

fetch('https://jsonplaceholder.typicode.com/posts')
    .then((res) => res.json())
    .then((posts) => {
        console.log('Список постов:', posts);
    })
    .catch((err) => {
        console.error('Ошибка загрузки постов:', err);
    });
