// Price matrix
const priceMatrix = {
    volumes: ['0-150kg', '1 PAL', '2 PAL', '3 PAL', '4-5 PAL', '6-7 PAL', '8-9 PAL', '10-12 PAL', '13-16 PAL'],
    ranges: [
        { min: 0, max: 50, prices: [73.34, 85.35, 75.52, 72.24, 70.06, 63.51, 59.14, 54.77, 52.59] },
        { min: 51, max: 100, prices: [76.61, 91.90, 82.62, 78.80, 76.07, 70.61, 63.51, 59.14, 55.86] },
        { min: 101, max: 150, prices: [79.89, 97.36, 89.72, 86.44, 83.16, 78.80, 70.61, 65.15, 61.32] },
        { min: 151, max: 200, prices: [83.16, 102.82, 97.91, 92.99, 89.18, 86.44, 78.80, 82.64, 67.88] },
        { min: 201, max: 250, prices: [85.35, 108.28, 103.91, 100.64, 96.27, 92.99, 87.53, 80.98, 76.07] },
        { min: 251, max: 300, prices: [89.72, 113.74, 111.56, 109.37, 102.82, 99.54, 95.18, 88.62, 83.16] },
        { min: 301, max: 350, prices: [90.59, 117.02, 113.74, 111.56, 106.10, 102.82, 97.96, 91.03, 85.35] },
        { min: 351, max: 400, prices: [91.03, 121.38, 117.02, 113.74, 110.46, 106.53, 100.64, 93.32, 88.41] },
        { min: 401, max: 500, prices: [91.90, 124.66, 119.20, 115.92, 113.74, 109.92, 102.82, 95.18, 89.72] }
    ]
};

let selectedVolume = 0;
let debounceTimer;

// Autocomplete setup
setupAutocomplete('origin', 'originSuggestions');
setupAutocomplete('destination', 'destinationSuggestions');

function setupAutocomplete(inputId, suggestionsId) {
    const input = document.getElementById(inputId);
    const suggestionsDiv = document.getElementById(suggestionsId);
    let currentFocus = -1;

    input.addEventListener('input', function() {
        const value = this.value.trim();
        
        // Clear previous timer
        clearTimeout(debounceTimer);
        
        if (value.length < 2) {
            suggestionsDiv.classList.remove('show');
            return;
        }

        // Debounce API calls (wait 300ms after user stops typing)
        debounceTimer = setTimeout(() => {
            searchAddress(value, suggestionsDiv, input);
        }, 300);
    });

    // Handle keyboard navigation
    input.addEventListener('keydown', function(e) {
        const items = suggestionsDiv.getElementsByClassName('autocomplete-item');
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            currentFocus++;
            setActive(items, currentFocus);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            currentFocus--;
            setActive(items, currentFocus);
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (currentFocus > -1 && items[currentFocus]) {
                items[currentFocus].click();
            }
        } else if (e.key === 'Escape') {
            suggestionsDiv.classList.remove('show');
        }
    });

    function setActive(items, index) {
        if (!items.length) return;
        
        // Remove active class from all
        for (let item of items) {
            item.classList.remove('active');
        }
        
        // Wrap around
        if (index >= items.length) currentFocus = 0;
        if (index < 0) currentFocus = items.length - 1;
        
        // Add active class
        if (items[currentFocus]) {
            items[currentFocus].classList.add('active');
        }
    }

    // Close suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target !== input) {
            suggestionsDiv.classList.remove('show');
        }
    });
}

