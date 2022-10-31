document.getElementById("btn_get_premium").onclick = function () {
    let input_code = document.getElementById("premium_input");
    axios.get('http://localhost:2324/premiumCode?code='+input_code.value).then(resp => {
        if (resp.data){
            input_code.style.border = "0px"
            location.reload();
        }else {
            input_code.style.border = "2px solid #FA3107"
        }
    });
}