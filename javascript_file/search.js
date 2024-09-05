document.addEventListener('DOMContentLoaded', function() {
    const searchBar = document.querySelector('.search-bar input');
    const languageCards = document.querySelectorAll('.language-cards .card');

    searchBar.addEventListener('input', function() {
        const query = searchBar.value.toLowerCase();

        languageCards.forEach(card => {
            const language = card.textContent.toLowerCase();
            if (language.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });

    languageCards.forEach(card => {
        card.addEventListener('click', function() {
            alert(`You selected ${card.textContent}`);
            // You can add more actions here like redirecting to a different page.
        });
    });
});
