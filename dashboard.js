const urlParams = new URLSearchParams(window.location.search);
const groupName = urlParams.get('group');
if (!groupName) {
   // alert('No group specified');
   // window.location.href = 'dashboard.html';
}
document.getElementById('groupName').textContent = groupName;

let messages = JSON.parse(localStorage.getItem(`messages_${groupName}`)) || [];

// Initialize predefined messages for known groups
if (messages.length === 0 && ['Writing Workshop', 'Calculus Crew'].includes(groupName)) {
    messages = [
        { text: 'Welcome to the group!', isUser: false },
        { text: 'Feel free to ask questions.', isUser: false }
    ];
}

function saveMessages() {
    localStorage.setItem(`messages_${groupName}`, JSON.stringify(messages));
}

function renderMessages() {
    const chatDisplay = document.getElementById('chatDisplay');
    chatDisplay.innerHTML = '';
    messages.forEach(msg => {
        const p = document.createElement('p');
        p.textContent = msg.text;
        p.className = msg.isUser ? 'user-message' : 'other-message';
        chatDisplay.appendChild(p);
    });
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

document.getElementById('chatForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (message) {
        messages.push({ text: message, isUser: true });
        saveMessages();
        renderMessages();
        input.value = '';
    }
});

// Simulate receiving messages
setInterval(() => {
    const randomMessage = 'New message from another user';
    messages.push({ text: randomMessage, isUser: false });
    saveMessages();
    renderMessages();
}, 5000);

renderMessages();