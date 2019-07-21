export default (id) => {
  const filename = id
    .split('\\')
    .pop()
    .split('.')
    .shift();

  return filename;
};
