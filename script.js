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

// Mountain region postal codes (Bergregionen)
const mountainRegions = [
    [1656, 1660], [1854, 1854], [1862, 1866], [1871, 1871], [1873, 1875],
    [1882, 1882], [1884, 1885], [1911, 1911], [1914, 1914], [1918, 1918],
    [1922, 1923], [1925, 1925], [1927, 1927], [1929, 1929], [1933, 1934],
    [1936, 1938], [1941, 1948], [1961, 1961], [1965, 1966], [1968, 1969],
    [1971, 1974], [1976, 1978], [1981, 1988], [1992, 1993], [1996, 1997],
    [3714, 3718], [3723, 3723], [3753, 3753], [3755, 3757], [3763, 3766],
    [3770, 3773], [3775, 3778], [3780, 3785], [3792, 3792], [3801, 3801],
    [3803, 3804], [3813, 3813], [3816, 3816], [3818, 3818], [3822, 3826],
    [3862, 3864], [3901, 3901], [3903, 3903], [3905, 3908], [3910, 3910],
    [3913, 3914], [3916, 3920], [3922, 3929], [3932, 3935], [3943, 3944],
    [3948, 3949], [3953, 3957], [3961, 3961], [3963, 3963], [3967, 3967],
    [3971, 3971], [3973, 3975], [3983, 3989], [3991, 3999], [6067, 6068],
    [6084, 6086], [6174, 6174], [6383, 6383], [6387, 6388], [6390, 6391],
    [6433, 6434], [6464, 6465], [6475, 6475], [6485, 6485], [6490, 6491],
    [6493, 6493], [6538, 6538], [6540, 6549], [6562, 6563], [6565, 6565],
    [6571, 6571], [6582, 6584], [6611, 6611], [6631, 6637], [6647, 6647],
    [6653, 6655], [6657, 6659], [6661, 6664], [6672, 6678], [6682, 6685],
    [6690, 6690], [6692, 6696], [6717, 6720], [6722, 6724], [6781, 6781],
    [6836, 6836], [6838, 6838], [6875, 6875], [6951, 6951], [6958, 6960],
    [7017, 7019], [7026, 7029], [7031, 7032], [7050, 7050], [7056, 7058],
    [7062, 7064], [7074, 7078], [7082, 7084], [7104, 7104], [7106, 7107],
    [7109, 7116], [7122, 7122], [7126, 7128], [7130, 7130], [7132, 7132],
    [7134, 7134], [7137, 7138], [7141, 7149], [7151, 7159], [7162, 7168],
    [7172, 7176], [7180, 7180], [7182, 7189], [7212, 7212], [7215, 7215],
    [7220, 7220], [7222, 7224], [7226, 7226], [7228, 7228], [7231, 7233],
    [7235, 7235], [7240, 7247], [7249, 7250], [7252, 7252], [7260, 7260],
    [7265, 7265], [7270, 7270], [7272, 7272], [7276, 7278], [7312, 7315],
    [7317, 7317], [7325, 7326], [7404, 7404], [7407, 7407], [7411, 7419],
    [7421, 7428], [7430, 7438], [7440, 7440], [7442, 7448], [7450, 7460],
    [7462, 7464], [7472, 7473], [7477, 7477], [7482, 7482], [7484, 7484],
    [7492, 7494], [7500, 7500], [7502, 7505], [7512, 7517], [7522, 7527],
    [7530, 7530], [7532, 7537], [7542, 7543], [7545, 7546], [7550, 7554],
    [7556, 7559], [7560, 7560], [7562, 7563], [7602, 7606], [7608, 7608],
    [7610, 7610], [7710, 7710], [7741, 7748], [8857, 8858], [8894, 8898],
    [9057, 9058], [9657, 9657]
];

// Check if postal code is in mountain region
function isMountainRegion(postalCode) {
    const plz = parseInt(postalCode);
    if (isNaN(plz)) return false;
    
    for (let range of mountainRegions) {
        if (plz >= range[0] && plz <= range[1]) {
            return true;
        }
    }
    return false;
}

// Extract postal code from address string
function extractPostalCode(address) {
    // Swiss postal codes are 4 digits
    const match = address.match(/\b\d{4}\b/);
    return match ? match[0] : null;
}

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
    const mountainWarning = document.getElementById('mountainWarning');
    const resultCard = document.getElementById('resultCard');
    const loading = document.getElementById('loading');

    // Hide previous results
    resultCard.classList.remove('show');
    errorMessage.classList.remove('show');
    mountainWarning.classList.remove('show');

    // Validation
    if (!origin || !destination) {
        errorMessage.textContent = 'Bitte geben Sie Start- und Zieladresse ein.';
        errorMessage.classList.add('show');
        return;
    }

    // Check for mountain regions
    const originPLZ = extractPostalCode(origin);
    const destPLZ = extractPostalCode(destination);
    
    if ((originPLZ && isMountainRegion(originPLZ)) || (destPLZ && isMountainRegion(destPLZ))) {
        mountainWarning.classList.add('show');
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
