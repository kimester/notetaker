console.log("linked")
// const notes = document.querySelector()
fetch("/db/db").then(res=>res.json()).then(data=>{
    console.log(data)

})