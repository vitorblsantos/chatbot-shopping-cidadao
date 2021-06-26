'use strict'

import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import Slider from 'react-slick'

// import { setMessages, setChatLoaderActive } from '../../store/ducks/chatbot'
// import { addUserInteraction } from '../../store/ducks/user'
import { Container, Item } from './style'

const Options = () => {
  // const dispatch = useDispatch()

  // const { chatbot } = useSelector(state => state)
  const settings = {
    arrows: false,
    dots: false,
    infinite: false,
    slidesToScroll: 1,
    slidesToShow: 2,
    speed: 500
  }

  // const handleOption = (input) => {
  //   dispatch(addUserInteraction('Options', 'handleOption', input))
  //   dispatch(setMessages('user', input.text))
  //   dispatch(setChatLoaderActive(true))
  // }

  return (
    <Container>
      <Slider {...settings}>
        <Item>teste</Item>
        <Item>teste</Item>
        <Item>teste</Item>
      </Slider>
    </Container>
  )
}

export default Options
