class MiddlewareContinuous {
  cache = []
  use(fn, isBefore){
    if(typeof fn !== 'function'){
      throw 'middleware must be a function';
    }
    const index = this.cache.indexOf(fn)
    if(index == -1){
      isBefore ? this.cache.unshift(fn) : this.cache.push(fn);
    }
    return this;
  }
  unUse(fn){
    const index = this.cache.indexOf(fn)
    if(index != -1){
      this.cache.splice(index, 1);
    }
  }
  go(...agr){
    this.cache.forEach((ware) => {
      ware(...agr)
    })
  }
}

export default MiddlewareContinuous
