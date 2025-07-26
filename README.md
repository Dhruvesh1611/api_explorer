# API Explorer

A modern, full-screen React application that allows you to explore and visualize data from various public APIs. Built with React, Redux Toolkit, and Vite.

![API Explorer Preview](https://raw.githubusercontent.com/Dhruvesh1611/api_explorer/main/src/assets/api_explorer.png)


## 🚀 Features

- **Multiple API Integration**: Explore data from 5 different public APIs
- **Full-Screen Layout**: Modern, responsive design that utilizes the entire viewport
- **Card-Based Display**: Beautiful card layout with 4-column grid on desktop
- **Image Support**: Display images, avatars, and sprites from APIs
- **Real-time Data**: Fetch fresh data with a single click
- **Error Handling**: Graceful error handling with retry functionality
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile.

## 📡 Available APIs

### 1. **Pokémon API**
- Fetches 20 Pokémon with their sprites
- Displays Pokémon names and numbers
- Shows actual Pokémon sprite images

### 2. **GitHub Users API**
- Shows GitHub users with profile avatars
- Displays usernames and account types
- Links to GitHub profiles

### 3. **JSON Placeholder Posts**
- Displays blog posts with titles and content
- Shows user IDs and post bodies
- Perfect for testing and development

### 4. **Random User API**
- Shows 8 random users with profile pictures
- Displays full names and email addresses
- Real user data for testing

### 5. **Dog Images API**
- Fetches 6 random dog images
- High-quality dog photos
- Perfect for image gallery testing

## 🛠️ Technologies Used

- **React 18** - Modern React with hooks
- **Redux Toolkit** - State management
- **Vite** - Fast build tool and dev server
- **CSS3** - Custom styling with responsive design
- **Fetch API** - For making HTTP requests

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/api-explorer.git
   cd api-explorer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🎯 Usage

1. **Select an API** from the dropdown menu
2. **Click "Fetch Data"** to load the latest data
3. **View the results** in beautiful card format
4. **Explore the raw JSON** response below the cards

## 📱 Responsive Design

- **Desktop (1400px+)**: 4 cards per row
- **Large Tablets (1000px-1400px)**: 3 cards per row
- **Small Tablets (768px-1000px)**: 2 cards per row
- **Mobile (480px and below)**: 1 card per row

## 🎨 Features in Detail

### Card Layout
- **Header**: Number badge, title, and subtitle
- **Image**: Profile pictures, avatars, or content images
- **Content**: Text content for posts
- **Footer**: External links (where applicable)

### Error Handling
- **Loading States**: Shows loading spinner during API calls
- **Error Messages**: Displays user-friendly error messages
- **Retry Functionality**: Easy retry button for failed requests
- **Image Fallbacks**: Graceful handling of failed image loads

### API Integration
- **CORS Handling**: Works with public APIs
- **Response Parsing**: Handles different API response formats
- **Data Transformation**: Converts API responses to card format

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`

### Deploy to Netlify
1. Build the project: `npm run build`
2. Drag the `dist` folder to Netlify

## 📁 Project Structure

```
api-explorer/
├── public/
├── src/
│   ├── assets/
│   ├── redux/
│   │   ├── dataSlice.js
│   │   └── store.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── package.json
├── vite.config.js
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [PokeAPI](https://pokeapi.co/) for Pokémon data
- [GitHub API](https://developer.github.com/) for user data
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for test data
- [RandomUser.me](https://randomuser.me/) for user profiles
- [Dog CEO](https://dog.ceo/) for dog images

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Made with ❤️ using React and Vite**
