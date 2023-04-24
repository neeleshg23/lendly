export const getUserFromLocalStorage = () => {
    const userFromLocalStorage = localStorage.getItem('user');
    if (userFromLocalStorage) {
      return JSON.parse(userFromLocalStorage);
    }
    return null;
  };
  
  export const setUserToLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };
  
  export const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user');
  };
  