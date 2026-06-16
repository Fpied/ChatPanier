const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext("2d");
const salon = new Image();
const musique = new Audio("sound/Offenbach - Can Can Music.mp3 ")
salon.src = "img/salon.jpg";

salon.onload = () => {

    drawBackground();

};

function drawBackground(){
    ctx.drawImage(salon, 0, 0, canvas.width, canvas.height);
}

const panier = new Image();

panier.onload = () => {
    draw();
};

panier.src = "img/panierblanc.png";

const ImageChat = new Image();
ImageChat.src = "img/SpriteMinetteohneblanc.png";

function draw(){
    drawBackground();

    for (const panierPose of panierPoses) {
        ctx.drawImage(
            panier,
            panierPose.x,
            panierPose.y,
            panierJoueur.largeur,
            panierJoueur.hauteur
        );
    }

    ctx.drawImage(
        panier,
        panierJoueur.x,
        panierJoueur.y,
        panierJoueur.largeur,
        panierJoueur.hauteur
    );

    ctx.drawImage(
    ImageChat,
    chat.x,
    chat.y,
    chat.largeur,
    chat.hauteur
);

    
}

const chat = {
    x: 50,
    y: 700,
    largeur: 220,
    hauteur: 160,
    vitesse: 3,
    cible: null
};

const panierJoueur = {
    x: 0,
    y: 0,
    largeur: 200,
    hauteur: 130
};

canvas.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();

    panierJoueur.x = event.clientX - rect.left - panierJoueur.largeur / 2;
    panierJoueur.y = event.clientY - rect.top - panierJoueur.hauteur / 2;



})

const panierPoses = [];

canvas.addEventListener("click", () => {
    const nouveauPanier ={
        x: panierJoueur.x,
        y: panierJoueur.y
    };

    panierPoses.push(nouveauPanier);
    if (chat.cible === null){
        chat.cible = panierPoses[0];
    }

    if(panierPoses.length >= 3){
        panierPoses.shift();

    }

    chat.cible = nouveauPanier;

});

let musiqueEnCours = false;

function update() {
    let chatBouge = false;
    if (chat.cible !== null) {
        if (chat.x < chat.cible.x){
            chat.x += chat.vitesse;
            chatBouge = true;
            if (Math.abs(chat.x - chat.cible.x) <= chat.vitesse) {
                chat.x = chat.cible.x;
            }

        } 
        if (chat.x > chat.cible.x){
            chat.x -= chat.vitesse;
            chatBouge = true;
            if (Math.abs(chat.x - chat.cible.x) <= chat.vitesse) {
                chat.x = chat.cible.x;
            }

        } 

        if (chat.y < chat.cible.y){
            chat.y += chat.vitesse;
            chatBouge = true;
            if (Math.abs(chat.y - chat.cible.y) <= chat.vitesse) {
                chat.y = chat.cible.y;
            }

        } 
        if (chat.y > chat.cible.y){
            chat.y -= chat.vitesse;
            chatBouge = true;
            if (Math.abs(chat.y - chat.cible.y) <= chat.vitesse) {
                chat.y = chat.cible.y;
            }

        } 
    }
    if(chatBouge === true && musiqueEnCours === false){
        musique.play();
        musiqueEnCours = true;

    }
    if(chatBouge === false && musiqueEnCours === true){
        musique.pause();
        musiqueEnCours = false;
    }
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();



