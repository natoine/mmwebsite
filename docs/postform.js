var url = "/medimoovform"
document.getElementById("btn-submit-mmform").onclick = function() {
    let name = document.getElementById("inputname").value ;
    let email = document.getElementById("inputemail").value ;
    let msg = document.getElementById("inputmessage").value ;
    console.log(`name: ${name} email: ${email} msg:${msg}`);
    let main = document.getElementById("form-message");
    if(name && email && msg)
    {
      fetch(url, {    method:'POST', 
                      body: JSON.stringify({
                          email: email,
                          name: name,
                          msg: msg
                      }),
                      headers:{'Content-Type': 'application/json'}, 
                      mode:"cors", 
                      cache:'default'}).then(
        function(response){
            response.text().then(function(data){
                let responsebody = document.createElement("div");
                responsebody.appendChild(document.createTextNode(data));
                main.innerHTML = "";
                main.appendChild(responsebody);
            })
        }
      )  
    }
    else 
    {
      main.innerHTML = "";
      let formverification = document.createElement("div");
      if(!name) 
      {
        formverification.appendChild(document.createTextNode("please specify name. "));
      }
      if(!msg)
      {
        formverification.appendChild(document.createTextNode("please specify message. "));
      }
      if(!email)
      {
        formverification.appendChild(document.createTextNode("please specify email. "));
      }
      else
      {
        const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!re.test(String(email).toLowerCase())) formverification.appendChild(document.createTextNode("not valid email. "));
      }
      main.appendChild(formverification);
    }
   }