
const routes={
    'Movies':'movies-template',
    'WelcomeEmail':'',
    'Login':'login-template',
    'Register':'register-template',
}

let routers=(path)=>{
    let divElement=document.getElementById('app');
    let template=Handlebars.compile(document.getElementById(routes[path]).innerHTML);

    divElement.innerHTML=template({});

}


document.querySelector('.navbar').addEventListener('click',addEventsListenerAHrefs)

function addEventsListenerAHrefs(event) {
         event.preventDefault();

        navigationLink(event);
}

function navigationLink(event) {

    let url=new URL(event.target.href);

    history.pushState('','',url.pathname);

  routers(url.pathname.slice(1));

}


