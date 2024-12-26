# Smart Meal Connect

Smart Meal Connect is a cross-platform meal planning application designed to simplify your meal decisions. The app provides personalized recipe suggestions, ingredient-based meal options, user dashboards, and a social recipe feed where you can explore and share culinary ideas with others.

## Features

- **Personalized Recipe Suggestions**: Get tailored meal options based on your preferences and dietary needs.
- **Ingredient-Based Search**: Input available ingredients to discover recipes you can prepare instantly.
- **User Dashboard**: Track your favorite recipes, meal plans, and other metrics in a personalized interface.
- **Social Recipe Feed**: Share your favorite recipes and explore meals posted by the community.
- **Push Notifications**: Stay updated with reminders, meal suggestions, and community activity through Firebase notifications.
- **Cross-Platform Support**: Built with Capacitor, Smart Meal Connect supports both Android and iOS platforms seamlessly.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Notifications**: Firebase
- **Cross-Platform Support**: Capacitor
- **Deployment**: Render

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/Nabeel-99/Smart_Meal_Connect.git
   ```
2. Navigate to project directory:
   ```bash
   cd smart-meal-connect
   ```
3. Install dependencies:
   ```bash
   cd client
   npm install
   cd ../server
   npm install
   ```
4. Configure environment variables:
   Create .env files for the server with necessary variables (database URI, Firebase config, etc.).

5. Start the development servers:
   For the server:
   ```bash
        npm run start
   ```
   For the client:
   ```bash
        npm run dev
   ```

## Deployment

The app is live and can be accessed at: https://smart-meal-frontend.onrender.com/
