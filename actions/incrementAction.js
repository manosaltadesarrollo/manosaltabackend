// actions/incrementAction.js
import { useClient } from 'sanity'

export default function assignNumeroPublicacion(next) {
  return async (props) => {
    const { draft, patch } = props
    const client = useClient({ apiVersion: '2025-09-30' })

    // Solo asignar si es un nuevo documento y no tiene numeroPublicacion
    if (!draft.numeroPublicacion) {
      // Obtener el documento contador
      const contadorDoc = await client.fetch('*[_type == "contador"][0]')
      const nuevoNumero = (contadorDoc?.ultimoNumero || 0) + 1

      // Actualizar el post con el nuevo número
      patch.set({ numeroPublicacion: nuevoNumero })

      // Actualizar el contador
      await client
        .patch(contadorDoc._id)
        .set({ ultimoNumero: nuevoNumero })
        .commit()
    }

    return next(props)
  }
}
