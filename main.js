function initMap() {
    // Create a map object and specify the DOM element for display.
    var map = L.map('map').setView([51.505, -0.09], 13); // Example: London
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Initialize the routing control
    const routingControl = L.Routing.control({
        waypoints: [],
        routeWhileDragging: true
    }).addTo(map);

    // Handle form submission for route planning
    const routePlannerForm = document.getElementById('route-planner');
    routePlannerForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission
        const start = document.getElementById('start').value;
        const end = document.getElementById('end').value;

        calculateAndDisplayRoute(routingControl, start, end);
    });

    // function to calculate and display the route
    function calculateAndDisplayRoute(routingControl, start, end) {
        // Add the waypoints to the routing control
        //check if the start and end variables are numbers
        if (!isNaN(start) && !isNaN(end)) {
            routingControl.setWaypoints([
                L.latLng(parseFloat(start), 0),
                L.latLng(parseFloat(end), 0)
            ]);
        }
        else {
            alert("Please enter a valid longitude and latitude");
        }

    }
}

// Accessibility Features and other code
document.addEventListener('DOMContentLoaded', function () {
    // Toggle accessibility panel
    const accessBtn = document.getElementById('access-btn');
    const accessPanel = document.getElementById('access-panel');

    accessBtn.addEventListener('click', function () {
        accessPanel.style.display = accessPanel.style.display === 'block' ? 'none' : 'block';
        if (document.getElementById('tactile-toggle').checked) {
            this.classList.add('vibrate');
            setTimeout(() => this.classList.remove('vibrate'), 300);
        }
    });

    // Contrast modes
    document.getElementById('normal-contrast').addEventListener('click', function () {
        document.body.className = '';
        if (document.getElementById('tactile-toggle').checked) {
            this.classList.add('vibrate');
            setTimeout(() => this.classList.remove('vibrate'), 300);
        }
    });

    document.getElementById('high-contrast').addEventListener('click', function () {
        document.body.className = 'high-contrast';
        if (document.getElementById('tactile-toggle').checked) {
            this.classList.add('vibrate');
            setTimeout(() => this.classList.remove('vibrate'), 300);
        }
    });

    document.getElementById('yellow-black').addEventListener('click', function () {
        document.body.className = 'yellow-black';
        if (document.getElementById('tactile-toggle').checked) {
            this.classList.add('vibrate');
            setTimeout(() => this.classList.remove('vibrate'), 300);
        }
    });

    // Text size adjustment
    document.getElementById('text-smaller').addEventListener('click', function () {
        document.body.style.fontSize = '14px';
        if (document.getElementById('tactile-toggle').checked) {
            this.classList.add('vibrate');
            setTimeout(() => this.classList.remove('vibrate'), 300);
        }
    });

    document.getElementById('text-normal').addEventListener('click', function () {
        document.body.style.fontSize = '16px';
        if (document.getElementById('tactile-toggle').checked) {
            this.classList.add('vibrate');
            setTimeout(() => this.classList.remove('vibrate'), 300);
        }
    });

    document.getElementById('text-larger').addEventListener('click', function () {
        document.body.style.fontSize = '18px';
        if (document.getElementById('tactile-toggle').checked) {
            this.classList.add('vibrate');
            setTimeout(() => this.classList.remove('vibrate'), 300);
        }
    });

    // Tactile feedback for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, input, [role=button]');
    interactiveElements.forEach(el => {
        el.addEventListener('focus', function () {
            if (document.getElementById('tactile-toggle').checked) {
                this.classList.add('vibrate');
                setTimeout(() => this.classList.remove('vibrate'), 300);
            }
        });
    });

    // Voice navigation demo
    const synth = window.speechSynthesis;
    document.getElementById('demo-voice-btn').addEventListener('click', function () {
        if (synth.speaking) {
            synth.cancel();
        }
        const utterance = new SpeechSynthesisUtterance("Welcome to SafeTravel voice navigation. Turn right in 50 meters.");
        synth.speak(utterance);
        if (document.getElementById('tactile-toggle').checked) {
            this.classList.add('vibrate');
            setTimeout(() => this.classList.remove('vibrate'), 300);
        }
    });

    // Obstacle detection demo
    document.getElementById('obstacle-demo-btn').addEventListener('click', function () {
        alert("Obstacle detected ahead: construction zone. Suggested alternate route available.");
        if (document.getElementById('tactile-toggle').checked) {
            this.classList.add('vibrate');
            setTimeout(() => this.classList.remove('vibrate'), 300);
        }
    });

    // Read page aloud
    document.getElementById('read-page').addEventListener('click', function () {
        const pageText = document.body.innerText;
        if (synth.speaking) {
            synth.cancel();
        }
        const utterance = new SpeechSynthesisUtterance(pageText);
        synth.speak(utterance);
        if (document.getElementById('tactile-toggle').checked) {
            this.classList.add('vibrate');
            setTimeout(() => this.classList.remove('vibrate'), 300);
        }
    });

    // Voice guidance controls
    document.getElementById('start-voice').addEventListener('click', function () {
        const utterance = new SpeechSynthesisUtterance("Voice guidance started. Please select your destination.");
        synth.speak(utterance);
        if (document.getElementById('tactile-toggle').checked) {
            this.classList.add('vibrate');
            setTimeout(() => this.classList.remove('vibrate'), 300);
        }
    });

    document.getElementById('stop-voice').addEventListener('click', function () {
        synth.cancel();
        if (document.getElementById('tactile-toggle').checked) {
            this.classList.add('vibrate');
            setTimeout(() => this.classList.remove('vibrate'), 300);
        }
    });


    // Community post
    document.getElementById('post-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const title = document.getElementById('post-title').value;
        const content = document.getElementById('post-content').value;

        const newPost = document.createElement('div');
        newPost.className = 'forum-post';
        newPost.innerHTML = `
                    <h4>You:</h4>
                    <p><strong>${title}</strong></p>
                    <p>${content}</p>
                `;

        document.getElementById('community-preview').prepend(newPost);

        // Clear form
        document.getElementById('post-title').value = '';
        document.getElementById('post-content').value = '';

        if (document.getElementById('tactile-toggle').checked) {
            this.classList.add('vibrate');
            setTimeout(() => this.classList.remove('vibrate'), 300);
        }
    });

    
});

// Update transport schedule
function updateTransportSchedule() {
    // Simulate updating transport schedule
    // This function would typically fetch data from an API
    const transportTable = document.getElementById('transport-schedules');
    transportTable.innerHTML = `
    <table>
        <tr><th>Route</th><th>Direction</th><th>Next Arrival</th></tr>
        <tr><td>Bus 101</td><td>Downtown</td><td>5 min</td></tr>
        <tr><td>Train A</td><td>Uptown</td><td>10 min</td></tr>
        <tr><td>Subway C</td><td>Eastbound</td><td>15 min</td></tr>
    </table>
`;
}
initMap();
