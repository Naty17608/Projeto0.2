


var mud = false;
function creatUser(event){
    event.preventDefault();
    let email = document.getElementById("email").value
    let senha = document.getElementById("senha").value
    console.log(email)
    console.log(senha)
    firebase.auth().createUserWithEmailAndPassword(email,senha);

    db.collection("usuarios").add({
        email :email,
        senha:senha
	})

    .then(function(docRef) {
        console.log("usuario criado com sucesso")
        document.getElementById("message").innerHTML= "usuaria criado com sucesso"
        console.log("usuario armazenedo com sucesso")
        console.log("Doc armazenedo  com ID", docRef.id);
    })


    .catch(function (error) {

        let errorMessage = error.message
        console.log(errorMessage)
        let erro = document.getElementById("errorMessage")
        console.log(error)
        erro.innerText = errorMessage
        
        
    });

}

function authenticateUser(event) {
    event.preventDefault();
    let email = document.getElementById("email2").value
    let senha = document.getElementById("senha2").value
    firebase.auth().signInWithEmailAndPassword(email,senha)
    .then(function(){
        console.log("usuario logado  com sucesso")
        let user =firebase.auth().currentUser
        console.log(user)
        document.getElementById("message").innerText= "usuario autenticado com sucesso"
        mud = true
        console.log(mud)

        let aparece =document.getElementById("aparece")
 
         if(mud ==true){
        aparece.style.display ="inline";
    }
    
    
    })
    .catch(function (error) {
        console.log("usuario nao autenticado com sucesso")
        let errorMessage = error.message
        console.log(errorMessage)
        let erro = document.getElementById("errorMessage")
        console.log(error)
        erro.innerText = errorMessage
        
        
    });
}


function  verifyAuthenticatication(event) {
    var user = firebase.auth().currentUser
   //event.preventeDefault();
   console.log(user)
   console.log(user.email)
}


function userdeleted(event){
    event.preventDefault();
    
    firebase.auth().currentUser.delete()
    .then(function(){

        let user =firebase.auth().currentUser
        console.log(user)
        document.getElementById("message").innerText= "usuario deletado com sucesso"
        console.log("deletado com sucesso");
      })
      .catch(function (error) {
        
        
      })

}
function passwordReset(event){
console.log("eviado  com sucesso");
let email = document.getElementById("email2").value
var auth = firebase.auth();
auth.sendPasswordResetEmail(email)
.then(function() {
    console.log("eviado  com sucesso");
})
.catch(function(error) {
    let errorMessage = error.message
        console.log(errorMessage)
        let erro = document.getElementById("errorMessage")
        console.log(error)
        erro.innerText = errorMessage
});
}

//  __________________________________________________________________________________  

function addUser(event){
    event.preventDefault();
    let email = document.getElementById("email").value
    let senha = document.getElementById("senha").value
    console.log(email)
    console.log(senha)
    db.collection("usuarios").add({
        email :email,
        senha:senha
	})

    .then(function(docRef) {
        console.log("usuario armazenedo com sucesso")
        console.log("Doc armazenedo  com ID", docRef.id);
    })

    .catch(function (error) {

        let errorMessage = error.message
        console.log(errorMessage)
        let erro = document.getElementById("errorMessage")
        console.log(error)
        erro.innerText = errorMessage
        
        
    });

}

function listUser(event){
    console.log("entrou")
    let tabela= document.getElementsByTagName("table")[0];
    let linha= tabela.insertRow(-1);
    let col0 = linha.insertCell(0)
    let col1 = linha.insertCell(1)
    
    col0.appendChild(document.createTextNode("id"))
    col1.appendChild(document.createTextNode("email"))
    console.log("entrou")
    db.collection("usuarios").get()
    .then((querySnapshot) =>{
        console.log("oi")
        querySnapshot.forEach((doc)=>{
        console.log(`${doc.id} => $ doc.data()}`);
            console.log(doc.id);
            console.log(doc.data().email)
            let linha = tabela.insertRow(-1)
            let col0 = linha.insertCell(0)
            let col1 = linha.insertCell(1)
            col0.appendChild(document.createTextNode("id"))
            col1.appendChild(document.createTextNode("email"))

        })
    })
    .catch(function (error) {
        console.log("usuario nao autenticado com sucesso")
        let errorMessage = error.message
        console.log(errorMessage)
        let erro = document.getElementById("errorMessage")
        console.log(error)
        erro.innerText = errorMessage
        
        
    });
}

function removeUser( event ){
	event.preventDefault();
	let id = document.getElementById("id").value;
	db.collection("usuarios").doc(id).delete()

    .then(function() {
		    console.log("usuario foi excluído com sucesso!");
	}).catch(function(error) {
		    console.error("Erro ao excluir usuario : ", error);
	});
}
