// module.exports = {
//   root: true,
//   env: {
//     node: true
//   },
//   extends: ['plugin:vue/vue3-essential', 'eslint:recommended'],
//   parserOptions: {
//     parser: 'babel-eslint'
//   }
// }
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-essential', '@vue/standard'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    // 'no-unused-vars': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-unused-vars': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': ['error', 'never']
  }
}
