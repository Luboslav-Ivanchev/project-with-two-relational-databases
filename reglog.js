function registration(event) {

     event.preventDefault();
    let formData=new FormData(document.forms['registration-template']);

    let email=formData.get('email');
    let password=formData.get('password');
    let repeatPassword=formData.get('repeatPassword');

    let divRoot=document.getElementById('root');


     if(email==='' && password==='' && repeatPassword===''){
         divRoot.style.fontFamily='Arial';
         divRoot.style.background='red';
         divRoot.style.color='white'
         divRoot.style.fontSize='30px';
         divRoot.style.textAlign='center';
         divRoot.innerHTML=`Something is wrong! Not registered!`;
     }else if(password===''){
         divRoot.style.fontFamily='Arial';
         divRoot.style.background='red';
         divRoot.style.color='white'
         divRoot.style.fontSize='30px';
         divRoot.style.textAlign='center';
         divRoot.innerHTML=`Something is wrong! Not registered!`;
     }else if(repeatPassword===''){
         divRoot.style.fontFamily='Arial';
         divRoot.style.background='red';
         divRoot.style.color='white'
         divRoot.style.fontSize='30px';
         divRoot.style.textAlign='center';
         divRoot.innerHTML=`Something is wrong! Not registered!`;
     }else if(email===''){
         divRoot.style.fontFamily='Arial';
         divRoot.style.background='red';
         divRoot.style.color='white'
         divRoot.style.fontSize='30px';
         divRoot.style.textAlign='center';
         divRoot.innerHTML=`Something is wrong! Not registered!`;
     }else{
         divRoot.style.fontFamily='Arial';
         divRoot.style.background='lightgreen';
         divRoot.style.color='white'
         divRoot.style.fontSize='30px';
         divRoot.style.textAlign='center';
         divRoot.innerHTML=`Successful registration!`;
     }
     let allInputs=document.querySelectorAll('input');
    let inputs=Array.from(allInputs);
    let emailInput=inputs[0];
    let passwordInput=inputs[1];
    let repPassword=inputs[2];
    emailInput.value='';
    passwordInput.value='';
    repPassword.value='';

    let request=fetch(`https://making-accounts-with-movies-default-rtdb.firebaseio.com/RegistrationPeoples/.json`,{
        method:'POST',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify({email:email,password:password,repeatPassword:repeatPassword}),
    });

    request
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
        })


}


