const globalVariables = (mode, env) => {
  return {
    '__TPP__': JSON.stringify(env.VITE_TPP_URL),
    '__MODE__': JSON.stringify(mode),
  };
};

export default globalVariables;
