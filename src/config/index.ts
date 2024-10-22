const envConfig = {
  imageBB: import.meta.env.VITE_IMGBB_KEY as string // TypeScript should now recognize this correctly
};

export default envConfig;
