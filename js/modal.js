const modal = document.querySelector(".modal");
const closeModalBtn = document.querySelector(".modal_close");

function showModal() {
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
    modal.style.zIndex = "100";  // Устанавливаем z-index через JavaScript
}

function hideModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
}

closeModalBtn.addEventListener("click", hideModal);

setTimeout(showModal, 10000);

function handleScrollToEnd() {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        showModal();
        window.removeEventListener("scroll", handleScrollToEnd);
    }
}

window.addEventListener("scroll", handleScrollToEnd);

modal.addEventListener("click", (e) => {
    if (e.target === modal) {
        hideModal();
    }
});

modal.style.display = "flex";
