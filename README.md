
# ts-thrift


能力： 将idl文件通过thrift-parser转化为[AST](https://www.npmjs.com/package/thrift-parser)

`ts-thrift` is a typescript compiler that compile *.thrift files to *.d.ts files.

配合工具 `thrift --gen js:node` 命令生成js文件

## 安装
```bash
$ npm install -g ts-thrift
```

## 使用

### CLI
```bash
// 单个文件
ts-thrift Model.thrift

// 一个文件夹下所有文件
ts-thrift ./src -o ./dist

// 帮助
ts-thrift -h
```

### Node
```js
import TsThrift from 'ts-thrift';
import fs = require('fs');

const filename = './Model.thrift';
const files = TsThrift({
  filename,
  content: fs.readFileSync(filename),
})

console.log(files);
// [{ filename: 'Model_types.d.ts', content: '...'}]
```

## 使用示例

thrift file:

```thrift
namespace java com.my.test

struct Result {
 1: i32 id;
 2: string name;
}

enum Status {
  Success = 1;
  Error = 2;
}

struct Response {
  1:required Status status;
  2:optional list<Result> result;
}

struct Request {
  1: required string query;
  2: optional number page;
}

service MyTestService {
    Response search(1:Request request);
}
```

.d.ts file:
```typescript
type Callback<T, E> = (err: E, resp: T) => void;

interface Int64 {
    constructor(o?: number | string): this;
    toString(): string;
    toJson(): string;
}

export enum Status {
    Success = 1,
    Error = 2,
}

export class Result {
    id: number;
    name: string;

    constructor(arg?: {
        id: number;
        name: string;
    })
}

export class Response {
    status: Status;
    result?: Result[];

    constructor(arg?: {
        status: Status;
        result?: Result[];
    })
}

export class Request {
    query: string;
    page?: number;

    constructor(arg?: {
        query: string;
        page?: number;
    })
}

export class Client {
    search(request: Request, callback: Callback<Response, Error>): void;
    search(request: Request): Promise<Response>;
}
```