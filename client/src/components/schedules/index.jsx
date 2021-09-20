import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Slider from 'react-slick'
import { format, utcToZonedTime } from 'date-fns-tz'

import Bot from '../bot'

import { Sleep } from '../../helpers'

import { Body, Bold, Button, Calendar, Container, Header, Item, Option, Row, Text } from './style'

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

  const handleSlideOptions = active => {
    setSlideOptions(true)
    setSlidingOptions(active)
  }

  const settings = {
    arrows: false,
    dots: false,
    infinite: false,
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

  return (
    <>
      <Container>
        <Slider ref={slideRef} {...settings}>
          <Item key={1}>
            <Option>
              <Header>
                <Calendar />
                <Text title='true'>Biometria</Text>
              </Header>
              <Body>
                <Row><Text body='true'><Bold>Identificador:</Bold> foo@bar.com</Text></Row>
                <Row><Text body='true'><Bold>Email:</Bold> foo@bar.com</Text></Row>
                <Row><Text body='true'><Bold>Data:</Bold> {new Date().toLocaleDateString()}</Text></Row>
                <Row><Text body='true'><Bold>Estacao:</Bold> Betina</Text></Row>
                <Row><Text body='true'><Bold>Status:</Bold> aguardando confirmacao</Text></Row>
                <Row end='true'>
                  <Button error='true'>Cancelar</Button>
                  <Button success='true'>Confirmar</Button>
                </Row>
              </Body>
            </Option>
          </Item>
        </Slider>
      </Container>
      <Bot content={{ text: 'Ainda precisa de ajuda?' }} time={format(utcToZonedTime(new Date(), 'America/Sao_paulo'), 'HH:mm')} />
    </>
  )
}

export default Schedules
