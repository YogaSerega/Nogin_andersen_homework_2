function makeObjectDeepCopy(obj) {
   if (obj === null) {
      return null
   }
   let copyObj = Object.assign({}, obj)

   Object.keys(copyObj).forEach(
      key =>
      (copyObj[key] = typeof obj[key] === 'object' ? makeObjectDeepCopy(obj[key]) : obj[key])
   )
   return Array.isArray(obj) && obj.length ?
      (copyObj.length = obj.length) && Array.from(copyObj) :
      Array.isArray(obj) ?
      Array.from(obj) :
      copyObj;
}

function selectFromInterval(arr, start, finish) {
   if (!Array.isArray(arr) ||
      arr.filter(el => typeof el !== 'number').length ||
      typeof start !== 'number' ||
      typeof finish !== 'number') {
      throw new Error('error message')
   } else {
      return arr.filter(el => el >= Math.min(start, finish) && el <= Math.max(start, finish))
   }
}
const myIterable = {
   from: 1,
   to: 4,
   [Symbol.iterator]() {
      this.current = this.from;
      return this;
   },
   next() {
      if (myIterable.to < myIterable.from ||
         typeof myIterable.to !== 'number' ||
         typeof myIterable.from !== 'number') {
         throw new Error('error message')
      } else if (this.current <= this.to) {
         return {
            done: false,
            value: this.current++
         };
      } else {
         return {
            done: true
         };
      }
   }
}
for (let item of myIterable) {
   console.log(item);
}