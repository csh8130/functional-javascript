function addMaker(a) {
  return function(b) {
    return a + b;
  };
}

/*
    함수형 프로그래밍과 객체지향 프로그래밍의 차이는
    객체를 확장하느냐 객체를 다루는 함수를 늘리느냐의 차이이며 추상화의 단위가 클래스이냐 함수이냐의 차이다.
*/

// predicate : 매개값을 조사해서 true 또는 false를 리턴하는 역할 출처: https://palpit.tistory.com/673
var _filter = _curryr(function(list, predicate) {
  var new_list = [];
  _each(list, function(val) {
    if (predicate(val)) new_list.push(val);
  });
  return new_list;
});

function _map(list, mapper) {
  var new_list = [];
  _each(list, function(val) {
    new_list.push(mapper(val));
  });
  return new_list;
}

var _map = _curryr(_map);

var _get = _curryr(function(obj, key) {
  return obj == null ? undefined : obj[key];
});

var _length = _get("length");

function _each(list, iter) {
  var keys = _keys(list);
  for (var i = 0, len = keys.length; i < len; i++) {
    iter(list[keys[i]]);
  }
  return list;
}

//Haskell Curry 이름에서 유래 출처: https://itholic.github.io/haskell-function1-currying/
function _curry(fn) {
  return function(a, b) {
    return arguments.length == 2
      ? fn(a, b)
      : function(b) {
          return fn(a, b);
        };
  };
}

function _curryr(fn) {
  return function(a, b) {
    return arguments.length == 2
      ? fn(a, b)
      : function(b) {
          return fn(b, a);
        };
  };
}

var slice = Array.prototype.slice;
function _rest(list, num) {
  return slice.call(list, num || 1);
}

function _reduce(list, iter, memo) {
  if (arguments.length == 2) {
    memo = list[0];
    list = _rest(list);
  }
  _each(list, function(val) {
    memo = iter(memo, val);
  });
  return memo;
}

function _pipe() {
  var fns = arguments;
  return function(arg) {
    return _reduce(
      fns,
      function(arg, fn) {
        return fn(arg);
      },
      arg
    );
  };
}

//fns 배열일때 작동 제대로 안함 .apply 필요
function _go_error(arg) {
  //console.log(arguments);
  var fns = _rest(arguments);
  //console.log(fns);
  return _pipe(fns)(arg);
  //return _pipe(fns[0])(arg);
}

function _go(arg) {
  var fns = _rest(arguments);
  return _pipe.apply(null, fns)(arg);
}

function _is_object(obj) {
  return typeof obj == "object" && !!obj;
}

function _keys(obj) {
  return _is_object(obj) ? Object.keys(obj) : [];
}
