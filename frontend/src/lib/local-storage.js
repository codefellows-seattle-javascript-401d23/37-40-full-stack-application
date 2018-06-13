export default () => {
  try {
    const savedUsername = localStorage.getItem('username');
    if (!savedUsername) return {};
    const username = JSON.parse(savedUsername);
    return { username };
  } catch (err) {
    return {};
  }
};
