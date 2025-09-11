import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import path from 'path';

const postcssConfig = (dirname) => {
  return {
    plugins: [tailwindcss(path.resolve(dirname, 'tailwind.config.js')), autoprefixer()],
  };
};

const preprocessorOptions = () => {
  return {
    css: {
      scss: {
        // additionalData: `@import "@/assets/styles/global.scss";`,
        api: "modern-compiler",
      },
    }
  };
};

export { postcssConfig, preprocessorOptions };
