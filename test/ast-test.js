import assert from 'assert'
import {
	AssignmentProperty, ArrayExpression, ArrayPattern, ArrowFunctionExpression,
	AssignmentExpression, BinaryExpression, BlockStatement, BreakStatement, CallExpression,
	CatchClause, ClassBody, ClassDeclaration, ClassExpression, ConditionalExpression,
	ContinueStatement, DebuggerStatement, DoWhileStatement, EmptyStatement, ExpressionStatement,
	ExportSpecifier, ExportNamedDeclaration, ExportDefaultDeclaration, ExportAllDeclaration,
	ForStatement, ForInStatement, ForOfStatement, FunctionDeclaration, FunctionExpression,
	Identifier, IfStatement, ImportDeclaration, ImportSpecifier, ImportDefaultSpecifier,
	ImportNamespaceSpecifier, LabeledStatement, Literal, LogicalExpression, MemberExpression,
	MethodDefinition, NewExpression, ObjectExpression, ObjectPattern, Property, RestElement,
	ReturnStatement, SequenceExpression, SpreadElement, SwitchCase, SwitchStatement,
	TaggedTemplateExpression, TemplateElement, TemplateLiteral, ThisExpression, ThrowStatement,
	TryStatement, UpdateExpression, UnaryExpression, VariableDeclarator, VariableDeclaration,
	WhileStatement, YieldExpression} from '../dist/ast'
import fromJson from '../dist/fromJson'
import render, {renderWithSourceMap} from '../dist/render'
import parse from './parse'
import {equal} from './util'

const
	a = new Identifier('a'), b = new Identifier('b'), c = new Identifier('c'),
	d = new Identifier('d'), e = new Identifier('e'),
	one = new Literal(1), two = new Literal(2),
	doOne = new ExpressionStatement(one), blockDoOne = new BlockStatement([doOne]),
	emptyBlock = new BlockStatement([]),
	emptyFun = new FunctionExpression(null, [], emptyBlock),
	emptyGenFun = new FunctionExpression(null, [], emptyBlock, true),
	emptyFunWithArgA = new FunctionExpression(null, [a], emptyBlock),
	litA = new Literal('a')

