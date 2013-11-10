declare module Module {
  var HEAP8: Int8Array;
  var HEAP16: Int16Array;
  var HEAP32: Int32Array;
  var HEAPU8: Uint8Array;
  var HEAPU16: Uint16Array;
  var HEAPU32: Uint32Array;
  var HEAPF32: Float32Array;
  var HEAPF64: Float64Array;
  var STACKTOP: number;

  function ccall(ident: string,
                 returnType: string,
                 argTypes: string[],
                 args: any[]): any;
  function cwrap(ident: string,
                 returnType: string,
                 argTypes: string[]): (...args: any[]) => any;
  function setValue(ptr: number, value: number, type: string): void;
  function getValue(ptr: number, type: string): number;
  function Pointer_stringify(ptr: number): string;

  module FS {
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
}
