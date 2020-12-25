function Hero(image, image1, image2, image3, top, left, size, speed) {
    this.image = image;
    this.image1 = image1;
    this.image2 = image2;
    this.image3 = image3;
    this.top = top;
    this.left = left;
    this.size = size;
    this.top1 = top;
    this.left1 = left;
    this.speed = speed;
    this.getHeroElement = function () {
        return '<img width="' + this.size + '"' +
            ' height="' + this.size + '"' +
            ' src="' + this.image + '"' +
            ' style="top: ' + this.top + 'px; left:' + this.left + 'px;position:absolute;" />';
    }

    this.getHeroElement1 = function () {
        return '<img width="' + this.size + '"' +
            ' height="' + this.size + '"' +
            ' src="' + this.image1 + '"' +
            ' style="top: ' + this.top + 'px; left:' + this.left + 'px;position:absolute;" />';
    }

    this.getHeroElement2 = function () {
        return '<img width="' + this.size + '"' +
            ' height="' + this.size + '"' +
            ' src="' + this.image2 + '"' +
            ' style="top: ' + this.top + 'px; left:' + this.left + 'px;position:absolute;" />';
    }

    this.getHeroElement3 = function () {
        return '<img width="' + this.size + '"' +
            ' height="' + this.size + '"' +
            ' src="' + this.image3 + '"' +
            ' style="top: ' + this.top + 'px; left:' + this.left + 'px;position:absolute;" />';
    }
    // Di chuyển đi sang phải
    this.moveRight = function () {
        this.left += speed;
        console.log('ok: ' + this.left);

    }
    // Di chuyển đi xuống
    this.moveDown = function () {
        this.top += speed;
        console.log('ok1: ' + this.top);
    }

    // Di chuyển đi sang trái
    this.moveLeft = function () {
        this.left -= speed;
        console.log('ok2: ' + this.left);
    }

    // Di chuyển đi lên trên
    this.moveTop = function () {
        this.top -= speed;
        console.log('ok3: ' + this.top);
    }

}

var hero = new Hero('nezuko.gif', 'nezuko1.gif', 'nezuko2.gif', 'nezuko3.gif', 20, 30, 200, 35);

function start() {
    if (hero.left < window.innerWidth - hero.size &&
        hero.top == hero.top1) {
        hero.moveRight();
        document.getElementById('game').innerHTML = hero.getHeroElement();
    } else if (hero.left > window.innerWidth - hero.size &&
        hero.top < window.innerHeight - hero.size) {
        hero.moveDown();
        document.getElementById('game').innerHTML = hero.getHeroElement1();
    } else if (hero.top > window.innerHeight - hero.size && hero.left >= hero.left1) {
        hero.moveLeft();
        document.getElementById('game').innerHTML = hero.getHeroElement2();
    } else if (hero.left == hero.left1 - hero.speed) {
        hero.moveTop();
        document.getElementById('game').innerHTML = hero.getHeroElement3();
    }


    setTimeout(start, 500)
}
start();
