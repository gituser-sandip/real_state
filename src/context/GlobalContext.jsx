import { createContext, useState, useContext, useMemo } from 'react';
import { starterProperties } from '../data/mockData';

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [properties, setProperties] = useState(starterProperties);
  const [favorites, setFavorites] = useState([]);

  function toggleFavorite(propertyId) {
    setFavorites((current) =>
      current.includes(propertyId) ? current.filter((id) => id !== propertyId) : [...current, propertyId]
    );
  }

  function addProperty(property) {
    setProperties((current) => [property, ...current]);
  }

  function removeProperty(propertyId) {
    setProperties((current) => current.filter((property) => property.id !== propertyId));
    setFavorites((current) => current.filter((id) => id !== propertyId));
  }

  const favoriteProperties = useMemo(
    () => properties.filter((property) => favorites.includes(property.id)),
    [properties, favorites]
  );

  return (
    <GlobalContext.Provider
      value={{
        properties,
        favorites,
        toggleFavorite,
        favoriteProperties,
        addProperty,
        removeProperty,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
