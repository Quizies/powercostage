// Prices and exchange rates
const carbonEmissionFactors = {
  "Iraq": 0.75,
  "United States": 0.45,
  "Germany": 0.41,
  "India": 0.82,
  "Canada": 0.13,
  "United Kingdom": 0.23,
  "France": 0.06,
  "Japan": 0.48,
  "China": 0.58,
  "Brazil": 0.09,
  "Australia": 0.86,
  "South Korea": 0.49,
  "Russia": 0.34,
  "Italy": 0.35,
  "Spain": 0.29,
  "Mexico": 0.45,
  "Saudi Arabia": 0.63,
  "United Arab Emirates": 0.58,
  "Turkey": 0.47,
  "South Africa": 0.91,
  "Egypt": 0.55,
  "Nigeria": 0.48,
  "Argentina": 0.39,
  "Pakistan": 0.52,
  "Indonesia": 0.72,
  "Thailand": 0.51,
  "Vietnam": 0.56,
  "Philippines": 0.49,
  "Malaysia": 0.61
};

const prices = {
  "Iraq": { price: 18.82845188284519, currency: "IQD", symbol: "د.ع" },
  "United States": { price: 0.1626, currency: "USD", symbol: "$" },
  "Germany": { price: 0.3951, currency: "EUR", symbol: "€" },
  "India": { price: 7.11, currency: "INR", symbol: "₹" },
  "Canada": { price: 0.12, currency: "CAD", symbol: "$" },
  "United Kingdom": { price: 0.22, currency: "GBP", symbol: "£" },
  "France": { price: 0.18, currency: "EUR", symbol: "€" },
  "Japan": { price: 25, currency: "JPY", symbol: "¥" },
  "China": { price: 0.08, currency: "CNY", symbol: "¥" },
  "Brazil": { price: 0.15, currency: "BRL", symbol: "R$" },
  "Australia": { price: 0.25, currency: "AUD", symbol: "$" },
  "South Korea": { price: 120, currency: "KRW", symbol: "₩" },
  "Russia": { price: 4, currency: "RUB", symbol: "₽" },
  "Italy": { price: 0.23, currency: "EUR", symbol: "€" },
  "Spain": { price: 0.24, currency: "EUR", symbol: "€" },
  "Mexico": { price: 1.5, currency: "MXN", symbol: "$" },
  "Saudi Arabia": { price: 0.05, currency: "SAR", symbol: "﷼" },
  "United Arab Emirates": { price: 0.08, currency: "AED", symbol: "د.إ" },
  "Turkey": { price: 1.2, currency: "TRY", symbol: "₺" },
  "South Africa": { price: 2.5, currency: "ZAR", symbol: "R" },
  "Egypt": { price: 0.5, currency: "EGP", symbol: "£" },
  "Nigeria": { price: 50, currency: "NGN", symbol: "₦" },
  "Argentina": { price: 10, currency: "ARS", symbol: "$" },
  "Pakistan": { price: 20, currency: "PKR", symbol: "₨" },
  "Indonesia": { price: 1500, currency: "IDR", symbol: "Rp" },
  "Thailand": { price: 4, currency: "THB", symbol: "฿" },
  "Vietnam": { price: 2000, currency: "VND", symbol: "₫" },
  "Philippines": { price: 10, currency: "PHP", symbol: "₱" },
  "Malaysia": { price: 0.5, currency: "MYR", symbol: "RM" }
};

const exchangeRates = {
  "IQD": 1450,
  "USD": 1,
  "EUR": 0.93,
  "INR": 87.05,
  "CAD": 1.35,
  "GBP": 0.79,
  "JPY": 149,
  "CNY": 7.3,
  "BRL": 5.1,
  "AUD": 1.55,
  "KRW": 1300,
  "RUB": 95,
  "MXN": 18,
  "SAR": 3.75,
  "AED": 3.67,
  "TRY": 28,
  "ZAR": 19,
  "EGP": 31,
  "NGN": 800,
  "ARS": 350,
  "PKR": 280,
  "IDR": 15500,
  "THB": 36,
  "VND": 24000,
  "PHP": 56,
  "MYR": 4.7
};

// Helper functions
function formatNumber(number) {
  return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function showSection(sectionId) {
  // Hide all sections with fade-out effect
  document.querySelectorAll('.container').forEach(container => {
    if (!container.classList.contains('hidden')) {
      container.classList.add('hidden');
    }
  });

  // Show the selected section with fade-in effect
  setTimeout(() => {
    const section = document.querySelector(`.${sectionId}`);
    if (section) {
      section.classList.remove('hidden');
    }
  }, 500); // Wait for the fade-out to complete
}

// Event listeners for menu buttons
document.getElementById('cost-calculator-btn').addEventListener('click', () => showSection('cost-calculator'));
document.getElementById('power-to-ampere-btn').addEventListener('click', () => showSection('power-to-ampere'));
document.getElementById('another-converter-btn').addEventListener('click', () => showSection('another-converter'));

// Back to menu button
document.querySelectorAll('#back-to-menu').forEach(button => {
  button.addEventListener('click', () => {
    // Hide the current section with fade-out effect
    const currentSection = button.closest('.container');
    if (currentSection) {
      currentSection.classList.add('hidden');
    }

    // Show the main menu with fade-in effect after a delay
    setTimeout(() => {
      document.querySelector('.main-menu').classList.remove('hidden');
    }, 500); // Wait for the fade-out to complete
  });
});

// Admin panel
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'q') {
    const password = prompt('Enter admin password:');
    if (password === 'admin123') { // Change to a secure password
      // Hide all sections
      document.querySelectorAll('.container').forEach(container => {
        container.classList.add('hidden');
      });
      // Show admin panel with fade-in effect
      setTimeout(() => {
        document.querySelector('.admin-panel').classList.remove('hidden');
      }, 500);
    }
  }
});

