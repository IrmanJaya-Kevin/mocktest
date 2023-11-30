function compareTriplets(a, b) {
    let alice=0
    let bob=0
    for(let i=0;i<a.length;i++){
        if(a[i]>b[i] && a[i]!=b[i]){
            alice=alice+1
        }
        if(a[i]<b[i] && a[i]!=b[i]){
            bob=bob+1
        }
    }
    let arr=[];
    arr[0]=alice
    arr[1]=bob
    return arr
}