import React from 'react'

class Link extends React.Component {
    render() {
        return (
            <img src={this.props.image} />
        ) 
    }
}

export default Link