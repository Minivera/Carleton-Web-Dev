"use strict";
var main;
(function() {
var $rt_seed = 2463534242;
function $rt_nextId() {
    var x = $rt_seed;
    x ^= x << 13;
    x ^= x >> 17;
    x ^= x << 5;
    $rt_seed = x;
    return x;
}
function $rt_compare(a, b) {
    return a > b ? 1 : a < b ?  -1 : a === b ? 0 : 1;
}
function $rt_isInstance(obj, cls) {
    return obj !== null && !!obj.constructor.$meta && $rt_isAssignable(obj.constructor, cls);
}
function $rt_isAssignable(from, to) {
    if (from === to) {
        return true;
    }
    if (to.$meta.item !== null) {
        return from.$meta.item !== null && $rt_isAssignable(from.$meta.item, to.$meta.item);
    }
    var supertypes = from.$meta.supertypes;
    for (var i = 0;i < supertypes.length;i = i + 1 | 0) {
        if ($rt_isAssignable(supertypes[i], to)) {
            return true;
        }
    }
    return false;
}
function $rt_createArray(cls, sz) {
    var data = new Array(sz);
    var arr = new $rt_array(cls, data);
    if (sz > 0) {
        var i = 0;
        do  {
            data[i] = null;
            i = i + 1 | 0;
        }while (i < sz);
    }
    return arr;
}
function $rt_wrapArray(cls, data) {
    return new $rt_array(cls, data);
}
function $rt_createUnfilledArray(cls, sz) {
    return new $rt_array(cls, new Array(sz));
}
function $rt_createLongArray(sz) {
    var data = new Array(sz);
    var arr = new $rt_array($rt_longcls(), data);
    for (var i = 0;i < sz;i = i + 1 | 0) {
        data[i] = Long_ZERO;
    }
    return arr;
}
function $rt_createNumericArray(cls, nativeArray) {
    return new $rt_array(cls, nativeArray);
}
function $rt_createCharArray(sz) {
    return $rt_createNumericArray($rt_charcls(), new Uint16Array(sz));
}
function $rt_createByteArray(sz) {
    return $rt_createNumericArray($rt_bytecls(), new Int8Array(sz));
}
function $rt_createShortArray(sz) {
    return $rt_createNumericArray($rt_shortcls(), new Int16Array(sz));
}
function $rt_createIntArray(sz) {
    return $rt_createNumericArray($rt_intcls(), new Int32Array(sz));
}
function $rt_createBooleanArray(sz) {
    return $rt_createNumericArray($rt_booleancls(), new Int8Array(sz));
}
function $rt_createFloatArray(sz) {
    return $rt_createNumericArray($rt_floatcls(), new Float32Array(sz));
}
function $rt_createDoubleArray(sz) {
    return $rt_createNumericArray($rt_doublecls(), new Float64Array(sz));
}
function $rt_arraycls(cls) {
    var result = cls.$array;
    if (result === null) {
        var arraycls = {  };
        var name = "[" + cls.$meta.binaryName;
        arraycls.$meta = { item : cls, supertypes : [$rt_objcls()], primitive : false, superclass : $rt_objcls(), name : name, binaryName : name, enum : false };
        arraycls.classObject = null;
        arraycls.$array = null;
        result = arraycls;
        cls.$array = arraycls;
    }
    return result;
}
function $rt_createcls() {
    return { $array : null, classObject : null, $meta : { supertypes : [], superclass : null } };
}
function $rt_createPrimitiveCls(name, binaryName) {
    var cls = $rt_createcls();
    cls.$meta.primitive = true;
    cls.$meta.name = name;
    cls.$meta.binaryName = binaryName;
    cls.$meta.enum = false;
    cls.$meta.item = null;
    return cls;
}
var $rt_booleanclsCache = null;
function $rt_booleancls() {
    if ($rt_booleanclsCache === null) {
        $rt_booleanclsCache = $rt_createPrimitiveCls("boolean", "Z");
    }
    return $rt_booleanclsCache;
}
var $rt_charclsCache = null;
function $rt_charcls() {
    if ($rt_charclsCache === null) {
        $rt_charclsCache = $rt_createPrimitiveCls("char", "C");
    }
    return $rt_charclsCache;
}
var $rt_byteclsCache = null;
function $rt_bytecls() {
    if ($rt_byteclsCache === null) {
        $rt_byteclsCache = $rt_createPrimitiveCls("byte", "B");
    }
    return $rt_byteclsCache;
}
var $rt_shortclsCache = null;
function $rt_shortcls() {
    if ($rt_shortclsCache === null) {
        $rt_shortclsCache = $rt_createPrimitiveCls("short", "S");
    }
    return $rt_shortclsCache;
}
var $rt_intclsCache = null;
function $rt_intcls() {
    if ($rt_intclsCache === null) {
        $rt_intclsCache = $rt_createPrimitiveCls("int", "I");
    }
    return $rt_intclsCache;
}
var $rt_longclsCache = null;
function $rt_longcls() {
    if ($rt_longclsCache === null) {
        $rt_longclsCache = $rt_createPrimitiveCls("long", "J");
    }
    return $rt_longclsCache;
}
var $rt_floatclsCache = null;
function $rt_floatcls() {
    if ($rt_floatclsCache === null) {
        $rt_floatclsCache = $rt_createPrimitiveCls("float", "F");
    }
    return $rt_floatclsCache;
}
var $rt_doubleclsCache = null;
function $rt_doublecls() {
    if ($rt_doubleclsCache === null) {
        $rt_doubleclsCache = $rt_createPrimitiveCls("double", "D");
    }
    return $rt_doubleclsCache;
}
var $rt_voidclsCache = null;
function $rt_voidcls() {
    if ($rt_voidclsCache === null) {
        $rt_voidclsCache = $rt_createPrimitiveCls("void", "V");
    }
    return $rt_voidclsCache;
}
function $rt_throw(ex) {
    throw $rt_exception(ex);
}
function $rt_exception(ex) {
    var err = ex.$jsException;
    if (!err) {
        err = new Error("Java exception thrown");
        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(err);
        }
        err.$javaException = ex;
        ex.$jsException = err;
        $rt_fillStack(err, ex);
    }
    return err;
}
function $rt_fillStack(err, ex) {
    if (typeof $rt_decodeStack === "function" && err.stack) {
        var stack = $rt_decodeStack(err.stack);
        var javaStack = $rt_createArray($rt_objcls(), stack.length);
        var elem;
        var noStack = false;
        for (var i = 0;i < stack.length;++i) {
            var element = stack[i];
            elem = $rt_createStackElement($rt_str(element.className), $rt_str(element.methodName), $rt_str(element.fileName), element.lineNumber);
            if (elem == null) {
                noStack = true;
                break;
            }
            javaStack.data[i] = elem;
        }
        if (!noStack) {
            $rt_setStack(ex, javaStack);
        }
    }
}
function $rt_createMultiArray(cls, dimensions) {
    var first = 0;
    for (var i = dimensions.length - 1;i >= 0;i = i - 1 | 0) {
        if (dimensions[i] === 0) {
            first = i;
            break;
        }
    }
    if (first > 0) {
        for (i = 0;i < first;i = i + 1 | 0) {
            cls = $rt_arraycls(cls);
        }
        if (first === dimensions.length - 1) {
            return $rt_createArray(cls, dimensions[first]);
        }
    }
    var arrays = new Array($rt_primitiveArrayCount(dimensions, first));
    var firstDim = dimensions[first] | 0;
    for (i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createArray(cls, firstDim);
    }
    return $rt_createMultiArrayImpl(cls, arrays, dimensions, first);
}
function $rt_createByteMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_bytecls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createByteArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_bytecls(), arrays, dimensions);
}
function $rt_createCharMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_charcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createCharArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_charcls(), arrays, dimensions, 0);
}
function $rt_createBooleanMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_booleancls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createBooleanArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_booleancls(), arrays, dimensions, 0);
}
function $rt_createShortMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_shortcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createShortArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_shortcls(), arrays, dimensions, 0);
}
function $rt_createIntMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_intcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createIntArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_intcls(), arrays, dimensions, 0);
}
function $rt_createLongMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_longcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createLongArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_longcls(), arrays, dimensions, 0);
}
function $rt_createFloatMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_floatcls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createFloatArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_floatcls(), arrays, dimensions, 0);
}
function $rt_createDoubleMultiArray(dimensions) {
    var arrays = new Array($rt_primitiveArrayCount(dimensions, 0));
    if (arrays.length === 0) {
        return $rt_createMultiArray($rt_doublecls(), dimensions);
    }
    var firstDim = dimensions[0] | 0;
    for (var i = 0;i < arrays.length;i = i + 1 | 0) {
        arrays[i] = $rt_createDoubleArray(firstDim);
    }
    return $rt_createMultiArrayImpl($rt_doublecls(), arrays, dimensions, 0);
}
function $rt_primitiveArrayCount(dimensions, start) {
    var val = dimensions[start + 1] | 0;
    for (var i = start + 2;i < dimensions.length;i = i + 1 | 0) {
        val = val * (dimensions[i] | 0) | 0;
        if (val === 0) {
            break;
        }
    }
    return val;
}
function $rt_createMultiArrayImpl(cls, arrays, dimensions, start) {
    var limit = arrays.length;
    for (var i = start + 1 | 0;i < dimensions.length;i = i + 1 | 0) {
        cls = $rt_arraycls(cls);
        var dim = dimensions[i];
        var index = 0;
        var packedIndex = 0;
        while (index < limit) {
            var arr = $rt_createUnfilledArray(cls, dim);
            for (var j = 0;j < dim;j = j + 1 | 0) {
                arr.data[j] = arrays[index];
                index = index + 1 | 0;
            }
            arrays[packedIndex] = arr;
            packedIndex = packedIndex + 1 | 0;
        }
        limit = packedIndex;
    }
    return arrays[0];
}
function $rt_assertNotNaN(value) {
    if (typeof value === 'number' && isNaN(value)) {
        throw "NaN";
    }
    return value;
}
var $rt_stdoutBuffer = "";
var $rt_putStdout = typeof $rt_putStdoutCustom === "function" ? $rt_putStdoutCustom : function(ch) {
    if (ch === 0xA) {
        if (console) {
            console.info($rt_stdoutBuffer);
        }
        $rt_stdoutBuffer = "";
    } else {
        $rt_stdoutBuffer += String.fromCharCode(ch);
    }
};
var $rt_stderrBuffer = "";
var $rt_putStderr = typeof $rt_putStderrCustom === "function" ? $rt_putStderrCustom : function(ch) {
    if (ch === 0xA) {
        if (console) {
            console.error($rt_stderrBuffer);
        }
        $rt_stderrBuffer = "";
    } else {
        $rt_stderrBuffer += String.fromCharCode(ch);
    }
};
var $rt_packageData = null;
function $rt_packages(data) {
    var i = 0;
    var packages = new Array(data.length);
    for (var j = 0;j < data.length;++j) {
        var prefixIndex = data[i++];
        var prefix = prefixIndex >= 0 ? packages[prefixIndex] : "";
        packages[j] = prefix + data[i++] + ".";
    }
    $rt_packageData = packages;
}
function $rt_metadata(data) {
    var packages = $rt_packageData;
    var i = 0;
    while (i < data.length) {
        var cls = data[i++];
        cls.$meta = {  };
        var m = cls.$meta;
        var className = data[i++];
        m.name = className !== 0 ? className : null;
        if (m.name !== null) {
            var packageIndex = data[i++];
            if (packageIndex >= 0) {
                m.name = packages[packageIndex] + m.name;
            }
        }
        m.binaryName = "L" + m.name + ";";
        var superclass = data[i++];
        m.superclass = superclass !== 0 ? superclass : null;
        m.supertypes = data[i++];
        if (m.superclass) {
            m.supertypes.push(m.superclass);
            cls.prototype = Object.create(m.superclass.prototype);
        } else {
            cls.prototype = {  };
        }
        var flags = data[i++];
        m.enum = (flags & 8) !== 0;
        m.flags = flags;
        m.primitive = false;
        m.item = null;
        cls.prototype.constructor = cls;
        cls.classObject = null;
        m.accessLevel = data[i++];
        var clinit = data[i++];
        cls.$clinit = clinit !== 0 ? clinit : function() {
        };
        var virtualMethods = data[i++];
        if (virtualMethods !== 0) {
            for (var j = 0;j < virtualMethods.length;j += 2) {
                var name = virtualMethods[j];
                var func = virtualMethods[j + 1];
                if (typeof name === 'string') {
                    name = [name];
                }
                for (var k = 0;k < name.length;++k) {
                    cls.prototype[name[k]] = func;
                }
            }
        }
        cls.$array = null;
    }
}
function $rt_threadStarter(f) {
    return function() {
        var args = Array.prototype.slice.apply(arguments);
        $rt_startThread(function() {
            f.apply(this, args);
        });
    };
}
function $rt_mainStarter(f) {
    return function(args, callback) {
        if (!args) {
            args = [];
        }
        var javaArgs = $rt_createArray($rt_objcls(), args.length);
        for (var i = 0;i < args.length;++i) {
            javaArgs.data[i] = $rt_str(args[i]);
        }
        $rt_startThread(function() {
            f.call(null, javaArgs);
        }, callback);
    };
}
var $rt_stringPool_instance;
function $rt_stringPool(strings) {
    $rt_stringPool_instance = new Array(strings.length);
    for (var i = 0;i < strings.length;++i) {
        $rt_stringPool_instance[i] = $rt_intern($rt_str(strings[i]));
    }
}
function $rt_s(index) {
    return $rt_stringPool_instance[index];
}
function $rt_eraseClinit(target) {
    return target.$clinit = function() {
    };
}
var $rt_numberConversionView = new DataView(new ArrayBuffer(8));
function $rt_doubleToLongBits(n) {
    $rt_numberConversionView.setFloat64(0, n, true);
    return new Long($rt_numberConversionView.getInt32(0, true), $rt_numberConversionView.getInt32(4, true));
}
function $rt_longBitsToDouble(n) {
    $rt_numberConversionView.setInt32(0, n.lo, true);
    $rt_numberConversionView.setInt32(4, n.hi, true);
    return $rt_numberConversionView.getFloat64(0, true);
}
function $rt_floatToIntBits(n) {
    $rt_numberConversionView.setFloat32(0, n);
    return $rt_numberConversionView.getInt32(0);
}
function $rt_intBitsToFloat(n) {
    $rt_numberConversionView.setInt32(0, n);
    return $rt_numberConversionView.getFloat32(0);
}
function $rt_javaException(e) {
    return e instanceof Error && typeof e.$javaException === 'object' ? e.$javaException : null;
}
function $rt_jsException(e) {
    return typeof e.$jsException === 'object' ? e.$jsException : null;
}
function $rt_wrapException(err) {
    var ex = err.$javaException;
    if (!ex) {
        ex = $rt_createException($rt_str("(JavaScript) " + err.toString()));
        err.$javaException = ex;
        ex.$jsException = err;
        $rt_fillStack(err, ex);
    }
    return ex;
}
function $dbg_class(obj) {
    var cls = obj.constructor;
    var arrayDegree = 0;
    while (cls.$meta && cls.$meta.item) {
        ++arrayDegree;
        cls = cls.$meta.item;
    }
    var clsName = "";
    if (cls === $rt_booleancls()) {
        clsName = "boolean";
    } else if (cls === $rt_bytecls()) {
        clsName = "byte";
    } else if (cls === $rt_shortcls()) {
        clsName = "short";
    } else if (cls === $rt_charcls()) {
        clsName = "char";
    } else if (cls === $rt_intcls()) {
        clsName = "int";
    } else if (cls === $rt_longcls()) {
        clsName = "long";
    } else if (cls === $rt_floatcls()) {
        clsName = "float";
    } else if (cls === $rt_doublecls()) {
        clsName = "double";
    } else {
        clsName = cls.$meta ? cls.$meta.name || "a/" + cls.name : "@" + cls.name;
    }
    while (arrayDegree-- > 0) {
        clsName += "[]";
    }
    return clsName;
}
function Long(lo, hi) {
    this.lo = lo | 0;
    this.hi = hi | 0;
}
Long.prototype.__teavm_class__ = function() {
    return "long";
};
Long.prototype.toString = function() {
    var result = [];
    var n = this;
    var positive = Long_isPositive(n);
    if (!positive) {
        n = Long_neg(n);
    }
    var radix = new Long(10, 0);
    do  {
        var divRem = Long_divRem(n, radix);
        result.push(String.fromCharCode(48 + divRem[1].lo));
        n = divRem[0];
    }while (n.lo !== 0 || n.hi !== 0);
    result = (result.reverse()).join('');
    return positive ? result : "-" + result;
};
Long.prototype.valueOf = function() {
    return Long_toNumber(this);
};
var Long_ZERO = new Long(0, 0);
var Long_MAX_NORMAL = 1 << 18;
function Long_fromInt(val) {
    return val >= 0 ? new Long(val, 0) : new Long(val,  -1);
}
function Long_fromNumber(val) {
    if (val >= 0) {
        return new Long(val | 0, val / 0x100000000 | 0);
    } else {
        return Long_neg(new Long( -val | 0,  -val / 0x100000000 | 0));
    }
}
function Long_toNumber(val) {
    var lo = val.lo;
    var hi = val.hi;
    if (lo < 0) {
        lo += 0x100000000;
    }
    return 0x100000000 * hi + lo;
}
var $rt_imul = Math.imul || function(a, b) {
    var ah = a >>> 16 & 0xFFFF;
    var al = a & 0xFFFF;
    var bh = b >>> 16 & 0xFFFF;
    var bl = b & 0xFFFF;
    return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
};
var $rt_udiv = function(a, b) {
    if (a < 0) {
        a += 0x100000000;
    }
    if (b < 0) {
        b += 0x100000000;
    }
    return a / b | 0;
};
var $rt_umod = function(a, b) {
    if (a < 0) {
        a += 0x100000000;
    }
    if (b < 0) {
        b += 0x100000000;
    }
    return a % b | 0;
};
function $rt_setCloneMethod(target, f) {
    target.$clone = f;
}
function $rt_cls(cls) {
    return jl_Class_getClass(cls);
}
function $rt_str(str) {
    if (str === null) {
        return null;
    }
    var characters = $rt_createCharArray(str.length);
    var charsBuffer = characters.data;
    for (var i = 0; i < str.length; i = (i + 1) | 0) {
        charsBuffer[i] = str.charCodeAt(i) & 0xFFFF;
    }
    return jl_String__init_(characters);
}
function $rt_ustr(str) {
    if (str === null) {
        return null;
    }
    var data = str.$characters.data;
    var result = "";
    for (var i = 0; i < data.length; i = (i + 1) | 0) {
        result += String.fromCharCode(data[i]);
    }
    return result;
}
function $rt_objcls() { return jl_Object; }
function $rt_nullCheck(val) {
    if (val === null) {
        $rt_throw(jl_NullPointerException__init_());
    }
    return val;
}
function $rt_intern(str) {
    return str;
}
function $rt_getThread() {
    return null;
}
function $rt_setThread(t) {
}
function $rt_createException(message) {
    return jl_RuntimeException__init_(message);
}
function $rt_createStackElement(className, methodName, fileName, lineNumber) {
    return null;
}
function $rt_setStack(e, stack) {
}
var $java = Object.create(null);
function jl_Object() {
    this.$id$ = 0;
}
function jl_Object__init_() {
    var var_0 = new jl_Object();
    jl_Object__init_0(var_0);
    return var_0;
}
function jl_Object__init_0($this) {
    return;
}
function jl_Object_getClass($this) {
    return jl_Class_getClass($this.constructor);
}
function jl_Object_equals($this, $other) {
    return $this !== $other ? 0 : 1;
}
function jl_Object_toString($this) {
    var var$1, var$2, var$3, var$4, var$5, var$6, var$7, var$8;
    var$1 = jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder__init_(), jl_Class_getName(jl_Object_getClass($this))), $rt_s(0));
    var$2 = jl_Object_identity($this);
    if (!var$2)
        var$3 = $rt_s(1);
    else {
        if (!var$2)
            var$4 = 32;
        else {
            var$5 = 0;
            var$4 = var$2 >>> 16;
            if (var$4)
                var$5 = 16;
            else
                var$4 = var$2;
            var$6 = var$4 >>> 8;
            if (!var$6)
                var$6 = var$4;
            else
                var$5 = var$5 | 8;
            var$4 = var$6 >>> 4;
            if (!var$4)
                var$4 = var$6;
            else
                var$5 = var$5 | 4;
            var$6 = var$4 >>> 2;
            if (!var$6)
                var$6 = var$4;
            else
                var$5 = var$5 | 2;
            if (var$6 >>> 1)
                var$5 = var$5 | 1;
            var$4 = (32 - var$5 | 0) - 1 | 0;
        }
        var$6 = (((32 - var$4 | 0) + 4 | 0) - 1 | 0) / 4 | 0;
        var$7 = $rt_createCharArray(var$6);
        var$8 = var$7.data;
        var$4 = (var$6 - 1 | 0) * 4 | 0;
        var$6 = 0;
        while (var$4 >= 0) {
            var$5 = var$6 + 1 | 0;
            var$8[var$6] = jl_Character_forDigit(var$2 >>> var$4 & 15, 16);
            var$4 = var$4 - 4 | 0;
            var$6 = var$5;
        }
        var$3 = jl_String__init_(var$7);
    }
    return jl_AbstractStringBuilder_toString(jl_StringBuilder_append(var$1, var$3));
}
function jl_Object_identity($this) {
    var $platformThis, var$2;
    $platformThis = $this;
    if (!$platformThis.$id$) {
        var$2 = $rt_nextId();
        $platformThis.$id$ = var$2;
    }
    return $this.$id$;
}
function jl_Object_clone($this) {
    var $result, var$2, var$3;
    if (!$rt_isInstance($this, jl_Cloneable) && $this.constructor.$meta.item === null) {
        $result = new jl_CloneNotSupportedException;
        jl_Exception__init_($result);
        $rt_throw($result);
    }
    $result = otp_Platform_clone($this);
    var$2 = $result;
    var$3 = $rt_nextId();
    var$2.$id$ = var$3;
    return $result;
}
function otfr_Route() {
}
function otfw_ApplicationTemplate() {
    jl_Object.call(this);
}
function otfw_ApplicationTemplate_bind($this, $elem) {
    var var$2, var$3, $$je;
    var$2 = otft_Templates_create($this);
    $elem = otft_Slot_root($elem);
    var$3 = new otft_Templates$RootComponent;
    var$2 = var$2.$create0();
    otft_AbstractComponent__init_(var$3, $elem);
    var$3.$inner = var$2;
    otft_Slot_append($elem, var$2.$slot);
    ju_ArrayList_add(otft_Templates_rootComponents, var$3);
    otft_Templates_updating = 1;
    a: {
        try {
            otft_Templates$RootComponent_render(var$3);
            break a;
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            $elem = $$je;

        }
        otft_Templates_updating = 0;
        $rt_throw($elem);
    }
    otft_Templates_updating = 0;
}
function otfw_ApplicationTemplate_bind0($this, $id) {
    otfw_ApplicationTemplate_bind($this, window.document.getElementById($rt_ustr($id)));
}
function ecd_App() {
    var a = this; otfw_ApplicationTemplate.call(a);
    a.$model = null;
    a.$newTodo = null;
}
function ecd_App_main($args) {
    var $client, var$3, var$4, var$5;
    jl_String__clinit_();
    jl_Integer__clinit_();
    jl_Character__clinit_();
    ecd_TodoFilterType__clinit_();
    otft_Templates__clinit_();
    jl_Boolean__clinit_();
    jl_Double__clinit_();
    jus_Collector$Characteristics__clinit_();
    jusi_SimpleStreamImpl__clinit_();
    ju_Collections__clinit_();
    otfjs_ObjectSerializer__clinit_();
    jl_AbstractStringBuilder$Constants__clinit_();
    jl_Long__clinit_();
    otcit_DoubleAnalyzer__clinit_();
    $client = new ecd_App;
    var$3 = new ecd_Model;
    var$3.$storageItemName = $rt_s(2);
    var$3.$todos = ju_ArrayList__init_();
    var$3.$localStorage = window.localStorage;
    var$3.$isShowing = ecd_TodoFilterType_ALL;
    var$4 = $rt_str(var$3.$localStorage.getItem("todos"));
    if (var$4 !== null && !jl_String_isEmpty(var$4)) {
        var$3.$todos = otfj_JSON_deserialize(JSON.parse($rt_ustr(var$4)), $rt_cls(ju_ArrayList));
        var$4 = var$3.$todos;
        var$5 = new ecd_Model$_init_$lambda$_0_0;
        var$5.$_0 = var$3;
        jl_Iterable_forEach(var$4, var$5);
    }
    $client.$model = var$3;
    $client.$newTodo = $rt_s(3);
    otfw_ApplicationTemplate_bind0($client, $rt_s(4));
}
function ecd_App_getModel($this) {
    return $this.$model;
}
function ecd_App_getNewTodo($this) {
    return $this.$newTodo;
}
function ecd_App_setNewTodo($this, $newTodo) {
    $this.$newTodo = $newTodo;
}
function ecd_App_addTodo($this) {
    ecd_Model_addTodo($this.$model, $this.$newTodo);
    $this.$newTodo = $rt_s(3);
}
function ecd_App_allCompleted($this) {
    var var$1;
    var$1 = ju_AbstractList_iterator($this.$model.$todos);
    while (ju_AbstractList$1_hasNext(var$1)) {
        if (!ju_AbstractList$1_next(var$1).$completed)
            return 0;
    }
    return 1;
}
function ecd_App_toggleAll($this, $value) {
    var var$2;
    var$2 = ju_AbstractList_iterator($this.$model.$todos);
    while (ju_AbstractList$1_hasNext(var$2)) {
        ecd_Model$Todo_setCompleted(ju_AbstractList$1_next(var$2), $value);
    }
}
function jlr_AnnotatedElement() {
}
function jl_Class() {
    var a = this; jl_Object.call(a);
    a.$name = null;
    a.$platformClass = null;
}
function jl_Class_getClass($cls) {
    var $result, var$3;
    if ($cls === null)
        return null;
    $result = $cls.classObject;
    if ($result === null) {
        $result = new jl_Class;
        $result.$platformClass = $cls;
        var$3 = $result;
        $cls.classObject = var$3;
    }
    return $result;
}
function jl_Class_getPlatformClass($this) {
    return $this.$platformClass;
}
function jl_Class_getName($this) {
    if ($this.$name === null)
        $this.$name = $rt_str($this.$platformClass.$meta.name);
    return $this.$name;
}
function jl_Class_getComponentType($this) {
    return jl_Class_getClass($this.$platformClass.$meta.item);
}
function jl_Class_desiredAssertionStatus($this) {
    return 1;
}
function otji_JS() {
    jl_Object.call(this);
}
function otji_JS_function(var$1, var$2) {
    var name = 'jso$functor$' + var$2;
    if (!var$1[name]) {
        var fn = function() {
            return var$1[var$2].apply(var$1, arguments);
        };
        var$1[name] = function() {
            return fn;
        };
    }
    return var$1[name]();
}
function otji_JS_functionAsObject(var$1, var$2) {
    if (typeof var$1 !== "function") return var$1;
    var result = {};
    result[var$2] = var$1;
    return result;
}
function otp_Platform() {
    jl_Object.call(this);
}
function otp_Platform_clone(var$1) {
    var copy = new var$1.constructor();
    for (var field in var$1) {
        if (!var$1.hasOwnProperty(field)) {
            continue;
        }
        copy[field] = var$1[field];
    }
    return copy;
}
function otp_Platform_getEnumConstants(var$1) {
    var c = '$$enumConstants$$';
    ecd_TodoFilterType[c] = ecd_TodoFilterType_values;
    jus_Collector$Characteristics[c] = jus_Collector$Characteristics_values;
    otp_Platform_getEnumConstants = function(cls) {
        if (!cls.hasOwnProperty(c)) {
            return null;
        }
        if (typeof cls[c] === "function") {
            cls[c] = cls[c]();
        }
        return cls[c];
    };
    return otp_Platform_getEnumConstants(var$1);
}
function ji_Serializable() {
}
function jl_Comparable() {
}
function jl_CharSequence() {
}
function jl_String() {
    var a = this; jl_Object.call(a);
    a.$characters = null;
    a.$hashCode = 0;
}
var jl_String_CASE_INSENSITIVE_ORDER = null;
function jl_String__init_(var_0) {
    var var_1 = new jl_String();
    jl_String__init_0(var_1, var_0);
    return var_1;
}
function jl_String__init_0($this, $characters) {
    var var$2, $i;
    $characters = $characters.data;
    var$2 = $characters.length;
    $this.$characters = $rt_createCharArray(var$2);
    $i = 0;
    while ($i < var$2) {
        $this.$characters.data[$i] = $characters[$i];
        $i = $i + 1 | 0;
    }
}
function jl_String_charAt($this, $index) {
    var var$2;
    if ($index >= 0 && $index < $this.$characters.data.length)
        return $this.$characters.data[$index];
    var$2 = new jl_StringIndexOutOfBoundsException;
    jl_Exception__init_(var$2);
    $rt_throw(var$2);
}
function jl_String_length($this) {
    return $this.$characters.data.length;
}
function jl_String_isEmpty($this) {
    return $this.$characters.data.length ? 0 : 1;
}
function jl_String_toString($this) {
    return $this;
}
function jl_String_valueOf($obj) {
    return $obj === null ? $rt_s(5) : $obj.$toString();
}
function jl_String_equals($this, $other) {
    var $str, $i;
    if ($this === $other)
        return 1;
    if (!($other instanceof jl_String))
        return 0;
    $str = $other;
    if (jl_String_length($str) != jl_String_length($this))
        return 0;
    $i = 0;
    while ($i < jl_String_length($str)) {
        if (jl_String_charAt($this, $i) != jl_String_charAt($str, $i))
            return 0;
        $i = $i + 1 | 0;
    }
    return 1;
}
function jl_String_hashCode($this) {
    var var$1, var$2, var$3, $c;
    a: {
        if (!$this.$hashCode) {
            var$1 = $this.$characters.data;
            var$2 = var$1.length;
            var$3 = 0;
            while (true) {
                if (var$3 >= var$2)
                    break a;
                $c = var$1[var$3];
                $this.$hashCode = (31 * $this.$hashCode | 0) + $c | 0;
                var$3 = var$3 + 1 | 0;
            }
        }
    }
    return $this.$hashCode;
}
function jl_String__clinit_() {
    jl_String_CASE_INSENSITIVE_ORDER = new jl_String$_clinit_$lambda$_81_0;
}
function jl_Throwable() {
    var a = this; jl_Object.call(a);
    a.$message = null;
    a.$suppressionEnabled = 0;
    a.$writableStackTrace = 0;
}
function jl_Throwable__init_(var_0) {
    var var_1 = new jl_Throwable();
    jl_Throwable__init_0(var_1, var_0);
    return var_1;
}
function jl_Throwable__init_0($this, $message) {
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
    $this.$message = $message;
}
function jl_Throwable_fillInStackTrace($this) {
    return $this;
}
function jl_Error() {
    jl_Throwable.call(this);
}
function jl_LinkageError() {
    jl_Error.call(this);
}
function jl_NoClassDefFoundError() {
    jl_LinkageError.call(this);
}
function jl_AbstractStringBuilder() {
    var a = this; jl_Object.call(a);
    a.$buffer = null;
    a.$length0 = 0;
}
function jl_AbstractStringBuilder__init_(var_0) {
    var var_1 = new jl_AbstractStringBuilder();
    jl_AbstractStringBuilder__init_0(var_1, var_0);
    return var_1;
}
function jl_AbstractStringBuilder__init_0($this, $capacity) {
    $this.$buffer = $rt_createCharArray($capacity);
}
function jl_AbstractStringBuilder_append($this, $value, $radix) {
    return jl_AbstractStringBuilder_insert($this, $this.$length0, $value, $radix);
}
function jl_AbstractStringBuilder_insert($this, $target, $value, $radix) {
    var $positive, var$5, var$6, $pos, $sz, $posLimit, var$10;
    $positive = 1;
    if ($value < 0) {
        $positive = 0;
        $value =  -$value;
    }
    a: {
        if ($value < $radix) {
            if ($positive)
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 1 | 0);
            else {
                jl_AbstractStringBuilder_insertSpace($this, $target, $target + 2 | 0);
                var$5 = $this.$buffer.data;
                var$6 = $target + 1 | 0;
                var$5[$target] = 45;
                $target = var$6;
            }
            $this.$buffer.data[$target] = jl_Character_forDigit($value, $radix);
        } else {
            $pos = 1;
            $sz = 1;
            $posLimit = 2147483647 / $radix | 0;
            b: {
                while (true) {
                    var$10 = $rt_imul($pos, $radix);
                    if (var$10 > $value) {
                        var$10 = $pos;
                        break b;
                    }
                    $sz = $sz + 1 | 0;
                    if (var$10 > $posLimit)
                        break;
                    $pos = var$10;
                }
            }
            if (!$positive)
                $sz = $sz + 1 | 0;
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + $sz | 0);
            if ($positive)
                $positive = $target;
            else {
                var$5 = $this.$buffer.data;
                $positive = $target + 1 | 0;
                var$5[$target] = 45;
            }
            while (true) {
                if (var$10 <= 0)
                    break a;
                var$5 = $this.$buffer.data;
                $target = $positive + 1 | 0;
                var$5[$positive] = jl_Character_forDigit($value / var$10 | 0, $radix);
                $value = $value % var$10 | 0;
                var$10 = var$10 / $radix | 0;
                $positive = $target;
            }
        }
    }
    return $this;
}
function jl_AbstractStringBuilder_insert0($this, $target, $value) {
    var $zeros, var$4, $number, $mantissa, $exp, $negative, $intPart, $sz, $digits, $pos, $i, $intDigit;
    $zeros = $rt_compare($value, 0.0);
    if (!$zeros) {
        jl_AbstractStringBuilder_insertSpace($this, $target, $target + 3 | 0);
        var$4 = $this.$buffer.data;
        $zeros = $target + 1 | 0;
        var$4[$target] = 48;
        var$4 = $this.$buffer.data;
        $target = $zeros + 1 | 0;
        var$4[$zeros] = 46;
        $this.$buffer.data[$target] = 48;
        return $this;
    }
    if (!$zeros) {
        jl_AbstractStringBuilder_insertSpace($this, $target, $target + 4 | 0);
        var$4 = $this.$buffer.data;
        $zeros = $target + 1 | 0;
        var$4[$target] = 45;
        var$4 = $this.$buffer.data;
        $target = $zeros + 1 | 0;
        var$4[$zeros] = 48;
        var$4 = $this.$buffer.data;
        $zeros = $target + 1 | 0;
        var$4[$target] = 46;
        $this.$buffer.data[$zeros] = 48;
        return $this;
    }
    if (isNaN($value) ? 1 : 0) {
        jl_AbstractStringBuilder_insertSpace($this, $target, $target + 3 | 0);
        var$4 = $this.$buffer.data;
        $zeros = $target + 1 | 0;
        var$4[$target] = 78;
        var$4 = $this.$buffer.data;
        $target = $zeros + 1 | 0;
        var$4[$zeros] = 97;
        $this.$buffer.data[$target] = 78;
        return $this;
    }
    if (!isFinite($value) ? 1 : 0) {
        if ($zeros > 0) {
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + 8 | 0);
            $zeros = $target;
        } else {
            jl_AbstractStringBuilder_insertSpace($this, $target, $target + 9 | 0);
            var$4 = $this.$buffer.data;
            $zeros = $target + 1 | 0;
            var$4[$target] = 45;
        }
        var$4 = $this.$buffer.data;
        $target = $zeros + 1 | 0;
        var$4[$zeros] = 73;
        var$4 = $this.$buffer.data;
        $zeros = $target + 1 | 0;
        var$4[$target] = 110;
        var$4 = $this.$buffer.data;
        $target = $zeros + 1 | 0;
        var$4[$zeros] = 102;
        var$4 = $this.$buffer.data;
        $zeros = $target + 1 | 0;
        var$4[$target] = 105;
        var$4 = $this.$buffer.data;
        $target = $zeros + 1 | 0;
        var$4[$zeros] = 110;
        var$4 = $this.$buffer.data;
        $zeros = $target + 1 | 0;
        var$4[$target] = 105;
        var$4 = $this.$buffer.data;
        $target = $zeros + 1 | 0;
        var$4[$zeros] = 116;
        $this.$buffer.data[$target] = 121;
        return $this;
    }
    $number = jl_AbstractStringBuilder$Constants_doubleAnalysisResult;
    otcit_DoubleAnalyzer_analyze($value, $number);
    $mantissa = $number.$mantissa;
    $exp = $number.$exponent;
    $negative = $number.$sign;
    $intPart = 1;
    $sz = 1;
    if ($negative)
        $sz = 2;
    $digits = 18;
    $zeros = jl_AbstractStringBuilder_trailingDecimalZeros($mantissa);
    if ($zeros > 0)
        $digits = $digits - $zeros | 0;
    if ($exp < 7 && $exp >= (-3)) {
        if ($exp >= 0) {
            $intPart = $exp + 1 | 0;
            $digits = jl_Math_max($digits, $intPart + 1 | 0);
            $exp = 0;
        } else if ($exp < 0) {
            $mantissa = Long_div($mantissa, jl_AbstractStringBuilder$Constants_longPowersOfTen.data[ -$exp]);
            $digits = $digits - $exp | 0;
            $exp = 0;
        }
    }
    if ($exp) {
        $sz = $sz + 2 | 0;
        if (!($exp > (-10) && $exp < 10))
            $sz = $sz + 1 | 0;
        if (!($exp > (-100) && $exp < 100))
            $sz = $sz + 1 | 0;
        if ($exp < 0)
            $sz = $sz + 1 | 0;
    }
    if ($exp && $digits == $intPart)
        $digits = $digits + 1 | 0;
    jl_AbstractStringBuilder_insertSpace($this, $target, $target + ($sz + $digits | 0) | 0);
    if (!$negative)
        $negative = $target;
    else {
        var$4 = $this.$buffer.data;
        $negative = $target + 1 | 0;
        var$4[$target] = 45;
    }
    $pos = new Long(1569325056, 23283064);
    $i = 0;
    while ($i < $digits) {
        if (Long_le($pos, Long_ZERO))
            $intDigit = 0;
        else {
            $intDigit = Long_div($mantissa, $pos).lo;
            $mantissa = Long_rem($mantissa, $pos);
        }
        var$4 = $this.$buffer.data;
        $target = $negative + 1 | 0;
        var$4[$negative] = (48 + $intDigit | 0) & 65535;
        $intPart = $intPart + (-1) | 0;
        if ($intPart)
            $negative = $target;
        else {
            var$4 = $this.$buffer.data;
            $negative = $target + 1 | 0;
            var$4[$target] = 46;
        }
        $pos = Long_div($pos, Long_fromInt(10));
        $i = $i + 1 | 0;
    }
    if ($exp) {
        var$4 = $this.$buffer.data;
        $target = $negative + 1 | 0;
        var$4[$negative] = 69;
        if ($exp >= 0)
            $zeros = $target;
        else {
            $exp =  -$exp;
            var$4 = $this.$buffer.data;
            $zeros = $target + 1 | 0;
            var$4[$target] = 45;
        }
        if ($exp >= 100) {
            var$4 = $this.$buffer.data;
            $target = $zeros + 1 | 0;
            var$4[$zeros] = (48 + ($exp / 100 | 0) | 0) & 65535;
            $exp = $exp % 100 | 0;
            var$4 = $this.$buffer.data;
            $intPart = $target + 1 | 0;
            var$4[$target] = (48 + ($exp / 10 | 0) | 0) & 65535;
        } else if ($exp < 10)
            $intPart = $zeros;
        else {
            var$4 = $this.$buffer.data;
            $intPart = $zeros + 1 | 0;
            var$4[$zeros] = (48 + ($exp / 10 | 0) | 0) & 65535;
        }
        $this.$buffer.data[$intPart] = (48 + ($exp % 10 | 0) | 0) & 65535;
    }
    return $this;
}
function jl_AbstractStringBuilder_trailingDecimalZeros($n) {
    var $zeros, $result, $bit, $i;
    $zeros = Long_fromInt(1);
    $result = 0;
    $bit = 16;
    $i = jl_AbstractStringBuilder$Constants_longLogPowersOfTen.data.length - 1 | 0;
    while ($i >= 0) {
        if (Long_eq(Long_rem($n, Long_mul($zeros, jl_AbstractStringBuilder$Constants_longLogPowersOfTen.data[$i])), Long_ZERO)) {
            $result = $result | $bit;
            $zeros = Long_mul($zeros, jl_AbstractStringBuilder$Constants_longLogPowersOfTen.data[$i]);
        }
        $bit = $bit >>> 1;
        $i = $i + (-1) | 0;
    }
    return $result;
}
function jl_AbstractStringBuilder_ensureCapacity($this, $capacity) {
    var $newLength, var$3, var$4, var$5;
    if ($this.$buffer.data.length >= $capacity)
        return;
    $newLength = $this.$buffer.data.length >= 1073741823 ? 2147483647 : jl_Math_max($capacity, jl_Math_max($this.$buffer.data.length * 2 | 0, 5));
    var$3 = $this.$buffer.data;
    var$4 = $rt_createCharArray($newLength);
    var$5 = var$4.data;
    $capacity = jl_Math_min($newLength, var$3.length);
    $newLength = 0;
    while ($newLength < $capacity) {
        var$5[$newLength] = var$3[$newLength];
        $newLength = $newLength + 1 | 0;
    }
    $this.$buffer = var$4;
}
function jl_AbstractStringBuilder_toString($this) {
    var var$1, var$2, var$3, var$4, var$5;
    var$1 = new jl_String;
    var$2 = $this.$buffer;
    var$3 = $this.$length0;
    var$1.$characters = $rt_createCharArray(var$3);
    var$4 = 0;
    while (var$4 < var$3) {
        var$5 = var$2.data;
        var$1.$characters.data[var$4] = var$5[var$4 + 0 | 0];
        var$4 = var$4 + 1 | 0;
    }
    return var$1;
}
function jl_AbstractStringBuilder_insertSpace($this, $start, $end) {
    var $sz, $i;
    $sz = $this.$length0 - $start | 0;
    $this.$ensureCapacity(($this.$length0 + $end | 0) - $start | 0);
    $i = $sz - 1 | 0;
    while ($i >= 0) {
        $this.$buffer.data[$end + $i | 0] = $this.$buffer.data[$start + $i | 0];
        $i = $i + (-1) | 0;
    }
    $this.$length0 = $this.$length0 + ($end - $start | 0) | 0;
}
function jl_Appendable() {
}
function jl_StringBuilder() {
    jl_AbstractStringBuilder.call(this);
}
function jl_StringBuilder__init_() {
    var var_0 = new jl_StringBuilder();
    jl_StringBuilder__init_0(var_0);
    return var_0;
}
function jl_StringBuilder__init_0($this) {
    jl_AbstractStringBuilder__init_0($this, 16);
}
function jl_StringBuilder_append($this, $string) {
    jl_StringBuilder_insert($this, $this.$length0, $string);
    return $this;
}
function jl_StringBuilder_append0($this, $value) {
    jl_StringBuilder_insert0($this, $this.$length0, $value);
    return $this;
}
function jl_StringBuilder_append1($this, $obj) {
    jl_StringBuilder_insert1($this, $this.$length0, $obj);
    return $this;
}
function jl_StringBuilder_insert0($this, $target, $value) {
    jl_AbstractStringBuilder_insert0($this, $target, $value);
    return $this;
}
function jl_StringBuilder_insert1($this, $index, $obj) {
    jl_StringBuilder_insert($this, $index, $obj === null ? $rt_s(5) : $obj.$toString());
    return $this;
}
function jl_StringBuilder_insert($this, $index, $string) {
    var var$3, var$4, var$5;
    if ($index >= 0 && $index <= $this.$length0) {
        a: {
            if ($string === null)
                $string = $rt_s(5);
            else if (jl_String_isEmpty($string))
                break a;
            jl_AbstractStringBuilder_ensureCapacity($this, $this.$length0 + jl_String_length($string) | 0);
            var$3 = $this.$length0 - 1 | 0;
            while (var$3 >= $index) {
                $this.$buffer.data[var$3 + jl_String_length($string) | 0] = $this.$buffer.data[var$3];
                var$3 = var$3 + (-1) | 0;
            }
            $this.$length0 = $this.$length0 + jl_String_length($string) | 0;
            var$3 = 0;
            while (var$3 < jl_String_length($string)) {
                var$4 = $this.$buffer.data;
                var$5 = $index + 1 | 0;
                var$4[$index] = jl_String_charAt($string, var$3);
                var$3 = var$3 + 1 | 0;
                $index = var$5;
            }
        }
        return $this;
    }
    $string = new jl_StringIndexOutOfBoundsException;
    jl_Exception__init_($string);
    $rt_throw($string);
}
function jl_StringBuilder_toString($this) {
    return jl_AbstractStringBuilder_toString($this);
}
function jl_StringBuilder_ensureCapacity($this, var$1) {
    jl_AbstractStringBuilder_ensureCapacity($this, var$1);
}
function jl_StringBuilder_insert2($this, var$1, var$2) {
    return jl_StringBuilder_insert1($this, var$1, var$2);
}
function jl_StringBuilder_insert3($this, var$1, var$2) {
    return jl_StringBuilder_insert0($this, var$1, var$2);
}
function jl_StringBuilder_insert4($this, var$1, var$2) {
    return jl_StringBuilder_insert($this, var$1, var$2);
}
function jl_Number() {
    jl_Object.call(this);
}
function jl_Integer() {
    jl_Number.call(this);
    this.$value = 0;
}
var jl_Integer_TYPE = null;
var jl_Integer_integerCache = null;
function jl_Integer__init_(var_0) {
    var var_1 = new jl_Integer();
    jl_Integer__init_0(var_1, var_0);
    return var_1;
}
function jl_Integer__init_0($this, $value) {
    $this.$value = $value;
}
function jl_Integer_valueOf($i) {
    var var$2;
    if ($i >= (-128) && $i <= 127) {
        a: {
            if (jl_Integer_integerCache === null) {
                jl_Integer_integerCache = $rt_createArray(jl_Integer, 256);
                var$2 = 0;
                while (true) {
                    if (var$2 >= jl_Integer_integerCache.data.length)
                        break a;
                    jl_Integer_integerCache.data[var$2] = jl_Integer__init_(var$2 - 128 | 0);
                    var$2 = var$2 + 1 | 0;
                }
            }
        }
        return jl_Integer_integerCache.data[$i + 128 | 0];
    }
    return jl_Integer__init_($i);
}
function jl_Integer_intValue($this) {
    return $this.$value;
}
function jl_Integer_toString($this) {
    var var$1;
    var$1 = $this.$value;
    return jl_AbstractStringBuilder_toString(jl_AbstractStringBuilder_append(jl_AbstractStringBuilder__init_(20), var$1, 10));
}
function jl_Integer_equals($this, $other) {
    if ($this === $other)
        return 1;
    return $other instanceof jl_Integer && $other.$value == $this.$value ? 1 : 0;
}
function jl_Integer__clinit_() {
    jl_Integer_TYPE = $rt_cls($rt_intcls());
}
function jl_IncompatibleClassChangeError() {
    jl_LinkageError.call(this);
}
function jl_IncompatibleClassChangeError__init_(var_0) {
    var var_1 = new jl_IncompatibleClassChangeError();
    jl_IncompatibleClassChangeError__init_0(var_1, var_0);
    return var_1;
}
function jl_IncompatibleClassChangeError__init_0($this, $message) {
    jl_Throwable__init_0($this, $message);
}
function jl_NoSuchFieldError() {
    jl_IncompatibleClassChangeError.call(this);
}
function jl_NoSuchFieldError__init_(var_0) {
    var var_1 = new jl_NoSuchFieldError();
    jl_NoSuchFieldError__init_0(var_1, var_0);
    return var_1;
}
function jl_NoSuchFieldError__init_0($this, $message) {
    jl_IncompatibleClassChangeError__init_0($this, $message);
}
function jl_NoSuchMethodError() {
    jl_IncompatibleClassChangeError.call(this);
}
function jl_NoSuchMethodError__init_(var_0) {
    var var_1 = new jl_NoSuchMethodError();
    jl_NoSuchMethodError__init_0(var_1, var_0);
    return var_1;
}
function jl_NoSuchMethodError__init_0($this, $message) {
    jl_IncompatibleClassChangeError__init_0($this, $message);
}
function jl_Exception() {
    jl_Throwable.call(this);
}
function jl_Exception__init_0() {
    var var_0 = new jl_Exception();
    jl_Exception__init_(var_0);
    return var_0;
}
function jl_Exception__init_($this) {
    $this.$suppressionEnabled = 1;
    $this.$writableStackTrace = 1;
}
function jl_RuntimeException() {
    jl_Exception.call(this);
}
function jl_RuntimeException__init_(var_0) {
    var var_1 = new jl_RuntimeException();
    jl_RuntimeException__init_0(var_1, var_0);
    return var_1;
}
function jl_RuntimeException__init_0($this, $message) {
    jl_Throwable__init_0($this, $message);
}
function otci_IntegerUtil() {
    jl_Object.call(this);
}
function ecd_Model() {
    var a = this; jl_Object.call(a);
    a.$storageItemName = $rt_s(2);
    a.$todos = null;
    a.$localStorage = null;
    a.$isShowing = null;
}
function ecd_Model_getFilteredTodos($this) {
    if ($this.$isShowing === ecd_TodoFilterType_ACTIVE)
        return ecd_Model_getActiveTodos($this);
    if ($this.$isShowing !== ecd_TodoFilterType_COMPLETED)
        return $this.$todos;
    return ecd_Model_getCompletedTodos($this);
}
function ecd_Model_getCompletedTodos($this) {
    return jusi_SimpleStreamImpl_collect(jusi_SimpleStreamImpl_filter(ju_Collection_stream($this.$todos), new ecd_Model$getCompletedTodos$lambda$_2_0), jus_Collectors_toList());
}
function ecd_Model_getActiveTodos($this) {
    return jusi_SimpleStreamImpl_collect(jusi_SimpleStreamImpl_filter(ju_Collection_stream($this.$todos), new ecd_Model$getActiveTodos$lambda$_3_0), jus_Collectors_toList());
}
function ecd_Model_saveToStorage($this) {
    var var$1, var$2, var$3, var$4, var$5;
    var$1 = $this.$localStorage;
    var$2 = $this.$todos;
    var$3 = new otfjs_JsonSerializerContext;
    var$3.$ids = ju_IdentityHashMap__init_();
    var$4 = ju_IdentityHashMap__init_();
    var$5 = new ju_SetFromMap;
    var$5.$map = var$4;
    var$3.$touchedObjects = var$5;
    var$2 = otfjt_Node_stringify$static(otfj_JSON_serialize(var$3, var$2));
    var$1.setItem("todos", $rt_ustr(var$2));
}
function ecd_Model_setIsShowing($this, $isShowing) {
    $this.$isShowing = $isShowing;
}
function ecd_Model_getIsShowing($this) {
    return $this.$isShowing;
}
function ecd_Model_getTodos($this) {
    return $this.$todos;
}
function ecd_Model_addTodo($this, $title) {
    var var$2, var$3;
    var$2 = $this.$todos;
    var$3 = new ecd_Model$Todo;
    var$3.$title = $rt_s(3);
    var$3.$completed = 0;
    var$3.$model0 = $this;
    var$3.$title = $title;
    ju_ArrayList_add(var$2, var$3);
    ecd_Model_saveToStorage($this);
}
function ecd_Model_deleteTodo($this, $todo) {
    ju_ArrayList_remove($this.$todos, $todo);
    ecd_Model_saveToStorage($this);
}
function ecd_Model_clearCompleted($this) {
    var var$1, var$2, var$3;
    var$1 = new ju_ArrayList;
    var$2 = jusi_SimpleStreamImpl_collect(jusi_SimpleStreamImpl_filter(ju_Collection_stream($this.$todos), new ecd_Model$clearCompleted$lambda$_10_0), jus_Collectors_toList());
    ju_ArrayList__init_0(var$1, var$2.$size);
    var$2 = ju_AbstractList_iterator(var$2);
    var$3 = 0;
    while (var$3 < var$1.$array.data.length) {
        var$1.$array.data[var$3] = ju_AbstractList$1_next(var$2);
        var$3 = var$3 + 1 | 0;
    }
    var$1.$size = var$1.$array.data.length;
    $this.$todos = var$1;
}
function ju_Comparator() {
}
function jl_String$_clinit_$lambda$_81_0() {
    jl_Object.call(this);
}
function jl_Character() {
    jl_Object.call(this);
}
var jl_Character_TYPE = null;
var jl_Character_characterCache = null;
function jl_Character_forDigit($digit, $radix) {
    if ($radix >= 2 && $radix <= 36 && $digit < $radix)
        return $digit < 10 ? (48 + $digit | 0) & 65535 : ((97 + $digit | 0) - 10 | 0) & 65535;
    return 0;
}
function jl_Character__clinit_() {
    jl_Character_TYPE = $rt_cls($rt_charcls());
    jl_Character_characterCache = $rt_createArray(jl_Character, 128);
}
function jl_Iterable() {
}
function jl_Iterable_forEach($this, $action) {
    var $itr;
    $itr = ju_AbstractList_iterator($this);
    while (ju_AbstractList$1_hasNext($itr)) {
        ecd_Model$_init_$lambda$_0_0_accept($action, ju_AbstractList$1_next($itr));
    }
}
function ju_Collection() {
}
function ju_Collection_spliterator($this) {
    var var$1;
    var$1 = new jusi_SpliteratorOverCollection;
    var$1.$collection = $this;
    return var$1;
}
function ju_Collection_stream($this) {
    var var$1;
    var$1 = new jusi_StreamOverSpliterator;
    var$1.$spliterator = ju_Collection_spliterator($this);
    return var$1;
}
function ju_AbstractCollection() {
    jl_Object.call(this);
}
function ju_AbstractCollection_toString($this) {
    var $sb, $iter;
    $sb = jl_StringBuilder__init_();
    jl_StringBuilder_append($sb, $rt_s(6));
    $iter = ju_AbstractList_iterator($this);
    if (ju_AbstractList$1_hasNext($iter))
        jl_StringBuilder_append($sb, jl_String_valueOf(ju_AbstractList$1_next($iter)));
    while (ju_AbstractList$1_hasNext($iter)) {
        jl_StringBuilder_append(jl_StringBuilder_append($sb, $rt_s(7)), jl_String_valueOf(ju_AbstractList$1_next($iter)));
    }
    jl_StringBuilder_append($sb, $rt_s(8));
    return jl_AbstractStringBuilder_toString($sb);
}
function ju_List() {
}
function ju_AbstractList() {
    ju_AbstractCollection.call(this);
    this.$modCount = 0;
}
function ju_AbstractList_add($this, $e) {
    ju_AbstractSequentialList_add($this, $this.$size0, $e);
    return 1;
}
function ju_AbstractList_iterator($this) {
    var var$1;
    var$1 = new ju_AbstractList$1;
    var$1.$this$0 = $this;
    var$1.$modCount0 = var$1.$this$0.$modCount;
    var$1.$size1 = var$1.$this$0.$size2();
    var$1.$removeIndex = (-1);
    return var$1;
}
function ju_AbstractList_indexOf($this, $o) {
    var $sz, $i, $e;
    $sz = $this.$size;
    $i = 0;
    a: {
        while ($i < $sz) {
            b: {
                $e = ju_ArrayList_get($this, $i);
                if ($o !== null) {
                    if (!jl_Object_equals($o, $e))
                        break b;
                    else
                        break a;
                }
                if ($e === null)
                    break a;
            }
            $i = $i + 1 | 0;
        }
        return (-1);
    }
    return $i;
}
function ju_AbstractList_listIterator($this) {
    return $this.$listIterator(0);
}
function ju_AbstractList_listIterator0($this, $index) {
    var var$2, var$3, var$4;
    var$2 = new ju_AbstractList$TListIteratorImpl;
    var$3 = $this.$modCount;
    var$4 = $this.$size2();
    var$2.$this$00 = $this;
    var$2.$i = $index;
    var$2.$j = $index;
    var$2.$lastModCount = var$3;
    var$2.$sz = var$4;
    return var$2;
}
function jl_Cloneable() {
}
function ju_RandomAccess() {
}
function ju_ArrayList() {
    var a = this; ju_AbstractList.call(a);
    a.$array = null;
    a.$size = 0;
}
function ju_ArrayList__init_() {
    var var_0 = new ju_ArrayList();
    ju_ArrayList__init_1(var_0);
    return var_0;
}
function ju_ArrayList__init_2(var_0) {
    var var_1 = new ju_ArrayList();
    ju_ArrayList__init_0(var_1, var_0);
    return var_1;
}
function ju_ArrayList__init_1($this) {
    ju_ArrayList__init_0($this, 10);
}
function ju_ArrayList__init_0($this, $initialCapacity) {
    $this.$array = $rt_createArray(jl_Object, $initialCapacity);
}
function ju_ArrayList_ensureCapacity($this, $minCapacity) {
    var $newLength, var$3, var$4, var$5;
    if ($this.$array.data.length < $minCapacity) {
        $newLength = $this.$array.data.length >= 1073741823 ? 2147483647 : jl_Math_max($minCapacity, jl_Math_max($this.$array.data.length * 2 | 0, 5));
        var$3 = $this.$array;
        var$4 = jl_Class_getComponentType(jl_Object_getClass(var$3));
        if (var$4 === null) {
            var$4 = new jl_NullPointerException;
            jl_Exception__init_(var$4);
            $rt_throw(var$4);
        }
        if (var$4 === $rt_cls($rt_voidcls())) {
            var$4 = new jl_IllegalArgumentException;
            jl_Exception__init_(var$4);
            $rt_throw(var$4);
        }
        if ($newLength < 0) {
            var$4 = new jl_NegativeArraySizeException;
            jl_Exception__init_(var$4);
            $rt_throw(var$4);
        }
        var$5 = var$3.data;
        var$3 = jlr_Array_newInstanceImpl(var$4.$platformClass, $newLength);
        $minCapacity = jl_Math_min($newLength, var$5.length);
        $newLength = 0;
        while ($newLength < $minCapacity) {
            var$3.data[$newLength] = var$5[$newLength];
            $newLength = $newLength + 1 | 0;
        }
        $this.$array = var$3;
    }
}
function ju_ArrayList_get($this, $index) {
    ju_ArrayList_checkIndex($this, $index);
    return $this.$array.data[$index];
}
function ju_ArrayList_size($this) {
    return $this.$size;
}
function ju_ArrayList_add($this, $element) {
    var var$2, var$3;
    ju_ArrayList_ensureCapacity($this, $this.$size + 1 | 0);
    var$2 = $this.$array.data;
    var$3 = $this.$size;
    $this.$size = var$3 + 1 | 0;
    var$2[var$3] = $element;
    $this.$modCount = $this.$modCount + 1 | 0;
    return 1;
}
function ju_ArrayList_remove0($this, $i) {
    var $old, var$3, var$4, $i_0;
    ju_ArrayList_checkIndex($this, $i);
    $old = $this.$array.data[$i];
    $this.$size = $this.$size - 1 | 0;
    while ($i < $this.$size) {
        var$3 = $this.$array.data;
        var$4 = $this.$array.data;
        $i_0 = $i + 1 | 0;
        var$3[$i] = var$4[$i_0];
        $i = $i_0;
    }
    $this.$array.data[$this.$size] = null;
    $this.$modCount = $this.$modCount + 1 | 0;
    return $old;
}
function ju_ArrayList_remove($this, $o) {
    var $index;
    $index = ju_AbstractList_indexOf($this, $o);
    if ($index < 0)
        return 0;
    ju_ArrayList_remove0($this, $index);
    return 1;
}
function ju_ArrayList_checkIndex($this, $index) {
    var var$2;
    if ($index >= 0 && $index < $this.$size)
        return;
    var$2 = new jl_IndexOutOfBoundsException;
    jl_Exception__init_(var$2);
    $rt_throw(var$2);
}
function otj_JSObject() {
}
function otjde_EventTarget() {
}
function otjde_FocusEventTarget() {
}
function otjde_MouseEventTarget() {
}
function otjde_KeyboardEventTarget() {
}
function otjde_LoadEventTarget() {
}
function otjb_WindowEventTarget() {
}
function otjb_StorageProvider() {
}
function otjc_JSArrayReader() {
}
function otjb_Window() {
    jl_Object.call(this);
}
function otjb_Window_addEventListener$exported$0(var$0, var$1, var$2) {
    var$0.$addEventListener($rt_str(var$1), otji_JS_functionAsObject(var$2, "handleEvent"));
}
function otjb_Window_removeEventListener$exported$1(var$0, var$1, var$2) {
    var$0.$removeEventListener($rt_str(var$1), otji_JS_functionAsObject(var$2, "handleEvent"));
}
function otjb_Window_get$exported$2(var$0, var$1) {
    return var$0.$get0(var$1);
}
function otjb_Window_removeEventListener$exported$3(var$0, var$1, var$2, var$3) {
    var$0.$removeEventListener0($rt_str(var$1), otji_JS_functionAsObject(var$2, "handleEvent"), var$3 ? 1 : 0);
}
function otjb_Window_dispatchEvent$exported$4(var$0, var$1) {
    return !!var$0.$dispatchEvent(var$1);
}
function otjb_Window_getLength$exported$5(var$0) {
    return var$0.$getLength();
}
function otjb_Window_addEventListener$exported$6(var$0, var$1, var$2, var$3) {
    var$0.$addEventListener0($rt_str(var$1), otji_JS_functionAsObject(var$2, "handleEvent"), var$3 ? 1 : 0);
}
function jl_Enum() {
    var a = this; jl_Object.call(a);
    a.$name0 = null;
    a.$ordinal = 0;
}
function jl_Enum__init_(var_0, var_1) {
    var var_2 = new jl_Enum();
    jl_Enum__init_0(var_2, var_0, var_1);
    return var_2;
}
function jl_Enum__init_0($this, $name, $ordinal) {
    $this.$name0 = $name;
    $this.$ordinal = $ordinal;
}
function jl_Enum_toString($this) {
    return $this.$name0;
}
function ecd_TodoFilterType() {
    jl_Enum.call(this);
}
var ecd_TodoFilterType_ALL = null;
var ecd_TodoFilterType_ACTIVE = null;
var ecd_TodoFilterType_COMPLETED = null;
var ecd_TodoFilterType_$VALUES = null;
function ecd_TodoFilterType_values() {
    return ecd_TodoFilterType_$VALUES.$clone();
}
function ecd_TodoFilterType__clinit_() {
    var var$1, var$2, var$3;
    var$1 = new ecd_TodoFilterType;
    jl_Enum__init_0(var$1, $rt_s(9), 0);
    ecd_TodoFilterType_ALL = var$1;
    var$1 = new ecd_TodoFilterType;
    jl_Enum__init_0(var$1, $rt_s(10), 1);
    ecd_TodoFilterType_ACTIVE = var$1;
    var$1 = new ecd_TodoFilterType;
    jl_Enum__init_0(var$1, $rt_s(11), 2);
    ecd_TodoFilterType_COMPLETED = var$1;
    var$2 = $rt_createArray(ecd_TodoFilterType, 3);
    var$3 = var$2.data;
    var$3[0] = ecd_TodoFilterType_ALL;
    var$3[1] = ecd_TodoFilterType_ACTIVE;
    var$3[2] = ecd_TodoFilterType_COMPLETED;
    ecd_TodoFilterType_$VALUES = var$2;
}
function otfjt_Node() {
    jl_Object.call(this);
}
function otfjt_Node_isArray$static($this) {
    return otfjt_Node_isArray$js_body$_1($this) ? 1 : 0;
}
function otfjt_Node_isNull$static($this) {
    return $this === null ? 1 : 0;
}
function otfjt_Node_isBoolean$static($this) {
    return typeof $this == 'boolean' ? 1 : 0;
}
function otfjt_Node_stringify$static($this) {
    return $rt_str(JSON.stringify($this));
}
function otfjt_Node_isArray$js_body$_1(var$1) {
    return typeof var$1 == 'object' && var$1 instanceof Array;
}
function otfj_JSON() {
    jl_Object.call(this);
}
function otfj_JSON_serialize($context, $object) {
    var $serializer, var$4;
    if ($object === null)
        return null;
    a: {
        b: {
            c: {
                d: {
                    e: {
                        f: {
                            g: {
                                $serializer = jl_Object_getClass($object);
                                var$4 = jl_Class_getName($serializer);
                                switch (jl_String_hashCode(var$4)) {
                                    case -623333526:
                                        break;
                                    case 614832599:
                                        break g;
                                    case -1114099497:
                                        break f;
                                    case 761287205:
                                        break e;
                                    case 1195259493:
                                        break d;
                                    case 344809556:
                                        break c;
                                    default:
                                        break b;
                                }
                                if (!jl_String_equals(var$4, $rt_s(12)))
                                    break b;
                                $serializer = otfj_JSON$PROXY$4_16_getClassSerializer($serializer);
                                break a;
                            }
                            if (!jl_String_equals(var$4, $rt_s(13)))
                                break b;
                            $serializer = otfj_JSON$PROXY$4_8_getClassSerializer($serializer);
                            break a;
                        }
                        if (!jl_String_equals(var$4, $rt_s(14)))
                            break b;
                        $serializer = otfj_JSON$PROXY$4_0_getClassSerializer($serializer);
                        break a;
                    }
                    if (!jl_String_equals(var$4, $rt_s(15)))
                        break b;
                    $serializer = otfj_JSON$PROXY$4_14_getClassSerializer($serializer);
                    break a;
                }
                if (!jl_String_equals(var$4, $rt_s(16)))
                    break b;
                $serializer = otfj_JSON$PROXY$4_22_getClassSerializer($serializer);
                break a;
            }
            if (jl_String_equals(var$4, $rt_s(17))) {
                $serializer = otfj_JSON$PROXY$4_1_getClassSerializer($serializer);
                break a;
            }
        }
        $serializer = null;
    }
    if ($serializer !== null)
        return $serializer.$serialize($context, $object);
    $context = new jl_IllegalArgumentException;
    jl_Throwable__init_0($context, jl_AbstractStringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(18)), jl_Class_getName(jl_Object_getClass($object)))));
    $rt_throw($context);
}
function otfj_JSON_deserialize($node, $type) {
    var $typeName, $deserializer;
    a: {
        b: {
            c: {
                $typeName = jl_Class_getName($type);
                $deserializer = jl_Class_getName($type);
                switch (jl_String_hashCode($deserializer)) {
                    case 1063877011:
                        break;
                    case -1114099497:
                        break c;
                    default:
                        break b;
                }
                if (!jl_String_equals($deserializer, $rt_s(19)))
                    break b;
                $deserializer = otfj_JSON$PROXY$7_1_getClassDeserializer($type);
                break a;
            }
            if (jl_String_equals($deserializer, $rt_s(14))) {
                $deserializer = otfj_JSON$PROXY$7_0_getClassDeserializer($type);
                break a;
            }
        }
        $deserializer = null;
    }
    if ($deserializer === null) {
        $node = new jl_IllegalArgumentException;
        jl_Throwable__init_0($node, jl_AbstractStringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(20)), $typeName)));
        $rt_throw($node);
    }
    $type = new otfjd_JsonDeserializerContext;
    $typeName = new ju_HashMap;
    $typeName.$elementCount = 0;
    $typeName.$elementData = $rt_createArray(ju_HashMap$HashEntry, 16);
    $typeName.$loadFactor = 0.75;
    $typeName.$threshold = $typeName.$elementData.data.length * $typeName.$loadFactor | 0;
    $type.$objects = $typeName;
    return $deserializer.$deserialize0($type, $node);
}
function juf_Consumer() {
}
function ecd_Model$_init_$lambda$_0_0() {
    jl_Object.call(this);
    this.$_0 = null;
}
function ecd_Model$_init_$lambda$_0_0_accept(var$0, var$1) {
    var$1.$model0 = var$0.$_0;
}
function otfjd_JsonDeserializerContext() {
    jl_Object.call(this);
    this.$objects = null;
}
function jl_IllegalArgumentException() {
    jl_RuntimeException.call(this);
}
function ju_Map() {
}
function ju_AbstractMap() {
    jl_Object.call(this);
}
function ju_HashMap() {
    var a = this; ju_AbstractMap.call(a);
    a.$elementCount = 0;
    a.$elementData = null;
    a.$loadFactor = 0.0;
    a.$threshold = 0;
}
function ju_HashMap_newElementArray($this, $s) {
    return $rt_createArray(ju_HashMap$HashEntry, $s);
}
function otfj_JSON$PROXY$7_0() {
    jl_Object.call(this);
}
function otfj_JSON$PROXY$7_0_getClassDeserializer(var$1) {
    var$1 = new otfjd_ListDeserializer;
    var$1.$itemDeserializer = new otfjd_ObjectDeserializer;
    return var$1;
}
function jl_IndexOutOfBoundsException() {
    jl_RuntimeException.call(this);
}
function jl_StringIndexOutOfBoundsException() {
    jl_IndexOutOfBoundsException.call(this);
}
function otjdx_Node() {
}
function otjdx_Document() {
}
function otjdh_HTMLDocument() {
}
function otfjd_JsonDeserializer() {
    jl_Object.call(this);
}
function otfjd_ListDeserializer() {
    otfjd_JsonDeserializer.call(this);
    this.$itemDeserializer = null;
}
function otfjd_ListDeserializer_deserialize($this, $context, $node) {
    var $arrayNode, $list, $i;
    if (otfjt_Node_isNull$static($node))
        return null;
    if (!otfjt_Node_isArray$static($node)) {
        $context = new jl_IllegalArgumentException;
        jl_Throwable__init_0($context, $rt_s(21));
        $rt_throw($context);
    }
    $arrayNode = $node;
    $list = ju_ArrayList__init_2(otfjt_ArrayNode_size$static($arrayNode));
    $i = 0;
    while ($i < otfjt_ArrayNode_size$static($arrayNode)) {
        ju_ArrayList_add($list, otfjd_ObjectDeserializer_deserialize($this.$itemDeserializer, $context, $arrayNode[$i]));
        $i = $i + 1 | 0;
    }
    return $list;
}
function otfjd_ObjectDeserializer() {
    otfjd_JsonDeserializer.call(this);
}
function otfjd_ObjectDeserializer_deserialize($this, $context, $node) {
    var $arrayNode, $result, var$5, $i, $number, var$8;
    if (otfjt_Node_isNull$static($node))
        return null;
    if (otfjt_Node_isArray$static($node)) {
        $arrayNode = $node;
        $result = $rt_createArray(jl_Object, otfjt_ArrayNode_size$static($arrayNode));
        var$5 = $result.data;
        $i = 0;
        while ($i < otfjt_ArrayNode_size$static($arrayNode)) {
            var$5[$i] = otfj_JSON_deserialize($arrayNode[$i], $rt_cls(jl_Object));
            $i = $i + 1 | 0;
        }
        return $result;
    }
    if (otfjt_Node_isBoolean$static($node))
        return jl_Boolean_valueOf(otfjt_BooleanNode_getValue$static($node));
    if (!(typeof $node == 'number' ? 1 : 0)) {
        if (typeof $node == 'string' ? 1 : 0)
            return $rt_str($node);
        $number = new jl_IllegalArgumentException;
        jl_Throwable__init_0($number, jl_AbstractStringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(22)), otfjt_Node_stringify$static($node))));
        $rt_throw($number);
    }
    $number = $node;
    var$8 = !(otfjt_NumberNode_getValue$static($number) !== otfjt_NumberNode_getIntValue$static($number) ? 0 : 1) ? otfjt_NumberNode_getValue$static($number) : otfjt_NumberNode_getIntValue$static($number);
    $context = new jl_Double;
    $context.$value0 = var$8;
    return $context;
}
function ju_Map$Entry() {
}
function ju_MapEntry() {
    var a = this; jl_Object.call(a);
    a.$key = null;
    a.$value1 = null;
}
function ju_HashMap$HashEntry() {
    ju_MapEntry.call(this);
}
function otfjt_ArrayNode() {
    otfjt_Node.call(this);
}
function otfjt_ArrayNode_size$static($this) {
    return $this.length;
}
function otfjt_ArrayNode_create$js_body$_10() {
    return [];
}
function otft_Templates() {
    jl_Object.call(this);
}
var otft_Templates_updating = 0;
var otft_Templates_rootComponents = null;
function otft_Templates_create($model) {
    var var$2, var$3;
    a: {
        b: {
            c: {
                d: {
                    var$2 = jl_Object_getClass($model);
                    var$3 = jl_Class_getName(var$2);
                    switch (jl_String_hashCode(var$3)) {
                        case 651776217:
                            break;
                        case -1355142661:
                            break d;
                        case -1283784744:
                            break c;
                        default:
                            break b;
                    }
                    if (!jl_String_equals(var$3, $rt_s(23)))
                        break b;
                    $model = otft_Templates$PROXY$4_1_create(var$2, $model);
                    break a;
                }
                if (!jl_String_equals(var$3, $rt_s(24)))
                    break b;
                $model = otft_Templates$PROXY$4_2_create(var$2, $model);
                break a;
            }
            if (jl_String_equals(var$3, $rt_s(25))) {
                $model = otft_Templates$PROXY$4_0_create(var$2, $model);
                break a;
            }
        }
        $model = null;
    }
    return $model;
}
function otft_Templates_update() {
    var var$1, $$je;
    if (otft_Templates_updating)
        return;
    otft_Templates_updating = 1;
    a: {
        try {
            var$1 = ju_AbstractList_iterator(otft_Templates_rootComponents);
            while (ju_AbstractList$1_hasNext(var$1)) {
                otft_Templates$RootComponent_render(ju_AbstractList$1_next(var$1));
            }
        } catch ($$e) {
            $$je = $rt_wrapException($$e);
            var$1 = $$je;
            break a;

        }
        otft_Templates_updating = 0;
        return;
    }
    otft_Templates_updating = 0;
    $rt_throw(var$1);
}
function otft_Templates__clinit_() {
    otft_Templates_rootComponents = ju_ArrayList__init_();
}
function ju_Iterator() {
}
function ju_AbstractList$1() {
    var a = this; jl_Object.call(a);
    a.$index = 0;
    a.$modCount0 = 0;
    a.$size1 = 0;
    a.$removeIndex = 0;
    a.$this$0 = null;
}
function ju_AbstractList$1_hasNext($this) {
    return $this.$index >= $this.$size1 ? 0 : 1;
}
function ju_AbstractList$1_next($this) {
    var var$1, var$2;
    if ($this.$modCount0 < $this.$this$0.$modCount) {
        var$1 = new ju_ConcurrentModificationException;
        jl_Exception__init_(var$1);
        $rt_throw(var$1);
    }
    $this.$removeIndex = $this.$index;
    var$1 = $this.$this$0;
    var$2 = $this.$index;
    $this.$index = var$2 + 1 | 0;
    return var$1.$get(var$2);
}
function otft_Space() {
    var a = this; jl_Object.call(a);
    a.$parent = null;
    a.$previous = null;
    a.$next0 = null;
}
function otft_Space_getParent($this) {
    return $this.$parent;
}
function otft_Space_getNext($this) {
    return $this.$next0;
}
function otft_Space_delete($this) {
    var $newPrevious, $newNext;
    if ($this.$parent === null)
        return;
    $this.$deleteDom();
    $newPrevious = $this.$previous;
    if ($newPrevious !== null)
        $newPrevious = $newPrevious.$previous;
    else
        $this.$parent.$first = $this.$next0;
    $newNext = $this.$next0;
    if ($newNext !== null)
        $newNext = $newNext.$next0;
    else
        $this.$parent.$previous = $this.$previous;
    if ($newPrevious !== null)
        $newPrevious.$next0 = $newNext;
    if ($newNext !== null)
        $newNext.$previous = $newPrevious;
    $this.$next0 = $newNext;
    $this.$previous = $newPrevious;
    $this.$parent = null;
}
function otft_Space_getRoot($space) {
    while ($space.$parent !== null) {
        $space = $space.$parent;
    }
    return !($space instanceof otft_RootSlot) ? null : $space;
}
function otft_Slot() {
    var a = this; otft_Space.call(a);
    a.$first = null;
    a.$last = null;
}
function otft_Slot_append($this, $slot) {
    otft_Slot_insertBefore($this, $slot, null);
}
function otft_Slot_insertBefore($this, $space, $successor) {
    var $root, $domNodes, $successorDomNode, $i, var$7;
    if ($space.$parent !== null) {
        $space = new jl_IllegalArgumentException;
        jl_Throwable__init_0($space, $rt_s(26));
        $rt_throw($space);
    }
    if ($successor !== null && $successor.$parent !== $this) {
        $space = new jl_IllegalArgumentException;
        jl_Throwable__init_0($space, $rt_s(27));
        $rt_throw($space);
    }
    $space.$parent = $this;
    if ($successor === null) {
        $space.$previous = $this.$last;
        if ($this.$last === null)
            $this.$first = $space;
        else
            $this.$last.$next0 = $space;
        $this.$last = $space;
    } else {
        $space.$next0 = $successor;
        $space.$previous = $successor.$previous;
        if ($space.$next0 === null)
            $this.$last = $space;
        else
            $space.$next0.$previous = $space;
        if ($space.$previous === null)
            $this.$first = $space;
        else
            $space.$previous.$next0 = $space;
    }
    $root = otft_Space_getRoot($this);
    if ($root === null)
        return;
    $domNodes = new Array();
    $space.$getAllNodes($domNodes);
    if (!$domNodes.length)
        return;
    a: {
        if ($successor !== null)
            $successorDomNode = otft_Slot_getFirstNode($successor);
        else {
            $successorDomNode = null;
            while ($this !== null) {
                if ($this.$next0 !== null) {
                    $successorDomNode = $this.$next0.$getFirstNode();
                    break a;
                }
                $this = $this.$parent;
            }
        }
    }
    $i = 0;
    while ($i < $domNodes.length) {
        $successor = $root.$domNode;
        var$7 = $domNodes[$i];
        $successor.insertBefore(var$7, $successorDomNode);
        $i = $i + 1 | 0;
    }
}
function otft_Slot_getFirstNode($this) {
    var $child, $result;
    $child = $this.$first;
    while (true) {
        if ($child === null)
            return null;
        $result = $child.$getFirstNode();
        if ($result !== null)
            break;
        $child = $child.$next0;
    }
    return $result;
}
function otft_Slot_getAllNodes($this, $nodes) {
    var $child;
    $child = $this.$first;
    while ($child !== null) {
        $child.$getAllNodes($nodes);
        $child = $child.$next0;
    }
}
function otft_Slot_deleteDom($this) {
    var $child;
    $child = $this.$first;
    while ($child !== null) {
        $child.$deleteDom();
        $child = $child.$next0;
    }
}
function otft_Slot_create() {
    return new otft_ContainerSlot;
}
function otft_Slot_root($domNode) {
    var var$2;
    var$2 = new otft_RootSlot;
    var$2.$domNode = $domNode;
    return var$2;
}
function otft_Renderable() {
}
function otft_Component() {
}
function otft_AbstractComponent() {
    jl_Object.call(this);
    this.$slot = null;
}
function otft_AbstractComponent__init_0(var_0) {
    var var_1 = new otft_AbstractComponent();
    otft_AbstractComponent__init_(var_1, var_0);
    return var_1;
}
function otft_AbstractComponent__init_($this, $slot) {
    $this.$slot = $slot;
}
function otft_AbstractComponent_destroy($this) {
    otft_Space_delete($this.$slot);
}
function otft_AbstractComponent_getSlot($this) {
    return $this.$slot;
}
function otft_Templates$RootComponent() {
    otft_AbstractComponent.call(this);
    this.$inner = null;
}
function otft_Templates$RootComponent_render($this) {
    otft_DomComponentTemplate_render($this.$inner);
}
function otft_Templates$RootComponent_destroy($this) {
    otft_DomComponentTemplate_destroy($this.$inner);
    otft_AbstractComponent_destroy($this);
    ju_ArrayList_remove(otft_Templates_rootComponents, $this);
}
function otft_RootSlot() {
    otft_Slot.call(this);
    this.$domNode = null;
}
function ecd_Model$Todo() {
    var a = this; jl_Object.call(a);
    a.$title = null;
    a.$completed = 0;
    a.$model0 = null;
}
function ecd_Model$Todo_setTitle($this, $title) {
    $this.$title = $title;
    ecd_Model_saveToStorage($this.$model0);
}
function ecd_Model$Todo_getTitle($this) {
    return $this.$title;
}
function ecd_Model$Todo_setCompleted($this, $completed) {
    $this.$completed = $completed;
    ecd_Model_saveToStorage($this.$model0);
}
function ecd_Model$Todo_getIsCompleted($this) {
    return $this.$completed;
}
function ecd_Model$Todo_toggle($this) {
    $this.$completed = $this.$completed ? 0 : 1;
    ecd_Model_saveToStorage($this.$model0);
}
function otft_Templates$PROXY$4_0() {
    jl_Object.call(this);
}
function otft_Templates$PROXY$4_0_create(var$1, var$2) {
    var$1 = new otft_Fragment$proxy$4_0_0;
    var$1.$proxyCapture0 = var$2;
    var$2 = new otft_Fragment$proxy$4_0_3;
    var$2.$proxyCapture00 = var$1;
    return var$2;
}
function otfjt_BooleanNode() {
    otfjt_Node.call(this);
}
var otfjt_BooleanNode_TRUE = null;
var otfjt_BooleanNode_FALSE = null;
function otfjt_BooleanNode_$callClinit() {
    otfjt_BooleanNode_$callClinit = $rt_eraseClinit(otfjt_BooleanNode);
    otfjt_BooleanNode__clinit_();
}
function otfjt_BooleanNode__clinit_() {
    otfjt_BooleanNode_TRUE = !!(!!1);
    otfjt_BooleanNode_FALSE = !!(!!0);
}
function otfjt_BooleanNode_getValue$static($this) {
    otfjt_BooleanNode_$callClinit();
    return !!$this ? 1 : 0;
}
function jl_Boolean() {
    jl_Object.call(this);
    this.$value2 = 0;
}
var jl_Boolean_TRUE = null;
var jl_Boolean_FALSE = null;
var jl_Boolean_TYPE = null;
function jl_Boolean__init_(var_0) {
    var var_1 = new jl_Boolean();
    jl_Boolean__init_0(var_1, var_0);
    return var_1;
}
function jl_Boolean__init_0($this, $value) {
    $this.$value2 = $value;
}
function jl_Boolean_booleanValue($this) {
    return $this.$value2;
}
function jl_Boolean_valueOf($value) {
    return !$value ? jl_Boolean_FALSE : jl_Boolean_TRUE;
}
function jl_Boolean_toString($this) {
    return !$this.$value2 ? $rt_s(28) : $rt_s(29);
}
function jl_Boolean__clinit_() {
    jl_Boolean_TRUE = jl_Boolean__init_(1);
    jl_Boolean_FALSE = jl_Boolean__init_(0);
    jl_Boolean_TYPE = $rt_cls($rt_booleancls());
}
function otfjt_NumberNode() {
    otfjt_Node.call(this);
}
function otfjt_NumberNode_getValue$static($this) {
    return $this;
}
function otfjt_NumberNode_getIntValue$static($this) {
    return $this | 0;
}
function jl_Double() {
    jl_Number.call(this);
    this.$value0 = 0.0;
}
var jl_Double_NaN = 0.0;
var jl_Double_TYPE = null;
function jl_Double_doubleValue($this) {
    return $this.$value0;
}
function jl_Double_toString($this) {
    var var$1;
    var$1 = $this.$value0;
    return jl_AbstractStringBuilder_toString(jl_StringBuilder_append0(jl_StringBuilder__init_(), var$1));
}
function jl_Double__clinit_() {
    jl_Double_NaN = NaN;
    jl_Double_TYPE = $rt_cls($rt_doublecls());
}
function otfjt_StringNode() {
    otfjt_Node.call(this);
}
function otft_Fragment() {
}
function otft_Fragment$proxy$4_0_0() {
    jl_Object.call(this);
    this.$proxyCapture0 = null;
}
function otft_Fragment$proxy$4_0_0_create(var$0) {
    var var$1, var$2;
    var$1 = var$0.$proxyCapture0;
    var$2 = new otft_DomComponentHandler$proxy$4_0_0;
    var$2.$proxyCapture01 = var$1;
    return otft_DomComponentTemplate__init_(var$2);
}
function otft_Fragment$proxy$4_0_3() {
    jl_Object.call(this);
    this.$proxyCapture00 = null;
}
function otft_Fragment$proxy$4_0_3_create(var$0) {
    return otft_Fragment$proxy$4_0_0_create(var$0.$proxyCapture00);
}
function ju_ConcurrentModificationException() {
    jl_RuntimeException.call(this);
}
function otfj_JSON$PROXY$7_1() {
    jl_Object.call(this);
}
function otfj_JSON$PROXY$7_1_getClassDeserializer(var$1) {
    return new otfjd_BooleanDeserializer;
}
function otfjd_BooleanDeserializer() {
    otfjd_JsonDeserializer.call(this);
}
function otfjd_BooleanDeserializer_deserialize($this, $context, $node) {
    if (otfjt_Node_isNull$static($node))
        return null;
    if (otfjt_Node_isBoolean$static($node))
        return jl_Boolean_valueOf(otfjt_BooleanNode_getValue$static($node));
    $node = new jl_IllegalArgumentException;
    jl_Throwable__init_0($node, $rt_s(30));
    $rt_throw($node);
}
function jl_Math() {
    jl_Object.call(this);
}
function jl_Math_min($a, $b) {
    if ($a < $b)
        $b = $a;
    return $b;
}
function jl_Math_max($a, $b) {
    if ($a > $b)
        $b = $a;
    return $b;
}
function ju_Arrays() {
    jl_Object.call(this);
}
function otjc_JSArray() {
    jl_Object.call(this);
}
function otjc_JSArray_get$exported$0(var$0, var$1) {
    return var$0.$get0(var$1);
}
function otjc_JSArray_getLength$exported$1(var$0) {
    return var$0.$getLength();
}
function jlr_Array() {
    jl_Object.call(this);
}
function jlr_Array_newInstanceImpl(var$1, var$2) {
    if (var$1.$meta.primitive) {
        if (var$1 == $rt_bytecls()) {
            return $rt_createByteArray(var$2);
        }
        if (var$1 == $rt_shortcls()) {
            return $rt_createShortArray(var$2);
        }
        if (var$1 == $rt_charcls()) {
            return $rt_createCharArray(var$2);
        }
        if (var$1 == $rt_intcls()) {
            return $rt_createIntArray(var$2);
        }
        if (var$1 == $rt_longcls()) {
            return $rt_createLongArray(var$2);
        }
        if (var$1 == $rt_floatcls()) {
            return $rt_createFloatArray(var$2);
        }
        if (var$1 == $rt_doublecls()) {
            return $rt_createDoubleArray(var$2);
        }
        if (var$1 == $rt_booleancls()) {
            return $rt_createBooleanArray(var$2);
        }
    } else {
        return $rt_createArray(var$1, var$2)
    }
}
function jl_NullPointerException() {
    jl_RuntimeException.call(this);
}
function jl_NegativeArraySizeException() {
    jl_RuntimeException.call(this);
}
function otft_DomComponentHandler() {
}
function otft_DomComponentHandler$proxy$4_0_0() {
    jl_Object.call(this);
    this.$proxyCapture01 = null;
}
function otft_DomComponentHandler$proxy$4_0_0_update(var$0) {
    return;
}
function otft_DomComponentHandler$proxy$4_0_0_buildDom(var$0, var$1) {
    var var$2, var$3, var$4;
    var$2 = var$0.$proxyCapture01;
    var$1 = var$1;
    var$3 = otft_DomBuilder_attribute(otft_DomBuilder_open(otft_DomBuilder_text(otft_DomBuilder_close(otft_DomBuilder_text(otft_DomBuilder_open(otft_DomBuilder_text(otft_DomBuilder_attribute(otft_DomBuilder_open(otft_DomBuilder_text(otft_DomBuilder_attribute(otft_DomBuilder_openSlot(otft_DomBuilder_text(var$1, $rt_s(31)), $rt_s(32)), $rt_s(33), $rt_s(34)), $rt_s(35)), $rt_s(36)), $rt_s(33), $rt_s(36)), $rt_s(37)), $rt_s(38)), $rt_s(2))), $rt_s(37)), $rt_s(39)), $rt_s(33), $rt_s(40));
    var$4 = new otft_Modifier$proxy$4_0_0;
    var$4.$proxyCapture02 = var$2;
    var$3 = otft_DomBuilder_attribute(otft_DomBuilder_attribute(otft_DomBuilder_open(otft_DomBuilder_text(otft_DomBuilder_add(var$3, var$4), $rt_s(41)), $rt_s(42)), $rt_s(33), $rt_s(43)), $rt_s(44), $rt_s(45));
    var$4 = new otft_Modifier$proxy$4_0_1;
    var$4.$proxyCapture03 = var$2;
    var$3 = otft_DomBuilder_add(var$3, var$4);
    var$4 = new otft_Modifier$proxy$4_0_2;
    var$4.$proxyCapture04 = var$2;
    otft_DomBuilder_close(otft_DomBuilder_add(var$3, var$4));
    var$1 = otft_DomBuilder_text(otft_DomBuilder_close(otft_DomBuilder_text(otft_DomBuilder_close(otft_DomBuilder_text(var$1, $rt_s(37))), $rt_s(35))), $rt_s(35));
    var$3 = otft_Slot_create();
    var$4 = new otfcs_IfComponent;
    otft_AbstractComponent__init_(var$4, var$3);
    var$3 = var$4;
    var$4 = new juf_Supplier$proxy$4_0_1;
    var$4.$proxyCapture05 = var$2;
    var$3.$condition = var$4;
    var$4 = new otft_Fragment$proxy$4_0_1;
    var$4.$proxyCapture06 = var$2;
    var$3.$body = var$4;
    otft_DomBuilder_close(otft_DomBuilder_text(otft_DomBuilder_add0(var$1, var$3), $rt_s(31)));
}
function otft_DomComponentTemplate() {
    var a = this; otft_AbstractComponent.call(a);
    a.$handler = null;
    a.$renderables = null;
}
function otft_DomComponentTemplate__init_(var_0) {
    var var_1 = new otft_DomComponentTemplate();
    otft_DomComponentTemplate__init_0(var_1, var_0);
    return var_1;
}
function otft_DomComponentTemplate__init_0($this, $handler) {
    otft_AbstractComponent__init_($this, otft_Slot_create());
    $this.$handler = $handler;
}
function otft_DomComponentTemplate_render($this) {
    var $builder, var$2, $renderable;
    $this.$handler.$update();
    if ($this.$renderables === null) {
        $builder = new otft_DomBuilder;
        var$2 = $this.$slot;
        otft_DomBuilder_$callClinit();
        $renderable = new ju_ArrayDeque;
        $renderable.$array0 = $rt_createArray(jl_Object, 9);
        $builder.$stack = $renderable;
        $builder.$renderables0 = ju_ArrayList__init_();
        $builder.$slot0 = var$2;
        $this.$handler.$buildDom($builder);
        $this.$renderables = $builder.$renderables0;
    }
    $builder = ju_AbstractList_iterator($this.$renderables);
    while (ju_AbstractList$1_hasNext($builder)) {
        ju_AbstractList$1_next($builder).$render();
    }
}
function otft_DomComponentTemplate_destroy($this) {
    var var$1;
    if ($this.$renderables !== null) {
        var$1 = ju_AbstractList_iterator($this.$renderables);
        while (ju_AbstractList$1_hasNext(var$1)) {
            ju_AbstractList$1_next(var$1).$destroy();
        }
        $this.$renderables = null;
    }
    otft_AbstractComponent_destroy($this);
}
function otft_ContainerSlot() {
    otft_Slot.call(this);
}
function otft_DomBuilder() {
    var a = this; jl_Object.call(a);
    a.$slot0 = null;
    a.$stack = null;
    a.$renderables0 = null;
}
var otft_DomBuilder_document = null;
function otft_DomBuilder_$callClinit() {
    otft_DomBuilder_$callClinit = $rt_eraseClinit(otft_DomBuilder);
    otft_DomBuilder__clinit_();
}
function otft_DomBuilder_open($this, $tagName) {
    return otft_DomBuilder_open0($this, $tagName, 0);
}
function otft_DomBuilder_openSlot($this, $tagName) {
    return otft_DomBuilder_open0($this, $tagName, 1);
}
function otft_DomBuilder_open0($this, $tagName, $slot) {
    var $elem, $item;
    $elem = otft_DomBuilder_document.createElement($rt_ustr($tagName));
    $item = new otft_DomBuilder$Item;
    $item.$element = $elem;
    if ($slot)
        $item.$slot1 = otft_Slot_root($elem);
    ju_ArrayDeque_addFirst($this.$stack, $item);
    return $this;
}
function otft_DomBuilder_close($this) {
    otft_DomBuilder_appendNode($this, ju_ArrayDeque_removeFirst($this.$stack).$element);
    return $this;
}
function otft_DomBuilder_text($this, $text) {
    otft_DomBuilder_appendNode($this, otft_DomBuilder_document.createTextNode($rt_ustr($text)));
    return $this;
}
function otft_DomBuilder_attribute($this, $name, $value) {
    if (ju_ArrayDeque_isEmpty($this.$stack)) {
        $name = new jl_IllegalStateException;
        jl_Throwable__init_0($name, $rt_s(46));
        $rt_throw($name);
    }
    ju_ArrayDeque_peekFirst($this.$stack).$element.setAttribute($rt_ustr($name), $rt_ustr($value));
    return $this;
}
function otft_DomBuilder_add0($this, $component) {
    var $item;
    if (ju_ArrayDeque_isEmpty($this.$stack))
        otft_Slot_append($this.$slot0, $component.$slot);
    else {
        $item = ju_ArrayDeque_peekFirst($this.$stack);
        if ($item.$slot1 !== null)
            otft_Slot_append($item.$slot1, $component.$slot);
        else
            otft_Slot_append(otft_Slot_root($item.$element), $component.$slot);
    }
    $component.$render();
    ju_ArrayList_add($this.$renderables0, $component);
    return $this;
}
function otft_DomBuilder_add($this, $modifier) {
    var $renderable;
    if (ju_ArrayDeque_isEmpty($this.$stack)) {
        $renderable = new jl_IllegalStateException;
        jl_Throwable__init_0($renderable, $rt_s(47));
        $rt_throw($renderable);
    }
    $renderable = $modifier.$apply(ju_ArrayDeque_peekFirst($this.$stack));
    ju_ArrayList_add($this.$renderables0, $renderable);
    return $this;
}
function otft_DomBuilder_appendNode($this, $node) {
    var $item;
    if (ju_ArrayDeque_isEmpty($this.$stack))
        otft_Slot_append($this.$slot0, otft_NodeHolder__init_($node));
    else {
        $item = ju_ArrayDeque_peekFirst($this.$stack);
        if ($item.$slot1 !== null)
            otft_Slot_append($item.$slot1, otft_NodeHolder__init_($node));
        else
            $item.$element.appendChild($node);
    }
}
function otft_DomBuilder_getRenderables($this) {
    return $this.$renderables0;
}
function otft_DomBuilder__clinit_() {
    otft_DomBuilder_document = window.document;
}
function ju_Queue() {
}
function ju_Deque() {
}
function ju_ArrayDeque() {
    var a = this; ju_AbstractCollection.call(a);
    a.$version = 0;
    a.$array0 = null;
    a.$head = 0;
    a.$tail = 0;
}
function ju_ArrayDeque_addFirst($this, $e) {
    var var$2, var$3, var$4, var$5, var$6, var$7;
    if ($e === null) {
        $e = new jl_NullPointerException;
        jl_Exception__init_($e);
        $rt_throw($e);
    }
    var$2 = ju_ArrayDeque_size($this) + 1 | 0;
    if (var$2 >= $this.$array0.data.length) {
        var$2 = jl_Math_max($this.$array0.data.length * 2 | 0, ((var$2 * 3 | 0) / 2 | 0) + 1 | 0);
        if (var$2 < 1)
            var$2 = 2147483647;
        var$3 = $rt_createArray(jl_Object, var$2);
        var$4 = 0;
        if ($this.$head <= $this.$tail) {
            var$5 = var$3.data;
            var$2 = $this.$head;
            while (var$2 < $this.$tail) {
                var$6 = var$4 + 1 | 0;
                var$5[var$4] = $this.$array0.data[var$2];
                var$2 = var$2 + 1 | 0;
                var$4 = var$6;
            }
        } else {
            var$5 = var$3.data;
            var$7 = $this.$head;
            while (var$7 < $this.$array0.data.length) {
                var$2 = var$4 + 1 | 0;
                var$5[var$4] = $this.$array0.data[var$7];
                var$7 = var$7 + 1 | 0;
                var$4 = var$2;
            }
            var$2 = 0;
            while (var$2 < $this.$tail) {
                var$6 = var$4 + 1 | 0;
                var$5[var$4] = $this.$array0.data[var$2];
                var$2 = var$2 + 1 | 0;
                var$4 = var$6;
            }
        }
        $this.$head = 0;
        $this.$tail = var$4;
        $this.$array0 = var$3;
    }
    $this.$head = $this.$head - 1 | 0;
    if ($this.$head < 0)
        $this.$head = $this.$head + $this.$array0.data.length | 0;
    $this.$array0.data[$this.$head] = $e;
    $this.$version = $this.$version + 1 | 0;
}
function ju_ArrayDeque_removeFirst($this) {
    var $value;
    $value = ju_ArrayDeque_pollFirst($this);
    if ($value !== null)
        return $value;
    $value = new ju_NoSuchElementException;
    jl_Exception__init_($value);
    $rt_throw($value);
}
function ju_ArrayDeque_pollFirst($this) {
    var $result;
    if ($this.$head == $this.$tail)
        return null;
    $result = $this.$array0.data[$this.$head];
    $this.$array0.data[$this.$head] = null;
    $this.$head = $this.$head + 1 | 0;
    if ($this.$head >= $this.$array0.data.length)
        $this.$head = 0;
    $this.$version = $this.$version + 1 | 0;
    return $result;
}
function ju_ArrayDeque_peekFirst($this) {
    return ju_ArrayDeque_isEmpty($this) ? null : $this.$array0.data[$this.$head];
}
function ju_ArrayDeque_peek($this) {
    return ju_ArrayDeque_peekFirst($this);
}
function ju_ArrayDeque_push($this, $e) {
    ju_ArrayDeque_addFirst($this, $e);
}
function ju_ArrayDeque_pop($this) {
    return ju_ArrayDeque_removeFirst($this);
}
function ju_ArrayDeque_size($this) {
    return $this.$tail >= $this.$head ? $this.$tail - $this.$head | 0 : ($this.$array0.data.length - $this.$head | 0) + $this.$tail | 0;
}
function ju_ArrayDeque_isEmpty($this) {
    return $this.$head != $this.$tail ? 0 : 1;
}
function otft_Modifier() {
}
function otft_Modifier$proxy$4_0_0() {
    jl_Object.call(this);
    this.$proxyCapture02 = null;
}
function otft_Modifier$proxy$4_0_0_apply(var$0, var$1) {
    var var$2, var$3;
    var$2 = var$0.$proxyCapture02;
    var$1 = var$1;
    var$3 = new otfce_EventBinder;
    otfce_BaseEventBinder__init_(var$3, var$1);
    var$1 = var$3;
    var$3 = new juf_Consumer$proxy$4_0_0;
    var$3.$proxyCapture07 = var$2;
    otfce_BaseEventBinder_setHandler(var$1, var$3);
    var$1.$eventName = $rt_s(48);
    return var$1;
}
function otft_Modifier$proxy$4_0_1() {
    jl_Object.call(this);
    this.$proxyCapture03 = null;
}
function otft_Modifier$proxy$4_0_1_apply(var$0, var$1) {
    var var$2, var$3;
    var$2 = var$0.$proxyCapture03;
    var$1 = otfch_ValueBinder__init_(var$1);
    var$3 = new juf_Supplier$proxy$4_0_0;
    var$3.$proxyCapture08 = var$2;
    var$1.$value3 = var$3;
    return var$1;
}
function otft_Modifier$proxy$4_0_2() {
    jl_Object.call(this);
    this.$proxyCapture04 = null;
}
function otft_Modifier$proxy$4_0_2_apply(var$0, var$1) {
    var var$2, var$3;
    var$2 = var$0.$proxyCapture04;
    var$1 = otfch_ValueChangeBinder__init_(var$1);
    var$3 = new otft_ValueChangeListener$proxy$4_0_0;
    var$3.$proxyCapture09 = var$2;
    var$1.$listener = var$3;
    return var$1;
}
function otfcs_IfComponent() {
    var a = this; otft_AbstractComponent.call(a);
    a.$condition = null;
    a.$body = null;
    a.$childComponent = null;
    a.$showing = 0;
}
function otfcs_IfComponent__init_(var_0) {
    var var_1 = new otfcs_IfComponent();
    otfcs_IfComponent__init_0(var_1, var_0);
    return var_1;
}
function otfcs_IfComponent__init_0($this, $slot) {
    otft_AbstractComponent__init_($this, $slot);
}
function otfcs_IfComponent_setCondition($this, $condition) {
    $this.$condition = $condition;
}
function otfcs_IfComponent_setBody($this, $body) {
    $this.$body = $body;
}
function otfcs_IfComponent_render($this) {
    var $newShowing;
    $newShowing = $this.$condition.$get1().$value2;
    if ($this.$showing != $newShowing) {
        if (!$newShowing)
            otft_Space_delete($this.$childComponent.$slot);
        else {
            if ($this.$childComponent === null)
                $this.$childComponent = $this.$body.$create0();
            otft_Slot_append($this.$slot, $this.$childComponent.$slot);
        }
    }
    $this.$showing = $newShowing;
    if ($this.$showing)
        otft_DomComponentTemplate_render($this.$childComponent);
}
function otfcs_IfComponent_destroy($this) {
    if ($this.$childComponent !== null)
        otft_DomComponentTemplate_destroy($this.$childComponent);
    otft_AbstractComponent_destroy($this);
}
function juf_Supplier() {
}
function juf_Supplier$proxy$4_0_1() {
    jl_Object.call(this);
    this.$proxyCapture05 = null;
}
function juf_Supplier$proxy$4_0_1_get(var$0) {
    var var$1, var$2, var$3;
    var$1 = var$0.$proxyCapture05;
    var$2 = $rt_createArray(jl_Object, 1);
    var$3 = var$1.$model.$todos.$size <= 0 ? 0 : 1;
    var$2 = var$2.data;
    var$2[0] = jl_Boolean_valueOf(var$3);
    return jl_Boolean_valueOf(var$2[0].$value2);
}
function otft_Fragment$proxy$4_0_1() {
    jl_Object.call(this);
    this.$proxyCapture06 = null;
}
function otft_Fragment$proxy$4_0_1_create(var$0) {
    var var$1, var$2;
    var$1 = var$0.$proxyCapture06;
    var$2 = new otft_DomComponentHandler$proxy$4_0_1;
    var$2.$proxyCapture010 = var$1;
    return otft_DomComponentTemplate__init_(var$2);
}
function otft_ModifierTarget() {
}
function otft_DomBuilder$Item() {
    var a = this; jl_Object.call(a);
    a.$element = null;
    a.$slot1 = null;
    a.$valueChangeListeners = null;
    a.$changeListener = null;
}
function otft_DomBuilder$Item_getElement($this) {
    return $this.$element;
}
function otft_DomBuilder$Item_addValueChangeListener($this, $listener) {
    var $listeners, $htmlElement;
    if ($this.$valueChangeListeners !== null) {
        if ($rt_isInstance($this.$valueChangeListeners, ju_List))
            ju_ArrayList_add($this.$valueChangeListeners, $listener);
        else {
            $listeners = ju_ArrayList__init_2(2);
            ju_ArrayList_add($listeners, $this.$valueChangeListeners);
            ju_ArrayList_add($listeners, $listener);
            $this.$valueChangeListeners = $listeners;
        }
    } else {
        $this.$valueChangeListeners = $listener;
        $htmlElement = $this.$element;
        $listener = new otft_DomBuilder$Item$createChangeListener$lambda$_6_0;
        $listener.$_00 = $this;
        $this.$changeListener = $listener;
        $listeners = $this.$changeListener;
        $htmlElement.addEventListener("change", otji_JS_function($listeners, "handleEvent"));
    }
}
function otft_DomBuilder$Item_removeValueChangeListener($this, $listener) {
    var $htmlElement, $listeners;
    if ($this.$valueChangeListeners !== null) {
        if ($this.$valueChangeListeners === $listener) {
            $htmlElement = $this.$element;
            $listeners = $this.$changeListener;
            $htmlElement.removeEventListener("change", otji_JS_function($listeners, "handleEvent"));
            $this.$changeListener = null;
            $this.$valueChangeListeners = null;
        } else if ($rt_isInstance($this.$valueChangeListeners, ju_List)) {
            $listeners = $this.$valueChangeListeners;
            ju_ArrayList_remove($listeners, $listener);
            if ($listeners.$size == 1)
                $this.$valueChangeListeners = ju_ArrayList_get($listeners, 0);
        }
    }
}
function otft_DomBuilder$Item_getValue($this) {
    return $rt_str($this.$element.value);
}
function otft_NodeHolder() {
    otft_Space.call(this);
    this.$node = null;
}
function otft_NodeHolder__init_(var_0) {
    var var_1 = new otft_NodeHolder();
    otft_NodeHolder__init_0(var_1, var_0);
    return var_1;
}
function otft_NodeHolder__init_0($this, $node) {
    $this.$node = $node;
}
function otft_NodeHolder_getFirstNode($this) {
    return $this.$node;
}
function otft_NodeHolder_getAllNodes($this, $nodes) {
    var var$2;
    var$2 = $this.$node;
    $nodes.push(var$2);
}
function otft_NodeHolder_deleteDom($this) {
    var var$1;
    var$1 = $this.$node;
    if (var$1.parentNode !== null)
        var$1.parentNode.removeChild(var$1);
}
function jl_IllegalStateException() {
    jl_Exception.call(this);
}
function ju_NoSuchElementException() {
    jl_RuntimeException.call(this);
}
function otft_DomComponentHandler$proxy$4_0_1() {
    jl_Object.call(this);
    this.$proxyCapture010 = null;
}
function otft_DomComponentHandler$proxy$4_0_1_update(var$0) {
    return;
}
function otft_DomComponentHandler$proxy$4_0_1_buildDom(var$0, var$1) {
    var var$2, var$3, var$4, var$5;
    var$2 = var$0.$proxyCapture010;
    var$1 = var$1;
    var$3 = otft_DomBuilder_attribute(otft_DomBuilder_attribute(otft_DomBuilder_attribute(otft_DomBuilder_open(otft_DomBuilder_text(otft_DomBuilder_attribute(otft_DomBuilder_open(otft_DomBuilder_text(var$1, $rt_s(37)), $rt_s(32)), $rt_s(33), $rt_s(49)), $rt_s(41)), $rt_s(42)), $rt_s(50), $rt_s(51)), $rt_s(33), $rt_s(51)), $rt_s(52), $rt_s(53));
    var$4 = new otft_Modifier$proxy$4_0_3;
    var$4.$proxyCapture011 = var$2;
    var$3 = otft_DomBuilder_add(var$3, var$4);
    var$4 = new otft_Modifier$proxy$4_0_4;
    var$4.$proxyCapture012 = var$2;
    var$3 = otft_DomBuilder_text(otft_DomBuilder_attribute(otft_DomBuilder_openSlot(otft_DomBuilder_text(otft_DomBuilder_close(otft_DomBuilder_text(otft_DomBuilder_attribute(otft_DomBuilder_open(otft_DomBuilder_text(otft_DomBuilder_close(otft_DomBuilder_add(var$3, var$4)), $rt_s(41)), $rt_s(54)), $rt_s(55), $rt_s(51)), $rt_s(56))), $rt_s(41)), $rt_s(57)), $rt_s(33), $rt_s(58)), $rt_s(59));
    var$4 = otft_Slot_create();
    var$5 = new otfcs_ForEachComponent;
    otft_AbstractComponent__init_(var$5, var$4);
    var$5.$childComponents = new ju_LinkedList;
    var$5.$computedCollection = new ju_LinkedList;
    var$4 = var$5;
    var$5 = new juf_Supplier$proxy$4_0_3;
    var$5.$proxyCapture013 = var$2;
    var$4.$collection0 = var$5;
    var$5 = new otft_Fragment$proxy$4_0_2;
    var$5.$proxyCapture014 = var$4;
    var$5.$proxyCapture1 = var$2;
    var$4.$body0 = var$5;
    otft_DomBuilder_add0(var$3, var$4);
    var$1 = otft_DomBuilder_text(otft_DomBuilder_close(otft_DomBuilder_text(otft_DomBuilder_close(otft_DomBuilder_text(var$1, $rt_s(41))), $rt_s(37))), $rt_s(37));
    var$3 = otft_Slot_create();
    var$4 = new ecd_FooterComponent;
    otft_AbstractComponent__init_(var$4, var$3);
    var$3 = var$4;
    var$4 = new juf_Supplier$proxy$4_0_6;
    var$4.$proxyCapture015 = var$2;
    var$3.$modelSupplier = var$4;
    otft_DomBuilder_text(otft_DomBuilder_add0(var$1, var$3), $rt_s(35));
}
function otfch_ValueBinder() {
    var a = this; jl_Object.call(a);
    a.$element0 = null;
    a.$value3 = null;
    a.$cachedValue = null;
}
function otfch_ValueBinder__init_(var_0) {
    var var_1 = new otfch_ValueBinder();
    otfch_ValueBinder__init_0(var_1, var_0);
    return var_1;
}
function otfch_ValueBinder__init_0($this, $target) {
    $this.$element0 = otft_DomBuilder$Item_getElement($target);
}
function otfch_ValueBinder_setValue($this, $value) {
    $this.$value3 = $value;
}
function otfch_ValueBinder_render($this) {
    var $newValue, var$2;
    $newValue = $this.$value3.$get1();
    if (!ju_Objects_equals($newValue, $this.$cachedValue)) {
        $this.$cachedValue = $newValue;
        var$2 = $this.$element0;
        $newValue = $rt_ustr(jl_String_valueOf($newValue));
        var$2.value = $newValue;
    }
}
function otfch_ValueBinder_destroy($this) {
    return;
}
function juf_Supplier$proxy$4_0_0() {
    jl_Object.call(this);
    this.$proxyCapture08 = null;
}
function juf_Supplier$proxy$4_0_0_get(var$0) {
    return var$0.$proxyCapture08.$newTodo;
}
function otfch_ValueChangeBinder() {
    var a = this; jl_Object.call(a);
    a.$target = null;
    a.$listener = null;
    a.$bound = 0;
}
function otfch_ValueChangeBinder__init_(var_0) {
    var var_1 = new otfch_ValueChangeBinder();
    otfch_ValueChangeBinder__init_0(var_1, var_0);
    return var_1;
}
function otfch_ValueChangeBinder__init_0($this, $target) {
    $this.$target = $target;
}
function otfch_ValueChangeBinder_setListener($this, $listener) {
    $this.$listener = $listener;
}
function otfch_ValueChangeBinder_render($this) {
    if (!$this.$bound) {
        $this.$bound = 1;
        otft_DomBuilder$Item_addValueChangeListener($this.$target, $this.$listener);
    }
}
function otfch_ValueChangeBinder_destroy($this) {
    if ($this.$bound) {
        $this.$bound = 0;
        otft_DomBuilder$Item_removeValueChangeListener($this.$target, $this.$listener);
    }
}
function otft_ValueChangeListener() {
}
function otft_ValueChangeListener$proxy$4_0_0() {
    jl_Object.call(this);
    this.$proxyCapture09 = null;
}
function otft_ValueChangeListener$proxy$4_0_0_changed(var$0, var$1) {
    var var$2, var$3;
    var$2 = var$0.$proxyCapture09;
    var$3 = $rt_createArray(jl_Object, 1).data;
    var$3[0] = var$1;
    var$2.$newTodo = var$3[0];
    otft_Templates_update();
}
function otft_Modifier$proxy$4_0_3() {
    jl_Object.call(this);
    this.$proxyCapture011 = null;
}
function otft_Modifier$proxy$4_0_3_apply(var$0, var$1) {
    var var$2, var$3;
    var$2 = var$0.$proxyCapture011;
    var$1 = otfch_CheckedBinder__init_(var$1);
    var$3 = new juf_Supplier$proxy$4_0_2;
    var$3.$proxyCapture016 = var$2;
    var$1.$value4 = var$3;
    return var$1;
}
function otft_Modifier$proxy$4_0_4() {
    jl_Object.call(this);
    this.$proxyCapture012 = null;
}
function otft_Modifier$proxy$4_0_4_apply(var$0, var$1) {
    var var$2, var$3;
    var$2 = var$0.$proxyCapture012;
    var$1 = otfch_CheckedChangeBinder__init_(var$1);
    var$3 = new otft_ValueChangeListener$proxy$4_0_1;
    var$3.$proxyCapture017 = var$2;
    var$1.$listener0 = var$3;
    return var$1;
}
function otfcs_ForEachComponent() {
    var a = this; otft_AbstractComponent.call(a);
    a.$collection0 = null;
    a.$elementVariable = null;
    a.$indexVariable = 0;
    a.$body0 = null;
    a.$childComponents = null;
    a.$computedCollection = null;
}
function otfcs_ForEachComponent_setCollection($this, $collection) {
    $this.$collection0 = $collection;
}
function otfcs_ForEachComponent_getElementVariable($this) {
    return $this.$elementVariable;
}
function otfcs_ForEachComponent_setBody($this, $body) {
    $this.$body0 = $body;
}
function otfcs_ForEachComponent_render($this) {
    var $lowerDataIterator, $newComputedCollection, $component, $lowerNewDataIterator, $lowerComponentIterator, $upperDataIterator, $upperNewDataIterator, $upperComponentIterator, $dataLimit, $newDataLimit, $nextComponent, $nextSlot, $childComponent;
    $lowerDataIterator = juf_Supplier$proxy$4_0_3_get($this.$collection0);
    if ($rt_isInstance($lowerDataIterator, ju_List))
        $newComputedCollection = $lowerDataIterator;
    else if (!$rt_isInstance($lowerDataIterator, ju_Collection)) {
        $newComputedCollection = new ju_LinkedList;
        $lowerDataIterator = ju_AbstractList_iterator($lowerDataIterator);
        while (ju_AbstractList$1_hasNext($lowerDataIterator)) {
            ju_AbstractList_add($newComputedCollection, ju_AbstractList$1_next($lowerDataIterator));
        }
    } else {
        $lowerDataIterator = $lowerDataIterator;
        $newComputedCollection = new ju_LinkedList;
        $lowerDataIterator = ju_AbstractList_iterator($lowerDataIterator);
        $component = null;
        while (ju_AbstractList$1_hasNext($lowerDataIterator)) {
            $lowerNewDataIterator = new ju_LinkedList$Entry;
            $lowerNewDataIterator.$item = ju_AbstractList$1_next($lowerDataIterator);
            $lowerNewDataIterator.$previous0 = $component;
            if ($component !== null)
                $component.$next1 = $lowerNewDataIterator;
            else
                $newComputedCollection.$firstEntry = $lowerNewDataIterator;
            $newComputedCollection.$size0 = $newComputedCollection.$size0 + 1 | 0;
            $component = $lowerNewDataIterator;
        }
        $newComputedCollection.$lastEntry = $component;
    }
    $lowerDataIterator = ju_LinkedList_listIterator($this.$computedCollection);
    $lowerNewDataIterator = $newComputedCollection.$listIterator0();
    $lowerComponentIterator = ju_LinkedList_listIterator($this.$childComponents);
    $upperDataIterator = ju_LinkedList_listIterator0($this.$computedCollection, $this.$computedCollection.$size0);
    $upperNewDataIterator = $newComputedCollection.$listIterator($newComputedCollection.$size2());
    $upperComponentIterator = ju_LinkedList_listIterator0($this.$childComponents, $this.$childComponents.$size0);
    a: {
        while (true) {
            if (!ju_LinkedList$SequentialListIterator_hasPrevious($upperDataIterator))
                break a;
            if (!$upperNewDataIterator.$hasPrevious())
                break a;
            $this.$indexVariable = $upperNewDataIterator.$previousIndex();
            $this.$elementVariable = $upperNewDataIterator.$previous1();
            if ($this.$elementVariable !== ju_LinkedList$SequentialListIterator_previous($upperDataIterator))
                break;
            ju_LinkedList$SequentialListIterator_previous($upperComponentIterator).$render();
        }
        ju_LinkedList$SequentialListIterator_next($upperDataIterator);
        $upperNewDataIterator.$next();
    }
    $dataLimit = $upperDataIterator.$index0;
    $newDataLimit = $upperNewDataIterator.$nextIndex();
    while (ju_LinkedList$SequentialListIterator_hasNext($lowerDataIterator) && $lowerDataIterator.$index0 < $dataLimit && $lowerNewDataIterator.$hasNext() && $lowerNewDataIterator.$nextIndex() < $newDataLimit) {
        $component = ju_LinkedList$SequentialListIterator_next($lowerComponentIterator);
        $this.$indexVariable = $lowerDataIterator.$index0;
        $this.$elementVariable = $lowerNewDataIterator.$next();
        ju_LinkedList$SequentialListIterator_next($lowerDataIterator);
        $component.$render();
    }
    b: {
        if (ju_LinkedList$SequentialListIterator_hasNext($lowerDataIterator) && $lowerDataIterator.$index0 < $dataLimit)
            while (true) {
                if (!ju_LinkedList$SequentialListIterator_hasNext($lowerDataIterator))
                    break b;
                if ($lowerDataIterator.$index0 >= $dataLimit)
                    break b;
                $component = ju_LinkedList$SequentialListIterator_next($lowerComponentIterator);
                ju_LinkedList$SequentialListIterator_remove($lowerComponentIterator);
                $component.$destroy();
                ju_LinkedList$SequentialListIterator_next($lowerDataIterator);
                ju_LinkedList$SequentialListIterator_remove($lowerDataIterator);
                $dataLimit = $dataLimit + (-1) | 0;
            }
        if ($lowerNewDataIterator.$hasNext() && $lowerNewDataIterator.$nextIndex() < $newDataLimit) {
            $nextComponent = !ju_LinkedList$SequentialListIterator_hasNext($upperComponentIterator) ? null : ju_LinkedList$SequentialListIterator_next($upperComponentIterator);
            $nextSlot = $nextComponent === null ? null : $nextComponent.$slot;
            while (true) {
                if (!$lowerNewDataIterator.$hasNext())
                    break b;
                if ($lowerNewDataIterator.$nextIndex() >= $newDataLimit)
                    break b;
                $this.$indexVariable = $lowerNewDataIterator.$nextIndex();
                $this.$elementVariable = $lowerNewDataIterator.$next();
                ju_LinkedList$SequentialListIterator_add($lowerDataIterator, $this.$elementVariable);
                $childComponent = otft_Fragment$proxy$4_0_2_create($this.$body0);
                otft_DomComponentTemplate_render($childComponent);
                ju_LinkedList$SequentialListIterator_add($lowerComponentIterator, $childComponent);
                otft_Slot_insertBefore($this.$slot, $childComponent.$slot, $nextSlot);
            }
        }
    }
}
function otfcs_ForEachComponent_destroy($this) {
    var $i;
    otft_AbstractComponent_destroy($this);
    $i = $this.$childComponents.$size0 - 1 | 0;
    while ($i >= 0) {
        ju_AbstractSequentialList_get($this.$childComponents, $i).$destroy();
        $i = $i + (-1) | 0;
    }
}
function juf_Supplier$proxy$4_0_3() {
    jl_Object.call(this);
    this.$proxyCapture013 = null;
}
function juf_Supplier$proxy$4_0_3_get(var$0) {
    return ecd_Model_getFilteredTodos(var$0.$proxyCapture013.$model);
}
function otft_Fragment$proxy$4_0_2() {
    var a = this; jl_Object.call(a);
    a.$proxyCapture014 = null;
    a.$proxyCapture1 = null;
}
function otft_Fragment$proxy$4_0_2_create(var$0) {
    var var$1, var$2, var$3, var$4;
    var$1 = var$0.$proxyCapture014;
    var$2 = var$0.$proxyCapture1;
    var$3 = new otfte_VariableImpl;
    var$4 = new otft_DomComponentHandler$proxy$4_0_2;
    var$4.$proxyCapture018 = var$3;
    var$4.$proxyCapture10 = var$1;
    var$4.$proxyCapture2 = var$2;
    return otft_DomComponentTemplate__init_(var$4);
}
function otfw_AbstractWidget() {
    otft_AbstractComponent.call(this);
    this.$body1 = null;
}
function otfw_AbstractWidget_render($this) {
    if ($this.$body1 === null) {
        $this.$body1 = otft_Templates_create($this).$create0();
        otft_Slot_append($this.$slot, $this.$body1.$slot);
    }
    otft_DomComponentTemplate_render($this.$body1);
}
function otfw_AbstractWidget_destroy($this) {
    if ($this.$body1 !== null)
        otft_DomComponentTemplate_destroy($this.$body1);
    otft_AbstractComponent_destroy($this);
}
function ecd_FooterComponent() {
    otfw_AbstractWidget.call(this);
    this.$modelSupplier = null;
}
function ecd_FooterComponent_setModelSupplier($this, $modelSupplier) {
    $this.$modelSupplier = $modelSupplier;
}
function ecd_FooterComponent_getModel($this) {
    return juf_Supplier$proxy$4_0_6_get($this.$modelSupplier);
}
function ecd_FooterComponent_getCount($this) {
    return ecd_Model_getActiveTodos(ecd_FooterComponent_getModel($this)).$size;
}
function ecd_FooterComponent_getCompletedCount($this) {
    return ecd_Model_getCompletedTodos(ecd_FooterComponent_getModel($this)).$size;
}
function juf_Supplier$proxy$4_0_6() {
    jl_Object.call(this);
    this.$proxyCapture015 = null;
}
function juf_Supplier$proxy$4_0_6_get(var$0) {
    return var$0.$proxyCapture015.$model;
}
function otfce_BaseEventBinder() {
    var a = this; jl_Object.call(a);
    a.$element1 = null;
    a.$eventName = null;
    a.$action = null;
    a.$bound0 = 0;
    a.$wrapperListener = null;
}
function otfce_BaseEventBinder__init_0(var_0) {
    var var_1 = new otfce_BaseEventBinder();
    otfce_BaseEventBinder__init_(var_1, var_0);
    return var_1;
}
function otfce_BaseEventBinder__init_($this, $target) {
    var var$2;
    var$2 = new otfce_BaseEventBinder$_init_$lambda$_0_0;
    var$2.$_01 = $this;
    $this.$wrapperListener = var$2;
    $this.$element1 = otft_DomBuilder$Item_getElement($target);
}
function otfce_BaseEventBinder_setEventName($this, $eventName) {
    $this.$eventName = $eventName;
}
function otfce_BaseEventBinder_setHandler($this, $handler) {
    var var$2;
    jl_Object_getClass($handler);
    var$2 = new otfce_BaseEventBinder$setHandler$lambda$_2_0;
    var$2.$_02 = $handler;
    $this.$action = var$2;
}
function otfce_BaseEventBinder_render($this) {
    var var$1, var$2, var$3;
    if (!$this.$bound0) {
        $this.$bound0 = 1;
        var$1 = $this.$element1;
        var$2 = $this.$eventName;
        var$3 = $this.$wrapperListener;
        var$1.addEventListener($rt_ustr(var$2), otji_JS_function(var$3, "handleEvent"));
    }
}
function otfce_BaseEventBinder_destroy($this) {
    var var$1, var$2, var$3;
    if ($this.$bound0) {
        $this.$bound0 = 0;
        var$1 = $this.$element1;
        var$2 = $this.$eventName;
        var$3 = $this.$wrapperListener;
        var$1.removeEventListener($rt_ustr(var$2), otji_JS_function(var$3, "handleEvent"));
    }
}
function otfce_EventBinder() {
    otfce_BaseEventBinder.call(this);
}
function juf_Consumer$proxy$4_0_0() {
    jl_Object.call(this);
    this.$proxyCapture07 = null;
}
function juf_Consumer$proxy$4_0_0_accept(var$0, var$1) {
    ecd_App_addTodo(var$0.$proxyCapture07);
    otft_Templates_update();
}
function ju_AbstractSequentialList() {
    ju_AbstractList.call(this);
}
function ju_AbstractSequentialList_get($this, $index) {
    var $iter;
    if ($index >= 0)
        return ju_LinkedList$SequentialListIterator_next(ju_LinkedList_listIterator0($this, $index));
    $iter = new jl_IndexOutOfBoundsException;
    jl_Exception__init_($iter);
    $rt_throw($iter);
}
function ju_AbstractSequentialList_add($this, $index, $element) {
    if ($index >= 0) {
        ju_LinkedList$SequentialListIterator_add(ju_LinkedList_listIterator0($this, $index), $element);
        return;
    }
    $element = new jl_IndexOutOfBoundsException;
    jl_Exception__init_($element);
    $rt_throw($element);
}
function ju_LinkedList() {
    var a = this; ju_AbstractSequentialList.call(a);
    a.$firstEntry = null;
    a.$lastEntry = null;
    a.$size0 = 0;
}
function ju_LinkedList_size($this) {
    return $this.$size0;
}
function ju_LinkedList_listIterator($this) {
    return ju_LinkedList$SequentialListIterator__init_($this, $this.$firstEntry, null, 0);
}
function ju_LinkedList_listIterator0($this, $index) {
    var $prev, $next, $i;
    if ($index < 0) {
        $prev = new jl_IndexOutOfBoundsException;
        jl_Exception__init_($prev);
        $rt_throw($prev);
    }
    if ($index <= ($this.$size0 / 2 | 0)) {
        $next = $this.$firstEntry;
        $i = 0;
        while ($i < $index) {
            $next = $next.$next1;
            $i = $i + 1 | 0;
        }
        return ju_LinkedList$SequentialListIterator__init_($this, $next, $next === null ? null : $next.$previous0, $index);
    }
    if ($index > $this.$size0) {
        $prev = new jl_IndexOutOfBoundsException;
        jl_Exception__init_($prev);
        $rt_throw($prev);
    }
    $prev = $this.$lastEntry;
    $i = $index;
    while ($i < $this.$size0) {
        $prev = $prev.$previous0;
        $i = $i + 1 | 0;
    }
    return ju_LinkedList$SequentialListIterator__init_($this, $prev === null ? null : $prev.$next1, $prev, $index);
}
function otjde_EventListener() {
}
function otfce_BaseEventBinder$_init_$lambda$_0_0() {
    jl_Object.call(this);
    this.$_01 = null;
}
function otfce_BaseEventBinder$_init_$lambda$_0_0_handleEvent(var$0, var$1) {
    var var$2;
    var$2 = var$0.$_01;
    var$2.$action.handleEvent(var$1);
    if (jl_String_equals(var$2.$eventName, $rt_s(48)))
        var$1.preventDefault();
}
function otfce_BaseEventBinder$_init_$lambda$_0_0_handleEvent$exported$0(var$0, var$1) {
    otfce_BaseEventBinder$_init_$lambda$_0_0_handleEvent(var$0, var$1);
}
function ju_Objects() {
    jl_Object.call(this);
}
function ju_Objects_equals($a, $b) {
    if ($a === $b)
        return 1;
    return $a !== null ? $a.$equals($b) : $b !== null ? 0 : 1;
}
function otfch_CheckedBinder() {
    var a = this; jl_Object.call(a);
    a.$element2 = null;
    a.$value4 = null;
    a.$cachedValue0 = 0;
}
function otfch_CheckedBinder__init_(var_0) {
    var var_1 = new otfch_CheckedBinder();
    otfch_CheckedBinder__init_0(var_1, var_0);
    return var_1;
}
function otfch_CheckedBinder__init_0($this, $target) {
    $this.$element2 = otft_DomBuilder$Item_getElement($target);
}
function otfch_CheckedBinder_setValue($this, $value) {
    $this.$value4 = $value;
}
function otfch_CheckedBinder_render($this) {
    var $newValue, var$2, var$3;
    $newValue = $this.$value4.$get1().$value2;
    if ($newValue != $this.$cachedValue0) {
        $this.$cachedValue0 = $newValue;
        var$2 = $this.$element2;
        var$3 = !!$newValue;
        var$2.checked = var$3;
    }
}
function otfch_CheckedBinder_destroy($this) {
    return;
}
function juf_Supplier$proxy$4_0_2() {
    jl_Object.call(this);
    this.$proxyCapture016 = null;
}
function juf_Supplier$proxy$4_0_2_get(var$0) {
    var var$1, var$2;
    var$1 = var$0.$proxyCapture016;
    var$2 = $rt_createArray(jl_Object, 1).data;
    var$2[0] = jl_Boolean_valueOf(ecd_App_allCompleted(var$1));
    return jl_Boolean_valueOf(var$2[0].$value2);
}
function otfch_CheckedChangeBinder() {
    var a = this; jl_Object.call(a);
    a.$element3 = null;
    a.$listener0 = null;
    a.$bound1 = 0;
    a.$nativeListener = null;
}
function otfch_CheckedChangeBinder__init_(var_0) {
    var var_1 = new otfch_CheckedChangeBinder();
    otfch_CheckedChangeBinder__init_0(var_1, var_0);
    return var_1;
}
function otfch_CheckedChangeBinder__init_0($this, $target) {
    var var$2;
    var$2 = new otfch_CheckedChangeBinder$1;
    var$2.$this$01 = $this;
    $this.$nativeListener = var$2;
    $this.$element3 = otft_DomBuilder$Item_getElement($target);
}
function otfch_CheckedChangeBinder_setListener($this, $listener) {
    $this.$listener0 = $listener;
}
function otfch_CheckedChangeBinder_render($this) {
    var var$1, var$2;
    if (!$this.$bound1) {
        $this.$bound1 = 1;
        var$1 = $this.$element3;
        var$2 = $this.$nativeListener;
        var$1.addEventListener("change", otji_JS_function(var$2, "handleEvent"));
    }
}
function otfch_CheckedChangeBinder_destroy($this) {
    var var$1, var$2;
    if ($this.$bound1) {
        $this.$bound1 = 0;
        var$1 = $this.$element3;
        var$2 = $this.$nativeListener;
        var$1.removeEventListener("change", otji_JS_function(var$2, "handleEvent"));
    }
}
function otft_ValueChangeListener$proxy$4_0_1() {
    jl_Object.call(this);
    this.$proxyCapture017 = null;
}
function otft_ValueChangeListener$proxy$4_0_1_changed(var$0, var$1) {
    var var$2, var$3;
    var$2 = var$0.$proxyCapture017;
    var$3 = $rt_createArray(jl_Object, 1).data;
    var$3[0] = jl_Boolean_valueOf(var$1.$value2);
    ecd_App_toggleAll(var$2, var$3[0].$value2);
    otft_Templates_update();
}
function otfce_BaseEventBinder$setHandler$lambda$_2_0() {
    jl_Object.call(this);
    this.$_02 = null;
}
function otfce_BaseEventBinder$setHandler$lambda$_2_0_handleEvent(var$0, var$1) {
    var$0.$_02.$accept(var$1);
}
function otfce_BaseEventBinder$setHandler$lambda$_2_0_handleEvent$exported$0(var$0, var$1) {
    otfce_BaseEventBinder$setHandler$lambda$_2_0_handleEvent(var$0, var$1);
}
function otfch_CheckedChangeBinder$1() {
    jl_Object.call(this);
    this.$this$01 = null;
}
function otfch_CheckedChangeBinder$1_handleEvent($this, $evt) {
    $this.$this$01.$listener0.$changed(jl_Boolean_valueOf($this.$this$01.$element3.checked ? 1 : 0));
}
function otfch_CheckedChangeBinder$1_handleEvent$exported$0(var$0, var$1) {
    otfch_CheckedChangeBinder$1_handleEvent(var$0, var$1);
}
function ju_LinkedList$Entry() {
    var a = this; jl_Object.call(a);
    a.$item = null;
    a.$next1 = null;
    a.$previous0 = null;
}
function otft_Templates$PROXY$4_1() {
    jl_Object.call(this);
}
function otft_Templates$PROXY$4_1_create(var$1, var$2) {
    var$1 = new otft_Fragment$proxy$4_1_0;
    var$1.$proxyCapture019 = var$2;
    var$2 = new otft_Fragment$proxy$4_1_4;
    var$2.$proxyCapture020 = var$1;
    return var$2;
}
function otfte_VariableImpl() {
    jl_Object.call(this);
    this.$value5 = null;
}
function otft_DomComponentHandler$proxy$4_0_2() {
    var a = this; jl_Object.call(a);
    a.$proxyCapture018 = null;
    a.$proxyCapture10 = null;
    a.$proxyCapture2 = null;
}
function otft_DomComponentHandler$proxy$4_0_2_update(var$0) {
    var var$1, var$2;
    var$1 = var$0.$proxyCapture018;
    var$2 = var$0.$proxyCapture10;
    var$1.$value5 = var$2.$elementVariable;
}
function otft_DomComponentHandler$proxy$4_0_2_buildDom(var$0, var$1) {
    var var$2, var$3, var$4, var$5;
    var$2 = var$0.$proxyCapture018;
    var$3 = var$0.$proxyCapture2;
    var$1 = otft_DomBuilder_text(var$1, $rt_s(60));
    var$4 = otft_Slot_create();
    var$5 = new ecd_TodoItemComponent;
    otft_AbstractComponent__init_(var$5, var$4);
    var$5.$isEditing = 0;
    var$5.$newText = $rt_s(3);
    var$4 = var$5;
    var$5 = new juf_Supplier$proxy$4_0_4;
    var$5.$proxyCapture021 = var$2;
    var$4.$todoSupplier = var$5;
    var$2 = new juf_Supplier$proxy$4_0_5;
    var$2.$proxyCapture022 = var$3;
    var$4.$modelSupplier0 = var$2;
    otft_DomBuilder_text(otft_DomBuilder_add0(var$1, var$4), $rt_s(59));
}
function otft_Fragment$proxy$4_1_0() {
    jl_Object.call(this);
    this.$proxyCapture019 = null;
}
function otft_Fragment$proxy$4_1_0_create(var$0) {
    var var$1, var$2;
    var$1 = var$0.$proxyCapture019;
    var$2 = new otft_DomComponentHandler$proxy$4_1_0;
    var$2.$proxyCapture023 = var$1;
    return otft_DomComponentTemplate__init_(var$2);
}
function otft_Fragment$proxy$4_1_4() {
    jl_Object.call(this);
    this.$proxyCapture020 = null;
}
function otft_Fragment$proxy$4_1_4_create(var$0) {
    return otft_Fragment$proxy$4_1_0_create(var$0.$proxyCapture020);
}
function ju_ListIterator() {
}
function ju_LinkedList$SequentialListIterator() {
    var a = this; jl_Object.call(a);
    a.$nextEntry = null;
    a.$prevEntry = null;
    a.$currentEntry = null;
    a.$index0 = 0;
    a.$version0 = 0;
    a.$this$02 = null;
}
function ju_LinkedList$SequentialListIterator__init_(var_0, var_1, var_2, var_3) {
    var var_4 = new ju_LinkedList$SequentialListIterator();
    ju_LinkedList$SequentialListIterator__init_0(var_4, var_0, var_1, var_2, var_3);
    return var_4;
}
function ju_LinkedList$SequentialListIterator__init_0($this, var$1, $nextEntry, $prevEntry, $index) {
    $this.$this$02 = var$1;
    $this.$version0 = $this.$this$02.$modCount;
    $this.$nextEntry = $nextEntry;
    $this.$prevEntry = $prevEntry;
    $this.$index0 = $index;
}
function ju_LinkedList$SequentialListIterator_hasNext($this) {
    return $this.$nextEntry === null ? 0 : 1;
}
function ju_LinkedList$SequentialListIterator_next($this) {
    var $result;
    ju_LinkedList$SequentialListIterator_checkConcurrentModification($this);
    if ($this.$nextEntry === null) {
        $result = new ju_NoSuchElementException;
        jl_Exception__init_($result);
        $rt_throw($result);
    }
    $result = $this.$nextEntry.$item;
    $this.$currentEntry = $this.$nextEntry;
    $this.$prevEntry = $this.$nextEntry;
    $this.$nextEntry = $this.$nextEntry.$next1;
    $this.$index0 = $this.$index0 + 1 | 0;
    return $result;
}
function ju_LinkedList$SequentialListIterator_remove($this) {
    var var$1, var$2;
    if ($this.$currentEntry === null) {
        var$1 = new jl_IllegalStateException;
        jl_Exception__init_(var$1);
        $rt_throw(var$1);
    }
    var$1 = $this.$this$02;
    var$2 = $this.$currentEntry;
    if (var$2.$previous0 === null)
        var$1.$firstEntry = var$2.$next1;
    else
        var$2.$previous0.$next1 = var$2.$next1;
    if (var$2.$next1 === null)
        var$1.$lastEntry = var$2.$previous0;
    else
        var$2.$next1.$previous0 = var$2.$previous0;
    var$1.$size0 = var$1.$size0 - 1 | 0;
    var$1.$modCount = var$1.$modCount + 1 | 0;
    if ($this.$currentEntry === $this.$prevEntry) {
        $this.$prevEntry = !ju_LinkedList$SequentialListIterator_hasNext($this) ? null : $this.$nextEntry.$previous0;
        $this.$index0 = $this.$index0 - 1 | 0;
    } else if ($this.$currentEntry === $this.$nextEntry)
        $this.$nextEntry = !ju_LinkedList$SequentialListIterator_hasPrevious($this) ? null : $this.$prevEntry.$next1;
    $this.$version0 = $this.$this$02.$modCount;
    $this.$currentEntry = null;
}
function ju_LinkedList$SequentialListIterator_hasPrevious($this) {
    return $this.$prevEntry === null ? 0 : 1;
}
function ju_LinkedList$SequentialListIterator_previous($this) {
    var $result;
    ju_LinkedList$SequentialListIterator_checkConcurrentModification($this);
    if ($this.$prevEntry === null) {
        $result = new ju_NoSuchElementException;
        jl_Exception__init_($result);
        $rt_throw($result);
    }
    $this.$currentEntry = $this.$prevEntry;
    $result = $this.$prevEntry.$item;
    $this.$nextEntry = $this.$prevEntry;
    $this.$prevEntry = $this.$prevEntry.$previous0;
    $this.$index0 = $this.$index0 - 1 | 0;
    return $result;
}
function ju_LinkedList$SequentialListIterator_nextIndex($this) {
    return $this.$index0;
}
function ju_LinkedList$SequentialListIterator_previousIndex($this) {
    return $this.$index0 - 1 | 0;
}
function ju_LinkedList$SequentialListIterator_add($this, $e) {
    var $newEntry;
    ju_LinkedList$SequentialListIterator_checkConcurrentModification($this);
    $newEntry = new ju_LinkedList$Entry;
    $newEntry.$item = $e;
    $newEntry.$previous0 = $this.$prevEntry;
    $newEntry.$next1 = $this.$nextEntry;
    if ($this.$prevEntry !== null)
        $this.$prevEntry.$next1 = $newEntry;
    else
        $this.$this$02.$firstEntry = $newEntry;
    if ($this.$nextEntry !== null)
        $this.$nextEntry.$previous0 = $newEntry;
    else
        $this.$this$02.$lastEntry = $newEntry;
    $this.$prevEntry = $newEntry;
    $e = $this.$this$02;
    $e.$size0 = $e.$size0 + 1 | 0;
    $e = $this.$this$02;
    $e.$modCount = $e.$modCount + 1 | 0;
    $this.$version0 = $this.$this$02.$modCount;
    $this.$currentEntry = null;
}
function ju_LinkedList$SequentialListIterator_checkConcurrentModification($this) {
    var var$1;
    if ($this.$version0 >= $this.$this$02.$modCount)
        return;
    var$1 = new ju_ConcurrentModificationException;
    jl_Exception__init_(var$1);
    $rt_throw(var$1);
}
function otft_DomBuilder$Item$createChangeListener$lambda$_6_0() {
    jl_Object.call(this);
    this.$_00 = null;
}
function otft_DomBuilder$Item$createChangeListener$lambda$_6_0_handleEvent(var$0, var$1) {
    var var$2;
    var$1 = var$0.$_00;
    var$2 = otft_DomBuilder$Item_getValue(var$1);
    if (var$1.$valueChangeListeners !== null) {
        if (!$rt_isInstance(var$1.$valueChangeListeners, ju_List))
            var$1.$valueChangeListeners.$changed(var$2);
        else {
            var$1 = ju_AbstractList_iterator(var$1.$valueChangeListeners);
            while (ju_AbstractList$1_hasNext(var$1)) {
                ju_AbstractList$1_next(var$1).$changed(var$2);
            }
        }
    }
}
function otft_DomBuilder$Item$createChangeListener$lambda$_6_0_handleEvent$exported$0(var$0, var$1) {
    otft_DomBuilder$Item$createChangeListener$lambda$_6_0_handleEvent(var$0, var$1);
}
function ecd_TodoItemComponent() {
    var a = this; otfw_AbstractWidget.call(a);
    a.$isEditing = 0;
    a.$newText = null;
    a.$todoSupplier = null;
    a.$modelSupplier0 = null;
}
function ecd_TodoItemComponent_edit($this) {
    $this.$isEditing = 1;
    $this.$newText = ecd_TodoItemComponent_getTodo($this).$title;
}
function ecd_TodoItemComponent_getIsEditing($this) {
    return $this.$isEditing;
}
function ecd_TodoItemComponent_setNewText($this, $newText) {
    $this.$newText = $newText;
}
function ecd_TodoItemComponent_getNewText($this) {
    return $this.$newText;
}
function ecd_TodoItemComponent_saveEdit($this) {
    if (jl_String_isEmpty($this.$newText))
        return;
    ecd_Model$Todo_setTitle(ecd_TodoItemComponent_getTodo($this), $this.$newText);
    $this.$isEditing = 0;
    $this.$newText = ecd_TodoItemComponent_getTodo($this).$title;
}
function ecd_TodoItemComponent_getTodoText($this) {
    if ($this.$isEditing)
        return $this.$newText;
    return ecd_TodoItemComponent_getTodo($this).$title;
}
function ecd_TodoItemComponent_setTodoSupplier($this, $todoSupplier) {
    $this.$todoSupplier = $todoSupplier;
}
function ecd_TodoItemComponent_getTodo($this) {
    return juf_Supplier$proxy$4_0_4_get($this.$todoSupplier);
}
function ecd_TodoItemComponent_setModelSupplier($this, $modelSupplier) {
    $this.$modelSupplier0 = $modelSupplier;
}
function ecd_TodoItemComponent_getModel($this) {
    return juf_Supplier$proxy$4_0_5_get($this.$modelSupplier0);
}
function juf_Supplier$proxy$4_0_4() {
    jl_Object.call(this);
    this.$proxyCapture021 = null;
}
function juf_Supplier$proxy$4_0_4_get(var$0) {
    return var$0.$proxyCapture021.$value5;
}
function juf_Supplier$proxy$4_0_5() {
    jl_Object.call(this);
    this.$proxyCapture022 = null;
}
function juf_Supplier$proxy$4_0_5_get(var$0) {
    return var$0.$proxyCapture022.$model;
}
function otft_Templates$PROXY$4_2() {
    jl_Object.call(this);
}
function otft_Templates$PROXY$4_2_create(var$1, var$2) {
    var$1 = new otft_Fragment$proxy$4_2_0;
    var$1.$proxyCapture024 = var$2;
    var$2 = new otft_Fragment$proxy$4_2_1;
    var$2.$proxyCapture025 = var$1;
    return var$2;
}
function ju_AbstractList$TListIteratorImpl() {
    var a = this; jl_Object.call(a);
    a.$i = 0;
    a.$j = 0;
    a.$lastModCount = 0;
    a.$sz = 0;
    a.$this$00 = null;
}
function ju_AbstractList$TListIteratorImpl_hasNext($this) {
    return $this.$i >= $this.$sz ? 0 : 1;
}
function ju_AbstractList$TListIteratorImpl_next($this) {
    var var$1, var$2;
    ju_AbstractList$TListIteratorImpl_checkConcurrentModification($this);
    if ($this.$i == $this.$sz) {
        var$1 = new ju_NoSuchElementException;
        jl_Exception__init_(var$1);
        $rt_throw(var$1);
    }
    $this.$j = $this.$i;
    var$1 = $this.$this$00;
    var$2 = $this.$i;
    $this.$i = var$2 + 1 | 0;
    return var$1.$get(var$2);
}
function ju_AbstractList$TListIteratorImpl_hasPrevious($this) {
    return $this.$i <= 0 ? 0 : 1;
}
function ju_AbstractList$TListIteratorImpl_previous($this) {
    var var$1, var$2;
    ju_AbstractList$TListIteratorImpl_checkConcurrentModification($this);
    $this.$j = $this.$i - 1 | 0;
    if ($this.$j < 0) {
        var$1 = new ju_NoSuchElementException;
        jl_Exception__init_(var$1);
        $rt_throw(var$1);
    }
    var$1 = $this.$this$00;
    var$2 = $this.$i - 1 | 0;
    $this.$i = var$2;
    return var$1.$get(var$2);
}
function ju_AbstractList$TListIteratorImpl_nextIndex($this) {
    return $this.$i;
}
function ju_AbstractList$TListIteratorImpl_previousIndex($this) {
    return $this.$i - 1 | 0;
}
function ju_AbstractList$TListIteratorImpl_checkConcurrentModification($this) {
    var var$1;
    if ($this.$lastModCount >= $this.$this$00.$modCount)
        return;
    var$1 = new ju_ConcurrentModificationException;
    jl_Exception__init_(var$1);
    $rt_throw(var$1);
}
function otft_Fragment$proxy$4_2_0() {
    jl_Object.call(this);
    this.$proxyCapture024 = null;
}
function otft_Fragment$proxy$4_2_0_create(var$0) {
    var var$1, var$2;
    var$1 = var$0.$proxyCapture024;
    var$2 = new otft_DomComponentHandler$proxy$4_2_0;
    var$2.$proxyCapture026 = var$1;
    return otft_DomComponentTemplate__init_(var$2);
}
function otft_Fragment$proxy$4_2_1() {
    jl_Object.call(this);
    this.$proxyCapture025 = null;
}
function otft_Fragment$proxy$4_2_1_create(var$0) {
    return otft_Fragment$proxy$4_2_0_create(var$0.$proxyCapture025);
}
function otft_DomComponentHandler$proxy$4_1_0() {
    jl_Object.call(this);
    this.$proxyCapture023 = null;
}
function otft_DomComponentHandler$proxy$4_1_0_update(var$0) {
    return;
}
function otft_DomComponentHandler$proxy$4_1_0_buildDom(var$0, var$1) {
    var var$2, var$3, var$4, var$5, var$6;
    var$2 = var$0.$proxyCapture023;
    var$1 = var$1;
    var$3 = otft_DomBuilder_text(otft_DomBuilder_openSlot(otft_DomBuilder_text(otft_DomBuilder_attribute(otft_DomBuilder_openSlot(otft_DomBuilder_text(otft_DomBuilder_attribute(otft_DomBuilder_openSlot(otft_DomBuilder_text(var$1, $rt_s(31)), $rt_s(61)), $rt_s(33), $rt_s(61)), $rt_s(35)), $rt_s(62)), $rt_s(33), $rt_s(63)), $rt_s(41)), $rt_s(64)), $rt_s(60));
    var$4 = otfch_TextComponent__init_(otft_Slot_create());
    otfch_TextComponent_setValue(var$4, juf_Supplier$proxy$4_1_0__init_(var$2));
    var$3 = otft_DomBuilder_text(otft_DomBuilder_close(otft_DomBuilder_text(otft_DomBuilder_add0(var$3, var$4), $rt_s(41))), $rt_s(37));
    var$4 = otfcs_ChooseComponent__init_(otft_Slot_create());
    var$5 = ju_ArrayList__init_2(1);
    var$6 = otfcs_ChooseClause__init_();
    otfcs_ChooseClause_setPredicate(var$6, juf_BooleanSupplier$proxy$4_1_0__init_(var$2));
    var$5 = var$5;
    ju_ArrayList_add(var$5, var$6);
    otfcs_ChooseComponent_setClauses(var$4, var$5);
    var$5 = otfcs_OtherwiseClause__init_();
    otfcs_ChooseComponent_setOtherwiseClause(var$4, var$5);
    otfcs_ChooseClause_setContent(var$6, otft_Fragment$proxy$4_1_1__init_());
    otfcs_OtherwiseClause_setContent(var$5, otft_Fragment$proxy$4_1_2__init_());
    otft_DomBuilder_open(otft_DomBuilder_text(otft_DomBuilder_attribute(otft_DomBuilder_open(otft_DomBuilder_text(otft_DomBuilder_close(otft_DomBuilder_text(otft_DomBuilder_add0(var$3, var$4), $rt_s(35))), $rt_s(37)), $rt_s(57)), $rt_s(33), $rt_s(65)), $rt_s(41)), $rt_s(66));
    otft_DomBuilder_text(otft_DomBuilder_open(otft_DomBuilder_text(otft_DomBuilder_close(otft_DomBuilder_text(otft_DomBuilder_close(otft_DomBuilder_text(otft_DomBuilder_add(otft_DomBuilder_add(otft_DomBuilder_open(otft_DomBuilder_text(otft_DomBuilder_open(otft_DomBuilder_text(otft_DomBuilder_close(otft_DomBuilder_text(otft_DomBuilder_close(otft_DomBuilder_text(otft_DomBuilder_add(otft_DomBuilder_add(otft_DomBuilder_open(otft_DomBuilder_text(var$1, $rt_s(59)), $rt_s(67)), otft_Modifier$proxy$4_1_0__init_(var$2)),
    otft_Modifier$proxy$4_1_1__init_(var$2)), $rt_s(68))), $rt_s(41))), $rt_s(41)), $rt_s(66)), $rt_s(59)), $rt_s(67)), otft_Modifier$proxy$4_1_2__init_(var$2)), otft_Modifier$proxy$4_1_3__init_(var$2)), $rt_s(69))), $rt_s(41))), $rt_s(41)), $rt_s(66)), $rt_s(59));
    var$1 = otft_DomBuilder_text(otft_DomBuilder_close(otft_DomBuilder_text(otft_DomBuilder_close(otft_DomBuilder_text(otft_DomBuilder_close(otft_DomBuilder_text(otft_DomBuilder_add(otft_DomBuilder_add(otft_DomBuilder_open(var$1, $rt_s(67)), otft_Modifier$proxy$4_1_4__init_(var$2)), otft_Modifier$proxy$4_1_5__init_(var$2)), $rt_s(70))), $rt_s(41))), $rt_s(37))), $rt_s(37));
    var$3 = otfcs_IfComponent__init_(otft_Slot_create());
    otfcs_IfComponent_setCondition(var$3, juf_Supplier$proxy$4_1_4__init_(var$2));
    otfcs_IfComponent_setBody(var$3, otft_Fragment$proxy$4_1_3__init_(var$2));
    otft_DomBuilder_close(otft_DomBuilder_text(otft_DomBuilder_add0(var$1, var$3), $rt_s(31)));
}
function juf_Predicate() {
}
function ecd_Model$getActiveTodos$lambda$_3_0() {
    jl_Object.call(this);
}
function ecd_Model$getActiveTodos$lambda$_3_0_test(var$0, var$1) {
    return var$1.$completed ? 0 : 1;
}
function jus_Collectors() {
    jl_Object.call(this);
}
function jus_Collectors_toList() {
    var var$1, var$2, var$3, var$4, var$5, var$6, var$7;
    var$1 = new jus_Collectors$toList$lambda$_2_0;
    var$2 = new jus_Collectors$toCollection$lambda$_1_0;
    var$3 = new jus_Collectors$toCollection$lambda$_1_1;
    var$4 = $rt_createArray(jus_Collector$Characteristics, 0);
    var$5 = new jus_Collector$of$lambda$_5_0;
    var$6 = new ju_GenericEnumSet;
    jl_Object__init_0(var$6);
    var$6.$cls = $rt_cls(jus_Collector$Characteristics);
    var$6.$bits = $rt_createIntArray(((otp_Platform_getEnumConstants($rt_cls(jus_Collector$Characteristics).$platformClass).data.length - 1 | 0) / 32 | 0) + 1 | 0);
    var$7 = new ju_Arrays$ArrayAsList;
    var$7.$array1 = var$4;
    ju_GenericEnumSet_addAll(var$6, var$7);
    var$7 = new jus_CollectorImpl;
    var$7.$supplier = var$1;
    var$7.$accumulator = var$2;
    var$7.$combiner = var$3;
    var$7.$finisher = var$5;
    var$7.$characteristics = var$6;
    return var$7;
}
function ecd_Model$getCompletedTodos$lambda$_2_0() {
    jl_Object.call(this);
}
function ecd_Model$getCompletedTodos$lambda$_2_0_test(var$0, var$1) {
    return var$1.$completed;
}
function jus_Collectors$toList$lambda$_2_0() {
    jl_Object.call(this);
}
function jus_Collectors$toList$lambda$_2_0_get(var$0) {
    return ju_ArrayList__init_();
}
function juf_BiConsumer() {
}
function jus_Collectors$toCollection$lambda$_1_0() {
    jl_Object.call(this);
}
function jus_Collectors$toCollection$lambda$_1_0_accept(var$0, var$1, var$2) {
    ju_ArrayList_add(var$1, var$2);
}
function juf_BiFunction() {
}
function juf_BinaryOperator() {
}
function jus_Collectors$toCollection$lambda$_1_1() {
    jl_Object.call(this);
}
function jus_Collector$Characteristics() {
    jl_Enum.call(this);
}
var jus_Collector$Characteristics_CONCURRENT = null;
var jus_Collector$Characteristics_UNORDERED = null;
var jus_Collector$Characteristics_IDENTITY_FINISH = null;
var jus_Collector$Characteristics_$VALUES = null;
function jus_Collector$Characteristics_values() {
    return jus_Collector$Characteristics_$VALUES.$clone();
}
function jus_Collector$Characteristics__clinit_() {
    var var$1, var$2, var$3;
    var$1 = new jus_Collector$Characteristics;
    jl_Enum__init_0(var$1, $rt_s(71), 0);
    jus_Collector$Characteristics_CONCURRENT = var$1;
    var$1 = new jus_Collector$Characteristics;
    jl_Enum__init_0(var$1, $rt_s(72), 1);
    jus_Collector$Characteristics_UNORDERED = var$1;
    var$1 = new jus_Collector$Characteristics;
    jl_Enum__init_0(var$1, $rt_s(73), 2);
    jus_Collector$Characteristics_IDENTITY_FINISH = var$1;
    var$2 = $rt_createArray(jus_Collector$Characteristics, 3);
    var$3 = var$2.data;
    var$3[0] = jus_Collector$Characteristics_CONCURRENT;
    var$3[1] = jus_Collector$Characteristics_UNORDERED;
    var$3[2] = jus_Collector$Characteristics_IDENTITY_FINISH;
    jus_Collector$Characteristics_$VALUES = var$2;
}
function jus_Collector() {
}
function juf_Function() {
}
function jus_Collector$of$lambda$_5_0() {
    jl_Object.call(this);
}
function jus_Collector$of$lambda$_5_0_apply(var$0, var$1) {
    return var$1;
}
function ju_Set() {
}
function ju_AbstractSet() {
    ju_AbstractCollection.call(this);
}
function ju_EnumSet() {
    ju_AbstractSet.call(this);
}
function jus_CollectorImpl() {
    var a = this; jl_Object.call(a);
    a.$supplier = null;
    a.$accumulator = null;
    a.$combiner = null;
    a.$finisher = null;
    a.$characteristics = null;
}
function jus_CollectorImpl_supplier($this) {
    return $this.$supplier;
}
function jus_CollectorImpl_accumulator($this) {
    return $this.$accumulator;
}
function jus_CollectorImpl_finisher($this) {
    return $this.$finisher;
}
function ju_GenericEnumSet() {
    var a = this; ju_EnumSet.call(a);
    a.$cls = null;
    a.$bits = null;
}
function ju_GenericEnumSet_add($this, $t) {
    var $n, $bitNumber, $bit, var$5;
    $n = jl_Enum_ordinal($t);
    $bitNumber = $n / 32 | 0;
    $bit = 1 << ($n % 32 | 0);
    if ($this.$bits.data[$bitNumber] & $bit)
        return 0;
    var$5 = $this.$bits.data;
    var$5[$bitNumber] = var$5[$bitNumber] | $bit;
    return 1;
}
function ju_GenericEnumSet_addAll($this, $c) {
    var $other, $added, $i, var$5;
    if ($c instanceof ju_GenericEnumSet) {
        $other = $c;
        if ($this.$cls === $other.$cls) {
            $added = 0;
            $i = 0;
            while ($i < $this.$bits.data.length) {
                if (($this.$bits.data[$i] | $other.$bits.data[$i]) != $this.$bits.data[$i]) {
                    $added = 1;
                    var$5 = $this.$bits.data;
                    var$5[$i] = var$5[$i] | $other.$bits.data[$i];
                }
                $i = $i + 1 | 0;
            }
            return $added;
        }
    }
    $added = 0;
    $c = ju_AbstractList_iterator($c);
    while (ju_AbstractList$1_hasNext($c)) {
        if (!ju_GenericEnumSet_add0($this, ju_AbstractList$1_next($c)))
            continue;
        $added = 1;
    }
    return $added;
}
function ju_GenericEnumSet_add0($this, var$1) {
    return ju_GenericEnumSet_add($this, var$1);
}
function ju_Arrays$ArrayAsList() {
    ju_AbstractList.call(this);
    this.$array1 = null;
}
function ju_Arrays$ArrayAsList_get($this, $index) {
    return $this.$array1.data[$index];
}
function ju_Arrays$ArrayAsList_size($this) {
    return $this.$array1.data.length;
}
function otfch_TextComponent() {
    var a = this; otft_AbstractComponent.call(a);
    a.$value6 = null;
    a.$textSlot = null;
    a.$cachedValue1 = null;
    a.$cacheInitialized = 0;
}
function otfch_TextComponent__init_(var_0) {
    var var_1 = new otfch_TextComponent();
    otfch_TextComponent__init_0(var_1, var_0);
    return var_1;
}
function otfch_TextComponent__init_0($this, $slot) {
    otft_AbstractComponent__init_($this, $slot);
}
function otfch_TextComponent_setValue($this, $value) {
    $this.$value6 = $value;
}
function otfch_TextComponent_render($this) {
    var $computedValue, var$2, var$3;
    $computedValue = $this.$value6.$get1();
    if ($this.$cacheInitialized && ju_Objects_equals($this.$cachedValue1, $computedValue))
        return;
    $this.$cacheInitialized = 1;
    $this.$cachedValue1 = $computedValue;
    if ($this.$textSlot !== null) {
        otft_Space_delete($this.$textSlot);
        $this.$textSlot = null;
    }
    var$2 = new otft_NodeHolder;
    var$3 = window.document;
    $computedValue = jl_String_valueOf($computedValue);
    otft_NodeHolder__init_0(var$2, var$3.createTextNode($rt_ustr($computedValue)));
    $this.$textSlot = var$2;
    otft_Slot_append($this.$slot, $this.$textSlot);
}
function juf_Supplier$proxy$4_1_0() {
    jl_Object.call(this);
    this.$proxyCapture027 = null;
}
function juf_Supplier$proxy$4_1_0__init_(var_0) {
    var var_1 = new juf_Supplier$proxy$4_1_0();
    juf_Supplier$proxy$4_1_0__init_0(var_1, var_0);
    return var_1;
}
function juf_Supplier$proxy$4_1_0_get(var$0) {
    var var$1, var$2;
    var$1 = var$0.$proxyCapture027;
    var$2 = $rt_createArray(jl_Object, 1).data;
    var$2[0] = jl_Integer_valueOf(ecd_FooterComponent_getCount(var$1));
    return jl_Integer_valueOf(var$2[0].$value);
}
function juf_Supplier$proxy$4_1_0__init_0(var$0, var$1) {
    var$0.$proxyCapture027 = var$1;
}
function otfcs_ChooseComponent() {
    var a = this; otft_AbstractComponent.call(a);
    a.$clauses = null;
    a.$otherwiseClause = null;
    a.$child = null;
    a.$currentClause = null;
    a.$dirty = 0;
}
function otfcs_ChooseComponent__init_(var_0) {
    var var_1 = new otfcs_ChooseComponent();
    otfcs_ChooseComponent__init_0(var_1, var_0);
    return var_1;
}
function otfcs_ChooseComponent__init_0($this, $slot) {
    otft_AbstractComponent__init_($this, $slot);
    $this.$dirty = 1;
}
function otfcs_ChooseComponent_setClauses($this, $clauses) {
    $this.$clauses = $clauses;
}
function otfcs_ChooseComponent_setOtherwiseClause($this, $otherwiseClause) {
    $this.$otherwiseClause = $otherwiseClause;
}
function otfcs_ChooseComponent_render($this) {
    var $newClause, var$2, $clause;
    $newClause = null;
    var$2 = ju_AbstractList_iterator($this.$clauses);
    a: {
        while (true) {
            if (!ju_AbstractList$1_hasNext(var$2)) {
                $clause = $newClause;
                break a;
            }
            $clause = ju_AbstractList$1_next(var$2);
            if (juf_BooleanSupplier$proxy$4_1_0_getAsBoolean($clause.$predicate))
                break;
        }
    }
    if (!(!$this.$dirty && $this.$currentClause === $clause)) {
        if ($this.$child !== null) {
            otft_DomComponentTemplate_destroy($this.$child);
            $this.$child = null;
        }
        $this.$currentClause = $clause;
        if ($this.$currentClause !== null)
            $this.$child = otft_Fragment$proxy$4_1_1_create($this.$currentClause.$content);
        else if ($this.$otherwiseClause !== null)
            $this.$child = otft_Fragment$proxy$4_1_2_create($this.$otherwiseClause.$content0);
        otft_Slot_append($this.$slot, $this.$child.$slot);
        $this.$dirty = 0;
    }
    if ($this.$child !== null)
        otft_DomComponentTemplate_render($this.$child);
}
function otfcs_ChooseComponent_destroy($this) {
    otft_AbstractComponent_destroy($this);
    if ($this.$child !== null) {
        otft_DomComponentTemplate_destroy($this.$child);
        $this.$child = null;
    }
}
function otfcs_ChooseClause() {
    var a = this; jl_Object.call(a);
    a.$predicate = null;
    a.$content = null;
}
function otfcs_ChooseClause__init_() {
    var var_0 = new otfcs_ChooseClause();
    otfcs_ChooseClause__init_0(var_0);
    return var_0;
}
function otfcs_ChooseClause__init_0($this) {
    return;
}
function otfcs_ChooseClause_setPredicate($this, $predicate) {
    $this.$predicate = $predicate;
}
function otfcs_ChooseClause_setContent($this, $content) {
    $this.$content = $content;
}
function juf_BooleanSupplier() {
}
function juf_BooleanSupplier$proxy$4_1_0() {
    jl_Object.call(this);
    this.$proxyCapture028 = null;
}
function juf_BooleanSupplier$proxy$4_1_0__init_(var_0) {
    var var_1 = new juf_BooleanSupplier$proxy$4_1_0();
    juf_BooleanSupplier$proxy$4_1_0__init_0(var_1, var_0);
    return var_1;
}
function juf_BooleanSupplier$proxy$4_1_0_getAsBoolean(var$0) {
    var var$1;
    var$1 = var$0.$proxyCapture028;
    return ecd_FooterComponent_getCount(var$1) != 1 ? 0 : 1;
}
function juf_BooleanSupplier$proxy$4_1_0__init_0(var$0, var$1) {
    var$0.$proxyCapture028 = var$1;
}
function otfcs_OtherwiseClause() {
    jl_Object.call(this);
    this.$content0 = null;
}
function otfcs_OtherwiseClause__init_() {
    var var_0 = new otfcs_OtherwiseClause();
    otfcs_OtherwiseClause__init_0(var_0);
    return var_0;
}
function otfcs_OtherwiseClause__init_0($this) {
    return;
}
function otfcs_OtherwiseClause_setContent($this, $content) {
    $this.$content0 = $content;
}
function otft_Fragment$proxy$4_1_1() {
    jl_Object.call(this);
}
function otft_Fragment$proxy$4_1_1__init_() {
    var var_0 = new otft_Fragment$proxy$4_1_1();
    otft_Fragment$proxy$4_1_1__init_0(var_0);
    return var_0;
}
function otft_Fragment$proxy$4_1_1_create(var$0) {
    return otft_DomComponentTemplate__init_(new otft_DomComponentHandler$proxy$4_1_1);
}
function otft_Fragment$proxy$4_1_1__init_0(var$0) {
    return;
}
function otft_Fragment$proxy$4_1_2() {
    jl_Object.call(this);
}
function otft_Fragment$proxy$4_1_2__init_() {
    var var_0 = new otft_Fragment$proxy$4_1_2();
    otft_Fragment$proxy$4_1_2__init_0(var_0);
    return var_0;
}
function otft_Fragment$proxy$4_1_2_create(var$0) {
    return otft_DomComponentTemplate__init_(new otft_DomComponentHandler$proxy$4_1_2);
}
function otft_Fragment$proxy$4_1_2__init_0(var$0) {
    return;
}
function otft_Modifier$proxy$4_1_0() {
    jl_Object.call(this);
    this.$proxyCapture029 = null;
}
function otft_Modifier$proxy$4_1_0__init_(var_0) {
    var var_1 = new otft_Modifier$proxy$4_1_0();
    otft_Modifier$proxy$4_1_0__init_0(var_1, var_0);
    return var_1;
}
function otft_Modifier$proxy$4_1_0_apply(var$0, var$1) {
    var var$2, var$3;
    var$2 = var$0.$proxyCapture029;
    var$1 = var$1;
    var$3 = new otfce_MouseBinder;
    otfce_BaseEventBinder__init_(var$3, var$1);
    var$1 = var$3;
    var$3 = new juf_Consumer$proxy$4_1_0;
    var$3.$proxyCapture030 = var$2;
    otfce_BaseEventBinder_setHandler(var$1, var$3);
    var$1.$eventName = $rt_s(74);
    return var$1;
}
function otft_Modifier$proxy$4_1_0__init_0(var$0, var$1) {
    var$0.$proxyCapture029 = var$1;
}
function otft_Modifier$proxy$4_1_1() {
    jl_Object.call(this);
    this.$proxyCapture031 = null;
}
function otft_Modifier$proxy$4_1_1__init_(var_0) {
    var var_1 = new otft_Modifier$proxy$4_1_1();
    otft_Modifier$proxy$4_1_1__init_0(var_1, var_0);
    return var_1;
}
function otft_Modifier$proxy$4_1_1_apply(var$0, var$1) {
    var var$2, var$3;
    var$2 = var$0.$proxyCapture031;
    var$1 = otfca_ComputedAttribute__init_(var$1);
    var$3 = new juf_Supplier$proxy$4_1_1;
    var$3.$proxyCapture032 = var$2;
    var$1.$value7 = var$3;
    var$1.$name1 = $rt_s(33);
    return var$1;
}
function otft_Modifier$proxy$4_1_1__init_0(var$0, var$1) {
    var$0.$proxyCapture031 = var$1;
}
function otft_Modifier$proxy$4_1_2() {
    jl_Object.call(this);
    this.$proxyCapture033 = null;
}
function otft_Modifier$proxy$4_1_2__init_(var_0) {
    var var_1 = new otft_Modifier$proxy$4_1_2();
    otft_Modifier$proxy$4_1_2__init_0(var_1, var_0);
    return var_1;
}
function otft_Modifier$proxy$4_1_2_apply(var$0, var$1) {
    var var$2, var$3;
    var$2 = var$0.$proxyCapture033;
    var$1 = var$1;
    var$3 = new otfce_MouseBinder;
    otfce_BaseEventBinder__init_(var$3, var$1);
    var$1 = var$3;
    var$3 = new juf_Consumer$proxy$4_1_1;
    var$3.$proxyCapture034 = var$2;
    otfce_BaseEventBinder_setHandler(var$1, var$3);
    var$1.$eventName = $rt_s(74);
    return var$1;
}
function otft_Modifier$proxy$4_1_2__init_0(var$0, var$1) {
    var$0.$proxyCapture033 = var$1;
}
function otft_Modifier$proxy$4_1_3() {
    jl_Object.call(this);
    this.$proxyCapture035 = null;
}
function otft_Modifier$proxy$4_1_3__init_(var_0) {
    var var_1 = new otft_Modifier$proxy$4_1_3();
    otft_Modifier$proxy$4_1_3__init_0(var_1, var_0);
    return var_1;
}
function otft_Modifier$proxy$4_1_3_apply(var$0, var$1) {
    var var$2, var$3;
    var$2 = var$0.$proxyCapture035;
    var$1 = otfca_ComputedAttribute__init_(var$1);
    var$3 = new juf_Supplier$proxy$4_1_2;
    var$3.$proxyCapture036 = var$2;
    var$1.$value7 = var$3;
    var$1.$name1 = $rt_s(33);
    return var$1;
}
function otft_Modifier$proxy$4_1_3__init_0(var$0, var$1) {
    var$0.$proxyCapture035 = var$1;
}
function otft_Modifier$proxy$4_1_4() {
    jl_Object.call(this);
    this.$proxyCapture037 = null;
}
function otft_Modifier$proxy$4_1_4__init_(var_0) {
    var var_1 = new otft_Modifier$proxy$4_1_4();
    otft_Modifier$proxy$4_1_4__init_0(var_1, var_0);
    return var_1;
}
function otft_Modifier$proxy$4_1_4_apply(var$0, var$1) {
    var var$2, var$3;
    var$2 = var$0.$proxyCapture037;
    var$1 = var$1;
    var$3 = new otfce_MouseBinder;
    otfce_BaseEventBinder__init_(var$3, var$1);
    var$1 = var$3;
    var$3 = new juf_Consumer$proxy$4_1_2;
    var$3.$proxyCapture038 = var$2;
    otfce_BaseEventBinder_setHandler(var$1, var$3);
    var$1.$eventName = $rt_s(74);
    return var$1;
}
function otft_Modifier$proxy$4_1_4__init_0(var$0, var$1) {
    var$0.$proxyCapture037 = var$1;
}
function otft_Modifier$proxy$4_1_5() {
    jl_Object.call(this);
    this.$proxyCapture039 = null;
}
function otft_Modifier$proxy$4_1_5__init_(var_0) {
    var var_1 = new otft_Modifier$proxy$4_1_5();
    otft_Modifier$proxy$4_1_5__init_0(var_1, var_0);
    return var_1;
}
function otft_Modifier$proxy$4_1_5_apply(var$0, var$1) {
    var var$2, var$3;
    var$2 = var$0.$proxyCapture039;
    var$1 = otfca_ComputedAttribute__init_(var$1);
    var$3 = new juf_Supplier$proxy$4_1_3;
    var$3.$proxyCapture040 = var$2;
    var$1.$value7 = var$3;
    var$1.$name1 = $rt_s(33);
    return var$1;
}
function otft_Modifier$proxy$4_1_5__init_0(var$0, var$1) {
    var$0.$proxyCapture039 = var$1;
}
function juf_Supplier$proxy$4_1_4() {
    jl_Object.call(this);
    this.$proxyCapture041 = null;
}
function juf_Supplier$proxy$4_1_4__init_(var_0) {
    var var_1 = new juf_Supplier$proxy$4_1_4();
    juf_Supplier$proxy$4_1_4__init_0(var_1, var_0);
    return var_1;
}
function juf_Supplier$proxy$4_1_4_get(var$0) {
    var var$1, var$2, var$3;
    var$1 = var$0.$proxyCapture041;
    var$2 = $rt_createArray(jl_Object, 1);
    var$3 = ecd_FooterComponent_getCompletedCount(var$1) <= 0 ? 0 : 1;
    var$2 = var$2.data;
    var$2[0] = jl_Boolean_valueOf(var$3);
    return jl_Boolean_valueOf(var$2[0].$value2);
}
function juf_Supplier$proxy$4_1_4__init_0(var$0, var$1) {
    var$0.$proxyCapture041 = var$1;
}
function otft_Fragment$proxy$4_1_3() {
    jl_Object.call(this);
    this.$proxyCapture042 = null;
}
function otft_Fragment$proxy$4_1_3__init_(var_0) {
    var var_1 = new otft_Fragment$proxy$4_1_3();
    otft_Fragment$proxy$4_1_3__init_0(var_1, var_0);
    return var_1;
}
function otft_Fragment$proxy$4_1_3_create(var$0) {
    var var$1, var$2;
    var$1 = var$0.$proxyCapture042;
    var$2 = new otft_DomComponentHandler$proxy$4_1_3;
    var$2.$proxyCapture043 = var$1;
    return otft_DomComponentTemplate__init_(var$2);
}
function otft_Fragment$proxy$4_1_3__init_0(var$0, var$1) {
    var$0.$proxyCapture042 = var$1;
}
function jl_AutoCloseable() {
}
function jus_BaseStream() {
}
function jus_Stream() {
}
function jusi_SimpleStreamImpl() {
    jl_Object.call(this);
}
var jusi_SimpleStreamImpl_$assertionsDisabled = 0;
function jusi_SimpleStreamImpl_filter($this, $predicate) {
    var var$2;
    var$2 = new jusi_FilteringStreamImpl;
    var$2.$sourceStream = $this;
    var$2.$filter0 = $predicate;
    return var$2;
}
function jusi_SimpleStreamImpl_collect($this, $collector) {
    var $collection, $accumulator, var$4;
    $collection = jus_Collectors$toList$lambda$_2_0_get($collector.$supplier);
    $accumulator = $collector.$accumulator;
    var$4 = new jusi_SimpleStreamImpl$collect$lambda$_24_0;
    var$4.$_03 = $accumulator;
    var$4.$_1 = $collection;
    jusi_WrappingStreamImpl_next($this, var$4);
    return jus_Collector$of$lambda$_5_0_apply($collector.$finisher, $collection);
}
function jusi_SimpleStreamImpl__clinit_() {
    jusi_SimpleStreamImpl_$assertionsDisabled = 0;
}
function jusi_StreamOverSpliterator() {
    jusi_SimpleStreamImpl.call(this);
    this.$spliterator = null;
}
function jusi_StreamOverSpliterator_next($this, $consumer) {
    var $action;
    $action = new jusi_StreamOverSpliterator$AdapterAction;
    $action.$consumer = $consumer;
    while (jusi_SpliteratorOverCollection_tryAdvance($this.$spliterator, $action)) {
        if ($action.$wantsMore)
            continue;
        else
            return 1;
    }
    return 0;
}
function jl_CloneNotSupportedException() {
    jl_Exception.call(this);
}
function otfjs_JsonSerializerContext() {
    var a = this; jl_Object.call(a);
    a.$ids = null;
    a.$touchedObjects = null;
}
function otfjs_JsonSerializerContext_touch($this, $object) {
    var var$2;
    if (!ju_SetFromMap_contains($this.$touchedObjects, $object)) {
        ju_SetFromMap_add($this.$touchedObjects, $object);
        return;
    }
    var$2 = new jl_IllegalArgumentException;
    jl_Throwable__init_0(var$2, jl_AbstractStringBuilder_toString(jl_StringBuilder_append1(jl_StringBuilder_append(jl_StringBuilder__init_(), $rt_s(75)), $object)));
    $rt_throw(var$2);
}
function ju_IdentityHashMap() {
    var a = this; ju_AbstractMap.call(a);
    a.$elementCount0 = 0;
    a.$elementData0 = null;
    a.$modCount1 = 0;
    a.$loadFactor0 = 0.0;
    a.$threshold0 = 0;
}
function ju_IdentityHashMap__init_() {
    var var_0 = new ju_IdentityHashMap();
    ju_IdentityHashMap__init_0(var_0);
    return var_0;
}
function ju_IdentityHashMap_newElementArray($this, $s) {
    return $rt_createArray(ju_IdentityHashMap$HashEntry, $s);
}
function ju_IdentityHashMap__init_0($this) {
    var var$1;
    var$1 = ju_IdentityHashMap_calculateCapacity(16);
    $this.$elementCount0 = 0;
    $this.$elementData0 = $rt_createArray(ju_IdentityHashMap$HashEntry, var$1);
    $this.$loadFactor0 = 0.75;
    ju_IdentityHashMap_computeThreshold($this);
}
function ju_IdentityHashMap_calculateCapacity($x) {
    var var$2;
    if ($x >= 1073741824)
        return 1073741824;
    if (!$x)
        return 16;
    var$2 = $x - 1 | 0;
    $x = var$2 | var$2 >> 1;
    $x = $x | $x >> 2;
    $x = $x | $x >> 4;
    $x = $x | $x >> 8;
    return ($x | $x >> 16) + 1 | 0;
}
function ju_IdentityHashMap_computeThreshold($this) {
    $this.$threshold0 = $this.$elementData0.data.length * $this.$loadFactor0 | 0;
}
function ju_IdentityHashMap_containsKey($this, $key) {
    return ju_IdentityHashMap_getEntry($this, $key) === null ? 0 : 1;
}
function ju_IdentityHashMap_getEntry($this, $key) {
    var $m, $hash;
    if ($key === null)
        $m = ju_IdentityHashMap_findNullKeyEntry($this);
    else {
        $hash = ju_IdentityHashMap_computeHashCode($key);
        $m = ju_IdentityHashMap_findNonNullKeyEntry($this, $key, $hash & ($this.$elementData0.data.length - 1 | 0), $hash);
    }
    return $m;
}
function ju_IdentityHashMap_findNonNullKeyEntry($this, $key, $index, $keyHash) {
    var $m;
    $m = $this.$elementData0.data[$index];
    while ($m !== null && !($m.$origKeyHash == $keyHash && ($key !== $m.$key ? 0 : 1))) {
        $m = $m.$next3;
    }
    return $m;
}
function ju_IdentityHashMap_findNullKeyEntry($this) {
    var $m;
    $m = $this.$elementData0.data[0];
    while ($m !== null && $m.$key !== null) {
        $m = $m.$next3;
    }
    return $m;
}
function ju_IdentityHashMap_put($this, $key, $value) {
    return ju_IdentityHashMap_putImpl($this, $key, $value);
}
function ju_IdentityHashMap_putImpl($this, $key, $value) {
    var $entry, $hash, $index, $result;
    if ($key === null) {
        $entry = ju_IdentityHashMap_findNullKeyEntry($this);
        if ($entry === null) {
            $this.$modCount1 = $this.$modCount1 + 1 | 0;
            $entry = ju_IdentityHashMap_createHashedEntry($this, null, 0, 0);
            $hash = $this.$elementCount0 + 1 | 0;
            $this.$elementCount0 = $hash;
            if ($hash > $this.$threshold0)
                ju_IdentityHashMap_rehash($this);
        }
    } else {
        $hash = ju_IdentityHashMap_computeHashCode($key);
        $index = $hash & ($this.$elementData0.data.length - 1 | 0);
        $entry = ju_IdentityHashMap_findNonNullKeyEntry($this, $key, $index, $hash);
        if ($entry === null) {
            $this.$modCount1 = $this.$modCount1 + 1 | 0;
            $entry = ju_IdentityHashMap_createHashedEntry($this, $key, $index, $hash);
            $hash = $this.$elementCount0 + 1 | 0;
            $this.$elementCount0 = $hash;
            if ($hash > $this.$threshold0)
                ju_IdentityHashMap_rehash($this);
        }
    }
    $result = $entry.$value1;
    $entry.$value1 = $value;
    return $result;
}
function ju_IdentityHashMap_createHashedEntry($this, $key, $index, $hash) {
    var $entry, var$5;
    $entry = new ju_IdentityHashMap$HashEntry;
    var$5 = null;
    $entry.$key = $key;
    $entry.$value1 = var$5;
    $entry.$origKeyHash = $hash;
    $entry.$next3 = $this.$elementData0.data[$index];
    $this.$elementData0.data[$index] = $entry;
    return $entry;
}
function ju_IdentityHashMap_rehash0($this, $capacity) {
    var $length, $newData, var$4, $i, $entry, $index, $next;
    $length = ju_IdentityHashMap_calculateCapacity(!$capacity ? 1 : $capacity << 1);
    $newData = $rt_createArray(ju_IdentityHashMap$HashEntry, $length);
    var$4 = $newData.data;
    $i = 0;
    $length = $length - 1 | 0;
    while ($i < $this.$elementData0.data.length) {
        $entry = $this.$elementData0.data[$i];
        $this.$elementData0.data[$i] = null;
        while ($entry !== null) {
            $index = $entry.$origKeyHash & $length;
            $next = $entry.$next3;
            $entry.$next3 = var$4[$index];
            var$4[$index] = $entry;
            $entry = $next;
        }
        $i = $i + 1 | 0;
    }
    $this.$elementData0 = $newData;
    ju_IdentityHashMap_computeThreshold($this);
}
function ju_IdentityHashMap_rehash($this) {
    ju_IdentityHashMap_rehash0($this, $this.$elementData0.data.length);
}
function ju_IdentityHashMap_computeHashCode($key) {
    return jl_Object_identity($key);
}
function ju_Collections() {
    jl_Object.call(this);
}
var ju_Collections_EMPTY_SET = null;
var ju_Collections_EMPTY_MAP = null;
var ju_Collections_EMPTY_LIST = null;
var ju_Collections_naturalOrder = null;
var ju_Collections_reverseOrder = null;
function ju_Collections__clinit_() {
    ju_Collections_EMPTY_SET = new ju_Collections$5;
    ju_Collections_EMPTY_MAP = new ju_Collections$6;
    ju_Collections_EMPTY_LIST = new ju_Collections$3;
    ju_Collections_naturalOrder = new ju_Collections$_clinit_$lambda$_61_0;
    ju_Collections_reverseOrder = new ju_Collections$_clinit_$lambda$_61_1;
}
function otfjt_NullNode() {
    otfjt_Node.call(this);
}
function ju_SetFromMap() {
    ju_AbstractSet.call(this);
    this.$map = null;
}
function ju_SetFromMap_contains($this, $o) {
    return ju_IdentityHashMap_containsKey($this.$map, $o);
}
function ju_SetFromMap_add($this, $e) {
    return ju_IdentityHashMap_putImpl($this.$map, $e, jl_Boolean_TRUE) !== null ? 0 : 1;
}
function ju_Collections$_clinit_$lambda$_61_0() {
    jl_Object.call(this);
}
function ju_Collections$_clinit_$lambda$_61_1() {
    jl_Object.call(this);
}
function ju_Collections$5() {
    ju_AbstractSet.call(this);
}
function ju_Collections$6() {
    ju_AbstractMap.call(this);
}
function ju_Collections$3() {
    ju_AbstractList.call(this);
}
function otfj_JSON$PROXY$4_0() {
    jl_Object.call(this);
}
function otfj_JSON$PROXY$4_0_getClassSerializer(var$1) {
    var var$2;
    var$1 = new otfjs_JsonSerializer$proxy$4_0_0;
    var$2 = new otfjs_ListSerializer;
    var$2.$itemSerializer = var$1;
    return var$2;
}
function jusi_WrappingStreamImpl() {
    jusi_SimpleStreamImpl.call(this);
    this.$sourceStream = null;
}
function jusi_WrappingStreamImpl_next($this, $consumer) {
    return jusi_StreamOverSpliterator_next($this.$sourceStream, jusi_FilteringStreamImpl_wrap($this, $consumer));
}
function jusi_FilteringStreamImpl() {
    jusi_WrappingStreamImpl.call(this);
    this.$filter0 = null;
}
function jusi_FilteringStreamImpl_wrap($this, $consumer) {
    var var$2;
    var$2 = new jusi_FilteringStreamImpl$wrap$lambda$_1_0;
    var$2.$_04 = $this;
    var$2.$_10 = $consumer;
    return var$2;
}
function otft_DomComponentHandler$proxy$4_2_0() {
    jl_Object.call(this);
    this.$proxyCapture026 = null;
}
function otft_DomComponentHandler$proxy$4_2_0_update(var$0) {
    return;
}
function otft_DomComponentHandler$proxy$4_2_0_buildDom(var$0, var$1) {
    var var$2, var$3, var$4, var$5;
    var$2 = var$0.$proxyCapture026;
    var$1 = var$1;
    var$3 = otft_DomBuilder_open(var$1, $rt_s(66));
    var$4 = new otft_Modifier$proxy$4_2_0;
    var$4.$proxyCapture044 = var$2;
    var$3 = otft_DomBuilder_attribute(otft_DomBuilder_attribute(otft_DomBuilder_open(otft_DomBuilder_text(otft_DomBuilder_attribute(otft_DomBuilder_open(otft_DomBuilder_text(otft_DomBuilder_add(var$3, var$4), $rt_s(35)), $rt_s(76)), $rt_s(33), $rt_s(77)), $rt_s(37)), $rt_s(42)), $rt_s(33), $rt_s(78)), $rt_s(52), $rt_s(53));
    var$4 = new otft_Modifier$proxy$4_2_1;
    var$4.$proxyCapture045 = var$2;
    var$3 = otft_DomBuilder_add(var$3, var$4);
    var$4 = new otft_Modifier$proxy$4_2_2;
    var$4.$proxyCapture046 = var$2;
    var$3 = otft_DomBuilder_openSlot(otft_DomBuilder_text(otft_DomBuilder_close(otft_DomBuilder_add(var$3, var$4)), $rt_s(37)), $rt_s(54));
    var$4 = new otft_Modifier$proxy$4_2_3;
    var$4.$proxyCapture047 = var$2;
    var$3 = otft_DomBuilder_text(otft_DomBuilder_add(var$3, var$4), $rt_s(41));
    var$4 = otft_Slot_create();
    var$5 = new otfch_TextComponent;
    otft_AbstractComponent__init_(var$5, var$4);
    var$4 = var$5;
    var$5 = new juf_Supplier$proxy$4_2_2;
    var$5.$proxyCapture048 = var$2;
    var$4.$value6 = var$5;
    otft_DomBuilder_open(otft_DomBuilder_text(otft_DomBuilder_close(otft_DomBuilder_text(otft_DomBuilder_add0(var$3, var$4), $rt_s(37))), $rt_s(37)), $rt_s(79));
    var$1 = otft_DomBuilder_attribute(var$1, $rt_s(33), $rt_s(80));
    var$3 = new otft_Modifier$proxy$4_2_4;
    var$3.$proxyCapture049 = var$2;
    var$1 = otft_DomBuilder_open(otft_DomBuilder_text(otft_DomBuilder_close(otft_DomBuilder_text(otft_DomBuilder_close(otft_DomBuilder_add(var$1, var$3)), $rt_s(35))), $rt_s(35)), $rt_s(39));
    var$3 = new otft_Modifier$proxy$4_2_5;
    var$3.$proxyCapture050 = var$2;
    var$1 = otft_DomBuilder_attribute(otft_DomBuilder_open(otft_DomBuilder_text(otft_DomBuilder_add(var$1, var$3), $rt_s(37)), $rt_s(42)), $rt_s(33), $rt_s(81));
    var$3 = new otft_Modifier$proxy$4_2_6;
    var$3.$proxyCapture051 = var$2;
    var$1 = otft_DomBuilder_add(var$1, var$3);
    var$3 = new otft_Modifier$proxy$4_2_7;
    var$3.$proxyCapture052 = var$2;
    var$1 = otft_DomBuilder_add(var$1, var$3);
    var$3 = new otft_Modifier$proxy$4_2_8;
    var$3.$proxyCapture053 = var$2;
    otft_DomBuilder_close(otft_DomBuilder_text(otft_DomBuilder_close(otft_DomBuilder_text(otft_DomBuilder_close(otft_DomBuilder_add(var$1, var$3)), $rt_s(35))), $rt_s(31)));
}
function otfce_MouseBinder() {
    otfce_BaseEventBinder.call(this);
}
function juf_Consumer$proxy$4_1_0() {
    jl_Object.call(this);
    this.$proxyCapture030 = null;
}
function juf_Consumer$proxy$4_1_0_accept(var$0, var$1) {
    var var$2, var$3;
    var$2 = var$0.$proxyCapture030;
    var$3 = $rt_createArray(jl_Object, 1).data;
    var$3[0] = ecd_TodoFilterType_ALL;
    ecd_FooterComponent_getModel(var$2).$isShowing = var$3[0];
    otft_Templates_update();
}
function otfca_ComputedAttribute() {
    var a = this; jl_Object.call(a);
    a.$element4 = null;
    a.$value7 = null;
    a.$cachedValue2 = null;
    a.$name1 = null;
}
function otfca_ComputedAttribute__init_(var_0) {
    var var_1 = new otfca_ComputedAttribute();
    otfca_ComputedAttribute__init_0(var_1, var_0);
    return var_1;
}
function otfca_ComputedAttribute__init_0($this, $target) {
    $this.$element4 = otft_DomBuilder$Item_getElement($target);
}
function otfca_ComputedAttribute_setValue($this, $value) {
    $this.$value7 = $value;
}
function otfca_ComputedAttribute_setName($this, $name) {
    $this.$name1 = $name;
}
function otfca_ComputedAttribute_render($this) {
    var $newValue, var$2, var$3;
    $newValue = $this.$value7.$get1();
    if (!ju_Objects_equals($newValue, $this.$cachedValue2)) {
        $this.$cachedValue2 = $newValue;
        var$2 = $this.$element4;
        var$3 = $this.$name1;
        $newValue = jl_String_valueOf($newValue);
        var$2.setAttribute($rt_ustr(var$3), $rt_ustr($newValue));
    }
}
function otfca_ComputedAttribute_destroy($this) {
    var var$1, var$2;
    var$1 = $this.$element4;
    var$2 = $this.$name1;
    var$1.removeAttribute($rt_ustr(var$2));
}
function juf_Supplier$proxy$4_1_1() {
    jl_Object.call(this);
    this.$proxyCapture032 = null;
}
function juf_Supplier$proxy$4_1_1_get(var$0) {
    var var$1;
    var$1 = var$0.$proxyCapture032;
    return !(ecd_FooterComponent_getModel(var$1).$isShowing !== ecd_TodoFilterType_ALL ? 0 : 1) ? $rt_s(3) : $rt_s(82);
}
function juf_Consumer$proxy$4_1_1() {
    jl_Object.call(this);
    this.$proxyCapture034 = null;
}
function juf_Consumer$proxy$4_1_1_accept(var$0, var$1) {
    var var$2, var$3;
    var$2 = var$0.$proxyCapture034;
    var$3 = $rt_createArray(jl_Object, 1).data;
    var$3[0] = ecd_TodoFilterType_ACTIVE;
    ecd_FooterComponent_getModel(var$2).$isShowing = var$3[0];
    otft_Templates_update();
}
function juf_Supplier$proxy$4_1_2() {
    jl_Object.call(this);
    this.$proxyCapture036 = null;
}
function juf_Supplier$proxy$4_1_2_get(var$0) {
    var var$1;
    var$1 = var$0.$proxyCapture036;
    return !(ecd_FooterComponent_getModel(var$1).$isShowing !== ecd_TodoFilterType_ACTIVE ? 0 : 1) ? $rt_s(3) : $rt_s(82);
}
function juf_Consumer$proxy$4_1_2() {
    jl_Object.call(this);
    this.$proxyCapture038 = null;
}
function juf_Consumer$proxy$4_1_2_accept(var$0, var$1) {
    var var$2, var$3;
    var$2 = var$0.$proxyCapture038;
    var$3 = $rt_createArray(jl_Object, 1).data;
    var$3[0] = ecd_TodoFilterType_COMPLETED;
    ecd_FooterComponent_getModel(var$2).$isShowing = var$3[0];
    otft_Templates_update();
}
function juf_Supplier$proxy$4_1_3() {
    jl_Object.call(this);
    this.$proxyCapture040 = null;
}
function juf_Supplier$proxy$4_1_3_get(var$0) {
    var var$1;
    var$1 = var$0.$proxyCapture040;
    return !(ecd_FooterComponent_getModel(var$1).$isShowing !== ecd_TodoFilterType_COMPLETED ? 0 : 1) ? $rt_s(3) : $rt_s(82);
}
function otft_DomComponentHandler$proxy$4_1_3() {
    jl_Object.call(this);
    this.$proxyCapture043 = null;
}
function otft_DomComponentHandler$proxy$4_1_3_update(var$0) {
    return;
}
function otft_DomComponentHandler$proxy$4_1_3_buildDom(var$0, var$1) {
    var var$2, var$3;
    var$2 = var$0.$proxyCapture043;
    var$1 = otft_DomBuilder_attribute(otft_DomBuilder_open(otft_DomBuilder_text(var$1, $rt_s(41)), $rt_s(79)), $rt_s(33), $rt_s(83));
    var$3 = new otft_Modifier$proxy$4_1_6;
    var$3.$proxyCapture054 = var$2;
    otft_DomBuilder_text(otft_DomBuilder_close(otft_DomBuilder_text(otft_DomBuilder_add(var$1, var$3), $rt_s(84))), $rt_s(37));
}
function ju_Spliterator() {
}
function jusi_SpliteratorOverCollection() {
    var a = this; jl_Object.call(a);
    a.$collection = null;
    a.$iterator0 = null;
}
function jusi_SpliteratorOverCollection_tryAdvance($this, $action) {
    if ($this.$iterator0 === null)
        $this.$iterator0 = ju_AbstractList_iterator($this.$collection);
    if (!ju_AbstractList$1_hasNext($this.$iterator0))
        return 0;
    jusi_StreamOverSpliterator$AdapterAction_accept($action, ju_AbstractList$1_next($this.$iterator0));
    return 1;
}
function otfjs_JsonSerializer() {
}
function otfjs_JsonSerializer$proxy$4_0_0() {
    jl_Object.call(this);
}
function otfjs_JsonSerializer$proxy$4_0_0_serialize(var$0, var$1, var$2) {
    return otfj_JSON_serialize(var$1, var$2);
}
function otfjs_NullableSerializer() {
    jl_Object.call(this);
}
function otfjs_NullableSerializer_serialize($this, $context, $value) {
    if ($value !== null)
        return $this.$serializeNonNull($context, $value);
    return null;
}
function otfjs_ListSerializer() {
    otfjs_NullableSerializer.call(this);
    this.$itemSerializer = null;
}
function otfjs_ListSerializer_serializeNonNull($this, $context, $value) {
    var $result, $item;
    $result = otfjt_ArrayNode_create$js_body$_10();
    $value = ju_AbstractList_iterator($value);
    while (ju_AbstractList$1_hasNext($value)) {
        $item = ju_AbstractList$1_next($value);
        $item = otfjs_JsonSerializer$proxy$4_0_0_serialize($this.$itemSerializer, $context, $item);
        $result.push($item);
    }
    return $result;
}
function ju_IdentityHashMap$HashEntry() {
    var a = this; ju_MapEntry.call(a);
    a.$origKeyHash = 0;
    a.$next3 = null;
}
function jusi_SimpleStreamImpl$collect$lambda$_24_0() {
    var a = this; jl_Object.call(a);
    a.$_03 = null;
    a.$_1 = null;
}
function jusi_SimpleStreamImpl$collect$lambda$_24_0_test(var$0, var$1) {
    jus_Collectors$toCollection$lambda$_1_0_accept(var$0.$_03, var$0.$_1, var$1);
    return 1;
}
function otft_Modifier$proxy$4_2_0() {
    jl_Object.call(this);
    this.$proxyCapture044 = null;
}
function otft_Modifier$proxy$4_2_0_apply(var$0, var$1) {
    var var$2, var$3;
    var$2 = var$0.$proxyCapture044;
    var$1 = otfca_ComputedAttribute__init_(var$1);
    var$3 = new juf_Supplier$proxy$4_2_0;
    var$3.$proxyCapture055 = var$2;
    var$1.$value7 = var$3;
    var$1.$name1 = $rt_s(33);
    return var$1;
}
function otft_Modifier$proxy$4_2_1() {
    jl_Object.call(this);
    this.$proxyCapture045 = null;
}
function otft_Modifier$proxy$4_2_1_apply(var$0, var$1) {
    var var$2, var$3;
    var$2 = var$0.$proxyCapture045;
    var$1 = otfch_CheckedBinder__init_(var$1);
    var$3 = new juf_Supplier$proxy$4_2_1;
    var$3.$proxyCapture056 = var$2;
    var$1.$value4 = var$3;
    return var$1;
}
function otft_Modifier$proxy$4_2_2() {
    jl_Object.call(this);
    this.$proxyCapture046 = null;
}
function otft_Modifier$proxy$4_2_2_apply(var$0, var$1) {
    var var$2, var$3;
    var$2 = var$0.$proxyCapture046;
    var$1 = otfch_CheckedChangeBinder__init_(var$1);
    var$3 = new otft_ValueChangeListener$proxy$4_2_0;
    var$3.$proxyCapture057 = var$2;
    var$1.$listener0 = var$3;
    return var$1;
}
function otft_Modifier$proxy$4_2_3() {
    jl_Object.call(this);
    this.$proxyCapture047 = null;
}
function otft_Modifier$proxy$4_2_3_apply(var$0, var$1) {
    var var$2, var$3;
    var$2 = var$0.$proxyCapture047;
    var$1 = var$1;
    var$3 = new otfce_MouseBinder;
    otfce_BaseEventBinder__init_(var$3, var$1);
    var$1 = var$3;
    var$3 = new juf_Consumer$proxy$4_2_0;
    var$3.$proxyCapture058 = var$2;
    otfce_BaseEventBinder_setHandler(var$1, var$3);
    var$1.$eventName = $rt_s(85);
    return var$1;
}
function juf_Supplier$proxy$4_2_2() {
    jl_Object.call(this);
    this.$proxyCapture048 = null;
}
function juf_Supplier$proxy$4_2_2_get(var$0) {
    return ecd_TodoItemComponent_getTodoText(var$0.$proxyCapture048);
}
function otft_Modifier$proxy$4_2_4() {
    jl_Object.call(this);
    this.$proxyCapture049 = null;
}
function otft_Modifier$proxy$4_2_4_apply(var$0, var$1) {
    var var$2, var$3;
    var$2 = var$0.$proxyCapture049;
    var$1 = var$1;
    var$3 = new otfce_MouseBinder;
    otfce_BaseEventBinder__init_(var$3, var$1);
    var$1 = var$3;
    var$3 = new juf_Consumer$proxy$4_2_1;
    var$3.$proxyCapture059 = var$2;
    otfce_BaseEventBinder_setHandler(var$1, var$3);
    var$1.$eventName = $rt_s(74);
    return var$1;
}
function otft_Modifier$proxy$4_2_5() {
    jl_Object.call(this);
    this.$proxyCapture050 = null;
}
function otft_Modifier$proxy$4_2_5_apply(var$0, var$1) {
    var var$2, var$3;
    var$2 = var$0.$proxyCapture050;
    var$1 = var$1;
    var$3 = new otfce_EventBinder;
    otfce_BaseEventBinder__init_(var$3, var$1);
    var$1 = var$3;
    var$3 = new juf_Consumer$proxy$4_2_2;
    var$3.$proxyCapture060 = var$2;
    otfce_BaseEventBinder_setHandler(var$1, var$3);
    var$1.$eventName = $rt_s(48);
    return var$1;
}
function otft_Modifier$proxy$4_2_6() {
    jl_Object.call(this);
    this.$proxyCapture051 = null;
}
function otft_Modifier$proxy$4_2_6_apply(var$0, var$1) {
    var var$2, var$3;
    var$2 = var$0.$proxyCapture051;
    var$1 = otfch_ValueBinder__init_(var$1);
    var$3 = new juf_Supplier$proxy$4_2_3;
    var$3.$proxyCapture061 = var$2;
    var$1.$value3 = var$3;
    return var$1;
}
function otft_Modifier$proxy$4_2_7() {
    jl_Object.call(this);
    this.$proxyCapture052 = null;
}
function otft_Modifier$proxy$4_2_7_apply(var$0, var$1) {
    var var$2, var$3;
    var$2 = var$0.$proxyCapture052;
    var$1 = otfch_ValueChangeBinder__init_(var$1);
    var$3 = new otft_ValueChangeListener$proxy$4_2_1;
    var$3.$proxyCapture062 = var$2;
    var$1.$listener = var$3;
    return var$1;
}
function otft_Modifier$proxy$4_2_8() {
    jl_Object.call(this);
    this.$proxyCapture053 = null;
}
function otft_Modifier$proxy$4_2_8_apply(var$0, var$1) {
    var var$2, var$3;
    var$2 = var$0.$proxyCapture053;
    var$1 = var$1;
    var$3 = new otfce_EventBinder;
    otfce_BaseEventBinder__init_(var$3, var$1);
    var$1 = var$3;
    var$3 = new juf_Consumer$proxy$4_2_3;
    var$3.$proxyCapture063 = var$2;
    otfce_BaseEventBinder_setHandler(var$1, var$3);
    var$1.$eventName = $rt_s(86);
    return var$1;
}
function otft_DomComponentHandler$proxy$4_1_1() {
    jl_Object.call(this);
}
function otft_DomComponentHandler$proxy$4_1_1_update(var$0) {
    return;
}
function otft_DomComponentHandler$proxy$4_1_1_buildDom(var$0, var$1) {
    otft_DomBuilder_text(var$1, $rt_s(87));
}
function otft_DomComponentHandler$proxy$4_1_2() {
    jl_Object.call(this);
}
function otft_DomComponentHandler$proxy$4_1_2_update(var$0) {
    return;
}
function otft_DomComponentHandler$proxy$4_1_2_buildDom(var$0, var$1) {
    otft_DomBuilder_text(var$1, $rt_s(88));
}
function otft_Modifier$proxy$4_1_6() {
    jl_Object.call(this);
    this.$proxyCapture054 = null;
}
function otft_Modifier$proxy$4_1_6_apply(var$0, var$1) {
    var var$2, var$3;
    var$2 = var$0.$proxyCapture054;
    var$1 = var$1;
    var$3 = new otfce_MouseBinder;
    otfce_BaseEventBinder__init_(var$3, var$1);
    var$1 = var$3;
    var$3 = new juf_Consumer$proxy$4_1_3;
    var$3.$proxyCapture064 = var$2;
    otfce_BaseEventBinder_setHandler(var$1, var$3);
    var$1.$eventName = $rt_s(74);
    return var$1;
}
function juf_Supplier$proxy$4_2_0() {
    jl_Object.call(this);
    this.$proxyCapture055 = null;
}
function juf_Supplier$proxy$4_2_0_get(var$0) {
    var var$1, var$2, var$3, var$4;
    var$1 = var$0.$proxyCapture055;
    var$2 = $rt_createArray(jl_Object, 1);
    var$3 = !var$1.$isEditing ? $rt_s(3) : $rt_s(89);
    var$2 = var$2.data;
    var$2[0] = var$3;
    var$4 = $rt_createArray(jl_Object, 1);
    var$3 = !ecd_TodoItemComponent_getTodo(var$1).$completed ? $rt_s(3) : $rt_s(90);
    var$4 = var$4.data;
    var$4[0] = var$3;
    return jl_AbstractStringBuilder_toString(jl_StringBuilder_append(jl_StringBuilder_append(jl_StringBuilder__init_(), var$4[0]), var$2[0]));
}
function juf_Supplier$proxy$4_2_1() {
    jl_Object.call(this);
    this.$proxyCapture056 = null;
}
function juf_Supplier$proxy$4_2_1_get(var$0) {
    var var$1, var$2;
    var$1 = var$0.$proxyCapture056;
    var$2 = $rt_createArray(jl_Object, 1).data;
    var$2[0] = jl_Boolean_valueOf(ecd_TodoItemComponent_getTodo(var$1).$completed);
    return jl_Boolean_valueOf(var$2[0].$value2);
}
function otft_ValueChangeListener$proxy$4_2_0() {
    jl_Object.call(this);
    this.$proxyCapture057 = null;
}
function otft_ValueChangeListener$proxy$4_2_0_changed(var$0, var$1) {
    ecd_Model$Todo_toggle(ecd_TodoItemComponent_getTodo(var$0.$proxyCapture057));
    otft_Templates_update();
}
function juf_Consumer$proxy$4_2_0() {
    jl_Object.call(this);
    this.$proxyCapture058 = null;
}
function juf_Consumer$proxy$4_2_0_accept(var$0, var$1) {
    ecd_TodoItemComponent_edit(var$0.$proxyCapture058);
    otft_Templates_update();
}
function juf_Consumer$proxy$4_2_1() {
    jl_Object.call(this);
    this.$proxyCapture059 = null;
}
function juf_Consumer$proxy$4_2_1_accept(var$0, var$1) {
    var var$2;
    var$1 = var$0.$proxyCapture059;
    var$2 = $rt_createArray(jl_Object, 1).data;
    var$2[0] = ecd_TodoItemComponent_getTodo(var$1);
    ecd_Model_deleteTodo(ecd_TodoItemComponent_getModel(var$1), var$2[0]);
    otft_Templates_update();
}
function juf_Consumer$proxy$4_2_2() {
    jl_Object.call(this);
    this.$proxyCapture060 = null;
}
function juf_Consumer$proxy$4_2_2_accept(var$0, var$1) {
    ecd_TodoItemComponent_saveEdit(var$0.$proxyCapture060);
    otft_Templates_update();
}
function juf_Supplier$proxy$4_2_3() {
    jl_Object.call(this);
    this.$proxyCapture061 = null;
}
function juf_Supplier$proxy$4_2_3_get(var$0) {
    return var$0.$proxyCapture061.$newText;
}
function otft_ValueChangeListener$proxy$4_2_1() {
    jl_Object.call(this);
    this.$proxyCapture062 = null;
}
function otft_ValueChangeListener$proxy$4_2_1_changed(var$0, var$1) {
    var var$2, var$3;
    var$2 = var$0.$proxyCapture062;
    var$3 = $rt_createArray(jl_Object, 1).data;
    var$3[0] = var$1;
    var$2.$newText = var$3[0];
    otft_Templates_update();
}
function juf_Consumer$proxy$4_2_3() {
    jl_Object.call(this);
    this.$proxyCapture063 = null;
}
function juf_Consumer$proxy$4_2_3_accept(var$0, var$1) {
    ecd_TodoItemComponent_saveEdit(var$0.$proxyCapture063);
    otft_Templates_update();
}
function juf_Consumer$proxy$4_1_3() {
    jl_Object.call(this);
    this.$proxyCapture064 = null;
}
function juf_Consumer$proxy$4_1_3_accept(var$0, var$1) {
    ecd_Model_clearCompleted(ecd_FooterComponent_getModel(var$0.$proxyCapture064));
    otft_Templates_update();
}
function jusi_FilteringStreamImpl$wrap$lambda$_1_0() {
    var a = this; jl_Object.call(a);
    a.$_04 = null;
    a.$_10 = null;
}
function jusi_FilteringStreamImpl$wrap$lambda$_1_0_test(var$0, var$1) {
    var var$2, var$3;
    var$2 = var$0.$_04;
    var$3 = var$0.$_10;
    return var$2.$filter0.$test(var$1) ? jusi_SimpleStreamImpl$collect$lambda$_24_0_test(var$3, var$1) : 1;
}
function jusi_StreamOverSpliterator$AdapterAction() {
    var a = this; jl_Object.call(a);
    a.$consumer = null;
    a.$wantsMore = 0;
}
function jusi_StreamOverSpliterator$AdapterAction_accept($this, $t) {
    $this.$wantsMore = jusi_FilteringStreamImpl$wrap$lambda$_1_0_test($this.$consumer, $t);
}
function otfj_JSON$PROXY$4_1() {
    jl_Object.call(this);
}
function otfj_JSON$PROXY$4_1_getClassSerializer(var$1) {
    return new otfjs_BooleanSerializer;
}
function otfj_JSON$PROXY$4_8() {
    jl_Object.call(this);
}
function otfj_JSON$PROXY$4_8_getClassSerializer(var$1) {
    var var$2;
    var$1 = otfjs_ObjectSerializer_INSTANCE;
    var$2 = new otfjs_ArraySerializer;
    var$2.$itemSerializer0 = var$1;
    return var$2;
}
function otfj_JSON$PROXY$4_14() {
    jl_Object.call(this);
}
function otfj_JSON$PROXY$4_14_getClassSerializer(var$1) {
    return new otfjs_DoubleSerializer;
}
function otfj_JSON$PROXY$4_16() {
    jl_Object.call(this);
}
function otfj_JSON$PROXY$4_16_getClassSerializer(var$1) {
    return new otfjs_JsonSerializer$proxy$4_16_0;
}
function otfj_JSON$PROXY$4_22() {
    jl_Object.call(this);
}
function otfj_JSON$PROXY$4_22_getClassSerializer(var$1) {
    return new otfjs_StringSerializer;
}
function otfjs_BooleanSerializer() {
    otfjs_NullableSerializer.call(this);
}
function otfjs_BooleanSerializer_serializeNonNull($this, $context, $value) {
    return !!(!!$value.$value2);
}
function otfjs_ObjectSerializer() {
    jl_Object.call(this);
}
var otfjs_ObjectSerializer_INSTANCE = null;
function otfjs_ObjectSerializer_serialize($this, $context, $value) {
    return otfj_JSON_serialize($context, $value);
}
function otfjs_ObjectSerializer__clinit_() {
    otfjs_ObjectSerializer_INSTANCE = new otfjs_ObjectSerializer;
}
function otfjs_ArraySerializer() {
    otfjs_NullableSerializer.call(this);
    this.$itemSerializer0 = null;
}
function otfjs_ArraySerializer_serializeNonNull($this, $context, $value) {
    var $node, $array, var$5, var$6, $item;
    $node = otfjt_ArrayNode_create$js_body$_10();
    $array = $value.data;
    var$5 = $array.length;
    var$6 = 0;
    while (var$6 < var$5) {
        $item = otfj_JSON_serialize($context, $array[var$6]);
        $node.push($item);
        var$6 = var$6 + 1 | 0;
    }
    return $node;
}
function otfjs_DoubleSerializer() {
    otfjs_NullableSerializer.call(this);
}
function otfjs_DoubleSerializer_serializeNonNull($this, $context, $value) {
    return $value.$value0;
}
function otfjs_JsonSerializer$proxy$4_16_0() {
    jl_Object.call(this);
}
function otfjs_JsonSerializer$proxy$4_16_0_serialize(var$0, var$1, var$2) {
    var var$3, var$4;
    var$1 = var$1;
    var$3 = otfjt_ObjectNode_create$js_body$_5();
    otfjs_JsonSerializerContext_touch(var$1, var$2);
    var$1 = !!(!!var$2.$completed);
    var$4 = var$3;
    var$1 = var$1;
    var$4["completed"] = var$1;
    var$1 = $rt_ustr(var$2.$title);
    var$4["title"] = var$1;
    var$1 = !!(!!var$2.$completed);
    var$4["isCompleted"] = var$1;
    return var$3;
}
function otfjs_StringSerializer() {
    otfjs_NullableSerializer.call(this);
}
function otfjs_StringSerializer_serializeNonNull($this, $context, $value) {
    return $rt_ustr($value);
}
function ecd_Model$clearCompleted$lambda$_10_0() {
    jl_Object.call(this);
}
function ecd_Model$clearCompleted$lambda$_10_0_test(var$0, var$1) {
    return var$1.$completed ? 0 : 1;
}
function otfjt_ObjectNode() {
    otfjt_Node.call(this);
}
function otfjt_ObjectNode_create$js_body$_5() {
    return {  };
}
function jl_System() {
    jl_Object.call(this);
}
function jl_AbstractStringBuilder$Constants() {
    jl_Object.call(this);
}
var jl_AbstractStringBuilder$Constants_intPowersOfTen = null;
var jl_AbstractStringBuilder$Constants_longPowersOfTen = null;
var jl_AbstractStringBuilder$Constants_longLogPowersOfTen = null;
var jl_AbstractStringBuilder$Constants_doubleAnalysisResult = null;
var jl_AbstractStringBuilder$Constants_floatAnalysisResult = null;
function jl_AbstractStringBuilder$Constants__clinit_() {
    var var$1, var$2;
    var$1 = $rt_createIntArray(10);
    var$2 = var$1.data;
    var$2[0] = 1;
    var$2[1] = 10;
    var$2[2] = 100;
    var$2[3] = 1000;
    var$2[4] = 10000;
    var$2[5] = 100000;
    var$2[6] = 1000000;
    var$2[7] = 10000000;
    var$2[8] = 100000000;
    var$2[9] = 1000000000;
    jl_AbstractStringBuilder$Constants_intPowersOfTen = var$1;
    var$1 = $rt_createLongArray(19);
    var$2 = var$1.data;
    var$2[0] = Long_fromInt(1);
    var$2[1] = Long_fromInt(10);
    var$2[2] = Long_fromInt(100);
    var$2[3] = Long_fromInt(1000);
    var$2[4] = Long_fromInt(10000);
    var$2[5] = Long_fromInt(100000);
    var$2[6] = Long_fromInt(1000000);
    var$2[7] = Long_fromInt(10000000);
    var$2[8] = Long_fromInt(100000000);
    var$2[9] = Long_fromInt(1000000000);
    var$2[10] = new Long(1410065408, 2);
    var$2[11] = new Long(1215752192, 23);
    var$2[12] = new Long(3567587328, 232);
    var$2[13] = new Long(1316134912, 2328);
    var$2[14] = new Long(276447232, 23283);
    var$2[15] = new Long(2764472320, 232830);
    var$2[16] = new Long(1874919424, 2328306);
    var$2[17] = new Long(1569325056, 23283064);
    var$2[18] = new Long(2808348672, 232830643);
    jl_AbstractStringBuilder$Constants_longPowersOfTen = var$1;
    var$1 = $rt_createLongArray(6);
    var$2 = var$1.data;
    var$2[0] = Long_fromInt(1);
    var$2[1] = Long_fromInt(10);
    var$2[2] = Long_fromInt(100);
    var$2[3] = Long_fromInt(10000);
    var$2[4] = Long_fromInt(100000000);
    var$2[5] = new Long(1874919424, 2328306);
    jl_AbstractStringBuilder$Constants_longLogPowersOfTen = var$1;
    jl_AbstractStringBuilder$Constants_doubleAnalysisResult = new otcit_DoubleAnalyzer$Result;
    jl_AbstractStringBuilder$Constants_floatAnalysisResult = new otcit_FloatAnalyzer$Result;
}
function otcit_DoubleAnalyzer() {
    jl_Object.call(this);
}
var otcit_DoubleAnalyzer_mantissa10Table = null;
var otcit_DoubleAnalyzer_exp10Table = null;
function otcit_DoubleAnalyzer_analyze($d, $result) {
    var $bits, $mantissa, $exponent, $errorShift, var$7, $binExponentCorrection, $mantissaShift, $decExponent, var$11, $decMantissa, $error, $upError, $downError, $lowerPos, $upperPos;
    $bits = $rt_doubleToLongBits($d);
    $result.$sign = Long_eq(Long_and($bits, new Long(0, 2147483648)), Long_ZERO) ? 0 : 1;
    $mantissa = Long_and($bits, new Long(4294967295, 1048575));
    $exponent = Long_shr($bits, 52).lo & 2047;
    if (Long_eq($mantissa, Long_ZERO) && !$exponent) {
        $result.$mantissa = Long_ZERO;
        $result.$exponent = 0;
        return;
    }
    $errorShift = 0;
    if ($exponent)
        $mantissa = Long_or($mantissa, new Long(0, 1048576));
    else {
        $mantissa = Long_shl($mantissa, 1);
        while (Long_eq(Long_and($mantissa, new Long(0, 1048576)), Long_ZERO)) {
            $mantissa = Long_shl($mantissa, 1);
            $exponent = $exponent + (-1) | 0;
            $errorShift = $errorShift + 1 | 0;
        }
    }
    var$7 = otcit_DoubleAnalyzer_exp10Table.data;
    $binExponentCorrection = 0;
    $mantissaShift = var$7.length;
    if ($binExponentCorrection > $mantissaShift) {
        $result = new jl_IllegalArgumentException;
        jl_Exception__init_($result);
        $rt_throw($result);
    }
    $mantissaShift = $mantissaShift - 1 | 0;
    a: {
        while (true) {
            $decExponent = ($binExponentCorrection + $mantissaShift | 0) / 2 | 0;
            var$11 = var$7[$decExponent];
            if (var$11 == $exponent)
                break;
            if ($exponent >= var$11) {
                $binExponentCorrection = $decExponent + 1 | 0;
                if ($binExponentCorrection > $mantissaShift) {
                    $decExponent =  -$decExponent - 2 | 0;
                    break a;
                }
            } else {
                $mantissaShift = $decExponent - 1 | 0;
                if ($mantissaShift < $binExponentCorrection) {
                    $decExponent =  -$decExponent - 1 | 0;
                    break a;
                }
            }
        }
    }
    if ($decExponent < 0)
        $decExponent =  -$decExponent - 2 | 0;
    $mantissaShift = 12 + ($exponent - otcit_DoubleAnalyzer_exp10Table.data[$decExponent] | 0) | 0;
    $decMantissa = otcit_DoubleAnalyzer_mulAndShiftRight($mantissa, otcit_DoubleAnalyzer_mantissa10Table.data[$decExponent], $mantissaShift);
    if (Long_ge($decMantissa, new Long(2808348672, 232830643))) {
        $decExponent = $decExponent + 1 | 0;
        $mantissaShift = 12 + ($exponent - otcit_DoubleAnalyzer_exp10Table.data[$decExponent] | 0) | 0;
        $decMantissa = otcit_DoubleAnalyzer_mulAndShiftRight($mantissa, otcit_DoubleAnalyzer_mantissa10Table.data[$decExponent], $mantissaShift);
    }
    $error = Long_shru(otcit_DoubleAnalyzer_mantissa10Table.data[$decExponent], (63 - $mantissaShift | 0) - $errorShift | 0);
    $upError = Long_shr(Long_add($error, Long_fromInt(1)), 1);
    $downError = Long_shr($error, 1);
    if (Long_eq($mantissa, new Long(0, 1048576)))
        $downError = Long_shr($downError, 2);
    $lowerPos = Long_fromInt(10);
    while (Long_le($lowerPos, $downError)) {
        $lowerPos = Long_mul($lowerPos, Long_fromInt(10));
    }
    if (Long_ge(Long_rem($decMantissa, $lowerPos), Long_div($downError, Long_fromInt(2))))
        $lowerPos = Long_div($lowerPos, Long_fromInt(10));
    $upperPos = Long_fromInt(1);
    while (Long_le($upperPos, $upError)) {
        $upperPos = Long_mul($upperPos, Long_fromInt(10));
    }
    if (Long_gt(Long_sub($upperPos, Long_rem($decMantissa, $upperPos)), Long_div($upError, Long_fromInt(2))))
        $upperPos = Long_div($upperPos, Long_fromInt(10));
    $exponent = Long_compare($lowerPos, $upperPos);
    $mantissa = $exponent > 0 ? Long_mul(Long_div($decMantissa, $lowerPos), $lowerPos) : $exponent < 0 ? Long_add(Long_mul(Long_div($decMantissa, $upperPos), $upperPos), $upperPos) : Long_mul(Long_div(Long_add($decMantissa, Long_div($upperPos, Long_fromInt(2))), $upperPos), $upperPos);
    if (Long_ge($mantissa, new Long(2808348672, 232830643))) {
        $decExponent = $decExponent + 1 | 0;
        $mantissa = Long_div($mantissa, Long_fromInt(10));
    } else if (Long_lt($mantissa, new Long(1569325056, 23283064))) {
        $decExponent = $decExponent + (-1) | 0;
        $mantissa = Long_mul($mantissa, Long_fromInt(10));
    }
    $result.$mantissa = $mantissa;
    $result.$exponent = $decExponent - 330 | 0;
}
function otcit_DoubleAnalyzer_mulAndShiftRight($a, $b, $shift) {
    var $a1, $a2, $a3, $a4, $b1, $b2, $b3, $b4, $cm, $c0, $c;
    $a1 = Long_and($a, Long_fromInt(65535));
    $a2 = Long_and(Long_shru($a, 16), Long_fromInt(65535));
    $a3 = Long_and(Long_shru($a, 32), Long_fromInt(65535));
    $a4 = Long_and(Long_shru($a, 48), Long_fromInt(65535));
    $b1 = Long_and($b, Long_fromInt(65535));
    $b2 = Long_and(Long_shru($b, 16), Long_fromInt(65535));
    $b3 = Long_and(Long_shru($b, 32), Long_fromInt(65535));
    $b4 = Long_and(Long_shru($b, 48), Long_fromInt(65535));
    $cm = Long_add(Long_add(Long_mul($b3, $a1), Long_mul($b2, $a2)), Long_mul($b1, $a3));
    $c0 = Long_add(Long_add(Long_add(Long_mul($b4, $a1), Long_mul($b3, $a2)), Long_mul($b2, $a3)), Long_mul($b1, $a4));
    $c = Long_add(Long_add(Long_shl(Long_mul($b4, $a4), 32 + $shift | 0), Long_shl(Long_add(Long_mul($b4, $a3), Long_mul($b3, $a4)), 16 + $shift | 0)), Long_shl(Long_add(Long_add(Long_mul($b4, $a2), Long_mul($b3, $a3)), Long_mul($b2, $a4)), $shift));
    return Long_add($shift > 16 ? Long_add($c, Long_shl($c0, $shift - 16 | 0)) : Long_add($c, Long_shru($c0, 16 - $shift | 0)), Long_shru($cm, 32 - $shift | 0));
}
function otcit_DoubleAnalyzer__clinit_() {
    var $decimalMantissaOne, $exponent, $i, $shiftedOffPart, var$5, var$6, $maxMantissa, $i_0, $shift, var$10;
    otcit_DoubleAnalyzer_mantissa10Table = $rt_createLongArray(660);
    otcit_DoubleAnalyzer_exp10Table = $rt_createIntArray(660);
    $decimalMantissaOne = new Long(991952896, 1862645149);
    $exponent = 1023;
    $i = 0;
    $shiftedOffPart = $decimalMantissaOne;
    while ($i < 330) {
        var$5 = otcit_DoubleAnalyzer_mantissa10Table.data;
        var$6 = $i + 330 | 0;
        var$5[var$6] = jl_Long_divideUnsigned($shiftedOffPart, Long_fromInt(80));
        otcit_DoubleAnalyzer_exp10Table.data[var$6] = $exponent;
        $shiftedOffPart = jl_Long_divideUnsigned($shiftedOffPart, Long_fromInt(10));
        $maxMantissa = jl_Long_remainderUnsigned($shiftedOffPart, Long_fromInt(10));
        while (Long_le($shiftedOffPart, $decimalMantissaOne) && Long_eq(Long_and($shiftedOffPart, new Long(0, 2147483648)), Long_ZERO)) {
            $shiftedOffPart = Long_shl($shiftedOffPart, 1);
            $exponent = $exponent + 1 | 0;
            $maxMantissa = Long_shl($maxMantissa, 1);
        }
        $shiftedOffPart = Long_add($shiftedOffPart, Long_div($maxMantissa, Long_fromInt(10)));
        $i = $i + 1 | 0;
    }
    $i = 1023;
    $i_0 = 0;
    while ($i_0 < 330) {
        $shift = 0;
        $shiftedOffPart = $decimalMantissaOne;
        while (Long_gt($shiftedOffPart, new Long(3435973836, 214748364))) {
            $shiftedOffPart = Long_shr($shiftedOffPart, 1);
            $shift = $shift + 1 | 0;
            $i = $i + (-1) | 0;
        }
        var$10 = Long_mul($shiftedOffPart, Long_fromInt(10));
        $decimalMantissaOne = $shift <= 0 ? var$10 : Long_add(var$10, Long_shr(Long_mul(Long_and($decimalMantissaOne, Long_fromInt((1 << $shift) - 1 | 0)), Long_fromInt(10)), $shift));
        var$5 = otcit_DoubleAnalyzer_mantissa10Table.data;
        var$6 = (330 - $i_0 | 0) - 1 | 0;
        var$5[var$6] = jl_Long_divideUnsigned($decimalMantissaOne, Long_fromInt(80));
        otcit_DoubleAnalyzer_exp10Table.data[var$6] = $i;
        $i_0 = $i_0 + 1 | 0;
    }
}
function otcit_DoubleAnalyzer$Result() {
    var a = this; jl_Object.call(a);
    a.$mantissa = Long_ZERO;
    a.$exponent = 0;
    a.$sign = 0;
}
function otcit_FloatAnalyzer$Result() {
    jl_Object.call(this);
}
function jl_Long() {
    jl_Number.call(this);
}
var jl_Long_TYPE = null;
function jl_Long_divideUnsigned(var$1, var$2) {
    return Long_udiv(var$1, var$2);
}
function jl_Long_remainderUnsigned(var$1, var$2) {
    return Long_urem(var$1, var$2);
}
function jl_Long__clinit_() {
    jl_Long_TYPE = $rt_cls($rt_longcls());
}
$rt_packages([-1, "java", 0, "util", 1, "stream", 0, "lang", -1, "org", 4, "teavm", 5, "flavour", 6, "components", 7, "standard", 7, "attributes", 7, "html", 7, "events", 6, "templates", -1, "edu", 13, "carleton", 14, "dev"
]);
$rt_metadata([jl_Object, "Object", 3, 0, [], 0, 3, 0, ["$toString", function() { return jl_Object_toString(this); }],
otfr_Route, 0, jl_Object, [], 3, 3, 0, 0,
otfw_ApplicationTemplate, 0, jl_Object, [otfr_Route], 1, 3, 0, 0,
ecd_App, "App", 15, otfw_ApplicationTemplate, [], 0, 3, 0, 0,
jlr_AnnotatedElement, 0, jl_Object, [], 3, 3, 0, 0,
jl_Class, 0, jl_Object, [jlr_AnnotatedElement], 0, 3, 0, 0,
otji_JS, 0, jl_Object, [], 4, 0, 0, 0,
otp_Platform, 0, jl_Object, [], 4, 3, 0, 0,
ji_Serializable, 0, jl_Object, [], 3, 3, 0, 0,
jl_Comparable, 0, jl_Object, [], 3, 3, 0, 0,
jl_CharSequence, 0, jl_Object, [], 3, 3, 0, 0,
jl_String, "String", 3, jl_Object, [ji_Serializable, jl_Comparable, jl_CharSequence], 0, 3, 0, ["$toString", function() { return jl_String_toString(this); }, "$equals", function(var_1) { return jl_String_equals(this, var_1); }],
jl_Throwable, 0, jl_Object, [], 0, 3, 0, 0,
jl_Error, 0, jl_Throwable, [], 0, 3, 0, 0,
jl_LinkageError, 0, jl_Error, [], 0, 3, 0, 0,
jl_NoClassDefFoundError, 0, jl_LinkageError, [], 0, 3, 0, 0,
jl_AbstractStringBuilder, 0, jl_Object, [ji_Serializable, jl_CharSequence], 0, 0, 0, ["$ensureCapacity", function(var_1) { jl_AbstractStringBuilder_ensureCapacity(this, var_1); }],
jl_Appendable, 0, jl_Object, [], 3, 3, 0, 0,
jl_StringBuilder, 0, jl_AbstractStringBuilder, [jl_Appendable], 0, 3, 0, ["$ensureCapacity", function(var_1) { jl_StringBuilder_ensureCapacity(this, var_1); }],
jl_Number, 0, jl_Object, [ji_Serializable], 1, 3, 0, 0,
jl_Integer, "Integer", 3, jl_Number, [jl_Comparable], 0, 3, 0, ["$toString", function() { return jl_Integer_toString(this); }, "$equals", function(var_1) { return jl_Integer_equals(this, var_1); }],
jl_IncompatibleClassChangeError, 0, jl_LinkageError, [], 0, 3, 0, 0,
jl_NoSuchFieldError, 0, jl_IncompatibleClassChangeError, [], 0, 3, 0, 0,
jl_NoSuchMethodError, 0, jl_IncompatibleClassChangeError, [], 0, 3, 0, 0,
jl_Exception, 0, jl_Throwable, [], 0, 3, 0, 0,
jl_RuntimeException, 0, jl_Exception, [], 0, 3, 0, 0,
otci_IntegerUtil, 0, jl_Object, [], 4, 3, 0, 0,
ecd_Model, 0, jl_Object, [], 0, 3, 0, 0,
ju_Comparator, 0, jl_Object, [], 3, 3, 0, 0,
jl_String$_clinit_$lambda$_81_0, 0, jl_Object, [ju_Comparator], 0, 3, 0, 0,
jl_Character, 0, jl_Object, [jl_Comparable], 0, 3, 0, 0,
jl_Iterable, 0, jl_Object, [], 3, 3, 0, 0,
ju_Collection, 0, jl_Object, [jl_Iterable], 3, 3, 0, 0,
ju_AbstractCollection, 0, jl_Object, [ju_Collection], 1, 3, 0, ["$toString", function() { return ju_AbstractCollection_toString(this); }],
ju_List, 0, jl_Object, [ju_Collection], 3, 3, 0, 0,
ju_AbstractList, 0, ju_AbstractCollection, [ju_List], 1, 3, 0, ["$listIterator0", function() { return ju_AbstractList_listIterator(this); }, "$listIterator", function(var_1) { return ju_AbstractList_listIterator0(this, var_1); }],
jl_Cloneable, 0, jl_Object, [], 3, 3, 0, 0,
ju_RandomAccess, 0, jl_Object, [], 3, 3, 0, 0,
ju_ArrayList, "ArrayList", 1, ju_AbstractList, [jl_Cloneable, ji_Serializable, ju_RandomAccess], 0, 3, 0, ["$get", function(var_1) { return ju_ArrayList_get(this, var_1); }, "$size2", function() { return ju_ArrayList_size(this); }],
otj_JSObject, 0, jl_Object, [], 3, 3, 0, 0,
otjde_EventTarget, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0,
otjde_FocusEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0,
otjde_MouseEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0,
otjde_KeyboardEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0,
otjde_LoadEventTarget, 0, jl_Object, [otjde_EventTarget], 3, 3, 0, 0,
otjb_WindowEventTarget, 0, jl_Object, [otjde_EventTarget, otjde_FocusEventTarget, otjde_MouseEventTarget, otjde_KeyboardEventTarget, otjde_LoadEventTarget], 3, 3, 0, 0,
otjb_StorageProvider, 0, jl_Object, [], 3, 3, 0, 0,
otjc_JSArrayReader, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0,
otjb_Window, 0, jl_Object, [otj_JSObject, otjb_WindowEventTarget, otjb_StorageProvider, otjc_JSArrayReader], 1, 3, 0, ["$addEventListener$exported$0", function(var_1, var_2) { return otjb_Window_addEventListener$exported$0(this, var_1, var_2); }, "$removeEventListener$exported$1", function(var_1, var_2) { return otjb_Window_removeEventListener$exported$1(this, var_1, var_2); }, "$get$exported$2", function(var_1) { return otjb_Window_get$exported$2(this, var_1); }, "$removeEventListener$exported$3", function(var_1,
var_2, var_3) { return otjb_Window_removeEventListener$exported$3(this, var_1, var_2, var_3); }, "$dispatchEvent$exported$4", function(var_1) { return otjb_Window_dispatchEvent$exported$4(this, var_1); }, "$getLength$exported$5", function() { return otjb_Window_getLength$exported$5(this); }, "$addEventListener$exported$6", function(var_1, var_2, var_3) { return otjb_Window_addEventListener$exported$6(this, var_1, var_2, var_3); }],
jl_Enum, 0, jl_Object, [jl_Comparable, ji_Serializable], 1, 3, 0, ["$toString", function() { return jl_Enum_toString(this); }]]);
$rt_metadata([ecd_TodoFilterType, "TodoFilterType", 15, jl_Enum, [], 12, 0, 0, 0,
otfjt_Node, 0, jl_Object, [otj_JSObject], 1, 3, 0, 0,
otfj_JSON, 0, jl_Object, [], 4, 3, 0, 0,
juf_Consumer, 0, jl_Object, [], 3, 3, 0, 0,
ecd_Model$_init_$lambda$_0_0, 0, jl_Object, [juf_Consumer], 0, 3, 0, 0,
otfjd_JsonDeserializerContext, 0, jl_Object, [], 0, 3, 0, 0,
jl_IllegalArgumentException, 0, jl_RuntimeException, [], 0, 3, 0, 0,
ju_Map, 0, jl_Object, [], 3, 3, 0, 0,
ju_AbstractMap, 0, jl_Object, [ju_Map], 1, 3, 0, 0,
ju_HashMap, 0, ju_AbstractMap, [jl_Cloneable, ji_Serializable], 0, 3, 0, 0,
otfj_JSON$PROXY$7_0, 0, jl_Object, [], 0, 3, 0, 0,
jl_IndexOutOfBoundsException, 0, jl_RuntimeException, [], 0, 3, 0, 0,
jl_StringIndexOutOfBoundsException, 0, jl_IndexOutOfBoundsException, [], 0, 3, 0, 0,
otjdx_Node, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0,
otjdx_Document, 0, jl_Object, [otjdx_Node], 3, 3, 0, 0,
otjdh_HTMLDocument, 0, jl_Object, [otjdx_Document, otjde_EventTarget], 3, 3, 0, 0,
otfjd_JsonDeserializer, 0, jl_Object, [], 1, 3, 0, 0,
otfjd_ListDeserializer, 0, otfjd_JsonDeserializer, [], 0, 3, 0, ["$deserialize0", function(var_1, var_2) { return otfjd_ListDeserializer_deserialize(this, var_1, var_2); }],
otfjd_ObjectDeserializer, 0, otfjd_JsonDeserializer, [], 0, 3, 0, 0,
ju_Map$Entry, 0, jl_Object, [], 3, 3, 0, 0,
ju_MapEntry, 0, jl_Object, [ju_Map$Entry, jl_Cloneable], 0, 0, 0, 0,
ju_HashMap$HashEntry, 0, ju_MapEntry, [], 0, 0, 0, 0,
otfjt_ArrayNode, 0, otfjt_Node, [], 1, 3, 0, 0,
otft_Templates, 0, jl_Object, [], 4, 3, 0, 0,
ju_Iterator, 0, jl_Object, [], 3, 3, 0, 0,
ju_AbstractList$1, 0, jl_Object, [ju_Iterator], 0, 0, 0, 0,
otft_Space, 0, jl_Object, [], 1, 3, 0, 0,
otft_Slot, 0, otft_Space, [], 1, 3, 0, ["$getFirstNode", function() { return otft_Slot_getFirstNode(this); }, "$getAllNodes", function(var_1) { otft_Slot_getAllNodes(this, var_1); }, "$deleteDom", function() { otft_Slot_deleteDom(this); }],
otft_Renderable, 0, jl_Object, [], 3, 3, 0, 0,
otft_Component, 0, jl_Object, [otft_Renderable], 3, 3, 0, 0,
otft_AbstractComponent, 0, jl_Object, [otft_Component], 1, 3, 0, ["$destroy", function() { otft_AbstractComponent_destroy(this); }],
otft_Templates$RootComponent, "Templates$RootComponent", 12, otft_AbstractComponent, [], 0, 0, 0, ["$render", function() { otft_Templates$RootComponent_render(this); }, "$destroy", function() { otft_Templates$RootComponent_destroy(this); }],
otft_RootSlot, 0, otft_Slot, [], 0, 0, 0, 0,
ecd_Model$Todo, "Model$Todo", 15, jl_Object, [], 0, 3, 0, 0,
otft_Templates$PROXY$4_0, 0, jl_Object, [], 0, 3, 0, 0,
otfjt_BooleanNode, 0, otfjt_Node, [], 1, 3, otfjt_BooleanNode_$callClinit, 0,
jl_Boolean, "Boolean", 3, jl_Object, [ji_Serializable, jl_Comparable], 0, 3, 0, ["$toString", function() { return jl_Boolean_toString(this); }],
otfjt_NumberNode, 0, otfjt_Node, [], 1, 3, 0, 0,
jl_Double, "Double", 3, jl_Number, [jl_Comparable], 0, 3, 0, ["$toString", function() { return jl_Double_toString(this); }],
otfjt_StringNode, 0, otfjt_Node, [], 1, 3, 0, 0,
otft_Fragment, 0, jl_Object, [], 3, 3, 0, 0,
otft_Fragment$proxy$4_0_0, 0, jl_Object, [otft_Fragment], 0, 3, 0, 0,
otft_Fragment$proxy$4_0_3, 0, jl_Object, [otft_Fragment], 0, 3, 0, ["$create0", function() { return otft_Fragment$proxy$4_0_3_create(this); }],
ju_ConcurrentModificationException, 0, jl_RuntimeException, [], 0, 3, 0, 0,
otfj_JSON$PROXY$7_1, 0, jl_Object, [], 0, 3, 0, 0,
otfjd_BooleanDeserializer, 0, otfjd_JsonDeserializer, [], 0, 3, 0, ["$deserialize0", function(var_1, var_2) { return otfjd_BooleanDeserializer_deserialize(this, var_1, var_2); }],
jl_Math, 0, jl_Object, [], 4, 3, 0, 0,
ju_Arrays, 0, jl_Object, [], 0, 3, 0, 0,
otjc_JSArray, 0, jl_Object, [otjc_JSArrayReader], 1, 3, 0, ["$get$exported$0", function(var_1) { return otjc_JSArray_get$exported$0(this, var_1); }, "$getLength$exported$1", function() { return otjc_JSArray_getLength$exported$1(this); }],
jlr_Array, 0, jl_Object, [], 4, 3, 0, 0]);
$rt_metadata([jl_NullPointerException, 0, jl_RuntimeException, [], 0, 3, 0, 0,
jl_NegativeArraySizeException, 0, jl_RuntimeException, [], 0, 3, 0, 0,
otft_DomComponentHandler, 0, jl_Object, [], 3, 3, 0, 0,
otft_DomComponentHandler$proxy$4_0_0, 0, jl_Object, [otft_DomComponentHandler], 0, 3, 0, ["$update", function() { otft_DomComponentHandler$proxy$4_0_0_update(this); }, "$buildDom", function(var_1) { otft_DomComponentHandler$proxy$4_0_0_buildDom(this, var_1); }],
otft_DomComponentTemplate, 0, otft_AbstractComponent, [], 0, 3, 0, ["$render", function() { otft_DomComponentTemplate_render(this); }, "$destroy", function() { otft_DomComponentTemplate_destroy(this); }],
otft_ContainerSlot, 0, otft_Slot, [], 0, 0, 0, 0,
otft_DomBuilder, 0, jl_Object, [], 0, 3, otft_DomBuilder_$callClinit, 0,
ju_Queue, 0, jl_Object, [ju_Collection], 3, 3, 0, 0,
ju_Deque, 0, jl_Object, [ju_Queue], 3, 3, 0, 0,
ju_ArrayDeque, 0, ju_AbstractCollection, [ju_Deque], 0, 3, 0, 0,
otft_Modifier, 0, jl_Object, [], 3, 3, 0, 0,
otft_Modifier$proxy$4_0_0, 0, jl_Object, [otft_Modifier], 0, 3, 0, ["$apply", function(var_1) { return otft_Modifier$proxy$4_0_0_apply(this, var_1); }],
otft_Modifier$proxy$4_0_1, 0, jl_Object, [otft_Modifier], 0, 3, 0, ["$apply", function(var_1) { return otft_Modifier$proxy$4_0_1_apply(this, var_1); }],
otft_Modifier$proxy$4_0_2, 0, jl_Object, [otft_Modifier], 0, 3, 0, ["$apply", function(var_1) { return otft_Modifier$proxy$4_0_2_apply(this, var_1); }],
otfcs_IfComponent, "IfComponent", 8, otft_AbstractComponent, [], 0, 3, 0, ["$render", function() { otfcs_IfComponent_render(this); }, "$destroy", function() { otfcs_IfComponent_destroy(this); }],
juf_Supplier, 0, jl_Object, [], 3, 3, 0, 0,
juf_Supplier$proxy$4_0_1, 0, jl_Object, [juf_Supplier], 0, 3, 0, ["$get1", function() { return juf_Supplier$proxy$4_0_1_get(this); }],
otft_Fragment$proxy$4_0_1, 0, jl_Object, [otft_Fragment], 0, 3, 0, ["$create0", function() { return otft_Fragment$proxy$4_0_1_create(this); }],
otft_ModifierTarget, 0, jl_Object, [], 3, 3, 0, 0,
otft_DomBuilder$Item, 0, jl_Object, [otft_ModifierTarget], 0, 0, 0, 0,
otft_NodeHolder, 0, otft_Space, [], 0, 3, 0, ["$getFirstNode", function() { return otft_NodeHolder_getFirstNode(this); }, "$getAllNodes", function(var_1) { otft_NodeHolder_getAllNodes(this, var_1); }, "$deleteDom", function() { otft_NodeHolder_deleteDom(this); }],
jl_IllegalStateException, 0, jl_Exception, [], 0, 3, 0, 0,
ju_NoSuchElementException, 0, jl_RuntimeException, [], 0, 3, 0, 0,
otft_DomComponentHandler$proxy$4_0_1, 0, jl_Object, [otft_DomComponentHandler], 0, 3, 0, ["$update", function() { otft_DomComponentHandler$proxy$4_0_1_update(this); }, "$buildDom", function(var_1) { otft_DomComponentHandler$proxy$4_0_1_buildDom(this, var_1); }],
otfch_ValueBinder, "ValueBinder", 10, jl_Object, [otft_Renderable], 0, 3, 0, ["$render", function() { otfch_ValueBinder_render(this); }, "$destroy", function() { otfch_ValueBinder_destroy(this); }],
juf_Supplier$proxy$4_0_0, 0, jl_Object, [juf_Supplier], 0, 3, 0, ["$get1", function() { return juf_Supplier$proxy$4_0_0_get(this); }],
otfch_ValueChangeBinder, "ValueChangeBinder", 10, jl_Object, [otft_Renderable], 0, 3, 0, ["$render", function() { otfch_ValueChangeBinder_render(this); }, "$destroy", function() { otfch_ValueChangeBinder_destroy(this); }],
otft_ValueChangeListener, 0, jl_Object, [], 3, 3, 0, 0,
otft_ValueChangeListener$proxy$4_0_0, "ValueChangeListener$proxy$4_0_0", 12, jl_Object, [otft_ValueChangeListener], 0, 3, 0, ["$changed", function(var_1) { otft_ValueChangeListener$proxy$4_0_0_changed(this, var_1); }],
otft_Modifier$proxy$4_0_3, 0, jl_Object, [otft_Modifier], 0, 3, 0, ["$apply", function(var_1) { return otft_Modifier$proxy$4_0_3_apply(this, var_1); }],
otft_Modifier$proxy$4_0_4, 0, jl_Object, [otft_Modifier], 0, 3, 0, ["$apply", function(var_1) { return otft_Modifier$proxy$4_0_4_apply(this, var_1); }],
otfcs_ForEachComponent, "ForEachComponent", 8, otft_AbstractComponent, [], 0, 3, 0, ["$render", function() { otfcs_ForEachComponent_render(this); }, "$destroy", function() { otfcs_ForEachComponent_destroy(this); }],
juf_Supplier$proxy$4_0_3, 0, jl_Object, [juf_Supplier], 0, 3, 0, 0,
otft_Fragment$proxy$4_0_2, 0, jl_Object, [otft_Fragment], 0, 3, 0, 0,
otfw_AbstractWidget, 0, otft_AbstractComponent, [], 1, 3, 0, ["$render", function() { otfw_AbstractWidget_render(this); }, "$destroy", function() { otfw_AbstractWidget_destroy(this); }],
ecd_FooterComponent, "FooterComponent", 15, otfw_AbstractWidget, [], 0, 3, 0, 0,
juf_Supplier$proxy$4_0_6, 0, jl_Object, [juf_Supplier], 0, 3, 0, 0,
otfce_BaseEventBinder, 0, jl_Object, [otft_Renderable], 1, 3, 0, ["$render", function() { otfce_BaseEventBinder_render(this); }, "$destroy", function() { otfce_BaseEventBinder_destroy(this); }],
otfce_EventBinder, "EventBinder", 11, otfce_BaseEventBinder, [], 0, 3, 0, 0,
juf_Consumer$proxy$4_0_0, 0, jl_Object, [juf_Consumer], 0, 3, 0, ["$accept", function(var_1) { juf_Consumer$proxy$4_0_0_accept(this, var_1); }],
ju_AbstractSequentialList, 0, ju_AbstractList, [], 1, 3, 0, ["$get", function(var_1) { return ju_AbstractSequentialList_get(this, var_1); }],
ju_LinkedList, 0, ju_AbstractSequentialList, [ju_Deque], 0, 3, 0, ["$size2", function() { return ju_LinkedList_size(this); }, "$listIterator0", function() { return ju_LinkedList_listIterator(this); }, "$listIterator", function(var_1) { return ju_LinkedList_listIterator0(this, var_1); }],
otjde_EventListener, 0, jl_Object, [otj_JSObject], 3, 3, 0, 0,
otfce_BaseEventBinder$_init_$lambda$_0_0, 0, jl_Object, [otjde_EventListener], 0, 3, 0, ["$handleEvent$exported$0", function(var_1) { return otfce_BaseEventBinder$_init_$lambda$_0_0_handleEvent$exported$0(this, var_1); }],
ju_Objects, 0, jl_Object, [], 4, 3, 0, 0,
otfch_CheckedBinder, "CheckedBinder", 10, jl_Object, [otft_Renderable], 0, 3, 0, ["$render", function() { otfch_CheckedBinder_render(this); }, "$destroy", function() { otfch_CheckedBinder_destroy(this); }],
juf_Supplier$proxy$4_0_2, 0, jl_Object, [juf_Supplier], 0, 3, 0, ["$get1", function() { return juf_Supplier$proxy$4_0_2_get(this); }],
otfch_CheckedChangeBinder, "CheckedChangeBinder", 10, jl_Object, [otft_Renderable], 0, 3, 0, ["$render", function() { otfch_CheckedChangeBinder_render(this); }, "$destroy", function() { otfch_CheckedChangeBinder_destroy(this); }],
otft_ValueChangeListener$proxy$4_0_1, 0, jl_Object, [otft_ValueChangeListener], 0, 3, 0, ["$changed", function(var_1) { otft_ValueChangeListener$proxy$4_0_1_changed(this, var_1); }],
otfce_BaseEventBinder$setHandler$lambda$_2_0, 0, jl_Object, [otjde_EventListener], 0, 3, 0, ["$handleEvent$exported$0", function(var_1) { return otfce_BaseEventBinder$setHandler$lambda$_2_0_handleEvent$exported$0(this, var_1); }]]);
$rt_metadata([otfch_CheckedChangeBinder$1, 0, jl_Object, [otjde_EventListener], 0, 0, 0, ["$handleEvent$exported$0", function(var_1) { return otfch_CheckedChangeBinder$1_handleEvent$exported$0(this, var_1); }],
ju_LinkedList$Entry, 0, jl_Object, [], 0, 0, 0, 0,
otft_Templates$PROXY$4_1, 0, jl_Object, [], 0, 3, 0, 0,
otfte_VariableImpl, 0, jl_Object, [], 0, 3, 0, 0,
otft_DomComponentHandler$proxy$4_0_2, 0, jl_Object, [otft_DomComponentHandler], 0, 3, 0, ["$update", function() { otft_DomComponentHandler$proxy$4_0_2_update(this); }, "$buildDom", function(var_1) { otft_DomComponentHandler$proxy$4_0_2_buildDom(this, var_1); }],
otft_Fragment$proxy$4_1_0, 0, jl_Object, [otft_Fragment], 0, 3, 0, 0,
otft_Fragment$proxy$4_1_4, 0, jl_Object, [otft_Fragment], 0, 3, 0, ["$create0", function() { return otft_Fragment$proxy$4_1_4_create(this); }],
ju_ListIterator, 0, jl_Object, [ju_Iterator], 3, 3, 0, 0,
ju_LinkedList$SequentialListIterator, 0, jl_Object, [ju_ListIterator], 0, 0, 0, ["$hasNext", function() { return ju_LinkedList$SequentialListIterator_hasNext(this); }, "$next", function() { return ju_LinkedList$SequentialListIterator_next(this); }, "$hasPrevious", function() { return ju_LinkedList$SequentialListIterator_hasPrevious(this); }, "$previous1", function() { return ju_LinkedList$SequentialListIterator_previous(this); }, "$nextIndex", function() { return ju_LinkedList$SequentialListIterator_nextIndex(this);
}, "$previousIndex", function() { return ju_LinkedList$SequentialListIterator_previousIndex(this); }],
otft_DomBuilder$Item$createChangeListener$lambda$_6_0, 0, jl_Object, [otjde_EventListener], 0, 3, 0, ["$handleEvent$exported$0", function(var_1) { return otft_DomBuilder$Item$createChangeListener$lambda$_6_0_handleEvent$exported$0(this, var_1); }],
ecd_TodoItemComponent, "TodoItemComponent", 15, otfw_AbstractWidget, [], 0, 3, 0, 0,
juf_Supplier$proxy$4_0_4, 0, jl_Object, [juf_Supplier], 0, 3, 0, 0,
juf_Supplier$proxy$4_0_5, 0, jl_Object, [juf_Supplier], 0, 3, 0, 0,
otft_Templates$PROXY$4_2, 0, jl_Object, [], 0, 3, 0, 0,
ju_AbstractList$TListIteratorImpl, 0, jl_Object, [ju_ListIterator], 0, 0, 0, ["$hasNext", function() { return ju_AbstractList$TListIteratorImpl_hasNext(this); }, "$next", function() { return ju_AbstractList$TListIteratorImpl_next(this); }, "$hasPrevious", function() { return ju_AbstractList$TListIteratorImpl_hasPrevious(this); }, "$previous1", function() { return ju_AbstractList$TListIteratorImpl_previous(this); }, "$nextIndex", function() { return ju_AbstractList$TListIteratorImpl_nextIndex(this); }, "$previousIndex",
function() { return ju_AbstractList$TListIteratorImpl_previousIndex(this); }],
otft_Fragment$proxy$4_2_0, 0, jl_Object, [otft_Fragment], 0, 3, 0, 0,
otft_Fragment$proxy$4_2_1, 0, jl_Object, [otft_Fragment], 0, 3, 0, ["$create0", function() { return otft_Fragment$proxy$4_2_1_create(this); }],
otft_DomComponentHandler$proxy$4_1_0, 0, jl_Object, [otft_DomComponentHandler], 0, 3, 0, ["$update", function() { otft_DomComponentHandler$proxy$4_1_0_update(this); }, "$buildDom", function(var_1) { otft_DomComponentHandler$proxy$4_1_0_buildDom(this, var_1); }],
juf_Predicate, 0, jl_Object, [], 3, 3, 0, 0,
ecd_Model$getActiveTodos$lambda$_3_0, 0, jl_Object, [juf_Predicate], 0, 3, 0, ["$test", function(var_1) { return ecd_Model$getActiveTodos$lambda$_3_0_test(this, var_1); }],
jus_Collectors, 0, jl_Object, [], 4, 3, 0, 0,
ecd_Model$getCompletedTodos$lambda$_2_0, 0, jl_Object, [juf_Predicate], 0, 3, 0, ["$test", function(var_1) { return ecd_Model$getCompletedTodos$lambda$_2_0_test(this, var_1); }],
jus_Collectors$toList$lambda$_2_0, 0, jl_Object, [juf_Supplier], 0, 3, 0, 0,
juf_BiConsumer, 0, jl_Object, [], 3, 3, 0, 0,
jus_Collectors$toCollection$lambda$_1_0, 0, jl_Object, [juf_BiConsumer], 0, 3, 0, 0,
juf_BiFunction, 0, jl_Object, [], 3, 3, 0, 0,
juf_BinaryOperator, 0, jl_Object, [juf_BiFunction], 3, 3, 0, 0,
jus_Collectors$toCollection$lambda$_1_1, 0, jl_Object, [juf_BinaryOperator], 0, 3, 0, 0,
jus_Collector$Characteristics, "Collector$Characteristics", 2, jl_Enum, [], 12, 3, 0, 0,
jus_Collector, 0, jl_Object, [], 3, 3, 0, 0,
juf_Function, 0, jl_Object, [], 3, 3, 0, 0,
jus_Collector$of$lambda$_5_0, 0, jl_Object, [juf_Function], 0, 3, 0, 0,
ju_Set, 0, jl_Object, [ju_Collection], 3, 3, 0, 0,
ju_AbstractSet, 0, ju_AbstractCollection, [ju_Set], 1, 3, 0, 0,
ju_EnumSet, 0, ju_AbstractSet, [jl_Cloneable, ji_Serializable], 1, 3, 0, 0,
jus_CollectorImpl, 0, jl_Object, [jus_Collector], 0, 0, 0, 0,
ju_GenericEnumSet, 0, ju_EnumSet, [], 0, 0, 0, 0,
ju_Arrays$ArrayAsList, 0, ju_AbstractList, [ju_RandomAccess], 0, 0, 0, ["$get", function(var_1) { return ju_Arrays$ArrayAsList_get(this, var_1); }, "$size2", function() { return ju_Arrays$ArrayAsList_size(this); }],
otfch_TextComponent, "TextComponent", 10, otft_AbstractComponent, [], 0, 3, 0, ["$render", function() { otfch_TextComponent_render(this); }],
juf_Supplier$proxy$4_1_0, 0, jl_Object, [juf_Supplier], 0, 3, 0, ["$get1", function() { return juf_Supplier$proxy$4_1_0_get(this); }],
otfcs_ChooseComponent, "ChooseComponent", 8, otft_AbstractComponent, [], 0, 3, 0, ["$render", function() { otfcs_ChooseComponent_render(this); }, "$destroy", function() { otfcs_ChooseComponent_destroy(this); }],
otfcs_ChooseClause, "ChooseClause", 8, jl_Object, [], 0, 3, 0, 0,
juf_BooleanSupplier, 0, jl_Object, [], 3, 3, 0, 0,
juf_BooleanSupplier$proxy$4_1_0, 0, jl_Object, [juf_BooleanSupplier], 0, 3, 0, 0,
otfcs_OtherwiseClause, 0, jl_Object, [], 0, 3, 0, 0,
otft_Fragment$proxy$4_1_1, 0, jl_Object, [otft_Fragment], 0, 3, 0, 0,
otft_Fragment$proxy$4_1_2, 0, jl_Object, [otft_Fragment], 0, 3, 0, 0,
otft_Modifier$proxy$4_1_0, 0, jl_Object, [otft_Modifier], 0, 3, 0, ["$apply", function(var_1) { return otft_Modifier$proxy$4_1_0_apply(this, var_1); }],
otft_Modifier$proxy$4_1_1, 0, jl_Object, [otft_Modifier], 0, 3, 0, ["$apply", function(var_1) { return otft_Modifier$proxy$4_1_1_apply(this, var_1); }],
otft_Modifier$proxy$4_1_2, 0, jl_Object, [otft_Modifier], 0, 3, 0, ["$apply", function(var_1) { return otft_Modifier$proxy$4_1_2_apply(this, var_1); }]]);
$rt_metadata([otft_Modifier$proxy$4_1_3, 0, jl_Object, [otft_Modifier], 0, 3, 0, ["$apply", function(var_1) { return otft_Modifier$proxy$4_1_3_apply(this, var_1); }],
otft_Modifier$proxy$4_1_4, 0, jl_Object, [otft_Modifier], 0, 3, 0, ["$apply", function(var_1) { return otft_Modifier$proxy$4_1_4_apply(this, var_1); }],
otft_Modifier$proxy$4_1_5, 0, jl_Object, [otft_Modifier], 0, 3, 0, ["$apply", function(var_1) { return otft_Modifier$proxy$4_1_5_apply(this, var_1); }],
juf_Supplier$proxy$4_1_4, 0, jl_Object, [juf_Supplier], 0, 3, 0, ["$get1", function() { return juf_Supplier$proxy$4_1_4_get(this); }],
otft_Fragment$proxy$4_1_3, 0, jl_Object, [otft_Fragment], 0, 3, 0, ["$create0", function() { return otft_Fragment$proxy$4_1_3_create(this); }],
jl_AutoCloseable, 0, jl_Object, [], 3, 3, 0, 0,
jus_BaseStream, 0, jl_Object, [jl_AutoCloseable], 3, 3, 0, 0,
jus_Stream, 0, jl_Object, [jus_BaseStream], 3, 3, 0, 0,
jusi_SimpleStreamImpl, 0, jl_Object, [jus_Stream], 1, 3, 0, 0,
jusi_StreamOverSpliterator, 0, jusi_SimpleStreamImpl, [], 0, 3, 0, 0,
jl_CloneNotSupportedException, 0, jl_Exception, [], 0, 3, 0, 0,
otfjs_JsonSerializerContext, 0, jl_Object, [], 0, 3, 0, 0,
ju_IdentityHashMap, 0, ju_AbstractMap, [jl_Cloneable, ji_Serializable], 0, 3, 0, 0,
ju_Collections, 0, jl_Object, [], 0, 3, 0, 0,
otfjt_NullNode, 0, otfjt_Node, [], 1, 3, 0, 0,
ju_SetFromMap, 0, ju_AbstractSet, [], 0, 3, 0, 0,
ju_Collections$_clinit_$lambda$_61_0, 0, jl_Object, [ju_Comparator], 0, 3, 0, 0,
ju_Collections$_clinit_$lambda$_61_1, 0, jl_Object, [ju_Comparator], 0, 3, 0, 0,
ju_Collections$5, 0, ju_AbstractSet, [], 4, 0, 0, 0,
ju_Collections$6, 0, ju_AbstractMap, [], 4, 0, 0, 0,
ju_Collections$3, 0, ju_AbstractList, [], 4, 0, 0, 0,
otfj_JSON$PROXY$4_0, 0, jl_Object, [], 0, 3, 0, 0,
jusi_WrappingStreamImpl, 0, jusi_SimpleStreamImpl, [], 1, 3, 0, 0,
jusi_FilteringStreamImpl, 0, jusi_WrappingStreamImpl, [], 0, 3, 0, 0,
otft_DomComponentHandler$proxy$4_2_0, 0, jl_Object, [otft_DomComponentHandler], 0, 3, 0, ["$update", function() { otft_DomComponentHandler$proxy$4_2_0_update(this); }, "$buildDom", function(var_1) { otft_DomComponentHandler$proxy$4_2_0_buildDom(this, var_1); }],
otfce_MouseBinder, "MouseBinder", 11, otfce_BaseEventBinder, [], 0, 3, 0, 0,
juf_Consumer$proxy$4_1_0, 0, jl_Object, [juf_Consumer], 0, 3, 0, ["$accept", function(var_1) { juf_Consumer$proxy$4_1_0_accept(this, var_1); }],
otfca_ComputedAttribute, "ComputedAttribute", 9, jl_Object, [otft_Renderable], 0, 3, 0, ["$render", function() { otfca_ComputedAttribute_render(this); }, "$destroy", function() { otfca_ComputedAttribute_destroy(this); }],
juf_Supplier$proxy$4_1_1, 0, jl_Object, [juf_Supplier], 0, 3, 0, ["$get1", function() { return juf_Supplier$proxy$4_1_1_get(this); }],
juf_Consumer$proxy$4_1_1, 0, jl_Object, [juf_Consumer], 0, 3, 0, ["$accept", function(var_1) { juf_Consumer$proxy$4_1_1_accept(this, var_1); }],
juf_Supplier$proxy$4_1_2, 0, jl_Object, [juf_Supplier], 0, 3, 0, ["$get1", function() { return juf_Supplier$proxy$4_1_2_get(this); }],
juf_Consumer$proxy$4_1_2, 0, jl_Object, [juf_Consumer], 0, 3, 0, ["$accept", function(var_1) { juf_Consumer$proxy$4_1_2_accept(this, var_1); }],
juf_Supplier$proxy$4_1_3, 0, jl_Object, [juf_Supplier], 0, 3, 0, ["$get1", function() { return juf_Supplier$proxy$4_1_3_get(this); }],
otft_DomComponentHandler$proxy$4_1_3, 0, jl_Object, [otft_DomComponentHandler], 0, 3, 0, ["$update", function() { otft_DomComponentHandler$proxy$4_1_3_update(this); }, "$buildDom", function(var_1) { otft_DomComponentHandler$proxy$4_1_3_buildDom(this, var_1); }],
ju_Spliterator, 0, jl_Object, [], 3, 3, 0, 0,
jusi_SpliteratorOverCollection, 0, jl_Object, [ju_Spliterator], 0, 3, 0, 0,
otfjs_JsonSerializer, 0, jl_Object, [], 3, 3, 0, 0,
otfjs_JsonSerializer$proxy$4_0_0, 0, jl_Object, [otfjs_JsonSerializer], 0, 3, 0, 0,
otfjs_NullableSerializer, 0, jl_Object, [otfjs_JsonSerializer], 1, 3, 0, ["$serialize", function(var_1, var_2) { return otfjs_NullableSerializer_serialize(this, var_1, var_2); }],
otfjs_ListSerializer, 0, otfjs_NullableSerializer, [], 0, 3, 0, ["$serializeNonNull", function(var_1, var_2) { return otfjs_ListSerializer_serializeNonNull(this, var_1, var_2); }],
ju_IdentityHashMap$HashEntry, 0, ju_MapEntry, [], 0, 0, 0, 0,
jusi_SimpleStreamImpl$collect$lambda$_24_0, 0, jl_Object, [juf_Predicate], 0, 3, 0, 0,
otft_Modifier$proxy$4_2_0, 0, jl_Object, [otft_Modifier], 0, 3, 0, ["$apply", function(var_1) { return otft_Modifier$proxy$4_2_0_apply(this, var_1); }],
otft_Modifier$proxy$4_2_1, 0, jl_Object, [otft_Modifier], 0, 3, 0, ["$apply", function(var_1) { return otft_Modifier$proxy$4_2_1_apply(this, var_1); }],
otft_Modifier$proxy$4_2_2, 0, jl_Object, [otft_Modifier], 0, 3, 0, ["$apply", function(var_1) { return otft_Modifier$proxy$4_2_2_apply(this, var_1); }],
otft_Modifier$proxy$4_2_3, 0, jl_Object, [otft_Modifier], 0, 3, 0, ["$apply", function(var_1) { return otft_Modifier$proxy$4_2_3_apply(this, var_1); }],
juf_Supplier$proxy$4_2_2, 0, jl_Object, [juf_Supplier], 0, 3, 0, ["$get1", function() { return juf_Supplier$proxy$4_2_2_get(this); }],
otft_Modifier$proxy$4_2_4, 0, jl_Object, [otft_Modifier], 0, 3, 0, ["$apply", function(var_1) { return otft_Modifier$proxy$4_2_4_apply(this, var_1); }],
otft_Modifier$proxy$4_2_5, 0, jl_Object, [otft_Modifier], 0, 3, 0, ["$apply", function(var_1) { return otft_Modifier$proxy$4_2_5_apply(this, var_1); }],
otft_Modifier$proxy$4_2_6, 0, jl_Object, [otft_Modifier], 0, 3, 0, ["$apply", function(var_1) { return otft_Modifier$proxy$4_2_6_apply(this, var_1); }]]);
$rt_metadata([otft_Modifier$proxy$4_2_7, 0, jl_Object, [otft_Modifier], 0, 3, 0, ["$apply", function(var_1) { return otft_Modifier$proxy$4_2_7_apply(this, var_1); }],
otft_Modifier$proxy$4_2_8, 0, jl_Object, [otft_Modifier], 0, 3, 0, ["$apply", function(var_1) { return otft_Modifier$proxy$4_2_8_apply(this, var_1); }],
otft_DomComponentHandler$proxy$4_1_1, 0, jl_Object, [otft_DomComponentHandler], 0, 3, 0, ["$update", function() { otft_DomComponentHandler$proxy$4_1_1_update(this); }, "$buildDom", function(var_1) { otft_DomComponentHandler$proxy$4_1_1_buildDom(this, var_1); }],
otft_DomComponentHandler$proxy$4_1_2, 0, jl_Object, [otft_DomComponentHandler], 0, 3, 0, ["$update", function() { otft_DomComponentHandler$proxy$4_1_2_update(this); }, "$buildDom", function(var_1) { otft_DomComponentHandler$proxy$4_1_2_buildDom(this, var_1); }],
otft_Modifier$proxy$4_1_6, 0, jl_Object, [otft_Modifier], 0, 3, 0, ["$apply", function(var_1) { return otft_Modifier$proxy$4_1_6_apply(this, var_1); }],
juf_Supplier$proxy$4_2_0, 0, jl_Object, [juf_Supplier], 0, 3, 0, ["$get1", function() { return juf_Supplier$proxy$4_2_0_get(this); }],
juf_Supplier$proxy$4_2_1, 0, jl_Object, [juf_Supplier], 0, 3, 0, ["$get1", function() { return juf_Supplier$proxy$4_2_1_get(this); }],
otft_ValueChangeListener$proxy$4_2_0, 0, jl_Object, [otft_ValueChangeListener], 0, 3, 0, ["$changed", function(var_1) { otft_ValueChangeListener$proxy$4_2_0_changed(this, var_1); }],
juf_Consumer$proxy$4_2_0, 0, jl_Object, [juf_Consumer], 0, 3, 0, ["$accept", function(var_1) { juf_Consumer$proxy$4_2_0_accept(this, var_1); }],
juf_Consumer$proxy$4_2_1, 0, jl_Object, [juf_Consumer], 0, 3, 0, ["$accept", function(var_1) { juf_Consumer$proxy$4_2_1_accept(this, var_1); }],
juf_Consumer$proxy$4_2_2, 0, jl_Object, [juf_Consumer], 0, 3, 0, ["$accept", function(var_1) { juf_Consumer$proxy$4_2_2_accept(this, var_1); }],
juf_Supplier$proxy$4_2_3, 0, jl_Object, [juf_Supplier], 0, 3, 0, ["$get1", function() { return juf_Supplier$proxy$4_2_3_get(this); }],
otft_ValueChangeListener$proxy$4_2_1, "ValueChangeListener$proxy$4_2_1", 12, jl_Object, [otft_ValueChangeListener], 0, 3, 0, ["$changed", function(var_1) { otft_ValueChangeListener$proxy$4_2_1_changed(this, var_1); }],
juf_Consumer$proxy$4_2_3, 0, jl_Object, [juf_Consumer], 0, 3, 0, ["$accept", function(var_1) { juf_Consumer$proxy$4_2_3_accept(this, var_1); }],
juf_Consumer$proxy$4_1_3, 0, jl_Object, [juf_Consumer], 0, 3, 0, ["$accept", function(var_1) { juf_Consumer$proxy$4_1_3_accept(this, var_1); }],
jusi_FilteringStreamImpl$wrap$lambda$_1_0, 0, jl_Object, [juf_Predicate], 0, 3, 0, 0,
jusi_StreamOverSpliterator$AdapterAction, 0, jl_Object, [juf_Consumer], 0, 0, 0, 0,
otfj_JSON$PROXY$4_1, 0, jl_Object, [], 0, 3, 0, 0,
otfj_JSON$PROXY$4_8, 0, jl_Object, [], 0, 3, 0, 0,
otfj_JSON$PROXY$4_14, 0, jl_Object, [], 0, 3, 0, 0,
otfj_JSON$PROXY$4_16, 0, jl_Object, [], 0, 3, 0, 0,
otfj_JSON$PROXY$4_22, 0, jl_Object, [], 0, 3, 0, 0,
otfjs_BooleanSerializer, 0, otfjs_NullableSerializer, [], 0, 3, 0, ["$serializeNonNull", function(var_1, var_2) { return otfjs_BooleanSerializer_serializeNonNull(this, var_1, var_2); }],
otfjs_ObjectSerializer, 0, jl_Object, [otfjs_JsonSerializer], 0, 3, 0, 0,
otfjs_ArraySerializer, 0, otfjs_NullableSerializer, [], 0, 3, 0, ["$serializeNonNull", function(var_1, var_2) { return otfjs_ArraySerializer_serializeNonNull(this, var_1, var_2); }],
otfjs_DoubleSerializer, 0, otfjs_NullableSerializer, [], 0, 3, 0, ["$serializeNonNull", function(var_1, var_2) { return otfjs_DoubleSerializer_serializeNonNull(this, var_1, var_2); }],
otfjs_JsonSerializer$proxy$4_16_0, 0, jl_Object, [otfjs_JsonSerializer], 0, 3, 0, ["$serialize", function(var_1, var_2) { return otfjs_JsonSerializer$proxy$4_16_0_serialize(this, var_1, var_2); }],
otfjs_StringSerializer, 0, otfjs_NullableSerializer, [], 0, 3, 0, ["$serializeNonNull", function(var_1, var_2) { return otfjs_StringSerializer_serializeNonNull(this, var_1, var_2); }],
ecd_Model$clearCompleted$lambda$_10_0, 0, jl_Object, [juf_Predicate], 0, 3, 0, ["$test", function(var_1) { return ecd_Model$clearCompleted$lambda$_10_0_test(this, var_1); }],
otfjt_ObjectNode, 0, otfjt_Node, [], 1, 3, 0, 0,
jl_System, 0, jl_Object, [], 4, 3, 0, 0,
jl_AbstractStringBuilder$Constants, 0, jl_Object, [], 0, 0, 0, 0,
otcit_DoubleAnalyzer, 0, jl_Object, [], 4, 3, 0, 0,
otcit_DoubleAnalyzer$Result, 0, jl_Object, [], 0, 3, 0, 0,
otcit_FloatAnalyzer$Result, 0, jl_Object, [], 0, 3, 0, 0,
jl_Long, 0, jl_Number, [jl_Comparable], 0, 3, 0, 0]);
function $rt_array(cls, data) {
    this.$monitor = null;
    this.$id$ = 0;
    this.type = cls;
    this.data = data;
    this.constructor = $rt_arraycls(cls);
}
$rt_array.prototype = Object.create(($rt_objcls()).prototype);
$rt_array.prototype.toString = function() {
    var str = "[";
    for (var i = 0;i < this.data.length;++i) {
        if (i > 0) {
            str += ", ";
        }
        str += this.data[i].toString();
    }
    str += "]";
    return str;
};
$rt_setCloneMethod($rt_array.prototype, function() {
    var dataCopy;
    if ('slice' in this.data) {
        dataCopy = this.data.slice();
    } else {
        dataCopy = new this.data.constructor(this.data.length);
        for (var i = 0;i < dataCopy.length;++i) {
            dataCopy[i] = this.data[i];
        }
    }
    return new $rt_array(this.type, dataCopy);
});
$rt_stringPool(["@", "0", "todos", "", "application-content", "null", "[", ", ", "]", "ALL", "ACTIVE", "COMPLETED", "edu.carleton.dev.Model$Todo", "[Ljava.lang.Object;", "java.util.ArrayList", "java.lang.Double", "java.lang.String", "java.lang.Boolean", "Can\'t serialize object of type ", "java.lang.Object", "Don\'t know how to deserialize ", "Can\'t deserialize non-array node as a list", "Don\'t know how to deserialize given JSON as a java.lang.Object: ", "edu.carleton.dev.FooterComponent", "edu.carleton.dev.TodoItemComponent",
"edu.carleton.dev.App", "The given space is already hosted by a slot", "Successor does not belong to this slot", "false", "true", "Can\'t deserialize non-boolean not as a boolean primitive", "\n", "section", "class", "todoapp", "\n  ", "header", "\n    ", "h1", "form", "todo-form", "\n      ", "input", "new-todo", "placeholder", "What needs to be done?", "Can\'t set attribute to root node", "Can\'t apply modifier to root node", "submit", "main", "id", "toggle-all", "type", "checkbox", "label", "for", "Mark all as complete",
"ul", "todo-list", "\n        ", "\n          ", "footer", "span", "todo-count", "strong", "filters", "li", "a", "\n          All\n        ", "\n          Active\n        ", "\n          Completed\n        ", "CONCURRENT", "UNORDERED", "IDENTITY_FINISH", "click", "Object has already been serialized: ", "div", "view", "toggle", "button", "destroy", "edit", "selected", "clear-completed", "\n        Clear completed\n      ", "dblclick", "blur", "item left", "items left", " editing", "completed"]);
jl_String.prototype.toString = function() {
    return $rt_ustr(this);
};
jl_String.prototype.valueOf = jl_String.prototype.toString;
jl_Object.prototype.toString = function() {
    return $rt_ustr(jl_Object_toString(this));
};
jl_Object.prototype.__teavm_class__ = function() {
    return $dbg_class(this);
};
function Long_eq(a, b) {
    return a.hi === b.hi && a.lo === b.lo;
}
function Long_ne(a, b) {
    return a.hi !== b.hi || a.lo !== b.lo;
}
function Long_gt(a, b) {
    if (a.hi < b.hi) {
        return false;
    }
    if (a.hi > b.hi) {
        return true;
    }
    var x = a.lo >>> 1;
    var y = b.lo >>> 1;
    if (x !== y) {
        return x > y;
    }
    return (a.lo & 1) > (b.lo & 1);
}
function Long_ge(a, b) {
    if (a.hi < b.hi) {
        return false;
    }
    if (a.hi > b.hi) {
        return true;
    }
    var x = a.lo >>> 1;
    var y = b.lo >>> 1;
    if (x !== y) {
        return x >= y;
    }
    return (a.lo & 1) >= (b.lo & 1);
}
function Long_lt(a, b) {
    if (a.hi > b.hi) {
        return false;
    }
    if (a.hi < b.hi) {
        return true;
    }
    var x = a.lo >>> 1;
    var y = b.lo >>> 1;
    if (x !== y) {
        return x < y;
    }
    return (a.lo & 1) < (b.lo & 1);
}
function Long_le(a, b) {
    if (a.hi > b.hi) {
        return false;
    }
    if (a.hi < b.hi) {
        return true;
    }
    var x = a.lo >>> 1;
    var y = b.lo >>> 1;
    if (x !== y) {
        return x <= y;
    }
    return (a.lo & 1) <= (b.lo & 1);
}
function Long_add(a, b) {
    if (a.hi === a.lo >> 31 && b.hi === b.lo >> 31) {
        return Long_fromNumber(a.lo + b.lo);
    } else if (Math.abs(a.hi) < Long_MAX_NORMAL && Math.abs(b.hi) < Long_MAX_NORMAL) {
        return Long_fromNumber(Long_toNumber(a) + Long_toNumber(b));
    }
    var a_lolo = a.lo & 0xFFFF;
    var a_lohi = a.lo >>> 16;
    var a_hilo = a.hi & 0xFFFF;
    var a_hihi = a.hi >>> 16;
    var b_lolo = b.lo & 0xFFFF;
    var b_lohi = b.lo >>> 16;
    var b_hilo = b.hi & 0xFFFF;
    var b_hihi = b.hi >>> 16;
    var lolo = a_lolo + b_lolo | 0;
    var lohi = a_lohi + b_lohi + (lolo >> 16) | 0;
    var hilo = a_hilo + b_hilo + (lohi >> 16) | 0;
    var hihi = a_hihi + b_hihi + (hilo >> 16) | 0;
    return new Long(lolo & 0xFFFF | (lohi & 0xFFFF) << 16, hilo & 0xFFFF | (hihi & 0xFFFF) << 16);
}
function Long_inc(a) {
    var lo = a.lo + 1 | 0;
    var hi = a.hi;
    if (lo === 0) {
        hi = hi + 1 | 0;
    }
    return new Long(lo, hi);
}
function Long_dec(a) {
    var lo = a.lo - 1 | 0;
    var hi = a.hi;
    if (lo ===  -1) {
        hi = hi - 1 | 0;
    }
    return new Long(lo, hi);
}
function Long_neg(a) {
    return Long_inc(new Long(a.lo ^ 0xFFFFFFFF, a.hi ^ 0xFFFFFFFF));
}
function Long_sub(a, b) {
    if (a.hi === a.lo >> 31 && b.hi === b.lo >> 31) {
        return Long_fromNumber(a.lo - b.lo);
    }
    var a_lolo = a.lo & 0xFFFF;
    var a_lohi = a.lo >>> 16;
    var a_hilo = a.hi & 0xFFFF;
    var a_hihi = a.hi >>> 16;
    var b_lolo = b.lo & 0xFFFF;
    var b_lohi = b.lo >>> 16;
    var b_hilo = b.hi & 0xFFFF;
    var b_hihi = b.hi >>> 16;
    var lolo = a_lolo - b_lolo | 0;
    var lohi = a_lohi - b_lohi + (lolo >> 16) | 0;
    var hilo = a_hilo - b_hilo + (lohi >> 16) | 0;
    var hihi = a_hihi - b_hihi + (hilo >> 16) | 0;
    return new Long(lolo & 0xFFFF | (lohi & 0xFFFF) << 16, hilo & 0xFFFF | (hihi & 0xFFFF) << 16);
}
function Long_compare(a, b) {
    var r = a.hi - b.hi;
    if (r !== 0) {
        return r;
    }
    r = (a.lo >>> 1) - (b.lo >>> 1);
    if (r !== 0) {
        return r;
    }
    return (a.lo & 1) - (b.lo & 1);
}
function Long_isPositive(a) {
    return (a.hi & 0x80000000) === 0;
}
function Long_isNegative(a) {
    return (a.hi & 0x80000000) !== 0;
}
function Long_mul(a, b) {
    var positive = Long_isNegative(a) === Long_isNegative(b);
    if (Long_isNegative(a)) {
        a = Long_neg(a);
    }
    if (Long_isNegative(b)) {
        b = Long_neg(b);
    }
    var a_lolo = a.lo & 0xFFFF;
    var a_lohi = a.lo >>> 16;
    var a_hilo = a.hi & 0xFFFF;
    var a_hihi = a.hi >>> 16;
    var b_lolo = b.lo & 0xFFFF;
    var b_lohi = b.lo >>> 16;
    var b_hilo = b.hi & 0xFFFF;
    var b_hihi = b.hi >>> 16;
    var lolo = 0;
    var lohi = 0;
    var hilo = 0;
    var hihi = 0;
    lolo = a_lolo * b_lolo | 0;
    lohi = lolo >>> 16;
    lohi = (lohi & 0xFFFF) + a_lohi * b_lolo | 0;
    hilo = hilo + (lohi >>> 16) | 0;
    lohi = (lohi & 0xFFFF) + a_lolo * b_lohi | 0;
    hilo = hilo + (lohi >>> 16) | 0;
    hihi = hilo >>> 16;
    hilo = (hilo & 0xFFFF) + a_hilo * b_lolo | 0;
    hihi = hihi + (hilo >>> 16) | 0;
    hilo = (hilo & 0xFFFF) + a_lohi * b_lohi | 0;
    hihi = hihi + (hilo >>> 16) | 0;
    hilo = (hilo & 0xFFFF) + a_lolo * b_hilo | 0;
    hihi = hihi + (hilo >>> 16) | 0;
    hihi = hihi + a_hihi * b_lolo + a_hilo * b_lohi + a_lohi * b_hilo + a_lolo * b_hihi | 0;
    var result = new Long(lolo & 0xFFFF | lohi << 16, hilo & 0xFFFF | hihi << 16);
    return positive ? result : Long_neg(result);
}
function Long_div(a, b) {
    if (Math.abs(a.hi) < Long_MAX_NORMAL && Math.abs(b.hi) < Long_MAX_NORMAL) {
        return Long_fromNumber(Long_toNumber(a) / Long_toNumber(b));
    }
    return (Long_divRem(a, b))[0];
}
function Long_udiv(a, b) {
    if (a.hi >= 0 && a.hi < Long_MAX_NORMAL && b.hi >= 0 && b.hi < Long_MAX_NORMAL) {
        return Long_fromNumber(Long_toNumber(a) / Long_toNumber(b));
    }
    return (Long_udivRem(a, b))[0];
}
function Long_rem(a, b) {
    if (Math.abs(a.hi) < Long_MAX_NORMAL && Math.abs(b.hi) < Long_MAX_NORMAL) {
        return Long_fromNumber(Long_toNumber(a) % Long_toNumber(b));
    }
    return (Long_divRem(a, b))[1];
}
function Long_urem(a, b) {
    if (a.hi >= 0 && a.hi < Long_MAX_NORMAL && b.hi >= 0 && b.hi < Long_MAX_NORMAL) {
        return Long_fromNumber(Long_toNumber(a) / Long_toNumber(b));
    }
    return (Long_udivRem(a, b))[1];
}
function Long_divRem(a, b) {
    if (b.lo === 0 && b.hi === 0) {
        throw new Error("Division by zero");
    }
    var positive = Long_isNegative(a) === Long_isNegative(b);
    if (Long_isNegative(a)) {
        a = Long_neg(a);
    }
    if (Long_isNegative(b)) {
        b = Long_neg(b);
    }
    a = new LongInt(a.lo, a.hi, 0);
    b = new LongInt(b.lo, b.hi, 0);
    var q = LongInt_div(a, b);
    a = new Long(a.lo, a.hi);
    q = new Long(q.lo, q.hi);
    return positive ? [q, a] : [Long_neg(q), Long_neg(a)];
}
function Long_udivRem(a, b) {
    if (b.lo === 0 && b.hi === 0) {
        throw new Error("Division by zero");
    }
    a = new LongInt(a.lo, a.hi, 0);
    b = new LongInt(b.lo, b.hi, 0);
    var q = LongInt_div(a, b);
    a = new Long(a.lo, a.hi);
    q = new Long(q.lo, q.hi);
    return [q, a];
}
function Long_shiftLeft16(a) {
    return new Long(a.lo << 16, a.lo >>> 16 | a.hi << 16);
}
function Long_shiftRight16(a) {
    return new Long(a.lo >>> 16 | a.hi << 16, a.hi >>> 16);
}
function Long_and(a, b) {
    return new Long(a.lo & b.lo, a.hi & b.hi);
}
function Long_or(a, b) {
    return new Long(a.lo | b.lo, a.hi | b.hi);
}
function Long_xor(a, b) {
    return new Long(a.lo ^ b.lo, a.hi ^ b.hi);
}
function Long_shl(a, b) {
    b &= 63;
    if (b === 0) {
        return a;
    } else if (b < 32) {
        return new Long(a.lo << b, a.lo >>> 32 - b | a.hi << b);
    } else if (b === 32) {
        return new Long(0, a.lo);
    } else {
        return new Long(0, a.lo << b - 32);
    }
}
function Long_shr(a, b) {
    b &= 63;
    if (b === 0) {
        return a;
    } else if (b < 32) {
        return new Long(a.lo >>> b | a.hi << 32 - b, a.hi >> b);
    } else if (b === 32) {
        return new Long(a.hi, a.hi >> 31);
    } else {
        return new Long(a.hi >> b - 32, a.hi >> 31);
    }
}
function Long_shru(a, b) {
    b &= 63;
    if (b === 0) {
        return a;
    } else if (b < 32) {
        return new Long(a.lo >>> b | a.hi << 32 - b, a.hi >>> b);
    } else if (b === 32) {
        return new Long(a.hi, 0);
    } else {
        return new Long(a.hi >>> b - 32, 0);
    }
}
function LongInt(lo, hi, sup) {
    this.lo = lo;
    this.hi = hi;
    this.sup = sup;
}
function LongInt_mul(a, b) {
    var a_lolo = (a.lo & 0xFFFF) * b | 0;
    var a_lohi = (a.lo >>> 16) * b | 0;
    var a_hilo = (a.hi & 0xFFFF) * b | 0;
    var a_hihi = (a.hi >>> 16) * b | 0;
    var sup = a.sup * b | 0;
    a_lohi = a_lohi + (a_lolo >>> 16) | 0;
    a_hilo = a_hilo + (a_lohi >>> 16) | 0;
    a_hihi = a_hihi + (a_hilo >>> 16) | 0;
    sup = sup + (a_hihi >>> 16) | 0;
    a.lo = a_lolo & 0xFFFF | a_lohi << 16;
    a.hi = a_hilo & 0xFFFF | a_hihi << 16;
    a.sup = sup & 0xFFFF;
}
function LongInt_sub(a, b) {
    var a_lolo = a.lo & 0xFFFF;
    var a_lohi = a.lo >>> 16;
    var a_hilo = a.hi & 0xFFFF;
    var a_hihi = a.hi >>> 16;
    var b_lolo = b.lo & 0xFFFF;
    var b_lohi = b.lo >>> 16;
    var b_hilo = b.hi & 0xFFFF;
    var b_hihi = b.hi >>> 16;
    a_lolo = a_lolo - b_lolo | 0;
    a_lohi = a_lohi - b_lohi + (a_lolo >> 16) | 0;
    a_hilo = a_hilo - b_hilo + (a_lohi >> 16) | 0;
    a_hihi = a_hihi - b_hihi + (a_hilo >> 16) | 0;
    var sup = a.sup - b.sup + (a_hihi >> 16) | 0;
    a.lo = a_lolo & 0xFFFF | a_lohi << 16;
    a.hi = a_hilo & 0xFFFF | a_hihi << 16;
    a.sup = sup;
}
function LongInt_add(a, b) {
    var a_lolo = a.lo & 0xFFFF;
    var a_lohi = a.lo >>> 16;
    var a_hilo = a.hi & 0xFFFF;
    var a_hihi = a.hi >>> 16;
    var b_lolo = b.lo & 0xFFFF;
    var b_lohi = b.lo >>> 16;
    var b_hilo = b.hi & 0xFFFF;
    var b_hihi = b.hi >>> 16;
    a_lolo = a_lolo + b_lolo | 0;
    a_lohi = a_lohi + b_lohi + (a_lolo >> 16) | 0;
    a_hilo = a_hilo + b_hilo + (a_lohi >> 16) | 0;
    a_hihi = a_hihi + b_hihi + (a_hilo >> 16) | 0;
    var sup = a.sup + b.sup + (a_hihi >> 16) | 0;
    a.lo = a_lolo & 0xFFFF | a_lohi << 16;
    a.hi = a_hilo & 0xFFFF | a_hihi << 16;
    a.sup = sup;
}
function LongInt_inc(a) {
    a.lo = a.lo + 1 | 0;
    if (a.lo === 0) {
        a.hi = a.hi + 1 | 0;
        if (a.hi === 0) {
            a.sup = a.sup + 1 & 0xFFFF;
        }
    }
}
function LongInt_dec(a) {
    a.lo = a.lo - 1 | 0;
    if (a.lo ===  -1) {
        a.hi = a.hi - 1 | 0;
        if (a.hi ===  -1) {
            a.sup = a.sup - 1 & 0xFFFF;
        }
    }
}
function LongInt_ucompare(a, b) {
    var r = a.sup - b.sup;
    if (r !== 0) {
        return r;
    }
    r = (a.hi >>> 1) - (b.hi >>> 1);
    if (r !== 0) {
        return r;
    }
    r = (a.hi & 1) - (b.hi & 1);
    if (r !== 0) {
        return r;
    }
    r = (a.lo >>> 1) - (b.lo >>> 1);
    if (r !== 0) {
        return r;
    }
    return (a.lo & 1) - (b.lo & 1);
}
function LongInt_numOfLeadingZeroBits(a) {
    var n = 0;
    var d = 16;
    while (d > 0) {
        if (a >>> d !== 0) {
            a >>>= d;
            n = n + d | 0;
        }
        d = d / 2 | 0;
    }
    return 31 - n;
}
function LongInt_shl(a, b) {
    if (b === 0) {
        return;
    }
    if (b < 32) {
        a.sup = (a.hi >>> 32 - b | a.sup << b) & 0xFFFF;
        a.hi = a.lo >>> 32 - b | a.hi << b;
        a.lo <<= b;
    } else if (b === 32) {
        a.sup = a.hi & 0xFFFF;
        a.hi = a.lo;
        a.lo = 0;
    } else if (b < 64) {
        a.sup = (a.lo >>> 64 - b | a.hi << b - 32) & 0xFFFF;
        a.hi = a.lo << b;
        a.lo = 0;
    } else if (b === 64) {
        a.sup = a.lo & 0xFFFF;
        a.hi = 0;
        a.lo = 0;
    } else {
        a.sup = a.lo << b - 64 & 0xFFFF;
        a.hi = 0;
        a.lo = 0;
    }
}
function LongInt_shr(a, b) {
    if (b === 0) {
        return;
    }
    if (b === 32) {
        a.lo = a.hi;
        a.hi = a.sup;
        a.sup = 0;
    } else if (b < 32) {
        a.lo = a.lo >>> b | a.hi << 32 - b;
        a.hi = a.hi >>> b | a.sup << 32 - b;
        a.sup >>>= b;
    } else if (b === 64) {
        a.lo = a.sup;
        a.hi = 0;
        a.sup = 0;
    } else if (b < 64) {
        a.lo = a.hi >>> b - 32 | a.sup << 64 - b;
        a.hi = a.sup >>> b - 32;
        a.sup = 0;
    } else {
        a.lo = a.sup >>> b - 64;
        a.hi = 0;
        a.sup = 0;
    }
}
function LongInt_copy(a) {
    return new LongInt(a.lo, a.hi, a.sup);
}
function LongInt_div(a, b) {
    var bits = b.hi !== 0 ? LongInt_numOfLeadingZeroBits(b.hi) : LongInt_numOfLeadingZeroBits(b.lo) + 32;
    var sz = 1 + (bits / 16 | 0);
    var dividentBits = bits % 16;
    LongInt_shl(b, bits);
    LongInt_shl(a, dividentBits);
    var q = new LongInt(0, 0, 0);
    while (sz-- > 0) {
        LongInt_shl(q, 16);
        var digitA = (a.hi >>> 16) + 0x10000 * a.sup;
        var digitB = b.hi >>> 16;
        var digit = digitA / digitB | 0;
        var t = LongInt_copy(b);
        LongInt_mul(t, digit);
        if (LongInt_ucompare(t, a) >= 0) {
            while (LongInt_ucompare(t, a) > 0) {
                LongInt_sub(t, b);
                 --digit;
            }
        } else {
            while (true) {
                var nextT = LongInt_copy(t);
                LongInt_add(nextT, b);
                if (LongInt_ucompare(nextT, a) > 0) {
                    break;
                }
                t = nextT;
                ++digit;
            }
        }
        LongInt_sub(a, t);
        q.lo |= digit;
        LongInt_shl(a, 16);
    }
    LongInt_shr(a, bits + 16);
    return q;
}
function $rt_startThread(runner, callback) {
    var result;
    try {
        result = runner();
    } catch (e){
        result = e;
    }
    if (typeof callback !== 'undefined') {
        callback(result);
    } else if (result instanceof Error) {
        throw result;
    }
}
function $rt_suspending() {
    return false;
}
function $rt_resuming() {
    return false;
}
function $rt_nativeThread() {
    return null;
}
function $rt_invalidPointer() {
}
main = $rt_mainStarter(ecd_App_main);
(function() {
    var c;
    c = otjb_Window.prototype;
    c.dispatchEvent = c.$dispatchEvent$exported$4;
    c.addEventListener = c.$addEventListener$exported$0;
    c.removeEventListener = c.$removeEventListener$exported$1;
    c.getLength = c.$getLength$exported$5;
    c.get = c.$get$exported$2;
    c.addEventListener = c.$addEventListener$exported$6;
    c.removeEventListener = c.$removeEventListener$exported$3;
    c = otjc_JSArray.prototype;
    c.getLength = c.$getLength$exported$1;
    c.get = c.$get$exported$0;
    c = otfce_BaseEventBinder$_init_$lambda$_0_0.prototype;
    c.handleEvent = c.$handleEvent$exported$0;
    c = otfce_BaseEventBinder$setHandler$lambda$_2_0.prototype;
    c.handleEvent = c.$handleEvent$exported$0;
    c = otfch_CheckedChangeBinder$1.prototype;
    c.handleEvent = c.$handleEvent$exported$0;
    c = otft_DomBuilder$Item$createChangeListener$lambda$_6_0.prototype;
    c.handleEvent = c.$handleEvent$exported$0;
})();
})();

//# sourceMappingURL=classes.js.map