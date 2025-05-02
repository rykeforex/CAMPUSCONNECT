const groupName = 'Default Group'; // Static group name
const groupNameElement = document.getElementById('groupName');
if (groupNameElement) {
    groupNameElement.textContent = groupName;
} else {
    console.error('groupName element not found');
}

// Load current user from localStorage or use default
const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {
    name: 'You'
};

// Simulated users for messages
const randomUsers = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'];

// Load joined users from localStorage or initialize with current user
let joinedUsers = JSON.parse(localStorage.getItem(`joinedUsers_${groupName}`)) || [currentUser.name];

// Add current user to joined users if not already present
if (!joinedUsers.includes(currentUser.name)) {
    joinedUsers.push(currentUser.name);
    localStorage.setItem(`joinedUsers_${groupName}`, JSON.stringify(joinedUsers));
}

let messages = JSON.parse(localStorage.getItem(`messages_${groupName}`)) || [];

// Initialize predefined messages for the default group
if (messages.length === 0) {
    messages = [
        { text: 'Welcome to the group!', isUser: false },
        { text: 'Feel free to ask questions.', isUser: false }
    ];
    // Add initial users to joined list
    if (!joinedUsers.includes('Alice')) joinedUsers.push('Alice');
    if (!joinedUsers.includes('Bob')) joinedUsers.push('Bob');
    localStorage.setItem(`joinedUsers_${groupName}`, JSON.stringify(joinedUsers));
}

function saveMessages() {
    localStorage.setItem(`messages_${groupName}`, JSON.stringify(messages));
}

function renderMessages() {
    const chatDisplay = document.getElementById('chatDisplay');
    if (chatDisplay) {
        chatDisplay.innerHTML = '';
        messages.forEach(msg => {
            const p = document.createElement('p');
            p.textContent = msg.text;
            p.className = msg.isUser ? 'user-message' : 'other-message';
            chatDisplay.appendChild(p);
        });
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
    } else {
        console.error('chatDisplay element not found');
    }
}

function renderJoinedUsers() {
    const joinedUsersDiv = document.getElementById('joinedUsers');
    if (joinedUsersDiv) {
        joinedUsersDiv.innerHTML = '';
        joinedUsers.forEach(user => {
            const div = document.createElement('div');
            div.className = 'user-item';
            div.innerHTML = `
                <div class="user-avatar">${user[0].toUpperCase()}</div>
                <div class="user-name">${user}</div>
            `;
            joinedUsersDiv.appendChild(div);
        });
    } else {
        console.error('joinedUsers element not found');
    }
}

const chatForm = document.getElementById('chatForm');
if (chatForm) {
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('chatInput');
        const message = input.value.trim();
        if (message) {
            // Add user message
            messages.push({ text: message, isUser: true });
            saveMessages();
            renderMessages();

            // Add simulated message
            const randomUser = randomUsers[Math.floor(Math.random() * randomUsers.length)];
            const randomMessage = 'New message from another user';
            messages.push({ text: randomMessage, isUser: false });
            // Add random user to joined users if not already present
            if (!joinedUsers.includes(randomUser)) {
                joinedUsers.push(randomUser);
                localStorage.setItem(`joinedUsers_${groupName}`, JSON.stringify(joinedUsers));
                renderJoinedUsers();
            }
            saveMessages();
            renderMessages();

            input.value = '';
        }
    });
} else {
    console.error('chatForm element not found');
}

// Dark mode toggle
function initializeDarkMode() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    if (!themeToggle) {
        console.error('themeToggle button not found');
        return;
    }

    console.log('Initializing dark mode');

    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        html.classList.add('dark');
        html.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        console.log('Applied dark theme from localStorage');
    } else {
        html.classList.remove('dark');
        html.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        console.log('Applied light theme from localStorage');
    }

    themeToggle.addEventListener('click', () => {
        console.log('Theme toggle clicked');
        const isDark = html.classList.toggle('dark');
        html.setAttribute('data-theme', isDark ? 'dark' : 'light');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        console.log(`Switched to ${isDark ? 'dark' : 'light'} theme`);
    });
}

// Run dark mode initialization after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');
    initializeDarkMode();
});

renderMessages();
renderJoinedUsers();