const tests = {
	EmptyStatement: {
		src: `
			{
				;
				1
			}`,
		ast: new BlockStatement([new EmptyStatement(), doOne])
	},
	BlockStatement: {src: '{}', ast: new BlockStatement([])},
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
				}`,
			ast: new IfStatement(one, blockDoOne)
		},
		{
			src: `
				if(1){
					1
				} else {
					1
				}`,
			ast: new IfStatement(one, blockDoOne, blockDoOne)
		},
		{
			src: 'if(1)1; else 1',
			ast: new IfStatement(one, doOne, doOne)
		}
	],
	LabeledStatement: {
		src: 'a:1',
		ast: new LabeledStatement(a, new ExpressionStatement(one))
	},
	BreakStatement: [
		{
			src: 'while(1)break',
			ast: new WhileStatement(one, new BreakStatement())
		},
		{
			src: 'a:while(1)break a',
			ast: new LabeledStatement(a, new WhileStatement(one, new BreakStatement(a)))
		}
	],
	ContinueStatement: [
		{
			src: 'while(1)continue',
			ast: new WhileStatement(one, new ContinueStatement())
		},
		{
			src: 'a:while(1)continue a',
			ast: new LabeledStatement(a, new WhileStatement(one, new ContinueStatement(a)))
		}
	],
	SwitchStatement: {
		src: `
			switch(1){
				case 1:
				case 2:
					1;
					1
				default:{
					1
				}
			}`,
		ast: new SwitchStatement(one, [
			new SwitchCase(one, []),
			new SwitchCase(two, [doOne, doOne]),
			new SwitchCase(undefined, [blockDoOne])
		])
	},
	ReturnStatement: [
		{
			src: `
				()=>{
					return
				}`,
			ast: new ArrowFunctionExpression([], new BlockStatement([new ReturnStatement()]))
		},
		{
			src: `
				()=>{
					return 1
				}`,
			ast: new ArrowFunctionExpression([], new BlockStatement([new ReturnStatement(one)]))
		}
	],
	ThrowStatement: {
		src: 'throw 1',
		ast: new ThrowStatement(one)
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
		ast: new TryStatement(
			new BlockStatement([doOne]),
			new CatchClause(new Identifier('err'), blockDoOne),
			blockDoOne)
	},
	WhileStatement: {
		src: 'while(1)1',
		ast: new WhileStatement(one, doOne)
	},
	DoWhileStatement: [
		{
			src: `
				do 1; while(1)`,
			ast: new DoWhileStatement(doOne, one)
		}
	],
	ForStatement: [
		{
			src: 'for(;;){}',
			ast: new ForStatement(null, null, null, new BlockStatement([]))
		},
		{
			src: 'for(let a=0;(a<10);a++)1',
			ast: new ForStatement(
				new VariableDeclaration('let', [new VariableDeclarator(a, new Literal(0))]),
				new BinaryExpression('<', a, new Literal(10)),
				new UpdateExpression('++', a, false),
				doOne)
		}
	],
	ForInStatement: {
		src: 'for(a in b)1',
		ast: new ForInStatement(a, b, doOne)
	},
	ForOfStatement: {
		src: 'for(a of b)1',
		ast: new ForOfStatement(a, b, doOne)
	},
	DebuggerStatement: {src: 'debugger', ast: new DebuggerStatement()},
	FunctionDeclaration: [
		{
			src: 'function a(b){}',
			ast: new FunctionDeclaration(a, [b], new BlockStatement([]), false)
		},
		{
			src: 'function* a(b){}',
			ast: new FunctionDeclaration(a, [b], new BlockStatement([]), true)
		}
	],
	VariableDeclaration: [
		{
			src: 'var a',
			ast: new VariableDeclaration('var', [new VariableDeclarator(a)])
		},
		{
			src: 'let a=1,b',
			ast: new VariableDeclaration('let',
				[new VariableDeclarator(a, one), new VariableDeclarator(b)])
		},
		{
			src: 'const a=1',
			ast: new VariableDeclaration('const', [new VariableDeclarator(a, one)])
		}
	],

	ThisExpression: {src: 'this', ast: new ThisExpression()},
	ArrayExpression: [
		{
			src: '[]',
			ast: new ArrayExpression([])
		},
		{
			src: '[1,2]',
			ast: new ArrayExpression([one, two])
		},
		{
			src: '[...1]',
			ast: new ArrayExpression([new SpreadElement(one)])
		}
	],
	ObjectExpression: [
		{
			// Call it or it will be confused for a BlockStatement
			src: 'a({})',
			ast: new CallExpression(a, [new ObjectExpression([])])
		},
		{
			src: `
				a({
					a:1,
					b(){
						1
					},
					*c(){
						1
					},
					[d]:2,
					get e(){
						1
					},
					set ["f"](a){
						1
					}
				})`,
			ast: new CallExpression(a, [
				new ObjectExpression([
					new Property('init', a, one),
					new Property('init', b,
						new FunctionExpression(null, [], blockDoOne),
						false, true),
					new Property('init', c,
						new FunctionExpression(null, [], blockDoOne, true),
						false, true),
					new Property('init', d, two, true),
					new Property('get', e,
						new FunctionExpression(null, [], blockDoOne)),
					new Property('set', new Literal('f'),
						new FunctionExpression(null, [a], blockDoOne))
				])
			])
		}
	],
	ArrowFunctionExpression: [
		{
			src: '()=>1',
			ast: new ArrowFunctionExpression([], one)
		},
		{
			src: 'a=>1',
			ast: new ArrowFunctionExpression([a], one)
		},
		{
			src: '(a,b)=>1',
			ast: new ArrowFunctionExpression([a, b], one)
		},
		{
			src: `
				()=>{
					1
				}`,
			ast: new ArrowFunctionExpression([], blockDoOne)
		}
	],
	SequenceExpression: {
		src: 'a,b',
		ast: new SequenceExpression([a, b])
	},
	UnaryExpression: [
		{
			src: 'typeof a',
			ast: new UnaryExpression('typeof', a)
		},
		{
			src: '- - 1',
			ast: new UnaryExpression('-', new UnaryExpression('-', one))
		}
	],
	BinaryExpression: {
		src: '((a+b) instanceof c)',
		ast: new BinaryExpression('instanceof', new BinaryExpression('+', a, b), c)
	},
	AssignmentExpression: {
		src: 'a+=1',
		ast: new AssignmentExpression('+=', a, one)
	},
	UpdateExpression: [
		{
			src: '++a',
			ast: new UpdateExpression('++', a, true)
		},
		{
			src: 'a--',
			ast: new UpdateExpression('--', a, false)
		}
	],
	LogicalExprsession: {
		src: '(a||b)',
		ast: new LogicalExpression('||', a, b)
	},
	ConditionalExpression: {
		src: '(a?b:c)',
		ast: new ConditionalExpression(a, b, c)
	},
	NewExpression: [
		{
			src: 'new (a)()',
			ast: new NewExpression(a, [])
		},
		{
			src: 'new (a)(b)',
			ast: new NewExpression(a, [b])
		},
		{
			src: 'new (a(b))(c)',
			ast: new NewExpression(new CallExpression(a, [b]), [c])
		}
	],
	CallExpression: [
		{
			src: 'a(b)',
			ast: new CallExpression(a, [b])
		},
		{
			src: '(a=>a)(1)',
			ast: new CallExpression(new ArrowFunctionExpression([a], a), [one])
		},
		{
			src: 'a(...b)',
			ast: new CallExpression(a, [new SpreadElement(b)])
		},
		{
			src: 'a(...(1+1))',
			ast: new CallExpression(a, [new SpreadElement(new BinaryExpression('+', one, one))])
		}
	],
	MemberExpression: [
		{
			src: 'a.b',
			ast: new MemberExpression(a, b, false)
		},
		{
			src: 'a[1]',
			ast: new MemberExpression(a, one, true)
		},
		{
			src: '1..a',
			ast: new MemberExpression(one, a, false)
		},
		{
			src: '1.5.a',
			ast: new MemberExpression(new Literal(1.5), a, false)
		}
	],
	YieldExpression: {
		src: `
			function* a(){
				(yield 1);
				(yield* 2)
			}`,
		ast: new FunctionDeclaration(
			a,
			[],
			new BlockStatement([
				new ExpressionStatement(new YieldExpression(one, false)),
				new ExpressionStatement(new YieldExpression(two, true))]),
			true)
	},
	Literal: [
		{
			src: '1',
			ast: one
		},
		{
			src: '1.5',
			ast: new Literal(1.5)
		},
		{
			src: '"a\\nb\\u2029"',
			ast: new Literal('a\nb\u2029')
		},
		{
			src: 'true',
			ast: new Literal(true)
		},
		{
			src: 'null',
			ast: new Literal(null)
		}
	],

	TemplateLiteral: [
		{
			src: '`a${b}a`',
			ast: new TemplateLiteral(
				[
					new TemplateElement(false, {cooked: 'a', raw: 'a'}),
					new TemplateElement(true, {cooked: 'a', raw: 'a'})
				],
				[b])
		},
		{
			src: '`${a}${b}`',
			ast: new TemplateLiteral(
				[
					new TemplateElement(false, {cooked: '', raw: ''}),
					new TemplateElement(false, {cooked: '', raw: ''}),
					new TemplateElement(true, {cooked: '', raw: ''})
				],
				[a, b])
		},
		{
			src: '`$\\{a}`',
			ast: new TemplateLiteral(
				[new TemplateElement(true, {cooked: '${a}', raw: '$\\{a}'})],
				[])
		},
		{
			src: '`\\n`',
			ast: new TemplateLiteral(
				[
					new TemplateElement(true, {cooked: '\n', raw: '\\n'})
				],
				[])
		}
	],

	TaggedTemplateExpression: {
		src: 'a`a`',
		ast: new TaggedTemplateExpression(
			a,
			new TemplateLiteral(
				[new TemplateElement(true, {cooked: 'a', raw: 'a'})],
				[]))
	},

	ObjectPattern: {
		src: 'const {a,b:c}=a',
		ast: new VariableDeclaration('const', [
			new VariableDeclarator(
				new ObjectPattern([
					new AssignmentProperty(a),
					new AssignmentProperty(b, c)
				]),
				a)
		])
	},
	ArrayPattern: {
		src: 'const [{a},...b]=a',
		ast: new VariableDeclaration('const', [
			new VariableDeclarator(
				new ArrayPattern([
					new ObjectPattern([new AssignmentProperty(a)]),
					new RestElement(b)
				]),
				a)
		])
	},
	ClassDeclaration: {
		src: `
			class a extends b{
				constructor(){}
				a(){}
				*a(){}
				get b(){}
				set c(a){}
				static a(){}
				["x"](){}
				static get ["x"](){}
			}`,
		ast: new ClassDeclaration(
			a,
			b,
			new ClassBody([
				new MethodDefinition(
					new Identifier('constructor'), emptyFun, 'constructor', false, false),
				new MethodDefinition(a, emptyFun, 'method', false, false),
				new MethodDefinition(a, emptyGenFun, 'method', false, false),
				new MethodDefinition(b, emptyFun, 'get', false, false),
				new MethodDefinition(c, emptyFunWithArgA, 'set', false, false),
				new MethodDefinition(a, emptyFun, 'method', true, false),
				new MethodDefinition(new Literal('x'), emptyFun, 'method', false, true),
				new MethodDefinition(new Literal('x'), emptyFun, 'get', true, true)
			]))
	},
	ClassExpression: {
		src: `
			typeof class a{}`,
		ast: new UnaryExpression('typeof', new ClassExpression(a, null, new ClassBody([])))
	},

	ImportSpecifier: {
		src: 'import {a,b as c} from "a"',
		ast: new ImportDeclaration([new ImportSpecifier(a), new ImportSpecifier(b, c)], litA)
	},
	ImportNamespaceSpecifier: {
		src: 'import * as a from "a"',
		ast: new ImportDeclaration([new ImportNamespaceSpecifier(a)], litA)
	},
	ImportDefaultSpecifier: {
		src: 'import a from "a"',
		ast: new ImportDeclaration([new ImportDefaultSpecifier(a)], litA)
	},
	ImportDeclaration: {
		src: 'import a,{b} from "a"',
		ast: new ImportDeclaration([new ImportDefaultSpecifier(a), new ImportSpecifier(b)], litA)
	},

	ExportNamedDeclaration: [
		{
			src: 'export const a=1',
			ast: new ExportNamedDeclaration(
				new VariableDeclaration('const', [new VariableDeclarator(a, one)]),
				[],
				null)
		},
		{
			src: 'export {a,b as c} from "a"',
			ast: new ExportNamedDeclaration(
				null,
				[new ExportSpecifier(a), new ExportSpecifier(c, b)],
				litA)
		}
	],
	ExportDefaultDeclaration: [
		{
			src: 'export default 1',
			ast: new ExportDefaultDeclaration(one)
		},
		{
			src: 'export default function a(){}',
			ast: new ExportDefaultDeclaration(
				new FunctionDeclaration(a, [], new BlockStatement([]), false))
		}
	],
	ExportAllDeclaration: {
		src: 'export * from "a"',
		ast: new ExportAllDeclaration(litA)
	}
}


const parseProgramBody = src => {
	const program = parse(src, {locations: false})
	assert(program.type === 'Program')
	assert(program.body.length === 1)
	const first = program.body[0]
	return first instanceof ExpressionStatement ? first.expression : first
}

const doTest = ({src: indentedSrc, ast}) => {
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

describe('roundtrip', () => {
	for (const key in tests)
		it(key, () => {
			const t = tests[key]
			if (t instanceof Array)
				t.forEach(doTest)
			else
				doTest(t)
		})
})

// multi-line string literals like:
// `
//	a
//		b
//	c`
// have too much indentation.
// This will change it to "a\n\tb\nc" by detecting the first line's indentation.
const dedent = str => {
	if (str[0] !== '\n')
		return str

	str = str.slice(1)

	let indent
	for (indent = 0; indent < str.length; indent = indent + 1)
		if (str[indent] !== '\t')
			break

	const dedentedLines = str.split('\n').map(line => line.slice(indent))
	return dedentedLines.join('\n')
}
