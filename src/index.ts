import BaseCompiler from './BaseCompiler'
import ServiceCompiler from './ServiceCompiler'
import {
  File,
  SourceFile,
  CompileOptions
} from './types'
import path = require('path')
import thriftPraser = require('../lib/thriftPraser')

/**
 * Base能力编译
 */
class Compiler extends BaseCompiler {
  serviceCompilers: ServiceCompiler[] = [];

  constructor (file: SourceFile, options?: CompileOptions) {
    super(options)

    this.filename = file.filename
    this.ast = thriftPraser(file.content)
    if (this.ast.service) {
      const services = this.ast.service
      const basename = path.basename(this.filename, '.thrift')
      const include = Object.assign({}, this.ast.include, {
        [basename]: {
          path: basename
        }
      })

      this.serviceCompilers = Object.keys(services).map((k) => {
        return new ServiceCompiler(String(k), services[k], include, options)
      })
    }
  }

  flush (): File[] {
    this.writeCommonType()
    if (this.ast.include) {
      this.writeInclude(this.ast.include)
    }
    if (this.ast.const) {
      this.writeConst(this.ast.const)
    }
    if (this.ast.typedef) {
      this.writeTypeof(this.ast.typedef)
    }
    if (this.ast.enum) {
      this.writeEnum(this.ast.enum)
    }
    if (this.ast.struct) {
      this.writeStructs(this.ast.struct)
    }
    if (this.ast.union) {
      this.writeUnions(this.ast.union)
    }
    if (this.ast.exception) {
      this.writeExceptions(this.ast.exception)
    }

    const files: File[] = []
    if (this.serviceCompilers.length) {
      this.serviceCompilers.forEach(s => {
        files.push(s.flush())
      })
    }

    files.push({
      filename: `${path.basename(this.filename, '.thrift')}_types.d.ts`,
      content: this.buffer.join('')
    })

    return files
  }
}

export default (sourceFile: SourceFile, options?: CompileOptions): File[] => {
  const compiler = new Compiler(sourceFile, options)
  return compiler.flush()
}
