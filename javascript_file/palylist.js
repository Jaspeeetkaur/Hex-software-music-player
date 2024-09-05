document.addEventListener('DOMContentLoaded', function() {
    const createPlaylistBtn = document.getElementById('create-playlist-btn');
    const playlistNameInput = document.getElementById('playlist-name');
    const playlistContainer = document.getElementById('playlist-container');

    // Function to create a new playlist
    createPlaylistBtn.addEventListener('click', function() {
        const playlistName = playlistNameInput.value.trim();
        
        if (playlistName === '') {
            alert('Please enter a playlist name.');
            return;
        }

        // Create playlist element
        const playlistDiv = document.createElement('div');
        playlistDiv.classList.add('playlist');

        const playlistTitle = document.createElement('h3');
        playlistTitle.textContent = playlistName;

        const songList = document.createElement('ul');

        // Add song input and add button
        const addSongDiv = document.createElement('div');
        const songInput = document.createElement('input');
        songInput.type = 'text';
        songInput.placeholder = 'Enter song name';
        const addSongBtn = document.createElement('button');
        addSongBtn.textContent = 'Add Song';

        addSongBtn.addEventListener('click', function() {
            const songName = songInput.value.trim();
            if (songName === '') {
                alert('Please enter a song name.');
                return;
            }

            const songItem = document.createElement('li');
            songItem.textContent = songName;

            // Add remove button to each song
            const removeSongBtn = document.createElement('button');
            removeSongBtn.textContent = 'Remove';
            removeSongBtn.addEventListener('click', function() {
                songItem.remove();
            });

            songItem.appendChild(removeSongBtn);
            songList.appendChild(songItem);
            songInput.value = '';
        });

        addSongDiv.appendChild(songInput);
        addSongDiv.appendChild(addSongBtn);

        playlistDiv.appendChild(playlistTitle);
        playlistDiv.appendChild(songList);
        playlistDiv.appendChild(addSongDiv);

        playlistContainer.appendChild(playlistDiv);
        playlistNameInput.value = '';
    });
});
