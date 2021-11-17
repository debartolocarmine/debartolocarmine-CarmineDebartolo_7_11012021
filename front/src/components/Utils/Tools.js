const BASE_PATH = 'http://localhost'
const BASE_PORT = 4001
const BASE_APP = '/api'

// Fonction qui renvoie l'url du serveur API
export const getBaseApi = (base_app = true) => {
  return BASE_PATH + ':' + BASE_PORT + (base_app ? BASE_APP : '')
}

// Fonction qui renvoie le token de connexion del'utilisateur
export const getUserSession = () => {
  return localStorage.getItem('bear') ? localStorage.getItem('bear') : null;
}

// Fonction qui renvoie les informations utilisateur récuperé lors de la connexion
// Et enregistrer dans la variable "user" du local storage
export const getUserInformation = () => {
  return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
} 

// Fonction qui renvoie l'uid de l'utilisateur logger
export const getCurrentUserUid = () => {
  return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user'))['uid'] : null;
}

// getTimeAgo
// Format date time ago
export const getTimeAgo = (input) => {
  const date = (input instanceof Date) ? input : new Date(input);
  const formatter = new Intl.RelativeTimeFormat('fr');
  const ranges = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1
  };
  const secondsElapsed = (date.getTime() - Date.now()) / 1000;
  for (let key in ranges) {
    if (ranges[key] < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / ranges[key];
      return formatter.format(Math.round(delta), key);
    }
  }
}

// Inserer un ogjet dans un tableau à un index specific
export const insertItem = (arr, index, newItem) => [
  // la part avant l'objet a inserer
  ...arr.slice(0, index),
  // L'objet a insérer
  newItem,
  // La part après l'objet inséré
  ...arr.slice(index)
]

// Suppresion d'un element dans un tableau
export const removeItem = (arr, bid) => {
  return arr.filter((item) => item.bid !== parseInt(bid));
}

// Suppresion d'un element dans un tableau
export const getIndexBillet = (arr, bid) => {
  return arr.findIndex((item) => item.bid === parseInt(bid));
}

