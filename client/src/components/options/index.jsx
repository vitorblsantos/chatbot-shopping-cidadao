'use strict'

import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Slider from 'react-slick'

import { Sleep } from '../../helpers'
import { setMessages, setChatLoaderActive, setOptions } from '../../store/ducks/chatbot'
import { addUserInteraction } from '../../store/ducks/user'

import { Container, Item, Option } from './style'

const Options = () => {
  const dispatch = useDispatch()
  const slideRef = useRef(null)
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

  const handleOption = (input) => {
    if (slidingOptions) return false
    dispatch(addUserInteraction('click-option', 'handleOption', input))
    dispatch(setMessages('user', input.text))
    dispatch(setChatLoaderActive(true))
    dispatch(setOptions([]))
  }

  const handleSlideOptions = active => {
    setSlideOptions(true)
    setSlidingOptions(active)
    if (!active) return false
    dispatch(addUserInteraction('slide-options', 'handleSlideOptions'))
  }

  const settings = {
    arrows: false,
    dots: false,
    infinite: false,
    slidesToScroll: 1,
    slidesToShow: 2,
    swipeToSlide: true,
    speed: 300,
    afterChange: () => handleSlideOptions(false),
    beforeChange: () => handleSlideOptions(true)
  }

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
                <Option onClick={() => handleOption(value.input)}>
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
