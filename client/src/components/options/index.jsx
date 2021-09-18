import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Slider from 'react-slick'
import { format, utcToZonedTime } from 'date-fns-tz'

import { Sleep } from '../../helpers'
import { setMessages, setChatContext, setChatLoaderActive, setOptions } from '../../store/ducks/chatbot'
import { addUserInteraction, setUserScheduledDate, setUserScheduledStation } from '../../store/ducks/user'

import { Container, Item, Option } from './style'

const Options = () => {
  const dispatch = useDispatch()
  const slideRef = useRef(null)
  const [context, setContext] = useState({})
  const [slideOptions, setSlideOptions] = useState(false)
  const [slidingOptions, setSlidingOptions] = useState(false)
  const { chatbot, user } = useSelector(state => state)

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
    const toISOFormat = dateTimeString => {
      const [date, time] = dateTimeString.split(' ')
      const [DD, MM, YYYY] = date.split('/')
      const [HH, mm] = time.split(':')
      return `${YYYY}-${MM}-${DD}T${HH}:${mm}`
    }
    let canSubmit = true
    context = {
      skills: {
        'main skill': {
          user_defined: {
            ...chatbot.context,
            ...context?.skills['main skill']?.user_defined,
            firstInteraction: false
          }
        }
      }
    }
    dispatch(setChatContext({ firstInteraction: true }, ''))

    const userDefined = context.skills['main skill'].user_defined

    if (userDefined.getDate) {
      if (typeof input.text === 'string') {
        context = {
          skills: {
            'main skill': {
              user_defined: {
                ...context?.skills['main skill']?.user_defined,
                date: toISOFormat(input.text),
                getDate: false
              }
            }
          }
        }
        dispatch(setUserScheduledDate(toISOFormat(input.text)))
        dispatch(setChatContext({ date: toISOFormat(input.text), getDate: false }, ''))
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
        dispatch(setChatContext({ getLocation: false, location: input.value }, ''))
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
        dispatch(setChatContext({ getService: false, service: input.text }, ''))
      } else {
        canSubmit = false
      }
    }

    if (!canSubmit || !input) return false
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