async function searchAddress(query, suggestionsDiv, inputElement) {
    suggestionsDiv.innerHTML = '<div class="autocomplete-loading">Suche...</div>';
    suggestionsDiv.classList.add('show');

    const switzerlandBounds = 'viewbox=5.96,45.82,10.49,47.81&bounded=1';
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=ch&${switzerlandBounds}&limit=5`;

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'TransportPriceCalculator/1.0'
            }
        });

        if (!response.ok) {
            throw new Error('Suche fehlgeschlagen');
        }

        const results = await response.json();

        if (results && results.length > 0) {
            displaySuggestions(results, suggestionsDiv, inputElement);
        } else {
            suggestionsDiv.innerHTML = '<div class="autocomplete-loading">Keine Ergebnisse gefunden</div>';
        }
    } catch (error) {
        console.error('Autocomplete error:', error);
        suggestionsDiv.innerHTML = '<div class="autocomplete-loading">Fehler bei der Suche</div>';
    }
}

function displaySuggestions(results, suggestionsDiv, inputElement) {
    suggestionsDiv.innerHTML = '';

    results.forEach(result => {
        const item = document.createElement('div');
        item.className = 'autocomplete-item';
        
        const mainText = document.createElement('div');
        mainText.className = 'main-text';
        mainText.textContent = result.display_name.split(',')[0];
        
        const subText = document.createElement('div');
        subText.className = 'sub-text';
        subText.textContent = result.display_name;
        
        item.appendChild(mainText);
        item.appendChild(subText);
        
        item.addEventListener('click', function() {
            inputElement.value = result.display_name;
            inputElement.dataset.lat = result.lat;
            inputElement.dataset.lon = result.lon;
            suggestionsDiv.classList.remove('show');
        });
        
        suggestionsDiv.appendChild(item);
    });

    suggestionsDiv.classList.add('show');
}

// Volume selector
document.querySelectorAll('.volume-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.volume-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        selectedVolume = parseInt(this.dataset.volume);
    });
});

// Calculate button
document.getElementById('calculateBtn').addEventListener('click', async function() {
    const origin = document.getElementById('origin').value.trim();
    const destination = document.getElementById('destination').value.trim();
    const errorMessage = document.getElementById('errorMessage');
    const resultCard = document.getElementById('resultCard');
    const loading = document.getElementById('loading');

    // Hide previous results
    resultCard.classList.remove('show');
    errorMessage.classList.remove('show');

    // Validation
    if (!origin || !destination) {
        errorMessage.textContent = 'Bitte geben Sie Start- und Zieladresse ein.';
        errorMessage.classList.add('show');
        return;
    }

    // Disable button and show loading
    this.disabled = true;
    loading.classList.add('show');

    try {
        // Get input elements for cached coordinates
        const originInput = document.getElementById('origin');
        const destInput = document.getElementById('destination');

        // Geocode addresses using Nominatim
        const originCoords = await geocodeAddress(origin, originInput);
        const destCoords = await geocodeAddress(destination, destInput);

        if (!originCoords || !destCoords) {
            throw new Error('Eine oder beide Adressen konnten nicht gefunden werden.');
        }

        // Calculate route using OSRM (Open Source Routing Machine)
        const distance = await calculateRoute(originCoords, destCoords);

        // Get price
        const price = getPriceForDistance(distance, selectedVolume);

        // Display results
        displayResults(origin, destination, distance, priceMatrix.volumes[selectedVolume], price);

    } catch (error) {
        errorMessage.textContent = error.message || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.';
        errorMessage.classList.add('show');
    } finally {
        this.disabled = false;
        loading.classList.remove('show');
    }
});

// Geocode address using Nominatim - limited to Switzerland only
async function geocodeAddress(address, inputElement) {
    // Check if we have cached coordinates from autocomplete
    if (inputElement && inputElement.dataset.lat && inputElement.dataset.lon) {
        return {
            lat: parseFloat(inputElement.dataset.lat),
            lon: parseFloat(inputElement.dataset.lon)
        };
    }

    // Otherwise do regular geocoding
    const switzerlandBounds = 'viewbox=5.96,45.82,10.49,47.81&bounded=1';
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&countrycodes=ch&${switzerlandBounds}&limit=1`;

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'TransportPriceCalculator/1.0'
            }
        });

        if (!response.ok) {
            throw new Error('Geocoding fehlgeschlagen');
        }

        const data = await response.json();

        if (data && data.length > 0) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            
            if (lat >= 45.82 && lat <= 47.81 && lon >= 5.96 && lon <= 10.49) {
                return { lat, lon };
            } else {
                throw new Error('Adresse liegt nicht in der Schweiz');
            }
        }
        return null;
    } catch (error) {
        console.error('Geocoding error:', error);
        throw error;
    }
}

// Calculate route using OSRM - optimized for car/truck routing
async function calculateRoute(origin, destination) {
    // Using OSRM with 'car' profile (also suitable for trucks)
    // Alternative profiles: 'bike', 'foot' - but 'car' is best for transport
    const url = `https://router.project-osrm.org/route/v1/car/${origin.lon},${origin.lat};${destination.lon},${destination.lat}?overview=false&alternatives=false`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Route konnte nicht berechnet werden');
        }

        const data = await response.json();

        if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
            const distanceMeters = data.routes[0].distance;
            const distanceKm = Math.round(distanceMeters / 1000);
            
            // Optional: auch die Fahrzeit verfügbar
            // const durationSeconds = data.routes[0].duration;
            // const durationMinutes = Math.round(durationSeconds / 60);
            
            return distanceKm;
        }

        throw new Error('Keine Route gefunden');
    } catch (error) {
        console.error('Routing error:', error);
        throw new Error('Route konnte nicht berechnet werden. Bitte überprüfen Sie die Adressen.');
    }
}

// Get price for distance
function getPriceForDistance(distance, volumeIndex) {
    for (let range of priceMatrix.ranges) {
        if (distance >= range.min && distance <= range.max) {
            return range.prices[volumeIndex];
        }
    }
    // If distance > 500km, use last range
    return priceMatrix.ranges[priceMatrix.ranges.length - 1].prices[volumeIndex];
}

// Display results
function displayResults(origin, destination, distance, volume, price) {
    document.getElementById('routeFrom').textContent = origin;
    document.getElementById('routeTo').textContent = destination;
    document.getElementById('routeDistance').textContent = `${distance} km`;
    document.getElementById('routeVolume').textContent = volume;
    document.getElementById('priceAmount').textContent = price.toFixed(2);

    document.getElementById('resultCard').classList.add('show');
}
