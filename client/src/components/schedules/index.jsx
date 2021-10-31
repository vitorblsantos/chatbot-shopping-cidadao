import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { format, utcToZonedTime } from 'date-fns-tz'
import Slider from 'react-slick'

import { func, string } from 'prop-types'

import Bot from '../bot'

import { Sleep } from '../../helpers'

import { Body, Bold, Calendar, Container, Header, Item, NextArrow, Option, PrevArrow, Row, Text } from './style'

import './slide.scss'

const Schedules = () => {
  const slideRef = useRef(null)
  const [slideOptions, setSlideOptions] = useState(false)
  const [slidingOptions, setSlidingOptions] = useState(false)
  const { user } = useSelector(state => state)

  const animateOptions = async () => {
    if (!slideRef) return false
    if (slideOptions) return false
    if (user.interactions.description && user.interactions.description.some('slide-option')) return false
    await Sleep(400)
    slideRef.current.slickNext()
    await Sleep(600)
    slideRef.current.slickPrev()
    setSlideOptions(true)
  }

  const HandleNextArrow = ({ className, onClick }) => <NextArrow {... { className, onClick }} />

  const HandlePrevArrow = ({ className, onClick }) => <PrevArrow {... { className, onClick }} />

  const handleSlideOptions = active => {
    setSlideOptions(true)
    setSlidingOptions(active)
  }

  const settings = {
    arrows: user.schedules,
    dots: false,
    infinite: false,
    nextArrow: <HandleNextArrow />,
    prevArrow: <HandlePrevArrow />,
    slidesToScroll: 1,
    slidesToShow: 1,
    swipeToSlide: true,
    speed: 300,
    afterChange: () => slideOptions && handleSlideOptions(false),
    beforeChange: () => slideOptions && handleSlideOptions(true)
  }

  useEffect(() => {
    animateOptions()
  }, [])

  useEffect(() => {
    animateOptions()
  }, [slidingOptions.options])

  HandleNextArrow.propTypes = {
    className: string,
    onClick: func
  }

  HandlePrevArrow.propTypes = {
    className: string,
    onClick: func
  }

  return (
    <>
      <Container>
        <Slider ref={slideRef} {...settings}>
          {
            user.schedules && user.schedules.map((el, i) => (
              <Item key={i}>
                <Option>
                  <Header>
                    <Calendar />
                    <Text title='true'>{el.service}</Text>
                  </Header>
                  <Body>
                    <Row><Text body='true'><Bold>Identificador:</Bold> {el.id}</Text></Row>
                    <Row><Text body='true'><Bold>Email:</Bold> {el.user}</Text></Row>
                    <Row><Text body='true'><Bold>Data:</Bold> {format(utcToZonedTime(new Date(el.date), 'America/Sao_paulo'), 'HH:mm')} </Text></Row>
                    <Row><Text body='true'><Bold>Estação:</Bold> {el.station}</Text></Row>
                    <Row><Text body='true'><Bold>Status:</Bold> {el.status}</Text></Row>
                  </Body>
                </Option>
              </Item>
            ))
          }
        </Slider>
      </Container>
      <Bot content={{ text: 'Ainda precisa de ajuda?' }} time={format(utcToZonedTime(new Date(), 'America/Sao_paulo'), 'HH:mm')} />
    </>
  )
}

export default Schedules
