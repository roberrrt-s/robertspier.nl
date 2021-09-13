window.onload = function() {
    var countdownElement = document.getElementById('countdown'),
        downloadButton = document.getElementById('download'),
        seconds = 10,
        second = 0,
        interval;

    downloadButton.style.display = 'none';

    interval = setInterval(function() {
        countdownElement.firstChild.data = 'De aflevering start over ' + (seconds - second) + ' seconden';
        if (second >= seconds) {
            downloadButton.style.display = 'block';
            clearInterval(interval);
            window.location.assign('app.html')
        }

        second++;
    }, 1000);
}