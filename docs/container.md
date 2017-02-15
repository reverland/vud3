# Container

- Surface(`svg`)
- Layer(`g`)

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
