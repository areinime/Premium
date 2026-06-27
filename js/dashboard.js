const user =

JSON.parse(

    localStorage.getItem(

        "premium_user"

    )

);

if(!user){

    location.href =
    "index.html";

}

document.getElementById(
    "avatar"
).src =

user.picture;
