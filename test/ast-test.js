import assert from 'assert'
import {
	AssignmentProperty, ArrayExpression, ArrayPattern, ArrowFunctionExpression,
	AssignmentExpression, BinaryExpression, BlockStatement, BreakStatement, CallExpression,
	CatchClause, ClassBody, ClassDeclaration, ConditionalExpression,
	ContinueStatement, DebuggerStatement, DoWhileStatement, EmptyStatement, ExpressionStatement,
	ExportSpecifier, ExportNamedDeclaration, ExportDefaultDeclaration, ExportAllDeclaration,
	ForStatement, ForInStatement, ForOfStatement, FunctionDeclaration, FunctionExpression,
	Identifier, IfStatement, ImportDeclaration, ImportSpecifier, ImportDefaultSpecifier,
	ImportNamespaceSpecifier, LabeledStatement, Literal, LogicalExpression, MemberExpression,
	MethodDefinition, NewExpression, ObjectExpression, ObjectPattern, Property, RestElement,
	ReturnStatement, SequenceExpression, SwitchCase, SwitchStatement, ThisExpression,
	ThrowStatement, TryStatement, UpdateExpression, UnaryExpression, VariableDeclarator,
	VariableDeclaration, WhileStatement, YieldExpression } from '../dist/ast'
import fromJson from '../dist/fromJson'
import parse from '../dist/parse'
import render, { renderWithSourceMap } from '../dist/render'
import { dedent } from '../dist/private/util'
import { equal } from './util'

const
	a = Identifier('a'), b = Identifier('b'), c = Identifier('c'),
	one = Literal(1), two = Literal(2),
	doOne = ExpressionStatement(one), blockDoOne = BlockStatement([ doOne ]),
	emptyFun = FunctionExpression(null, [ ], BlockStatement([ ])),
	litA = Literal('a')

