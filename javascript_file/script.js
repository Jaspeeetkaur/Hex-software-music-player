document.querySelector('.create-playlist').addEventListener('click', function() {
    alert('Playlist created!');
});



function showAlbum(albumId) {
    // Hide all album views
    document.querySelectorAll('.album-view').forEach(function(album) {
        album.style.display = 'none';
    });

    // Show the selected album view
    document.getElementById(albumId).style.display = 'block';
}
