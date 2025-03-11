// Embedded prices.json data
const prices = {
  "Iraq": { price: 0.545, currency: "IQD", symbol: "د.ع" },
  "United States": { price: 0.000005813, currency: "USD", symbol: "$" },
  "Germany": { price: 0.00001975, currency: "EUR", symbol: "€" },
  "India": { price: 0.000355, currency: "INR", symbol: "₹" }
};

// Updated exchange rates (as of October 2023)
const exchangeRates = {
  "IQD": 1450, // 1 USD = 1450 IQD
  "INR": 87.05,   // 1 USD = 83 INR
  "EUR": 0.93, // 1 USD = 0.95 EUR
  "USD": 1     // 1 USD = 1 USD
};

// Function to format numbers with commas and preserve decimal points
function formatNumber(number) {
  const [integerPart, decimalPart] = number.toFixed(2).split('.');
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${formattedInteger}.${decimalPart}`;
}

// Function to animate numbers
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

// Function to change the background flag with a fade transition
function changeBackgroundFlag(flagFileName) {
  const body = document.body;
  body.style.backgroundImage = `url('pictures/${flagFileName}')`;
}

// Event listener for country change
document.getElementById('country').addEventListener('change', function () {
  const selectedFlag = this.value; // Get the selected flag file name
  changeBackgroundFlag(selectedFlag);
});

// Event listener for form submission
document.getElementById('calculator-form').addEventListener('submit', function (e) {
  e.preventDefault();

  // Get user input
  const kwh = parseFloat(document.getElementById('kwh').value);
  const country = document.getElementById('country').options[document.getElementById('country').selectedIndex].text;

  // Validate input
  if (kwh < 0 || isNaN(kwh)) {
    alert('Please enter a valid positive number for kWh.');
    return;
  }

  // Get price per kWh for the selected country
  const countryData = prices[country];
  if (!countryData) {
    alert('Price not found for selected country');
    return;
  }

  const { price, currency, symbol } = countryData;

  // Calculate cost in local currency
  const costLocal = kwh * price;

  // Convert cost to USD using the exchange rate
  const exchangeRate = exchangeRates[currency];
  if (!exchangeRate) {
    alert('Exchange rate not found for selected currency');
    return;
  }

  const costUSD = costLocal / exchangeRate;

  // Display results with animation
  const costLocalElement = document.getElementById('cost-local');
  const costUSDElement = document.getElementById('cost-usd');

  costLocalElement.innerHTML = `Cost in ${currency}: <span class="cost-number">${formatNumber(costLocal)}</span> ${symbol}`;
  costUSDElement.innerHTML = `Cost in USD: <span class="cost-number">${formatNumber(costUSD)}</span> $`;

  animateNumber(costLocalElement.querySelector('.cost-number'), costLocal);
  animateNumber(costUSDElement.querySelector('.cost-number'), costUSD);
});
