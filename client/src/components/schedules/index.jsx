import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { format, utcToZonedTime } from 'date-fns-tz'
import Slider from 'react-slick'

import { func, string } from 'prop-types'

import Bot from '../bot'

import { Sleep } from '../../helpers'

import { ActiveButton, Body, Bold, Calendar, CancelButton, Container, Header, Item, NextArrow, Option, PrevArrow, Row, Text } from './style'

import './slide.scss'

const Schedules = () => {
  const history = useHistory()
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

  const handleSchedule = (active, id) => {
    if (!active) return history.push(`/inativar/${id}`)
    return history.push(`/ativar/${id}`)
  }

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
                    <Row><Text body='true'><Bold>Id:</Bold> {el.id}</Text></Row>
                    <Row><Text body='true'><Bold>Email:</Bold> {el.user}</Text></Row>
                    <Row><Text body='true'><Bold>Data:</Bold> {format(utcToZonedTime(new Date(el.date), 'America/Sao_paulo'), 'dd/MM/yy, HH:mm')} </Text></Row>
                    <Row><Text body='true'><Bold>Estação:</Bold> {el.station}</Text></Row>
                    <Row><Text body='true'><Bold>Status:</Bold> {el.status}</Text></Row>
                  </Body>
                  <Row>
                    {el.status === 'Aguardando confirmação' && <ActiveButton onClick={() => handleSchedule(true, el.id)}>Ativar agendamento</ActiveButton>}
                    {el.status === 'Ativo' && <CancelButton onClick={() => handleSchedule(false, el.id)}>Cancelar agendamento</CancelButton>}
                  </Row>
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
