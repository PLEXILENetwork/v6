window.onload = function() {
    const notification = document.getElementById('notification');
    const closeBtn = document.getElementById('close-notification');
    const sound = document.getElementById('notification-sound');

    setTimeout(() => {
        notification.style.right = '20px';
        sound.play();
    }, 1000);

    closeBtn.addEventListener('click', () => {
        notification.style.right = '-320px';
    });

  document.getElementById('searchInput').addEventListener('keyup', function() {
        let filter = this.value.toLowerCase();
        let boxes = document.getElementById('boxContainer').getElementsByClassName('box');

        for (let i = 0; i < boxes.length; i++) {
            let boxText = boxes[i].getElementsByClassName('box-text')[0].textContent.toLowerCase();

            if (boxText.includes(filter)) {
                boxes[i].style.display = "";
            } else {
                boxes[i].style.display = "none";
            }
        }
    });
};
