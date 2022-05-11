function submitInfo(){
    var data={}
        data.input = $('#firstName').val();
    post('/get_form', data);
};

function post(path, data){
    var json = JSON.stringify(data);
    $.ajax({
        url: path,
        type: "POST",
        data: json,
        contentType: 'application/json',
        success: function(rt){
            console.log(rt);
            window.location.href = "dashboard.html";
        },
        error: function(xhr, status, err){
            alert("Problem connecting to server");
        }
    });
};