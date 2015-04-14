import { parse as acornParse } from 'acorn'
import parse from './parse'
import render from './render'

const src = ``

const res = parse(src)

console.log(res.toString())

console.log(render(res))

// console.log(res.toString())

// const parsed = parse(src)
