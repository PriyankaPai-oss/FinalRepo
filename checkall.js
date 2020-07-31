function getSelectedCheckboxValues(name) {
    const checkboxes = document.querySelectorAll(`input[type="checkbox"]:checked`);
    let values = [];
    checkboxes.forEach((checkbox) => {
       console.log("checkdeee");
    });
    console.log(res.body.values);

    return values;
}

