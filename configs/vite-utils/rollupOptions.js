const rollupOptions = () => {
  return {
    output: {
      chunkFileNames: 'assets/js/[name]-[hash].js',
      entryFileNames: 'assets/js/[name]-[hash].js',
      assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      manualChunks(id) {
        // Проверяем, находится ли файл в node_modules
        if (id.includes('node_modules')) {
          // Разделяем крупные библиотеки по имени
          if (id.includes('vuetify')) return 'vuetify';
          if (id.includes('vue')) return 'vue-core'; // Vue и связанные библиотеки
          if (id.includes('editorjs')) return 'editorjs'; // Editor.js и его плагины
          if (id.includes('axios')) return 'axios';
          if (id.includes('dayjs')) return 'dayjs';
          if (id.includes('pinia')) return 'pinia';
          if (id.includes('v-calendar')) return 'v-calendar';

          // Общий чанк для всех остальных библиотек
          return 'vendor';
        }
      },
    },
  };
};

export default rollupOptions;
