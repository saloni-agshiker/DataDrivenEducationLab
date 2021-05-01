import React from 'react'
import { Bar } from 'react-chartjs-2';

export function BarChart() {
    return (
        <div>
            <Bar
                data = {{
                    labels: ['User #50', 'User #47', 'User #51', 'User #55', 'User #52'],
                    datasets: [
                        {
                            label: '# of posts',
                            xAxisID: "User #",
                            data: [33, 29, 29, 27, 26],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1.5
                        }
                    ]
                    
                }}

                height = {300}
                width = {100}
                options = { {
                    scales: {
                        yAxes: [ {
                            display: true,
                            scaleLabel: {
                              display: true,
                              labelString: '# of Posts'
                            }
                          } ]
                    },
                    maintainAspectRatio: false
                }}
            />
        </div>
    )
}
