# Shape

nearly follow d3's functionality.

## Line

```jsx
/* vuep */
let data = new Array(10).fill(0)
data = data.map(_ => {
  return {
		x: Math.floor(Math.random() * 100),
  	y: Math.floor(Math.random() * 100)
	}
})

export default {
  render (h) {
    return (
      <surface width={100} height={100}>
        <layer>
          <v-line
            fill="none"
            stroke="blue"
            curve={'catmullRom'}
            x={p => p.x}
            y={p => p.y}
            curveArgs={{alpha: 0.3}}
            data={data}/>
        </layer>
      </surface>
    )
  }
}
```

## Area

```jsx
/* vuep */
let data = new Array(10).fill(0)
data = data.map((d, i) => {
	return {
  	x: i * 10,
    y: Math.floor(Math.random() * 50)
  }
})

export default {
  render (h) {
    return (
      <surface width={100} height={100}>
        <layer transform="translate(0, 50)">
          <v-area
            x={p=>p.x}
            y1={p=>p.y}
            y0={p=>-p.y}
            fill="yellow"
            stroke="blue"
            curve="monotoneX"
            data={data}/>
        </layer>
      </surface>
    )
  }
}
```

## Arc

```jsx
/* vuep */
let data = new Array(10).fill(0)
data = data.map(d => {
  let innerRadius = Math.floor(Math.random() * 30)
  let startAngle = Math.floor(Math.random() * Math.PI)
  return {
    innerRadius,
    outerRadius: Math.max(Math.floor(Math.random() * 50), innerRadius + 20),
    startAngle,
    endAngle: Math.max(Math.floor(Math.random() * Math.PI * 2), startAngle + Math.PI)
  }
})

export default {
  render (h) {
    return (
      <surface width={100} height={100}>
        <layer transform="translate(50, 50)">
          {
            data.map(d => (
              <v-arc data={d} fill={`rgba(${randNumber()}, ${randNumber()}, ${randNumber()}, 0.5)`}/>
            ))
          }
        </layer>
      </surface>
    )
  }
}

function randNumber() {
  return Math.floor(Math.random() * 256)
}
```

## Pie

Pie or Donut

```jsx
/* vuep */
export default {
  render (h) {
    return (
      <surface width={100} height={100}>
        <layer transform="translate(50,50)">
          <v-pie padAngle={0.06} data={[1,2,3,4]} outerRadius={p => 10 + p.value * 10} innerRadius={8} colors={['red', 'yellow', 'blue', 'green']}/>
        </layer>
      </surface>
    )
  }
}
```

## RadialLine

```jsx
/* vuep */
let data = new Array(10).fill(0)
data = data.map((_, i) => {
  return {
		x: Math.PI * i / 5,
  	y: 30 + ((i % 2 === 0) ? 10 : -10)
	}
})

export default {
  render (h) {
    return (
      <surface width={100} height={100}>
        <layer transform="translate(50, 50)">
          <v-radial-line
            fill="none"
            stroke="blue"
            curve={'linearClosed'}
            angle={p => p.x}
            radius={p => p.y}
            data={data}/>
        </layer>
      </surface>
    )
  }
}
```

## RadialArea

```jsx
/* vuep */
let data = new Array(10).fill(0)
data = data.map((_, i) => {
  return {
		x: Math.PI * i / 5,
  	y: 30 + ((i % 2 === 0) ? 10 : -10)
	}
})

export default {
  render (h) {
    return (
      <surface width={100} height={100}>
        <layer transform="translate(50, 50)">
          <v-radial-area
            fill="none"
            stroke="blue"
            curve={'linearClosed'}
            startAngle={p => p.x}
            endAngle={p => p.x + 1}
            outerRadius={p => p.y}
            innerRadius={p => p.y / 2}
            data={data}/>
        </layer>
      </surface>
    )
  }
}
```
