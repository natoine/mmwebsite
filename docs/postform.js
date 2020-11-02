var domain = document.location.href;
console.log("domain", domain);

var postroute = "/medimoovform" ;

var url ;
if(domain == "http://localhost:3000/") url = postroute ;
else url = "https://mmserveur.herokuapp.com".concat(postroute)

console.log("url", url);

document.getElementById("btn-submit-mmform").onclick = function() {
    let name = document.getElementById("inputname").value ;
    let email = document.getElementById("inputemail").value ;
    let msg = document.getElementById("inputmessage").value ;
    console.log(`name: ${name} email: ${email} msg:${msg}`);
    let main = document.getElementById("form-message");
    if(name && email && msg)
    {
      document.getElementById("btn-submit-mmform").disabled = true;
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
                document.getElementById("btn-submit-mmform").disabled = false;
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