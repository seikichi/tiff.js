declare var HEAP8: Int8Array;
declare var HEAP16: Int16Array;
declare var HEAP32: Int32Array;
declare var HEAPU8: Uint8Array;
declare var HEAPU16: Uint16Array;
declare var HEAPU32: Uint32Array;
declare var HEAPF32: Float32Array;
declare var HEAPF64: Float64Array;
declare var STACKTOP: number;

declare function ccall(ident: string,
                       returnType: string,
                       argTypes: string[],
                       args: any[]): any;
declare function cwrap(ident: string,
                       returnType: string,
                       argTypes: string[]): (...args: any[]) => any;
declare function setValue(ptr: number, value: number, type: string): void;
declare function getValue(ptr: number, type: string): number;
declare function Pointer_stringify(ptr: number): string;

declare module FS {
  interface Object {}
  function deleteFile(path: string): void;
  function createFolder(parent: string, name: string,
                        canRead: boolean, canWrite: boolean): Object
  function createFolder(parent: Object, name: string,
                        canRead: boolean, canWrite: boolean): Object
  function createPath(parent: string, name: string,
                      canRead: boolean, canWrite: boolean): Object;
  function createPath(parent: Object, name: string,
                      canRead: boolean, canWrite: boolean): Object;
  function createDataFile(parent: string, name: string, data: any,
                          canRead: boolean, canWrite: boolean): Object;
  function createDataFile(parent: Object, name: string, data: any,
                          canRead: boolean, canWrite: boolean): Object;
  function createLazyFile(parent: string, name: string, url: string,
                          canRead: boolean, canWrite: boolean): Object;
  function createLazyFile(parent: Object, name: string, url: string,
                          canRead: boolean, canWrite: boolean): Object;
  function createPreloadedFile(parent: string, name: string, url: string,
                               canRead: boolean, canWrite: boolean): Object;
  function createPreloadedFile(parent: Object, name: string, url: string,
                               canRead: boolean, canWrite: boolean): Object;
  function createLink(parent: string, name: string, target: string,
                      canRead: boolean, canWrite: boolean): Object;
  function createLink(parent: Object, name: string, target: string,
                      canRead: boolean, canWrite: boolean): Object;
  function createDevice(parent: string, name: string,
                        input?: () => number,
                        output?: (arg: number) => void): Object;
  function createDevice(parent: Object, name: string,
                        input?: () => number,
                        output?: (arg: number) => void): Object;
}

declare module Module {
  var ccall: typeof ccall;
  var cwrap: typeof cwrap;
  var setValue: typeof setValue;
  var getValue: typeof getValue;
  var Pointer_stringify: typeof Pointer_stringify;

  var FS: typeof FS;
  var FS_createFolder: typeof FS.createFolder;
  var FS_createPath: typeof FS.createPath;
  var FS_createDataFile: typeof FS.createDataFile;
  var FS_createPreloadedFile: typeof FS.createPreloadedFile;
  var FS_createLazyFile: typeof FS.createLazyFile;
  var FS_createLink: typeof FS.createLink;
  var FS_createDevice: typeof FS.createDevice;

  var HEAP8: typeof HEAP8;
  var HEAP16: typeof HEAP16;
  var HEAP32: typeof HEAP32
  var HEAPU8: typeof HEAPU8;
  var HEAPU16: typeof HEAPU16;
  var HEAPU32: typeof HEAPU32;
  var HEAPF32: typeof HEAPF32;
  var HEAPF64: typeof HEAPF64;
}