const tests = {
	EmptyStatement: {
		src: `
			{
				;
				1
			}`,
		ast: BlockStatement([ EmptyStatement(), doOne ])
	},
	BlockStatement: { src: '{}', ast: BlockStatement([ ]) },
	ExpressionStatement: {
		src: `
			{
				1
			}`,
		ast: blockDoOne
	},
	IfStatement: [
		{
			src: `
				if(1){
					1
				} else {
					1
				}`,
			ast: IfStatement(one, blockDoOne, blockDoOne)
		},
		{
			src: 'if(1)1; else 1',
			ast: IfStatement(one, doOne, doOne)
		}
	],
	LabeledStatement: {
		src: 'a:1',
		ast: LabeledStatement(a, ExpressionStatement(one))
	},
	BreakStatement: [
		{
			src: 'while(1)break',
			ast: WhileStatement(one, BreakStatement())
		},
		{
			src: 'a:while(1)break a',
			ast: LabeledStatement(a, WhileStatement(one, BreakStatement(a)))
		}
	],
	ContinueStatement: [
		{
			src: 'while(1)continue',
			ast: WhileStatement(one, ContinueStatement())
		},
		{
			src: 'a:while(1)continue a',
			ast: LabeledStatement(a, WhileStatement(one, ContinueStatement(a)))
		}
	],
	SwitchStatement: {
		src: `
			switch(1){
				case 1:
					1;
					1
				default:{
					1
				}
			}`,
		ast: SwitchStatement(one, [
			SwitchCase(one, [ doOne, doOne ]),
			SwitchCase(undefined, [ blockDoOne ])
		])
	},
	ReturnStatement: [
		{
			src: `
				()=>{
					return
				}`,
			ast: ArrowFunctionExpression([], BlockStatement([ ReturnStatement() ]))
		},
		{
			src: `
				()=>{
					return 1
				}`,
			ast: ArrowFunctionExpression([], BlockStatement([ ReturnStatement(one) ]))
		}
	],
	ThrowStatement: {
		src: 'throw 1',
		ast: ThrowStatement(one)
	},
	TryStatement: {
		src: `
			try {
				1
			}catch(err){
				1
			}finally{
				1
			}`,
		ast: TryStatement(
			BlockStatement([ doOne ]),
			CatchClause(Identifier('err'), blockDoOne),
			blockDoOne)
	},
	WhileStatement: {
		src: 'while(1)1',
		ast: WhileStatement(one, doOne)
	},
	DoWhileStatement: {
		src: `
			do {
				1
			} while(1)`,
		ast: DoWhileStatement(blockDoOne, one)
	},
	ForStatement: [
		{
			src: 'for(;;){}',
			ast: ForStatement(null, null, null, BlockStatement([ ]))
		},
		{
			src: 'for(let a=0;(a<10);a++)1',
			ast: ForStatement(
				VariableDeclaration('let', [ VariableDeclarator(a, Literal(0)) ]),
				BinaryExpression('<', a, Literal(10)),
				UpdateExpression('++', a, false),
				doOne)
		}
	],
	ForInStatement: {
		src: 'for(a in b)1',
		ast: ForInStatement(a, b, doOne)
	},
	ForOfStatement: {
		src: 'for(a of b)1',
		ast: ForOfStatement(a, b, doOne)
	},
	DebuggerStatement: { src: 'debugger', ast: DebuggerStatement() },
	FunctionDeclaration: [
		{
			src: 'function a(b){}',
			ast: FunctionDeclaration(a, [ b ], BlockStatement([]), false)
		},
		{
			src: 'function* a(b){}',
			ast: FunctionDeclaration(a, [ b ], BlockStatement([]), true)
		}
	],
	VariableDeclaration: [
		{
			src: 'var a',
			ast: VariableDeclaration('var', [ VariableDeclarator(a) ])
		},
		{
			src: 'let a=1,b',
			ast: VariableDeclaration('let', [ VariableDeclarator(a, one), VariableDeclarator(b) ])
		},
		{
			src: 'const a=1',
			ast: VariableDeclaration('const', [ VariableDeclarator(a, one) ])
		}
	],

	ThisExpression: { src: 'this', ast: ThisExpression() },
	ArrayExpression: [
		{
			src: '[]',
			ast: ArrayExpression([])
		},
		{
			src: '[1,2]',
			ast: ArrayExpression([ one, two ])
		}
	],
	ObjectExpression: [
		{
			// Call it or it will be confused for a BlockStatement
			src: 'a({})',
			ast: CallExpression(a, [ ObjectExpression([ ]) ])
		},
		{
			src: `
				a({
					a:1,
					get b(){
						1
					},
					set "c"(){
						1
					}
				})`,
			ast: CallExpression(a, [
				ObjectExpression([
					Property('init', a, one),
					Property('get', b,
						FunctionExpression(null, [ ], blockDoOne)),
					Property('set', Literal('c'),
						FunctionExpression(null, [ ], blockDoOne))
				])
			])
		}
	],
	ArrowFunctionExpression: [
		{
			src: '()=>1',
			ast: ArrowFunctionExpression([], one)
		},
		{
			src: 'a=>1',
			ast: ArrowFunctionExpression([ a ], one)
		},
		{
			src: '(a,b)=>1',
			ast: ArrowFunctionExpression([ a, b ], one)
		},
		{
			src: `
				()=>{
					1
				}`,
			ast: ArrowFunctionExpression([], blockDoOne)
		}
	],
	SequenceExpression: {
		src: 'a,b',
		ast: SequenceExpression([ a, b ])
	},
	UnaryExpression: [
		{
			src: 'typeof a',
			ast: UnaryExpression('typeof', a)
		},
		{
			src: '- - 1',
			ast: UnaryExpression('-', UnaryExpression('-', one))
		}
	],
	BinaryExpression: {
		src: '((a+b) instanceof c)',
		ast: BinaryExpression('instanceof', BinaryExpression('+', a, b), c)
	},
	AssignmentExpression: {
		src: 'a+=1',
		ast: AssignmentExpression('+=', a, one)
	},
	UpdateExpression: [
		{
			src: '++a',
			ast: UpdateExpression('++', a, true)
		},
		{
			src: 'a--',
			ast: UpdateExpression('--', a, false)
		}
	],
	LogicalExprsession: {
		src: '(a||b)',
		ast: LogicalExpression('||', a, b)
	},
	ConditionalExpression: {
		src: 'a?b:c',
		ast: ConditionalExpression(a, b, c)
	},
	NewExpression: [
		{
			src: 'new a()',
			ast: NewExpression(a, [ ])
		},
		{
			src: 'new a(b)',
			ast: NewExpression(a, [ b ])
		}
	],
	CallExpression: {
		src: 'a(b)',
		ast: CallExpression(a, [ b ])
	},
	MemberExpression: [
		{
			src: 'a.b',
			ast: MemberExpression(a, b, false)
		},
		{
			src: 'a[1]',
			ast: MemberExpression(a, one, true)
		}
	],
	YieldExpression: {
		src: `
			function* a(){
				(yield 1);
				(yield* 2)
			}`,
		ast: FunctionDeclaration(
			a,
			[ ],
			BlockStatement([
				ExpressionStatement(YieldExpression(one, false)),
				ExpressionStatement(YieldExpression(two, true)) ]),
			true)
	},
	Literal: [
		{
			src: '1',
			ast: one
		},
		{
			src: '1.5',
			ast: Literal(1.5)
		},
		{
			src: '"a\\nb\\u2029"',
			ast: Literal('a\nb\u2029')
		},
		{
			src: 'true',
			ast: Literal(true)
		},
		{
			src: 'null',
			ast: Literal(null)
		}
	],

	ObjectPattern: {
		src: 'const {a,b:c}=a',
		ast: VariableDeclaration('const', [
			VariableDeclarator(
				ObjectPattern([
					AssignmentProperty(a),
					AssignmentProperty(b, c)
				]),
				a)
		])
	},
	ArrayPattern: {
		src: 'const [{a},...b]=a',
		ast: VariableDeclaration('const', [
			VariableDeclarator(
				ArrayPattern([
					ObjectPattern([ AssignmentProperty(a) ]),
					RestElement(b)
				]),
				a)
		])
	},
	ClassDeclaration: {
		src: `
			class a extends b{
				constructor(){}
				a(){}
				get b(){}
				set c(){}
				static a(){}
				["x"](){}
				static get ["x"](){}
			}`,
		ast: ClassDeclaration(
			a,
			b,
			ClassBody([
				MethodDefinition(Identifier('constructor'), emptyFun, 'constructor', false, false),
				MethodDefinition(a, emptyFun, 'method', false, false),
				MethodDefinition(b, emptyFun, 'get', false, false),
				MethodDefinition(c, emptyFun, 'set', false, false),
				MethodDefinition(a, emptyFun, 'method', true, false),
				MethodDefinition(Literal('x'), emptyFun, 'method', false, true),
				MethodDefinition(Literal('x'), emptyFun, 'get', true, true)
			]))
	},

	ImportSpecifier: {
		src: 'import {a,b as c} from "a"',
		ast: ImportDeclaration([ ImportSpecifier(a), ImportSpecifier(b, c) ], litA)
	},
	ImportNamespaceSpecifier: {
		src: 'import * as a from "a"',
		ast: ImportDeclaration([ ImportNamespaceSpecifier(a) ], litA)
	},
	ImportDefaultSpecifier: {
		src: 'import a from "a"',
		ast: ImportDeclaration([ ImportDefaultSpecifier(a) ], litA)
	},
	ImportDeclaration: {
		src: 'import a,{b} from "a"',
		ast: ImportDeclaration([ ImportDefaultSpecifier(a), ImportSpecifier(b) ], litA)
	},

	ExportNamedDeclaration: [
		{
			src: 'export const a=1',
			ast: ExportNamedDeclaration(
				VariableDeclaration('const', [ VariableDeclarator(a, one) ]),
				[ ],
				null)
		},
		{
			src: 'export {a,b as c} from "a"',
			ast: ExportNamedDeclaration(
				null,
				[ ExportSpecifier(a), ExportSpecifier(c, b) ],
				litA)
		}
	],
	ExportDefaultDeclaration: [
		{
			src: 'export default 1',
			ast: ExportDefaultDeclaration(one)
		},
		{
			src: 'export default function a(){}',
			ast: ExportDefaultDeclaration(FunctionDeclaration(a, [ ], BlockStatement([ ]), false))
		}
	],
	ExportAllDeclaration: {
		src: 'export * from "a"',
		ast: ExportAllDeclaration(litA)
	}
}


const parseProgramBody = src => {
	const program = parse(src, { locations: false })
	assert(program.type === 'Program')
	assert(program.body.length === 1)
	const first = program.body[0]
	return first instanceof ExpressionStatement ? first.expression : first
}

const doTest = ({ src: indentedSrc, ast }) => {
	const src = dedent(indentedSrc)
	const parsedAst = parseProgramBody(src)
	if (!equal(ast, parsedAst)) {
		console.log(ast.toString())
		console.log(parsedAst.toString())
		throw new Error('ASTs are different')
	}

	// Test parse+render with source maps.
	renderWithSourceMap(parse(src), 'in', 'out')

	const rendered = render(ast)
	if (src !== rendered) {
		console.log(`\`${src}\``)
		console.log(`\`${rendered}\``)
		throw new Error('Render is different')
	}
	assert(equal(ast, fromJson(ast.toJSON())))
}

global.describe('roundtrip', () => {
	Object.keys(tests).forEach(key => {
		global.it(key, () => {
			const t = tests[key]
			if (t instanceof Array)
				t.forEach(doTest)
			else
				doTest(t)
		})
	})
})
