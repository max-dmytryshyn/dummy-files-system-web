const getParentPath = (path: string) => {
  const normalizedPath = path.endsWith("/") ? path.slice(0, -1) : path;
  return normalizedPath.slice(0, normalizedPath.lastIndexOf("/"));
};

export default getParentPath;
