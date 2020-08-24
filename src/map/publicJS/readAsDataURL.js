export default function readAsDataURL(file, cb) {
    if(typeof FileReader=='undifined') {
        result.innerHTML="<p>抱歉，你的浏览器不支持 FileReader</p>";
        return false;
    }
    if(!/image\/\w+/.test(file.type)) {
        alert("请确保文件为图像文件");
        return false;
    }
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e) {
        cb(this.result)
    }
}
