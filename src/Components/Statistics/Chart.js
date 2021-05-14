import React from 'react'
import { Line } from 'react-chartjs-2'
import moment from 'moment'

const chartData={
    labels:['Jan','Feb','Mar','Apr','May','Jun'],
    datasets:[
        {
            label:'Total apponintments',
            data:[20,40,50,85,55,30],
            borderColor: ['rgba(255, 206, 86, 0.2)'],
            backgroundColor: ['rgba(255, 206, 86, 0.2)'],
            pointBackgroundColor: 'rgba(255, 206, 86, 0.2)',
            pointBorderColor: 'rgba(255, 206, 86, 0.2)'
        }
    ]
}
function Chart() {

    
    return (
        <div>
            <Line data={chartData}/>
        </div>
    )
}

export default Chart
