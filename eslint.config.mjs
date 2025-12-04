import nx from '@nx/eslint-plugin';

export default [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist', '**/out-tsc', '**/.next'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      // 🚫 PROIBIÇÃO TOTAL DE ANY
      '@typescript-eslint/no-explicit-any': 'error',

      // Regras de Boundaries (Arquitetura DDD)
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: 'scope:store',
              onlyDependOnLibsWithTags: ['scope:marketing', 'scope:catalogo', 'scope:fidelidade', 'scope:shared']
            },
            {
              sourceTag: 'scope:marketing',
              onlyDependOnLibsWithTags: ['scope:marketing', 'scope:shared']
            },
            {
              sourceTag: 'scope:catalogo',
              onlyDependOnLibsWithTags: ['scope:catalogo', 'scope:shared']
            },
            {
              sourceTag: 'scope:fidelidade',
              onlyDependOnLibsWithTags: ['scope:fidelidade', 'scope:shared']
            },
            {
              sourceTag: 'scope:shared',
              onlyDependOnLibsWithTags: ['scope:shared']
            },
            {
              sourceTag: 'type:feature',
              onlyDependOnLibsWithTags: ['type:data-access', 'type:ui', 'type:util']
            },
            {
              sourceTag: 'type:data-access',
              onlyDependOnLibsWithTags: ['type:util']
            },
            {
              sourceTag: 'type:ui',
              onlyDependOnLibsWithTags: ['type:ui', 'type:util']
            },
            {
              sourceTag: 'type:util',
              onlyDependOnLibsWithTags: ['type:util']
            }
          ],
        },
      ],
    },
  },
];