document.getElementById('close-admin-panel').addEventListener('click', () => {
  // Hide admin panel with fade-out effect
  document.querySelector('.admin-panel').classList.add('hidden');
  // Show main menu with fade-in effect
  setTimeout(() => {
    document.querySelector('.main-menu').classList.remove('hidden');
  }, 500);
});

document.getElementById('admin-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const country = document.getElementById('country-select').value;
  const price = parseFloat(document.getElementById('price').value);
  const currency = document.getElementById('currency').value;
  const symbol = document.getElementById('symbol').value;

  prices[country] = { price, currency, symbol };
  alert('Price updated successfully!');
});


// Power to Ampere Converter
document.getElementById('ampere-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const power = parseFloat(document.getElementById('power').value);
  const voltage = 220; // Always 220V
  const ampere = power / voltage;

  // Animate the ampere value
  const ampereValueElement = document.getElementById('ampere-value');
  animateNumber(ampereValueElement, ampere);

  // Update the text content
  ampereValueElement.innerHTML = `Ampere: <span class="ampere-number">${formatNumber(ampere)}</span>`;
});



function animateNumber(element, finalValue) {
  let current = 0;
  const increment = finalValue / 100;
  const interval = setInterval(() => {
    current += increment;
    if (current >= finalValue) {
      clearInterval(interval);
      current = finalValue;
    }
    element.textContent = formatNumber(current);
  }, 10);
}

// Helper function to format numbers
function formatNumber(number) {
  return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Helper function to animate numbers for the cost calculator
function animateCost(element, finalValue) {
  let current = 0;
  const increment = finalValue / 100;
  const interval = setInterval(() => {
    current += increment;
    if (current >= finalValue) {
      clearInterval(interval);
      current = finalValue;
    }
    element.textContent = formatNumber(current);
  }, 10);
}

// Helper function to animate numbers for the ampere calculator
function animateAmpere(element, finalValue) {
  let current = 0;
  const increment = finalValue / 100;
  const interval = setInterval(() => {
    current += increment;
    if (current >= finalValue) {
      clearInterval(interval);
      current = finalValue;
    }
    element.textContent = formatNumber(current);
  }, 10);
}


// Helper function to format numbers
function formatNumber(number) {
  return number.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


document.getElementById('calculator-form').addEventListener('submit', (e) => {
  e.preventDefault();

  // Get old and new kWh values
  const oldKwh = parseFloat(document.getElementById('old-kwh').value);
  const newKwh = parseFloat(document.getElementById('new-kwh').value);

  // Validate inputs
  if (oldKwh < 0 || newKwh < 0 || isNaN(oldKwh) || isNaN(newKwh) || newKwh < oldKwh) {
    alert('Please enter valid positive numbers for kWh, and ensure the new value is greater than the old value.');
    return;
  }

  // Calculate the difference
  const kwhDifference = newKwh - oldKwh;

  // Get selected country
  const country = document.getElementById('country').options[document.getElementById('country').selectedIndex].text;

  // Fetch country data
  const countryData = prices[country];
  if (!countryData) {
    alert('Price not found for selected country');
    return;
  }

  // Calculate costs
  const { price, currency, symbol } = countryData;
  const costLocal = kwhDifference * price;
  const exchangeRate = exchangeRates[currency];
  const costUSD = costLocal / exchangeRate;

  // Animate the local cost
  const costLocalElement = document.getElementById('cost-local').querySelector('.cost-number');
  animateNumber(costLocalElement, costLocal);

  // Animate the USD cost
  const costUSDElement = document.getElementById('cost-usd').querySelector('.cost-number');
  animateNumber(costUSDElement, costUSD);

  // Update the text content
  document.getElementById('cost-local').innerHTML = `Cost in ${currency}: <span class="cost-number">${formatNumber(costLocal)}</span> ${symbol}`;
  document.getElementById('cost-usd').innerHTML = `Cost in USD: <span class="cost-number">${formatNumber(costUSD)}</span> $`;
});


document.getElementById('ampere-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const power = parseFloat(document.getElementById('power').value);
  const voltage = 220; // Always 220V
  const ampere = power / voltage;

  // Animate the ampere value
  const ampereValueElement = document.getElementById('ampere-value');
  animateNumber(ampereValueElement, ampere);

  // Update the text content
  ampereValueElement.innerHTML = `Ampere: <span class="ampere-number">${formatNumber(ampere)}</span>`;
});

document.getElementById('carbon-footprint-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const electricityUsage = parseFloat(document.getElementById('electricity-usage').value);
  const country = document.getElementById('country-carbon').options[document.getElementById('country-carbon').selectedIndex].text;

  if (electricityUsage < 0 || isNaN(electricityUsage)) {
    alert('Please enter a valid positive number for electricity usage.');
    return;
  }

  const emissionFactor = carbonEmissionFactors[country];
  if (!emissionFactor) {
    alert('Emission factor not found for selected country.');
    return;
  }

  // Calculate carbon emissions
  const monthlyEmissions = electricityUsage * emissionFactor;
  const yearlyEmissions = monthlyEmissions * 12;

  // Animate the results
  animateNumber(document.getElementById('monthly-emissions').querySelector('.carbon-number'), monthlyEmissions);
  animateNumber(document.getElementById('yearly-emissions').querySelector('.carbon-number'), yearlyEmissions);

  // Update the text content
  document.getElementById('monthly-emissions').innerHTML = `Monthly Emissions: <span class="carbon-number">${formatNumber(monthlyEmissions)}</span> kg CO₂`;
  document.getElementById('yearly-emissions').innerHTML = `Yearly Emissions: <span class="carbon-number">${formatNumber(yearlyEmissions)}</span> kg CO₂`;
});

