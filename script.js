// script.js

// Add interactivity to project buttons
document.querySelectorAll('.details-btn').forEach(button => {
  button.addEventListener('click', () => {
    alert('More details coming soon!');
  });
});

// Simple form validation feedback
document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thank you for your message!');
});

