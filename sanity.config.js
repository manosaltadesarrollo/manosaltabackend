import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'cirugiademanos',

  projectId: 'jfc2w9qp', 
  dataset: 'production',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})

import assignNumeroPublicacion from './actions/incrementAction'

export const documentActions = (prev, context) => {
  return (prev.type === 'post') 
    ? [...prev, assignNumeroPublicacion] 
    : prev
}
