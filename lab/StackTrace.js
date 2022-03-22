function getStackFrame(index = 0) {
    const oldLimit        = Error.stackTraceLimit;
    Error.stackTraceLimit = index + 1;

    const dummyObject = {};

    const v8Handler         = Error.prepareStackTrace;
    Error.prepareStackTrace = function (dummyObject, v8StackTrace) {
        return v8StackTrace;
    };
    Error.captureStackTrace(dummyObject, getStackFrame);

    const v8StackTrace      = dummyObject.stack;
    Error.prepareStackTrace = v8Handler;
    Error.stackTraceLimit   = oldLimit;

    const v8CallSite = v8StackTrace[index];
    if (!v8CallSite) return null;

    const methods    = Reflect.ownKeys(v8CallSite.__proto__)
        .filter(key => key.startsWith('is') || key.startsWith('get'));
    const properties = methods.map(method => [
        method.startsWith('get') ? method.charAt(3).toLowerCase() + method.substr(4) : method,
        v8CallSite[method]()
    ]);

    return Object.fromEntries(properties);
}

console.log(getStackFrame(0));
