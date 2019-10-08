import React, { Component } from 'react'
import PropTypes from 'prop-types'

const Websocket = require('websocket').w3cwebsocket

const SOCKET_ADDRESS = 'ws://localhost:8080'

class Socket extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ws: new Websocket(SOCKET_ADDRESS),
      shouldReconnect: true,
      hasError: false
    }
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  componentDidMount() {
    this._isMounted = true
    try {
      this.initSocket()
    } catch{
      console.error("Uyarı: SerialBridge kapalı olabilir? Ulaşamıyorum.")
    }
  }

  componentWillUnmount() {
    this.setState({
      shouldReconnect: false
    })
    clearTimeout(this.timeout)
    let socket = this.state.ws
    socket.close()
    this._isMounted = false
  }

  initSocket = () => {
    let socket = this.state.ws

    socket.onmessage = (ev) => {
      console.log(ev.data)
      this.props.onMessage(ev.data)
    }

    socket.onclose = () => {
      if (this.state.shouldReconnect && this._isMounted) {
        this.timeout = setTimeout(() => {
          this.setState({
            ws: new Websocket(SOCKET_ADDRESS)
          })
          this.initSocket()
        }, 1000)
      }
    }
  }



  render() {
    return <div style={{ display: 'none' }} > >
    </div>
  }

}

Socket.propTypes = {
  onMessage: PropTypes.func
}

export default Socket