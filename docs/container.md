# Container

- Surface(`svg`) with resize event.
- Layer(`g`)

## Surface

the svg container.

```jsx
/* vuep */
export default {
  render (h) {
    return (
      <surface width={100} height={100}>
        <rect width={50} height={80} fill={'yellow'}/>
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
      color: 'yellow',
      width: 100
    }
  },
  methods: {
    change () {
      this.color === 'blue' ? this.color = 'yellow' : this.color = 'blue'
    },
    update (width) {
      this.width = width
    }
  },
  destroyed () {

  },
  render (h) {
    return (
      <surface
        height={100}
        onResize={this.update}
        nativeOnClick={this.change}>
        <layer>
          <rect width={this.width} height={100} fill={this.color}/>
        </layer>
      </surface>
    )
  }
}
```
