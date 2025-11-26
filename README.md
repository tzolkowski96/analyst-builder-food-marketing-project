# 🍕 UFood Marketing Data Analysis

A comprehensive data analysis project exploring customer behavior and marketing campaign effectiveness for UFood, Brazil's leading food delivery platform.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-blue?style=for-the-badge&logo=github)](https://tzolkowski96.github.io/analyst-builder-food-marketing-project/)
![Status](https://img.shields.io/badge/Status-Complete-success?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.8+-blue?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## 🚀 Live Demo

**[View the Live Dashboard →](https://tzolkowski96.github.io/analyst-builder-food-marketing-project/)**

## 📊 Project Overview

This project analyzes customer data from UFood to:
- Understand customer demographics and behavior patterns
- Evaluate marketing campaign effectiveness (6 campaigns analyzed)
- Identify customer segments using K-means clustering (3 segments)
- Provide data-driven recommendations for marketing optimization
- Perform A/B testing analysis on campaign performance

## ✨ Website Features

### Design & UX
- 🌓 **Dark/Light Mode** - Toggle with keyboard shortcut (T)
- 📱 **Fully Responsive** - Mobile hamburger menu, tablet & desktop layouts
- ♿ **Accessible** - Skip links, ARIA labels, focus states
- ⚡ **Performance Optimized** - Lazy loading, preconnect hints
- 🔍 **SEO Ready** - Open Graph, Twitter Cards, JSON-LD structured data

### Interactive Features
- 📈 **Animated Statistics** - Count-up numbers on scroll
- 📖 **Reading Progress** - Visual progress indicator
- 🧭 **Smart Navigation** - Collapsible sidebar with active section highlighting
- ⌨️ **Keyboard Shortcuts** - T (theme), J/K (navigate), Esc (top)
- 🖼️ **Image Lightbox** - Click charts to zoom

## 📁 Project Structure

```
analyst-builder-food-marketing-project/
├── index.html              # Main dashboard (Jupyter notebook export + custom styling)
├── 404.html                # Custom 404 error page
├── .nojekyll               # Disable Jekyll processing for GitHub Pages
├── assets/
│   ├── css/
│   │   ├── main.css        # Main stylesheet with CSS variables
│   │   ├── components.css  # UI component styles
│   │   └── animations.css  # Animation keyframes
│   ├── js/
│   │   ├── main.js         # Core functionality & UI injection
│   │   └── charts.js       # Chart enhancements & lightbox
│   └── og-image.svg        # Social sharing preview image
└── README.md               # This file
```

## 🚀 Deployment (GitHub Pages)

This project is configured for automatic deployment on GitHub Pages:

1. **Enable GitHub Pages** in repository Settings → Pages
2. **Source**: Deploy from branch `main`, folder `/ (root)`
3. **Wait** for the build to complete (~1-2 minutes)
4. **Visit**: `https://tzolkowski96.github.io/analyst-builder-food-marketing-project/`

### Local Development

```bash
# Clone the repository
git clone https://github.com/tzolkowski96/analyst-builder-food-marketing-project.git
cd analyst-builder-food-marketing-project

# Start a local server
python3 -m http.server 8000

# Open in browser
open http://localhost:8000
```

## 🎨 Features

| Metric | Value |
|--------|-------|
| Total Customers | 2,205 |
| Data Columns | 39 |
| Customer Segments | 3 |
| Best Campaign | Response (15.1%) |
| Avg. Income | $52,247 |

## 📈 Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Variables
- **Charts**: Chart.js
- **Icons**: Font Awesome 6
- **Fonts**: Inter, Plus Jakarta Sans, JetBrains Mono
- **Analysis**: Python, Pandas, NumPy, Matplotlib, Seaborn

## 🛠️ Setup & Usage

1. **Clone the repository**
   ```bash
   git clone https://github.com/tzolkowski96/analyst-builder-food-marketing-project.git
   cd analyst-builder-food-marketing-project
   ```

2. **Open the dashboard**
   - Simply open `index-new.html` in any modern browser
   - No server required - works with file:// protocol

3. **Optional: Run with live server**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   ```

## 📋 Data Dictionary

| Category | Columns |
|----------|---------|
| Demographics | Income, Kidhome, Teenhome, Age, Customer_Days |
| Purchases | MntWines, MntFruits, MntMeatProducts, MntFishProducts, MntSweetProducts, MntGoldProds |
| Channels | NumWebPurchases, NumCatalogPurchases, NumStorePurchases, NumDealsPurchases |
| Campaigns | AcceptedCmp1-5, Response, Complain |

## 📊 Key Insights

1. **Campaign Performance**: "Response" campaign leads at 15.1% acceptance
2. **Customer Segments**: 3 distinct groups (High-Value, Budget-Conscious, Moderate)
3. **Product Preferences**: Wine dominates at ~50% of spending
4. **Income Correlation**: Strong 0.73 correlation with wine spending
5. **Customer Tenure**: Long-term customers spend 47% more

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

This project is for educational purposes. Data provided by AnalystBuilder.

---

<p align="center">
  Built with ❤️ using Python & JavaScript
  <br>
  <sub>Analysis conducted with GitHub Copilot assistance</sub>
</p>
