import React from 'react';
import Dataset from './Dataset';

class Datasets extends React.Component {
    render() {
        if(this.props.datasets.length > 0)
            return (<div>
                {this.props.datasets.map((ds)=>(
                    <Dataset onDelete={this.props.onDelete} key={ds.id} dataset={ds} />
                ))}
            </div>)
        else 
            return (
                <div className='user'>
                    <h3>Датасетов нет</h3>
                </div>)
    }
}

export default Datasets