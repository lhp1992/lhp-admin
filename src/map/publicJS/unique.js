export default function unique (arr){
	const res = [];
	for(let i=0; i<arr.length; i++){
		if(res.indexOf(arr[i]) == -1){
			res.push(arr[i]);
		}
	}
	return res;
}
