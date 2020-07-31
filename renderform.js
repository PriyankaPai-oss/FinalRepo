$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

$(function() {
    $('form').submit(function() {
        //const data = $('#result').text(JSON.stringify($('form').serializeObject()));
        // call to back end
        const data = JSON.stringify($('form').serializeObject());
        $.post('/tutorsubmit', data, function() {
            console.log('Server got tutor data');
        });
        //alert(JSON.stringify($('form').serializeObject()));
        // if success redirect them to the thankyou page
        $(location).attr('href', './tutorthankyou.html')
        return false;
    });
});