import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { object } from 'prop-types'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { Schedule } from '../../helpers'
import { Overlay } from './style'

const inactive = ({ params }) => {
  const history = useHistory()
  const SwalAlert = withReactContent(Swal)

  const handleSchedule = () => {
    const handleData = async () => {
      try {
        await Schedule.inactive(params)
        await SwalAlert.fire({
          icon: 'success',
          text: 'Agendamento cancelado com sucesso!'
        })
      } catch (err) {
        await SwalAlert.fire({
          icon: 'error',
          text: `Houve um erro ao processar o seu agendamento. Tente novamente mais tarde. ${err}`
        })
      }
      history.push('/')
    }
    handleData()
  }

  useEffect(() => handleSchedule())
  return (
    <Overlay />
  )
}

inactive.propTypes = {
  params: object
}

export default inactive
