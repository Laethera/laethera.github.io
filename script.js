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

document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM loaded');
    const profilePictureElement = document.getElementById('profile-picture');
    const avatarURL = await getPfpUrl();
    if (avatarURL) {
        profilePictureElement.src = avatarURL;
    }
});
