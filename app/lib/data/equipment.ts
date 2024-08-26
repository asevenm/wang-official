export const fetchTypes = async () => {
  return fetch('http://localhost:3001/instrument/types');
}