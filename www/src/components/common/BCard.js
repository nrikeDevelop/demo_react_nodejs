import React, { Component } from 'react'
import Card from 'react-bootstrap/Card'
import '../../assets/styles.css'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCalendar } from '@fortawesome/free-solid-svg-icons'
import dateFormat from 'dateformat'

import AOS from 'aos'
import 'aos/dist/aos.css'

class BCard extends Component {
  constructor(props) {
    super(props)

    AOS.init({
      duration: 800
    })
  }

  formatDate(date) {
    var timestamp = new Date(date).getTime()
    var newDate = dateFormat(timestamp * 1000, 'dd/mm/yy h:MM:ss TT')
    return newDate
  }

  sendToArchive(id) {
    this.props.updateCallback(id)
  }

  render() {
    return (
      <Card className='card_container' data-aos='fade-in'>
        <Card.Img variant='top' src={this.props.image} />
        <Card.Body>
          <Card.Title>{this.props.title}</Card.Title>
          <Card.Subtitle className='mb-2 text-muted'>
            <FontAwesomeIcon icon={faCalendar} className='cIcon' />
            {this.formatDate(this.props.date)}
          </Card.Subtitle>
          <Card.Subtitle className='mb-2 text-muted'>
            <FontAwesomeIcon icon={faUser} className='cIcon' />
            {this.props.author}
          </Card.Subtitle>

          <Card.Text>{this.props.content}</Card.Text>
          <Button
            variant={this.props.type}
            onClick={() => {
              this.sendToArchive(this.props.id)
            }}
          >
            {this.props.bt_text}
          </Button>
        </Card.Body>
      </Card>
    )
  }
}

export default BCard
