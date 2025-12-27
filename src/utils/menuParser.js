/**
 * Parse CSV text into an array of objects
 */
export const parseCSV = (csvText) => {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',');

  return lines.slice(1).map(line => {
    const values = line.split(',');
    const item = {};

    headers.forEach((header, index) => {
      item[header.trim()] = values[index]?.trim() || '';
    });

    // Convert price to number
    if (item.Price) {
      item.Price = parseFloat(item.Price);
    }

    return item;
  });
};

/**
 * Categorize menu items based on name patterns
 */
export const categorizeItem = (itemName) => {
  const name = itemName.toLowerCase();

  // Check categories in order of specificity
  if (name.includes('niño')) {
    return 'Kids Menu';
  }
  if (name.includes('horchata') || name.includes('jamaica') ||
      name.includes('jugo') || name.includes('café') ||
      name.includes('coca') || name.includes('jarrito') ||
      name.includes('tamarindo')) {
    return 'Drinks';
  }
  if (name.includes('caldo') || name.includes('menudo') ||
      name.includes('pozole') || name.includes('soup')) {
    return 'Soups';
  }
  if (name.includes('camarón') || name.includes('camaron') ||
      name.includes('pescado') || name.includes('mojarra') ||
      name.includes('mar') || name.includes('mares') ||
      name.includes('shrimp') || name.includes('seafood')) {
    return 'Seafood';
  }
  if (name.includes('taco')) {
    return 'Tacos';
  }
  if (name.includes('burrito')) {
    return 'Burritos';
  }
  if (name.includes('sope')) {
    return 'Sopes';
  }
  if (name.includes('plato') || name.includes('plate') ||
      name.includes('fajitas') || name.includes('tampiquena') ||
      name.includes('mole')) {
    return 'Plates';
  }
  if (name.includes('ensalada') || name.includes('salad')) {
    return 'Salads';
  }

  return 'Specialties';
};

/**
 * Load and parse menu from CSV
 */
export const loadMenu = async () => {
  try {
    // Fetch the CSV file from public folder
    const response = await fetch('/restaurant_menu.csv');
    const csvText = await response.text();

    // Parse CSV
    const menuItems = parseCSV(csvText);

    // Categorize items
    const categorizedMenu = {};

    menuItems.forEach(item => {
      const category = categorizeItem(item.Name);

      if (!categorizedMenu[category]) {
        categorizedMenu[category] = [];
      }

      categorizedMenu[category].push(item);
    });

    // Define category order
    const categoryOrder = [
      'Specialties',
      'Tacos',
      'Burritos',
      'Sopes',
      'Plates',
      'Seafood',
      'Soups',
      'Salads',
      'Drinks',
      'Kids Menu'
    ];

    // Sort categories
    const sortedMenu = {};
    categoryOrder.forEach(category => {
      if (categorizedMenu[category]) {
        sortedMenu[category] = categorizedMenu[category];
      }
    });

    return sortedMenu;
  } catch (error) {
    console.error('Error loading menu:', error);
    return {};
  }
};

/**
 * Format price as currency
 */
export const formatPrice = (price) => {
  return `$${price.toFixed(2)}`;
};
