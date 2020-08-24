function Middleware(callback){
   this.cache = [];
   this.callback = callback
}

Middleware.prototype.use = function(fn, isBefore){
    if(typeof fn !== 'function'){
        throw 'middleware must be a function';
    }
    var index = this.cache.indexOf(fn)
    if(index == -1){
        isBefore ? this.cache.unshift(fn) : this.cache.push(fn);
    }
    return this;
}

Middleware.prototype.unUse = function(fn){
    var index = this.cache.indexOf(fn)
    if(index != -1){
        this.cache.splice(index, 1);
    }
}

Middleware.prototype.next = function(params){
    if(this.middlewares && this.middlewares.length > 0 ){
        var ware = this.middlewares.shift();
        ware.bind(this)(() => {this.next.bind(this)(params)}, params)
    } else {
        this.callback && this.callback(params)
    }
}

Middleware.prototype.go = function(params){
    this.middlewares = this.cache.concat();
    this.next(params);
}

export default Middleware