function login(event) {
    event.preventDefault();

    let login=fetch(`https://making-accounts-with-movies-default-rtdb.firebaseio.com/RegistrationPeoples/.json`);
    login
        .then(res=>res.json())
        .then(data=>{
            let allInput=document.querySelectorAll('input');
            let inputs=Array.from(allInput);

            let emailInput=inputs[0];
            let passwordInput=inputs[1];
             let divRootElement=document.getElementById('root');

             let emails='';
            let keysData=Object.keys(data);
            let abv=keysData.map(x=>data[x].email);
            let pass=keysData.map(x=>data[x].password);


            if(passwordInput.value===''){
                divRootElement.style.fontFamily='Verdana';
                divRootElement.style.background='red';
                divRootElement.style.color='white'
                divRootElement.style.fontSize='30px';
                divRootElement.style.textAlign='center';
                divRootElement.innerHTML=`Something is wrong! Not registered!`;

            }else if(emailInput.value===''){
                divRootElement.style.fontFamily='Times New Roman';
                divRootElement.style.background='red';
                divRootElement.style.color='white'
                divRootElement.style.fontSize='30px';
                divRootElement.style.textAlign='center';
                divRootElement.innerHTML=`Something is wrong! Not registered!`;

            }else if(abv.includes(emailInput.value) && pass.includes(passwordInput.value)){
                divRootElement.style.fontFamily='Arial';
                divRootElement.style.background='lightgreen';
                divRootElement.style.color='white'
                divRootElement.style.fontSize='30px';
                divRootElement.style.textAlign='center';
                divRootElement.innerHTML='Logged in Successfully';
                let template=Handlebars.compile(document.getElementById('loggedIn').innerHTML);
                history.pushState('','','/LoggedIn');
                let divElement=document.getElementById('app');
                divElement.innerHTML=template({});

                let aHrefs=document.querySelectorAll('a')[1];
                aHrefs.textContent=`Welcome,${emailInput.value}`;

                //



                let forms=Array.from(document.getElementsByClassName('form-control'));
                let titleInput=forms[0];
                let textarea=forms[1];
                let imageInput=forms[2];

                let divParentAddingMovies=document.getElementsByClassName('row d-flex d-wrap')[0];

                let divChildAddingMovies=document.getElementsByClassName('card-deck d-flex justify-content-center')[0];

                let divChild2=document.getElementsByClassName('card mb-4')[0];

                 let creatingDiv=document.createElement('div');
                 creatingDiv.setAttribute('class','card mb-4');

                let buttons=document.getElementsByClassName('btn-primary')[0];



               buttons.addEventListener('click',function (e) {
                   e.preventDefault();

                   fetch(`https://adding-movies-default-rtdb.firebaseio.com/AddingMovies/.json`,{
                       method:'POST',
                       headers:{'Accept': 'application/json','Content-type':'application/json'},
                       body:JSON.stringify({titleInput:titleInput.value,textarea:textarea.value,imageInput:imageInput.value}),
                   })
                       .then(res=>res.json())
                       .then(info=>{
                           creatingDiv.innerHTML=`    
                    <img class="card-img-top" src="${imageInput.value}" alt="Card image cap" width="400">
                        <div class="card-body">
                            <h4 class="card-title">${titleInput.value}</h4>
                        </div>
                        <div class="card-footer">
                            <a href="#/details/krPgQD6SWf39bM4x00co"><button type="button" data-key="${info.name}" class="btn btn-info">Details</button></a>
                            </div>
                   
                           `;

                           divChild2.appendChild(creatingDiv);
                           divChildAddingMovies.appendChild(divChild2);
                           divParentAddingMovies.appendChild(divChildAddingMovies);

                           imageInput.value='';
                           titleInput.value='';
                           textarea.value='';


                       });


                       });


                fetch(`https://adding-movies-default-rtdb.firebaseio.com/AddingMovies.json`)
                    .then(res=>res.json())
                    .then(data=>{

                        let keys=Object.keys(data);
                        divChild2.innerHTML=keys.map(x=>
                            `<div class="card mb-4" data-key="${x}">
                    <img class="card-img-top" src="${data[x].imageInput}" alt="Card image cap" width="400">
                        <div class="card-body">
                            <h4 class="card-title">${data[x].titleInput}</h4>
                        </div>
                        <div class="card-footer">
                            <a href="#/details/krPgQD6SWf39bM4x00co"><button type="button" data-key="${x}" class="btn btn-info">Details</button></a>
                            </div>
                            </div>
                         `).join('');

                        divChildAddingMovies.appendChild(divChild2);
                        divParentAddingMovies.appendChild(divChildAddingMovies);


                        let allButton=document.querySelectorAll('button');
                        let buttonsAll=Array.from(allButton);
                        let btn8=buttonsAll.pop();
                        let btn7=buttonsAll.pop();
                        buttonsAll.forEach(buttonDataKey=>{

                            buttonDataKey.addEventListener('click',function (event) {
                                event.preventDefault();
                                let id=buttonDataKey.getAttribute('data-key');
                                fetch(`https://adding-movies-default-rtdb.firebaseio.com/AddingMovies/${id}/.json`)
                                    .then(res=>res.json())
                                    .then(info=>{

                                        let divClassContainer=document.getElementsByClassName('container')[1];
                                        let divClassRowBg=document.getElementsByClassName('row bg-light text-dark')[0];
                                        divClassRowBg.innerHTML=`
                                              <h1>Movie title: ${info.titleInput}</h1>
                                           <div class="col-md-8">
                                           <img class="img-thumbnail" src="${info.imageInput}" alt="Movie">
                                </div>
                             <div class="col-md-4 text-center">
                            <h3 class="my-3">Movie Description</h3>
                                 <p>${info.textarea}</p>
                    <a class="btn btn-danger" data-key="${id}" href="/Delete">Delete</a>
                    <a class="btn btn-warning" data-key="${id}" href="/Edit">Edit</a>
                    <a class="btn btn-primary" data-key="${id}" href="/Liked">Like</a>
                    <span class="enrolled-span">Liked 0</span>
                       </div>`

                                        divClassContainer.appendChild(divClassRowBg);

                                        const router={
                                            'Delete':document.getElementsByClassName('btn-danger')[0],
                                            'Edit':document.getElementsByClassName('btn-warning')[1],
                                            'Liked':document.getElementsByClassName('btn-primary')[1],
                                        }

                                        let deleteButton=document.getElementsByClassName('btn-danger')[0];
                                        let editButton=document.getElementsByClassName('btn-warning')[1];
                                        let likedButton=document.getElementsByClassName('btn-primary')[1];
                                        let spanClassLiked=document.getElementsByClassName('enrolled-span')[0];

                                        deleteButton.addEventListener('click',function (e) {
                                            e.preventDefault();
                                            history.pushState({},'',router[0]);
                                            fetch(`https://adding-movies-default-rtdb.firebaseio.com/AddingMovies/${id}/.json`,{
                                                method:'DELETE',
                                                headers:{'Content-type':'application/json'},
                                                body:JSON.stringify({}),
                                            })
                                                .then(res=>res.text())
                                                .then(data=>{});



                                            let h1=document.querySelectorAll('h1')[3];
                                            let divClaas=document.getElementsByClassName('col-md-8')[0].children[0];
                                            let p=document.querySelectorAll('p')[1];

                                            h1.textContent='Movie title:';
                                            divClaas.src='';
                                            p.textContent='';
                                            spanClassLiked.textContent='Liked:0';

                                            let divClassDel=document.getElementsByClassName('card mb-4')[0].children;
                                            let divs=Array.from(divClassDel);
                                            divs.forEach(div=>{
                                                if(div.getAttribute('data-key')===id){
                                                    div.remove();
                                                }
                                            });

                                    });

                                        let counter=0;
                                        likedButton.addEventListener('click',function (e) {
                                            e.preventDefault();
                                            counter++;
                                            spanClassLiked.textContent=`Liked:${counter}`;
                                        });

                                        editButton.addEventListener('click',function (e) {

                                            e.preventDefault();
                                            let inputsFormClassControl=document.getElementsByClassName('form-control');
                                            let inputs=Array.from(inputsFormClassControl);
                                            let movieTitle=inputs[3];
                                            let movieDescription=inputs[4];
                                            let imageMovie=inputs[5];

                                            fetch(`https://adding-movies-default-rtdb.firebaseio.com/AddingMovies/${id}/.json`,{
                                               method:'PATCH',
                                                headers:{'Content-type':'application/json'},
                                                body:JSON.stringify({imageInput:imageMovie.value,textarea:movieDescription.value,titleInput:movieTitle.value}),
                                            })
                                                .then(res=>res.json())
                                                .then(data=>{})

                                            let h11=document.querySelectorAll('h1')[3];
                                            let divClaas=document.getElementsByClassName('col-md-8')[0].children[0];
                                            let p=document.querySelectorAll('p')[1];
                                            h11.textContent=`Movie title:${movieTitle.value}`;
                                            divClaas.src=imageMovie.value;
                                            p.textContent=movieDescription.value;


                                            let h4=document.getElementsByClassName('card-title')[0];
                                            let img=document.getElementsByClassName('card-img-top')[0];

                                            h4.textContent=movieTitle.value;
                                            img.style.src=imageMovie.value;

                                        });

                                    });

                            })

                        });

                    });



            }
        });

}

function logout(event) {
    event.preventDefault();
    let divApp=document.getElementById('app');
     let divRoot=document.getElementById('root');
    let template=Handlebars.compile(document.getElementById('logout').innerHTML);

    divApp.innerHTML=template({});

    divRoot.style.fontFamily='Arial';
    divRoot.style.background='lightgreen';
    divRoot.style.color='white'
    divRoot.style.fontSize='30px';
    divRoot.style.textAlign='center';
    divRoot.innerHTML='Logged Out!'

  let divNav=document.getElementsByClassName('navbar')[0];
    divNav.style.display='none';

}


