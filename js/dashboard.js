const user = JSON.parse(

    localStorage.getItem(
        "premium_user"
    )

);

if(!user){

    location.href =
    "index.html";

}

document.getElementById(
    "userBox"
).innerHTML = `

    <img
    src="${user.photo}"
    width="80">

    <h2>${user.name}</h2>

    <p>${user.email}</p>

`;
