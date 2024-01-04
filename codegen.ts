import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: './src/api/schema/schema.graphql',
  documents: ['src/api/requests/*.graphql'],
  ignoreNoDocuments: true,
  emitLegacyCommonJSImports: false,
  generates: {
    './src/api/__generated__/graphql.ts': {
      config: {
        useTypeImports: true,
        skipTypename: true,
      },
      plugins: ['typescript', 'typescript-operations', 'typescript-vue-apollo'],
    },
  },
}
export default config
