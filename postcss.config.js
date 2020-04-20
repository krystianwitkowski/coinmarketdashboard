module.exports = ({ env }) => {
  if(env === 'development'){
    return {
      plugins: {
        'postcss-preset-env': {}
      }
    }
  }
  else if(env === 'production'){
    return {
      plugins: {
        'postcss-preset-env': {},
        'postcss-combine-duplicated-selectors': {},
        'postcss-merge-longhand': {},
        'css-mqpacker': {}
      }
    }
  }
}
