import React, { Component } from 'react'
import SocketHelper from '../../SocketHelper'

class Home extends Component {

    handleMessage = (e) => {
        console.log(e)
    }


    render() {
        return (
            <div>
                <SocketHelper onMessage={this.handleMessage}></SocketHelper>
            </div>
        )
    }
}

export default Home