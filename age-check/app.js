let accessPermitted = confirm("Вам есть 18?");
const blurredBackground = document.querySelector(".blur-bg");
if(!accessPermitted) {
    // document.body.style.display = "none";
    document.body.innerHTML = "Access denied";
}
if(accessPermitted) {
    blurredBackground.style.display = "none"
}
