'use strict'

import React from 'react'

import { Balloon, Container, Content, Icon, Image, Option, Row } from './style'

const options = [
  {
    label: 'option 1',
    value: {
      input: {
        text: 'Agendamento RG'
      }
    }
  }, {
    label: 'option 1',
    value: {
      input: {
        text: 'Agendamento RG'
      }
    }
  }, {
    label: 'option 1',
    value: {
      input: {
        text: 'Agendamento RG'
      }
    }
  }
]

const Options = () => {
  return (
    <Row>
      <Content>
        <Icon>
          <Image />
        </Icon>
        <Balloon>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </Balloon>
      </Content>
      {
        options && (
          <Container>
            {
              options.map(({ value }, i) => (
                <Option key={i}>
                  {value.input.text}
                </Option>
              ))
            }
          </Container>
        )
      }
    </Row>
  )
}

export default Options
