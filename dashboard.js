window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    } else {
        console.error('navbar element not found');
    }
});

function createGroup() {
    console.log('createGroup called');
    const groupNameInput = document.getElementById('groupName');
    const groupCourseSelect = document.getElementById('groupCourse');
    const groupList = document.getElementById('groupList');

    if (!groupNameInput || !groupCourseSelect || !groupList) {
        console.error('Form elements not found:', {
            groupNameInput: !!groupNameInput,
            groupCourseSelect: !!groupCourseSelect,
            groupList: !!groupList
        });
        return;
    }

    const groupName = groupNameInput.value.trim();
    const courseValue = groupCourseSelect.value;

    if (!groupName || !courseValue) {
        console.warn('Group name or course not provided');
        alert('Please enter a group name and select a course!');
        return;
    }

    const courseText = groupCourseSelect.options[groupCourseSelect.selectedIndex].text;
    console.log('Creating group:', { groupName, courseText });

    const newGroup = document.createElement('div');
    newGroup.className = 'group-item flex items-center p-4 bg-white rounded-lg shadow mb-4';
    newGroup.innerHTML = `
        <div class="avatar w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">${groupName[0].toUpperCase()}</div>
        <div class="flex-1">
            <p class="font-semibold text-gray-800">${groupName}</p>
            <p class="text-gray-600">1 member online • ${courseText}</p>
        </div>
        <a href="group-chat.html?group=${encodeURIComponent(groupName)}" class="btn bg-blue-500 text-white px-4 py-2 rounded">Join Chat</a>
    `;

    groupList.appendChild(newGroup);
    console.log('Group appended to groupList');

    groupNameInput.value = '';
    groupCourseSelect.value = '';
    console.log('Redirecting to group chat:', groupName);
    window.location.href = `group-chat.html?group=${encodeURIComponent(groupName)}`;
}