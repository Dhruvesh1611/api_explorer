import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchData, clearData } from "./redux/dataSlice";
import "./App.css";

function App() {
  const [selectedApi, setSelectedApi] = useState("https://pokeapi.co/api/v2/pokemon?limit=10");
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.data);

  // API options with labels and URLs
  const apiOptions = [
    { label: "Pokémon API", url: "https://pokeapi.co/api/v2/pokemon?limit=20" },
    { label: "GitHub Users API", url: "https://api.github.com/users" },
    { label: "JSON Placeholder Posts", url: "https://jsonplaceholder.typicode.com/posts" },
    { label: "Random User API", url: "https://randomuser.me/api/?results=8&inc=picture,name,email" },
    { label: "Dog Images API", url: "https://dog.ceo/api/breeds/image/random/6" }
  ];

  const handleApiChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedApi(selectedValue);
  };

  // Function to handle fetching data
  const handleFetchData = () => {
    dispatch(clearData());
    dispatch(fetchData(selectedApi));
  };

  // Function to render image gallery
  const renderImageGallery = (data) => {
    if (!data) return null;

    let images = [];
    
    // Handle different API response formats
    if (data.message && Array.isArray(data.message)) {
      // Dog API format
      images = data.message.map((url, index) => ({ url, id: index }));
    } else if (Array.isArray(data) && data[0]?.url) {
      // Cat API format
      images = data.map((item, index) => ({ url: item.url, id: index }));
    } else if (data.results && Array.isArray(data.results)) {
      // Random User API format
      images = data.results.map((user, index) => ({ 
        url: user.picture?.large || user.picture?.medium, 
        id: index,
        title: `${user.name?.first} ${user.name?.last}` 
      }));
    }

    if (images.length === 0) return null;

    // return (
    //   <div className="image-gallcery">
    //     <h3>Image Gallery</h3>
    //     <div className="gallery-grid">
    //       {images.map((image) => (
    //         <div key={image.id} className="image-card">
    //           {/* <img 
    //             // src={image.url} 
    //             // alt={image.title || `Image ${image.id + 1}`}
    //             // className="ga,mllery-image"
    //             onError={(e) => {
    //               e.target.style.display = 'none';
    //               e.target.nextSibling.style.display = 'block';
    //             }}
    //           /> */}
    //           <div className="image-fallback" style={{ display: 'none' }}>
    //             <p>Image failed to load</p>
    //           </div>
    //           {image.title && <p className="image-title">{image.title}</p>}
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // );
  };



  // Function to format Pokémon data into a list of names
  const renderPokemonList = (data) => {
    if (!data || !data.results) return null;
    
    return (
      <div className="pokemon-list">
        <h3>Pokémon List</h3>
        <ul>
          {data.results.map((pokemon, index) => (
            <li key={pokemon.name} className="pokemon-item">
              <span className="pokemon-number">#{index + 1}</span>
              <span className="pokemon-name">{pokemon.name}</span>
              <a 
                href={pokemon.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="pokemon-details-link"
              >
                View Details
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Function to render data in boxes
  const renderDataInBoxes = () => {
    if (!data) return null;

    let items = [];
    
    // Handle different API response formats
    if (data.results && Array.isArray(data.results)) {
      // Pokémon API and Random User API
      items = data.results.map((item, index) => {
        if (selectedApi.includes('pokeapi.co')) {
          // Pokémon data with images only
          const pokemonId = item.url.split('/').filter(Boolean).pop();
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;
          return {
            id: pokemonId,
            title: item.name,
            subtitle: `#${pokemonId}`,
            image: imageUrl,
            type: 'pokemon'
          };
        } else {
          // Random User data
          return {
            id: index + 1,
            title: `${item.name?.first} ${item.name?.last}`,
            subtitle: item.email,
            image: item.picture?.large,
            type: 'user'
          };
        }
      });
    } else if (Array.isArray(data)) {
      // GitHub Users API and JSON Placeholder Posts
      items = data.map((item, index) => {
        if (selectedApi.includes('github.com')) {
          // GitHub Users
          return {
            id: index + 1,
            title: item.login,
            subtitle: item.type,
            image: item.avatar_url,
            url: item.html_url,
            type: 'github-user'
          };
        } else {
          // JSON Placeholder Posts
          return {
            id: item.id,
            title: item.title,
            subtitle: `User ID: ${item.userId}`,
            content: item.body,
            type: 'post'
          };
        }
      });
    } else if (data.message && Array.isArray(data.message)) {
      // Dog API
      items = data.message.map((url, index) => ({
        id: index + 1,
        title: `Dog Image ${index + 1}`,
        subtitle: 'Random dog image',
        image: url,
        type: 'dog'
      }));
    } else if (Array.isArray(data) && data[0]?.url) {
      // Cat API
      items = data.map((item, index) => ({
        id: index + 1,
        title: `Cat Image ${index + 1}`,
        subtitle: 'Random cat image',
        image: item.url,
        type: 'cat'
      }));
    } else if (Array.isArray(data) && data.length > 0) {
      // Fallback for cat API if structure is different
      items = data.map((item, index) => ({
        id: index + 1,
        title: `Cat Image ${index + 1}`,
        subtitle: 'Random cat image',
        image: item.url || item.webpurl || item.id,
        type: 'cat'
      }));
    }

    if (items.length === 0) {
      return (
        <div className="data-display">
          <h3>API Response</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      );
    }

    return (
      <div className="data-display">
        <h3>Data Cards</h3>
        <div className="data-grid">
          {items.map((item) => (
            <div key={item.id} className="data-card">
              <div className="card-header">
                <span className="card-number">#{item.id}</span>
                <h4 className="card-title">{item.title}</h4>
                {item.subtitle && <p className="card-subtitle">{item.subtitle}</p>}
              </div>
              
              {item.image && (
                <div className="card-image">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="card-img"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'block';
                    }}
                  />
                  <div className="image-fallback" style={{ display: 'none' }}>
                    <p>Image failed to load</p>
                  </div>
                </div>
              )}
              
              {item.content && (
                <div className="card-content">
                  <p>{item.content}</p>
                </div>
              )}
              
              {item.url && item.type !== 'pokemon' && (
                <div className="card-footer">
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="card-link"
                  >
                    View Details
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="json-data">
          <h3>Raw API Response</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      </div>
    );
  };

  // Function to render data based on API type
  const renderData = () => {
    if (!data) return null;
    
    return renderDataInBoxes();
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>API Explorer</h1>
        <p>Select an API endpoint from the dropdown and click the fetch button to see the results</p>
      </div>

      <div className="control-panel">
        <div className="select-container">
          <label htmlFor="api-select">Choose API:</label>
          <select 
            id="api-select"
            value={selectedApi} 
            onChange={handleApiChange}
            className="api-select"
          >
            {apiOptions.map(api => (
              <option key={api.url} value={api.url}>
                {api.label}
              </option>
            ))}
          </select>
        </div>

        <button 
          className="fetch-button"
          onClick={handleFetchData}
          disabled={loading}
        >
          {loading ? "Loading..." : "Fetch Data"}
        </button>
      </div>

      <div className="result-container">
        {loading && <div className="loader"></div>}
        
        {error && (
          <div className="error-message">
            <h3>Error</h3>
            <p>{error}</p>
            <button 
              className="retry-button" 
              onClick={handleFetchData}
            >
              Retry
            </button>
          </div>
        )}
        
        {data && !loading && !error && renderData()}
      </div>
    </div>
  );
}

export default App;
