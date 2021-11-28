# dependent-ts

The main goal of this package is to proved more type safety to utility functions and to ease the usage
of array with specific lengths.

For example you can define a function that allows only arrays that have at least 1 element:
```typescript
function average(nums: Array1<number>): number {
    return nums.reduce((sum, current) => sum + current, 0);
}

average([]); // This will show an error
average([1, 2]) // This will work as expected
```

## Live example
Check this codesandbox and hover over the variables: https://codesandbox.io/s/github/nicu-chiciuc/dependent-ts-examples?file=/index.ts

## Some youtube videos
You can check the videos in this series to see how this library can be used
* https://youtu.be/ol3f5DSON6I