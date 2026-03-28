import { eslint } from '@siberiacancode/eslint';

export default eslint(
  {
    stylistic: true,
    typescript: true,
    react: true,
    jsx: true
  },
  {
    name: 'frontend/rewrite',
    rules: {
      'style/quotes': ['error', 'single', { allowTemplateLiterals: 'always' }],
      'style/object-curly-spacing': ['error', 'always'],
      'siberiacancode-react/display-name': 'off',
      'react/no-array-index-key': 'off',
      'no-restricted-syntax': 'off',
      'import/no-named-default': 'off',
      'sort-jsx-props': 'off'
    }
  }
);
