// Зберігання даних у localStorage
const browserData = {
    name: navigator.appName,
    version: navigator.appVersion,
    platform: navigator.platform,
    userAgent: navigator.userAgent,
    language: navigator.language
};
localStorage.setItem("browserData", JSON.stringify(browserData));

// Вивід у футері
const footer = document.getElementById("footer-info");
footer.innerHTML = Object.entries(browserData)
    .map(([key, value]) => `<div><strong>${key}</strong>: ${value}</div>`)
    .join('');

// Отримання коментарів
fetch('https://jsonplaceholder.typicode.com/posts/8/comments')
  .then(response => response.json())
  .then(comments => {
    const commentsContainer = document.getElementById('comments-container');
    comments.forEach(comment => {
      const commentElement = document.createElement('div');
      commentElement.classList.add('comment');
      commentElement.innerHTML = `<strong>${comment.name}</strong><p>${comment.body}</p>`;
      commentsContainer.appendChild(commentElement);
    });
  });

// Модальне вікно через 60 секунд
setTimeout(() => {
    document.getElementById("feedback-modal").style.display = "block";
}, 60000);

// Тема сайту
const applyTheme = (theme) => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
};

const toggleTheme = () => {
    const currentTheme = document.body.classList.contains("dark") ? "dark" : "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(newTheme);
};

document.getElementById("theme-toggle").addEventListener("click", toggleTheme);

// Встановлення теми за часом або з localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    applyTheme(savedTheme);
} else {
    const hour = new Date().getHours();
    applyTheme(hour >= 7 && hour <= 21 ? "light" : "dark");
}
