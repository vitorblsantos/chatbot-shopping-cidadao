import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Slider from 'react-slick'
import { format, utcToZonedTime } from 'date-fns-tz'

import { Message, Schedule, Sleep } from '../../helpers'
import { setMessages, setChatActions, setChatLoaderActive, setOptions } from '../../store/ducks/chatbot'
import { addUserInteraction, setUserScheduledDate, setUserScheduledStation } from '../../store/ducks/user'

import { Container, Item, Option } from './style'

const Options = () => {
  const dispatch = useDispatch()
  const slideRef = useRef(null)
  const [context, setContext] = useState({})
  const [slideOptions, setSlideOptions] = useState(false)
  const [slidingOptions, setSlidingOptions] = useState(false)
  const { chatbot, user, watson } = useSelector(state => state)

  const animateOptions = async () => {
    if (!chatbot.options.length) return false
    if (chatbot.options.length <= 2) return false
    if (!slideRef) return false
    if (slideOptions) return false
    if (user.interactions.description && user.interactions.description.some('slide-option')) return false
    await Sleep(400)
    slideRef.current.slickNext()
    await Sleep(600)
    slideRef.current.slickPrev()
    setSlideOptions(true)
  }

  const handleContext = messages => {
    const lastInteraction = messages[chatbot.messages.length - 1]
    if (!lastInteraction) return false
    setContext({ ...lastInteraction.context })
  }

  const handleOption = (context, input) => {
    if (slidingOptions) return false
    let canSubmit = true
    context = {
      skills: {
        'main skill': {
          user_defined: {
            ...chatbot.actions,
            ...context?.skills['main skill']?.user_defined,
            firstInteraction: false
          }
        }
      }
    }

    const userDefined = context.skills['main skill'].user_defined

    if (userDefined.getDate) {
      if (typeof input.text === 'string') {
        context = {
          skills: {
            'main skill': {
              user_defined: {
                ...context?.skills['main skill']?.user_defined,
                date: new Date(input.text),
                getDate: false
              }
            }
          }
        }
        Schedule.create({ date: new Date(input.text), session: watson.session._id, station: user.scheduledStation, user: user.id })
        dispatch(setUserScheduledDate(new Date(input.text)))
        dispatch(setChatActions({ getDate: false }, ''))
      } else {
        canSubmit = false
      }
    }

    if (userDefined.getLocation) {
      if (typeof input.text === 'string') {
        context = {
          skills: {
            'main skill': {
              user_defined: {
                ...context?.skills['main skill']?.user_defined,
                getLocation: false,
                location: input.value
              }
            }
          }
        }
        dispatch(setUserScheduledStation(input.value))
        dispatch(setChatActions({ getLocation: false }, ''))
      } else {
        canSubmit = false
      }
    }

    if (userDefined.getService) {
      if (typeof input.text === 'string') {
        context = {
          skills: {
            'main skill': {
              user_defined: {
                ...context?.skills['main skill']?.user_defined,
                getService: false,
                service: input.text
              }
            }
          }
        }
        dispatch(setChatActions({ getService: false }, ''))
      } else {
        canSubmit = false
      }
    }

    if (!canSubmit || !input) return false
    Message.create({ content: { context, input, sender: 'user' }, sessionId: watson.session.id })
    dispatch(addUserInteraction('click-option', 'handleOption', input))
    dispatch(setMessages({ content: input.text, context, sender: 'user', time: format(utcToZonedTime(new Date(), 'America/Sao_paulo'), 'HH:mm') }))
    dispatch(setChatLoaderActive(true))
    dispatch(setOptions([]))
  }

  const handleSlideOptions = active => {
    setSlideOptions(true)
    setSlidingOptions(active)
  }

  const settings = {
    arrows: false,
    dots: false,
    infinite: false,
    slidesToScroll: 1,
    slidesToShow: 2,
    swipeToSlide: true,
    speed: 300,
    afterChange: () => slideOptions && handleSlideOptions(false),
    beforeChange: () => slideOptions && handleSlideOptions(true)
  }

  useEffect(() => {
    handleContext(chatbot.messages)
  }, [chatbot.messages])

  useEffect(() => {
    animateOptions()
  }, [chatbot.options])

  return (
    <Container>
      <Slider ref={slideRef} {...settings}>
        {
          chatbot.options.map(({ label, value }, i) => {
            return (
              <Item key={i}>
                <Option onClick={() => handleOption(context, value.input)}>
                  {label}
                </Option>
              </Item>
            )
          })
        }
      </Slider>
    </Container>
  )
}

export default Options
