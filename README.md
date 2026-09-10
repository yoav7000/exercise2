# Cosmic Flex - Exercise 2

An interactive web-based educational game designed to teach and practice CSS Flexbox layout properties. Guide the fleet of spacecraft into their designated space station docking bays by configuring Flexbox rules.

## Live Demo & Repository
- **GitHub Pages**: [https://yoav7000.github.io/exercise2/](https://yoav7000.github.io/exercise2/)
- **Repository**: [https://github.com/yoav7000/exercise2](https://github.com/yoav7000/exercise2)

## Features
- **8 Progressive Stages**: Covers `justify-content`, `align-items`, `flex-direction`, and `flex-wrap`.
- **Multi-Property Challenges**: Several stages require combining multiple Flexbox properties simultaneously.
- **Real-Time Live Preview**: Visual updates apply instantly as dropdown values are changed.
- **Fixed Board Dimensions**: 420px × 420px game board maintaining consistent solution alignment across all viewports.
- **Level Navigation**: Direct stage selection to replay or review completed stages.
- **Progress Persistence**: Saves completed levels, attempt counts, and current stage in `localStorage`.
- **Feedback & Animations**: Visual confirmation on success, error vibration on incorrect alignment, and completion summary modal.
- **Pure Vanilla Stack**: Built strictly with semantic HTML5, modern CSS3, and Vanilla JavaScript (ES6+), with zero external libraries.

## Project Structure
```
exercise2/
├── index.html       # Semantic HTML layout and controls
├── style.css        # Responsive styling and animations
├── app.js           # Game engine, level definitions, and validation
├── README.md        # Documentation and links
└── exercise2.zip    # Submission archive
```

## Running Locally
Open `index.html` in any modern web browser or serve using any static HTTP server:
```bash
python -m http.server 8000
```
Then navigate to `http://localhost:8000` in your browser.
