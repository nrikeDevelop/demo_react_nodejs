import React, { Component } from 'react'
import BCard from './common/BCard'
import loading from '../assets/loading.gif'
import Card from 'react-bootstrap/Card'
import AOS from 'aos'
import Swal from 'sweetalert2'
import Button from 'react-bootstrap/Button'
import 'aos/dist/aos.css'
import '../assets/styles.css'
import 'sweetalert2/src/sweetalert2.scss'
const constants = require('./common/Constants.js')

class News extends Component {
  constructor(props) {
    super(props)

    this.updateCallback = this.updateCallback.bind(this);

    AOS.init({
      duration: 800
    })

    this.state = {
      isLoad: false,
      items: []
    }
  }

  fetchData() {
    fetch(constants.URL_GET_NEWS) //  DEFINIR VARIABLE
      .then(response => response.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        // console.log(response.message)
        setTimeout(() => {
          this.setState({ items: response.message })
          this.setState({ isLoad: true })
        }, 400)
      })
  }

  updateItem(id) {
    fetch( constants.URL_UPDATE + id) //  DEFINIR VARIABLE
      .then(response => response.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        Swal.fire({
          title: response.message,
          type: "success"
        })
        this.fetchData();
      })
  }

  componentDidMount() {
    this.fetchData()
  }

  updateCallback(params) {
    this.updateItem(params)
  }

  restoreItems(){
    fetch(constants.URL_RESTORE) //  DEFINIR VARIABLE
    .then(response => response.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      Swal.fire({
        title: response.message,
        type: "success"
      })
      this.fetchData();
    })
  }

  loading(isLoading) {
    if (isLoading) {
      return (
        <div data-aos='fade-in'>
          <Card>
            <img style={{ padding: '20px' }} src={loading} alt='loading...' />
          </Card>
        </div>
      )
    } else {
      if (this.state.items.length === 0) {
        return (
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>The demo is finished</Card.Title>
              <Card.Text>
                Do you want to restore the data to try again?
            </Card.Text>
              <Button variant="primary" onClick={()=>{this.restoreItems()}}>Restore</Button>
            </Card.Body>
          </Card>
        )
      }
    }
  }

  render() {
    return (
      <div className='justify_content'>
        {!this.state.isLoad ? this.loading(true) : this.loading(false)}

        {this.state.items.map((item, i) => {
          return (
            <BCard
              key={i}
              id={item._id}
              title={item.title}
              date={item.date}
              author={item.author}
              content={item.content}
              image={item.img}
              type="info"
              bt_text="Send new to Archive"
              updateCallback={this.updateCallback}
            />
          )
        })}
      </div>
    )
  }
}

export default News
