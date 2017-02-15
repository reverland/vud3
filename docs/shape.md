# Shape

nearly follow d3's functionality.

## Line

```jsx
/* vuep */
export default {
  render (h) {
    return (
      <surface width={100} height={100}>
        <layer>
          <v-line
            fill="none"
            stroke="blue"
            curve="catmullRom"
            curveArgs={{alpha: 3}}
            data={[{x:0, y:2}, {x: 20, y: 10}, {x: 50, y: 40}]}/>
        </layer>
      </surface>
    )
  }
}
```

## Area

```jsx
/* vuep */
export default {
  render (h) {
    return (
      <surface width={100} height={100}>
        <layer>
          <v-area
            x={p=>p.x}
            y1={p=>p.y}
            y0={p=>p.y * 2}
            fill="yellow"
            stroke="blue"
            curve="monotoneX"
            data={[{x:0, y:2}, {x: 20, y: 10}, {x: 50, y: 40}]}/>
        </layer>
      </surface>
    )
  }
}
```
