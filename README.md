# deepChange
Institute a deep change to a Javascript object

## Specification
```javascript
deepChange(data[,fn1][,fn2])
```
## Syntax
```javascript
deepChange(data, (key) => { /* ... */ })
deepChange(data, null, (value) => { /* ... */ })
deepChange(data, (key) => { /* ... */ }, (value) => { /* ... */ })
```
### Parameters
`data`

&nbsp;A javascript literal object which may contain nested keys is the input to the function.

`fn1`

&nbsp;This first callback function that gets called for keys at all levels of nesting of the object.

&nbsp;`key`

&nbsp;&nbsp;The argument in the first callback that has keys returned from all levels.

`fn2`

&nbsp;This first callback function that gets called only if the value is a primitive data type.

&nbsp;`value`

&nbsp;&nbsp;The argument in the second callback which is only of a primitive data type.

### Return value
A new object containing the changes made to the input object by the callback functions. If there are no changes, it is the cloned version of the input object.

## Description
This module can used when working with Javascript literal objects that usually don't have properties attached to a prototype or have functions as object method. There are two callback functions. The callback functions **should** have a return value to avoid unintended changes in the resulting object. The first callback gives a handle over all the keys in the object including keys that are deeply nested within the object. The second callback gives a handle over the value only if the particular key has a value belonging to a primitive data type. It doesn't return if it is of type `Array` or `Object` which usually indicates more nesting in order to reach a primitive value.

## Examples
### Converting to camel case
```javascript
const input = {
  two_words: 'two words',
  two_word_list: [
    'word 1',
    'word 2'
  ],
  two_word_obj: {
    two_word_key1: 'value 1',
    two_word_key2: 'value 2'
  },
  two_word_list_obj: [
    {
      two_word_list_key1: 'list value 1'
    },
    {
      two_word_list_key2: 'list value 2'
    }
  ]
};
const toCamelCase = key => key.replace(/_([A-Za-z]{1})/g, (m, a) => a.toUpperCase());
const output = deepChange(input, key => toCamelCase(key));
console.log(output);
/*
{
  twoWords: 'two words',
  twoWordList: [
    'word 1',
    'word 2'
  ],
  twoWordObj: {
    twoWordKey1: 'value 1',
    twoWordKey2: 'value 2'
  },
  twoWordListObj: [
    {
      twoWordListKey1: 'list value 1'
    },
    {
      twoWordListKey2: 'list value 2'
    }
  ]
}
*/
```
### Masking sensitive values
```javascript
const input = {
  firstName: 'Nathan',
  phoneNumbers: [
    {
      type: 'HOME',
      number: 12345678
    },
    {
      type: 'MOBILE',
      number: 97654321
    }
  ]
}
const output = deepChange(input, null, () => 'xxx');
console.log(output);
/*
{
  firstName: 'xxx',
  phoneNumbers: [
    {
      type: 'xxx',
      number: xxx
    },
    {
      type: 'xxx',
      number: xxx
    }
  ]
}
*/
```
