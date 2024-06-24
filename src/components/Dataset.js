import React from 'react'
import Upload from './Upload/Upload'
import {IoCloseCircleSharp, IoHammerSharp} from 'react-icons/io5'

class Dataset extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editForm: false
        }
    }
    dataset = this.props.dataset
    render() {
        return (
            <div className='dataset'>
                <IoCloseCircleSharp onClick={()=>this.props.onDelete(this.user.id)} className="delete-icon" />
                <IoHammerSharp onClick={()=>this.setState({
                    editForm: !this.state.editForm
                })} className="edit-icon"/>
                <h3>{this.dataset.title}</h3>
                <p>{this.dataset.description}</p>

                {this.state.editForm && <Upload dataset={this.dataset} onAdd={this.props.onEdit}/>}
            </div>
        )
    }
}

export default Dataset