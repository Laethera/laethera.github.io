async function getPfpUrl() {
    const discordUserId = '961221619420893264'; // Replace with your Discord User ID
    const response = await fetch(`https://api.lanyard.rest/v1/users/${discordUserId}`);
    const data = await response.json();
    if (data && data.data && data.data.discord_user.avatar) {
        const avatarHash = data.data.discord_user.avatar;
        const avatarURL = `https://cdn.discordapp.com/avatars/${discordUserId}/${avatarHash}.png?size=128`;
        return avatarURL;
    }
    return null;
}

async function toggleThemeSwitcherVisibility() {
    const themeSwitcher = document.getElementById('theme-dropdown');
    if (themeSwitcher.style.display === 'none' || themeSwitcher.style.display === '') {
        themeSwitcher.style.display = 'block';
    } else {
        themeSwitcher.style.display = 'none';
    }
}

async function applyThemeFromDropdown(){
    const theme = document.getElementById('theme-dropdown').dataset.theme;
    setTheme(theme);
}

function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    console.log('Theme set to ' + theme);
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM loaded');
    const profilePictureElement = document.getElementById('profile-picture');
    const avatarURL = await getPfpUrl();
    if (avatarURL) {
        profilePictureElement.src = avatarURL;
    }
    if(localStorage.getItem('theme')) {
        setTheme(localStorage.getItem('theme'));
    } else {
        setTheme('green');
    }
    const themeDropdown = document.getElementById('theme-dropdown');
    Array.from(themeDropdown.children).forEach(child => {
        child.addEventListener('click', (event) => {
            const selectedTheme = event.currentTarget.dataset.theme;
            if (selectedTheme) {
                setTheme(selectedTheme);
                toggleThemeSwitcherVisibility();
            }
        });
    });
});

document.getElementById('theme-button').addEventListener('click', toggleThemeSwitcherVisibility);