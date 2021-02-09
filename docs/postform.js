var domain = document.location.href;

var postroute = "/medimoovform" ;

var url ;
if(domain == "http://localhost:3000/") url = postroute ;
else url = "https://mmserveur.herokuapp.com".concat(postroute)

document.getElementById("btn-submit-mmform").addEventListener('click', function(e) {
  e.preventDefault();
    let name = document.getElementById("inputname").value ;
    let email = document.getElementById("inputemail").value ;
    let msg = document.getElementById("inputmessage").value ;
    let main = document.getElementById("form-message");
    if(name && email && msg)
    {
      document.getElementById("btn-submit-mmform").disabled = true;
      if(document.getElementById("wantdemo").checked) msg = "Je veux une démo" + "\n" + msg ;
      if(document.getElementById("wantinvoice").checked) msg = "Je veux un devis" + "\n" + msg ;
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
                responsebody.classList.add("validmessage");
                responsebody.appendChild(document.createTextNode("votre message a bien été envoyé"));
                document.getElementById("msgform").innerHTML = "";
                document.getElementById("msgform").appendChild(responsebody);
                document.getElementById("inputname").value = "";
                document.getElementById("inputemail").value = "";
                document.getElementById("inputmessage").value = "";
                document.getElementById("btn-submit-mmform").disabled = false;
            })
        }
      )  
    }
    else 
    {
      document.getElementById("msgform").innerHTML = "";
      let formverification = document.createElement("div");
      formverification.classList.add("notvalidmessage");
      if(!name) 
      {
        formverification.appendChild(document.createTextNode("Dites nous qui vous êtes avec le champ Nom. "));
      }
      if(!msg)
      {
        formverification.appendChild(document.createTextNode("Dites nous en plus sur vous avec le champ Message. "));
      }
      if(!email)
      {
        formverification.appendChild(document.createTextNode("Pensez à remplir le champ E-mail que l'on puisse vous contacter. "));
      }
      else
      {
        const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!re.test(String(email).toLowerCase())) formverification.appendChild(document.createTextNode("Cet E-mail n'est pas valide. "));
      }
      document.getElementById("msgform").appendChild(formverification);
    }
   });