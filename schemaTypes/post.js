// schemaTypes/post.js

export default {
  name: 'post',
  title: 'Publicación',
  type: 'document',
  fields: [
    {
      name: 'numeroPublicacion',
      title: 'Número de publicación',
      type: 'number',
      readOnly: true, // asignado automáticamente
      description: 'Número incremental asignado automáticamente al crear la publicación'
    },
    {
      name: 'fecha',
      title: 'Fecha de publicación',
      type: 'datetime',
      validation: Rule => Rule.required()
    },
    {
      name: 'titulo',
      title: 'Título',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'subtitulo',
      title: 'Subtítulo',
      type: 'string'
    },
    {
      name: 'descripcionBreve',
      title: 'Descripción breve',
      type: 'text',
      description: 'Resumen corto de la publicación',
      validation: Rule => Rule.required().max(200)
    },
    {
      name: 'descripcionCompleta',
      title: 'Descripción completa',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Texto completo de la publicación, con formato (negritas, listas, links, etc.)',
      validation: Rule => Rule.required()
    },
    {
      name: 'foto',
      title: 'Foto (la foto debe ser vertical)',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'estado',
      title: 'Estado de la publicación',
      type: 'string',
      description: 'Controla si la publicación está pendiente, publicada o eliminada',
      options: {
        list: [
          { title: 'Pendiente', value: 'pendiente' },
          { title: 'Publicada', value: 'publicada' },
          { title: 'Eliminada', value: 'eliminada' }
        ],
        layout: 'radio'
      },
      initialValue: 'pendiente',
      validation: Rule => Rule.required()
    }
  ],
  preview: {
    select: {
      title: 'titulo',
      subtitle: 'subtitulo',
      media: 'foto',
      estado: 'estado',
      numero: 'numeroPublicacion'
    },
    prepare(selection) {
      const { title, subtitle, media, estado, numero } = selection
      return {
        title: `#${numero} - ${title} (${estado})`,
        subtitle: subtitle,
        media: media
      }
    }
  }
}
