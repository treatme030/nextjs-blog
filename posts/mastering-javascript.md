---
title: object의 참조📭와 복사🧬
excerpt: JavaScript에서 object의 특징과 참조, 복사에 대해 알아보기
image: mastering-js-thumb.png
isFeatured: true
date: '2021-05-31'
---

### 1. object

- property의 수가 정해져 있지 않음
- 동적으로 추가되고 삭제 가능
- property 값에 제약이 없음
  => 저장할 메모리 공간의 크기를 정해 둘 수 없음

### 1.1. 참조 타입의 값

- 변수에 객체를 할당하면, 그 변수는 객체 자체를 값으로 갖는 것이 아니라 생성된 객체가 저장된 메모리 공간의 주소, 즉 참조 값을 갖게됨
- 참조 값을 통해 실제 객체에 접근
- 여러 개의 식별자가 같은 참조 값을 가지는 경우, 하나의 객체를 공유 가능 => 어느 한쪽에서 객체를 변경하면 서로 영향을 주고받음

```js
const student = {
  name: 'Kim',
};
//student 변수에 저장되어있는 참조 값으로 실제 객체에 접근
//student 변수는 객체 {name: 'Kim'}를 참조하고(가리키고) 있음
console.log(student); //{name: 'Kim'}

const person = student;
const member = person; // student, person, member 각 변수는 동일한 참조 값을 가져,
// 객체 {name: 'Kim'}를 공유
person.gender = 'woman';
console.log(student.gender); // 'woman'
console.log(member); // {name: 'Kim', gender: 'woman'}=> ﻿어느 한쪽에서 객체를 변경하면 서로 영향을 주고받음
```

### 1.2. 변경 가능한 값( mutable value )

- 객체를 할당한 변수는 재할당 없이 property를 동적으로 추가, 변경, 삭제 가능
- 변수에 재할당을 하지 않아 변수의 참조 값은 변경되지 않음

```js
const student = {
  name: 'Kim',
  gender: 'man',
};

student.grade = 'A'; // property 추가
student.name = 'Park'; // property 변경
delete student.gender; //property 삭제
```

### 1.3. 객체의 복사

### 1.3.1 얕은 복사( shallow copy )

- 객체의 한 단계까지만 복사하는 것 => 원래 변수와 연결 끊어짐, 독립적, 참조 값이 다름
- 객체에 중첩되어 있는 부분은 참조 값을 복사 => 원래 변수와 연결되어 있음, 참조 값 동일

```js
const letter = { a: 3, b: { e: 4 } };

const shallowCopy = { ...letter }; //얕은 복사 되는 경우: spread 연산자 or Object.assign({}, letter)
console.log(shallowCopy); // {a: 3, b: {e: 4}}
shallowCopy.a = 4;
shallowCopy.b.e = 6;
console.log(letter.a); // 3 => letter과 참조 값이 다름
console.log(letter.b.e); // 6 => letter과 동일한 참조 값
```

### 1.3.2. 깊은 복사( deep copy )

- 객체에 중첩되어 있는 객체까지 모두 복사하는 것 => 원래 변수와 연결 끊어짐, 독립적, 참조 값 다름

```js
const letter = { a: 3, b: { e: 4 } };

//깊은 복사 되는 경우: JSON 메서드 사용, lodash의 cloneDeep 사용
const deepCopy = JSON.parse(JSON.stringify(letter));
deepCopy.a = 8;
deepCopy.b.e = 1;
console.log(letter.a); // 3  => letter과 참조 값이 다름
console.log(letter.b.e); // 4  => letter과 참조 값이 다름
```

<참고>모던자바스크립트
