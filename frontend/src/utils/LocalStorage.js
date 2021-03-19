function getItem (key) {
 return JSON.parse(localStorage.getItem(key));
}

function setItem (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function removeItem (key) {
  localStorage.removeItem(key);
}

export { getItem, setItem, removeItem };
