import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { object } from 'prop-types'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import { Schedule } from '../../helpers'

import { restartFlow } from '../../store/ducks/chatbot'
import { restartToast } from '../../store/ducks/toast'
import { restartUserSchedules } from '../../store/ducks/user'
import { restartWatson } from '../../store/ducks/watson'

import { Overlay } from './style'

const inactive = ({ params }) => {
  const dispatch = useDispatch()
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
        dispatch(restartWatson())
        dispatch(restartUserSchedules())
        dispatch(restartFlow())
        dispatch(restartToast())
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
