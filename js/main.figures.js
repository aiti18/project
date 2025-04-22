// Первая задаче 4 - го задании

const xhr = new XMLHttpRequest();
xhr.open('GET', '../characters.json');
xhr.setRequestHeader('Content-type', 'application/json');
xhr.send();

xhr.onload = () => {
    if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        const container = document.getElementById('cardsContainer');
        const bioScreen = document.getElementById('bioScreen');
        const bioName = document.getElementById('bioName');
        const bioAge = document.getElementById('bioAge');
        const bioDescription = document.getElementById('bioDescription');
        const bioBackground = document.getElementById('bioBackground');
        const bioImageWrapper = document.getElementById('bioImageWrapper');
        const bioHistory = document.getElementById('bioHistory');
        const bioNation = document.getElementById('bioNation');
        const bioStyle = document.getElementById('bioStyle');
        const bioWeapon = document.getElementById('bioWeapon');
        const bioInfo = document.getElementById('bioInfo');

        const prevBioBtn = document.getElementById('prevBioBtn');
        const nextBioBtn = document.getElementById('nextBioBtn');
        const closeBioBtn = document.getElementById('closeBioBtn');

        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');

        let bioIndex = 0;

        data.forEach((person, index) => {
            const card = document.createElement('div');
            card.className = 'card';

            card.innerHTML = `
                <img src="${person.photo}" alt="${person.name}">
                <p>${person.name}</p>
            `;

            card.onclick = () => {
                bioIndex = index;
                showBio(data[bioIndex]);

                bioScreen.style.display = 'block';
                prevBioBtn.style.display = 'block';
                nextBioBtn.style.display = 'block';
                prevBtn.style.display = 'block';
                nextBtn.style.display = 'block';
            };

            container.appendChild(card);
        });

        function showBio(person) {
            person.nation = undefined;
            bioImageWrapper.innerHTML = '';

            if (person.video) {
                const video = document.createElement('video');
                video.src = person.video;
                video.autoplay = true;
                video.loop = true;
                video.muted = true;
                video.playsInline = true;
                video.setAttribute('playsinline', 'true');
                video.setAttribute('preload', 'auto');
                video.controls = false;

                video.style.width = '400px';
                video.style.height = '400px';
                video.style.borderRadius = '50%';
                video.style.objectFit = 'cover';
                video.style.pointerEvents = 'none';

                bioImageWrapper.appendChild(video);
            } else {
                const img = document.createElement('img');
                img.src = person.bigPhoto || person.photo;
                img.alt = person.name;
                img.style.width = '400px';
                img.style.height = '400px';
                img.style.borderRadius = '50%';
                img.style.objectFit = 'cover';
                bioImageWrapper.appendChild(img);
            }

            bioName.textContent = person.name;
            bioAge.textContent = `${person.age} лет`;
            bioBiography.textContent = person.biography || 'Описание отсутствует';
            bioHistory.textContent = person.history || 'История отсутствует';
            bioNation.textContent = person.nation || 'Нация не раскрыта';
            bioStyle.textContent = person.style || 'Стиль не указан';
            bioWeapon.textContent = person.weapon || 'Оружие не указано';
            bioDescription.textContent = person.description || 'Характер не написан';
            bioInfo.textContent = person.info || 'Информация отсутствует';
        }

        prevBioBtn.onclick = () => {
            if (bioIndex > 0) {
                bioIndex--;
                showBio(data[bioIndex]);
            }
        };

        nextBioBtn.onclick = () => {
            if (bioIndex < data.length - 1) {
                bioIndex++;
                showBio(data[bioIndex]);
            }
        };

        function closeBioScreen() {
            bioScreen.style.display = 'none';
            prevBioBtn.style.display = 'none';
            nextBioBtn.style.display = 'none';
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        }

        closeBioBtn.onclick = closeBioScreen;
        bioBackground.onclick = closeBioScreen;

        document.addEventListener('click', (e) => {
            const insideBio = bioScreen.querySelector('.bio-container');
            const isInside = insideBio.contains(e.target);
            const isButton = e.target.closest('.bio-nav-btn, .card');
            if (!isInside && !isButton && bioScreen.style.display === 'block') {
                closeBioScreen();
            }
        });

        let currentIndex = 0;

        function updateSlide() {
            const offset = currentIndex * 320;
            container.style.transform = `translateX(-${offset}px)`;
        }

        prevBtn.onclick = () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlide();
            }
        };

        nextBtn.onclick = () => {
            if (currentIndex < data.length - 1) {
                currentIndex++;
                updateSlide();
            }
        };
    }
};


// Вторая задача 4 - го задании
// и в связи с тем что xhr я уже исползовал на первом задаче я поменял xhr на rit во втором задаче

const rit = new XMLHttpRequest();
rit.open('GET', '../data.json', true); // путь к вашему JSON-файлу
rit.setRequestHeader('Content-Type', 'application/json');
rit.send();

rit.onload = function () {
    if (rit.status === 200) {
        const data = JSON.parse(rit.responseText);
        console.log("Полученные данные из JSON:");
        console.log(data);
    } else {
        console.error("Ошибка при загрузке файла:", rit.status);
    }
};