// Helper function to animate carbon footprint numbers
function animateCarbonFootprint(element, finalValue) {
  let current = 0;
  const increment = finalValue / 100;
  const interval = setInterval(() => {
    current += increment;
    if (current >= finalValue) {
      clearInterval(interval);
      current = finalValue;
    }
    element.textContent = formatNumber(current);
  }, 10);
}

// Update the flag when a country is selected
document.getElementById('country').addEventListener('change', (e) => {
  const selectedFlag = e.target.value; // e.g., "iraq.png"
  document.body.style.backgroundImage = `url('pictures/${selectedFlag}')`;
});

// Cost Calculator
document.getElementById('calculator-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const kwh = parseFloat(document.getElementById('kwh').value);
  const country = document.getElementById('country').options[document.getElementById('country').selectedIndex].text;

  if (kwh < 0 || isNaN(kwh)) {
    alert('Please enter a valid positive number for kWh.');
    return;
  }

  const countryData = prices[country];
  if (!countryData) {
    alert('Price not found for selected country');
    return;
  }

  const { price, currency, symbol } = countryData;
  const costLocal = kwh * price;
  const exchangeRate = exchangeRates[currency];
  const costUSD = costLocal / exchangeRate;

  // Animate the local cost
  const costLocalElement = document.getElementById('cost-local').querySelector('.cost-number');
  animateNumber(costLocalElement, costLocal);

  // Animate the USD cost
  const costUSDElement = document.getElementById('cost-usd').querySelector('.cost-number');
  animateNumber(costUSDElement, costUSD);

  // Update the text content
  document.getElementById('cost-local').innerHTML = `Cost in ${currency}: <span class="cost-number">${formatNumber(costLocal)}</span> ${symbol}`;
  document.getElementById('cost-usd').innerHTML = `Cost in USD: <span class="cost-number">${formatNumber(costUSD)}</span> $`;
});

document.getElementById('cost-calculator-btn').addEventListener('click', () => {
  const selectedFlag = document.getElementById('country').value; // Get the currently selected flag
  document.body.style.backgroundImage = `url('pictures/${selectedFlag}')`;
  showSection('cost-calculator');
});

// Update the flag when a country is selected (for carbon footprint calculator)
document.getElementById('country-carbon').addEventListener('change', (e) => {
  const selectedFlag = e.target.value;

  // Add a fading class to the body
  document.body.classList.add('fading-background');

  // Wait for the fade-out effect to complete
  setTimeout(() => {
    // Change the background image
    document.body.style.backgroundImage = `url('pictures/${selectedFlag}')`;

    // Remove the fading class after the transition
    setTimeout(() => {
      document.body.classList.remove('fading-background');
    }, 500); // Match this duration with your CSS transition
  }, 300); // Match this duration with your CSS transition
});

const { ipcRenderer } = require('electron');

// Listen for Ctrl + = or Ctrl + Scroll
document.addEventListener('keydown', (event) => {
  if (event.ctrlKey) {
    if (event.key === '=') { // Zoom in with Ctrl + =
      ipcRenderer.send('zoom-in');
    } else if (event.key === '-') { // Zoom out with Ctrl + -
      ipcRenderer.send('zoom-out');
    }
  }
});

document.addEventListener('wheel', (event) => {
  if (event.ctrlKey) {
    event.preventDefault(); // Prevent default browser zoom
    if (event.deltaY < 0) {
      ipcRenderer.send('zoom-in'); // Zoom in
    } else if (event.deltaY > 0) {
      ipcRenderer.send('zoom-out'); // Zoom out
    }
  }
});
