  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let totalPrice = 0;
  let quantities = {
    'margherita': 0,
    'pepperoni': 0,
    'bbq-chicken': 0,
    'veggie': 0,
    'hawaiian': 0
  };
  let currentPrice = {
    'margherita': 15.99,
    'pepperoni': 17.99,
    'bbq-chicken': 18.99,
    'veggie': 16.99,
    'hawaiian': 17.49
  };

  window.onload = () => {
    updateCartSummary();

    cart.forEach(item => {
      const nameKey = item.name.toLowerCase().split(' ')[0]; 
      if (quantities[nameKey] !== undefined) {
        quantities[nameKey] += item.quantity;
        const counterEl = document.getElementById(`${nameKey}-counter`);
        if (counterEl) {
          counterEl.textContent = `Quantity: ${quantities[nameKey]}`;
        }
      }
    });
  };

  function updatePrice(pizza) {
    let size = document.querySelector(`input[name="${pizza}-size"]:checked`).value;

    if (pizza === 'margherita') {
      currentPrice['margherita'] = size === '50cm' ? 15.99 : 11.99;
    } else if (pizza === 'pepperoni') {
      currentPrice['pepperoni'] = size === '50cm' ? 17.99 : 13.99;
    } else if (pizza === 'bbq-chicken') {
      currentPrice['bbq-chicken'] = size === '50cm' ? 18.99 : 14.99;
    } else if (pizza === 'veggie') {
      currentPrice['veggie'] = size === '50cm' ? 16.99 : 12.99;
    } else if (pizza === 'hawaiian') {
      currentPrice['hawaiian'] = size === '50cm' ? 17.49 : 13.49;
    }

    updateCartSummary();
  }

  function addToCart(item, type) {
    const size = item.size;
    item.price = currentPrice[type];

    const index = cart.findIndex(p => p.name === item.name && p.size === size);
    if (index !== -1) {
      cart[index].quantity += 1;
    } else {
      item.quantity = 1;
      cart.push(item);
    }

    quantities[type] = (quantities[type] || 0) + 1;
    document.getElementById(`${type}-counter`).textContent = `Quantity: ${quantities[type]}`;
    localStorage.setItem('cart', JSON.stringify(cart));

    const msg = event.target.nextElementSibling;
    msg.style.display = 'block';
    setTimeout(() => msg.style.display = 'none', 2000);

    updateCartSummary();
  }

  function updateCartSummary() {
    totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    document.getElementById('total').textContent = totalPrice.toFixed(2);
  }

  function navigateWithLoading(url) {
    document.getElementById('loadingOverlay').style.display = 'flex';
    setTimeout(() => window.location.href = url, 2000);
  }
