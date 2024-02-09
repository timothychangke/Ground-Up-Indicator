import React, { useEffect, useRef } from 'react'

import { CChartLine } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'

const MainChart = () => {
  const chartRef = useRef(null)

  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (chartRef.current) {
        setTimeout(() => {
          chartRef.current.options.scales.x.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          )
          chartRef.current.options.scales.x.grid.color = getStyle('--cui-border-color-translucent')
          chartRef.current.options.scales.x.ticks.color = getStyle('--cui-body-color')
          chartRef.current.options.scales.y.grid.borderColor = getStyle(
            '--cui-border-color-translucent',
          )
          chartRef.current.options.scales.y.grid.color = getStyle('--cui-border-color-translucent')
          chartRef.current.options.scales.y.ticks.color = getStyle('--cui-body-color')
          chartRef.current.update()
        })
      }
    })
  }, [chartRef])

  const random = () => Math.round(Math.random() * 100)
  const TransportationData = [
    random(0, 200),
                random(0, 200),
                random(0, 200),
                random(0, 200),
                random(0, 200),
                random(0, 200),
                random(0, 200),
  ]
  const ElectricityData = [
    random(0, 200),
                random(0, 200),
                random(0, 200),
                random(0, 200),
                random(0, 200),
                random(0, 200),
                random(0, 200),
  ]

  const WasteData =[
    random(0, 200),
                random(0, 200),
                random(0, 200),
                random(0, 200),
                random(0, 200),
                random(0, 200),
                random(0, 200),
  ]
  return (
    <>
      <CChartLine
        ref={chartRef}
        style={{ height: '300px', marginTop: '40px' }}
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'Transportation',
              backgroundColor: `rgba(${getStyle('--cui-info-rgb')}, .1)`,
              borderColor: getStyle('--cui-info'),
              pointHoverBackgroundColor: getStyle('--cui-info'),
              borderWidth: 2,
              data: TransportationData,
            },
            {
              label: 'Electricity',
              backgroundColor: 'transparent',
              borderColor: getStyle('--cui-success'),
              pointHoverBackgroundColor: getStyle('--cui-success'),
              borderWidth: 2,
              data: ElectricityData
            },
            {
              label: 'Waste',
              backgroundColor: 'transparent',
              borderColor: getStyle('--cui-warning'),
              pointHoverBackgroundColor: getStyle('--cui-warning'),
              borderWidth: 2,
              data: WasteData
            },
            {
              label: 'Total',
              backgroundColor: 'transparent',
              borderColor: getStyle('--cui-danger'),
              pointHoverBackgroundColor: getStyle('--cui-danger'),
              borderWidth: 1,
              data: ElectricityData.map((num, index) => num + TransportationData[index] + WasteData[index]),
              fill: true,
            },
          ],
        }}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              grid: {
                color: getStyle('--cui-border-color-translucent'),
                drawOnChartArea: false,
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
            y: {
              border: {
                color: getStyle('--cui-border-color-translucent'),
              },
              grid: {
                color: getStyle('--cui-border-color-translucent'),
              },
              ticks: {
                beginAtZero: true,
                color: getStyle('--cui-body-color'),
                max: 250,
                maxTicksLimit: 5,
                stepSize: Math.ceil(250 / 5),
              },
            },
          },
          elements: {
            line: {
              tension: 0.4,
            },
            point: {
              radius: 0,
              hitRadius: 10,
              hoverRadius: 4,
              hoverBorderWidth: 3,
            },
          },
        }}
      />
    </>
  )
}

export default MainChart
