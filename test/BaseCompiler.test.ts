import BaseCompiler from '../src/BaseCompiler'
import * as fs from 'fs'
import { JsonAST } from '../lib/ast'
import * as Path from 'path'
import thriftPraser = require('../lib/thriftPraser')

// describe('writeTypeof', () => {
//   let ast: JsonAST
//   let baseCompiler: BaseCompiler

//   beforeEach(() => {
//     baseCompiler = new BaseCompiler()
//     ast = thriftPraser(fs.readFileSync(Path.join(__dirname, './mock/idl/typeof.thrift')))
//   })

//   it('should support typedefs keyword', () => {
//     const typedef = ast.typedef
//     if (!typedef) throw new Error('typedef must exists')
//     baseCompiler.writeTypeof(typedef)
//     expect(baseCompiler.buffer.join('')).toBe('type TList = T[];\n')
//   })
// })

// describe('writeInclude', () => {
//   let baseCompiler: BaseCompiler

//   beforeEach(() => {
//     baseCompiler = new BaseCompiler()
//   })

//   it('writeInclude, should transfer include to import', () => {
//     type Include = {
//       [key: string]: { path: string };
//     }
//     const includes: Include = {
//       0: { path: 'test.thrift' },
//       1: { path: './test.thrift' },
//       2: { path: '/test/test.thrift' },
//       3: { path: './test/test.thrift' },
//       4: { path: '../test.thrift' },
//       5: { path: '../test/test.thrift' }
//     }
//     const result: any[] = []
//     const expectResult = (key: string) => `import * as ${key} from './test_types';\n`
//     baseCompiler.write = jest.fn(function (...args) {
//       result.push(args)
//     })
//     baseCompiler.writeInclude(includes)

//     for (const key in includes) {
//       expect(result[Number(key)].join('')).toBe(expectResult(key))
//     }
//   })
// })
