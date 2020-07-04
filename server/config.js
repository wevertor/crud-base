const config = {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || "feijaozin",
  mongoUri:
    process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    "mongodb://" +
      (process.env.IP || "localhost") +
      ":" +
      (process.env.MONGO_PORT || "27017") +
      "/crud",
};

export default config;
