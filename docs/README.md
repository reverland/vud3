# Vud3

Writing d3 shape in a declarative way

## Surface

the svg container.

```jsx
/* vuep */
export default {
  render (h) {
    return (
      <surface width={100} height={100} style="background: black">
      </surface>
    )
  }
}
```

## Layer

```jsx
/* vuep */
export default {
  data () {
    return {
      color: 'yellow'
    }
  },
  methods: {
    change () {
      this.color = 'blue'
    }
  },
  render (h) {
    return (
      <surface width={100} height={100} style={{ background: this.color }}>
        <layer
          on={{ click: this.change}}
          transform="translate(50, 50)">
          <text>hello</text>
        </layer>
      </surface>
    )
  }
}
```

## Curve

```jsx
/* vuep */
export default {
  render (h) {
    return (
      <surface width={100} height={100}>
        <layer>
          <curve
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
