
const checkboxes = document.querySelectorAll('input[name="chc"]:checked');

let colors = [];
checkboxes.forEach((checkbox) => {
    colors.push(checkbox.value);
    console.log("yes");
});