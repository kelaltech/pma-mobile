module.exports = {
  client: {
    service: {
      name: 'pma-backend',
      url:
        process.env.GRAPHQL_URL || 'https://pma-backend.kelalapp.com/graphql',
    },
    includes: ['src/**/*.graphql'],
  },
};
