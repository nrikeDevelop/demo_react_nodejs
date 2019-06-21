import React, { Component } from 'react'
import BCard from './common/BCard'
import loading from '../assets/loading.gif'
import Card from 'react-bootstrap/Card'
import AOS from 'aos'
import Swal from 'sweetalert2'
import newspaper from '../assets/newspaper.png'
import 'sweetalert2/src/sweetalert2.scss'
import '../assets/styles.css'
import 'aos/dist/aos.css'
const constants = require('./common/Constants.js')

class Archive extends Component {
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
    fetch(constants.URL_ARCHIVE) //  DEFINIR VARIABLE
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

  deleteItem(id) {
    fetch(constants.URL_TRASH + id) //  DEFINIR VARIABLE
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
          <div className='justify_content'>
            <div>
              <img alt="no data" style={{ width: '150px' }} src={newspaper} />
            </div>
            <div>
              <span style={{
                color: "white",
                font: "21px"
              }}>
                No news in the archive</span>
            </div>
          </div>
        )
      }
    }
  }

  updateCallback(params) {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.deleteItem(params)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
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
              type="danger"
              bt_text="Delete new"
              updateCallback={this.updateCallback}
            />
          )
        })}
      </div>
    )
  }
}

export default Archive
