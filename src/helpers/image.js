export default (rule, url = '') => {
  const result = url.match(/(https?:\/\/.*\.(?:png|jpg|jpeg))/i) !== null;
  if (!result) return Promise.reject('Please enter a valid image URL.');
  return Promise.resolve();
};
