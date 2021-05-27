'use strict';

{
    const images = [
        'img/bell.jpg',
        'img/cherry.jpg',
        'img/seven 2.jpg',
        'img/replay 2.jpg',
        'img/burank 2.jpg',
        'img/bar 2.jpg',
        'img/suika 2.jpg'
    ];

    const headerImage = [
        'img/sinfo.jpg',
        'img/sinfo2.jpg'
    ];

    const gogoRamp = [
        'img/hai2.jpg',
        'img/hai.jpg'
    ];

    const hitNUm = 0;
    let gogoNum = 0;
    let reachFlag = 0;
    let get777 = 0;

    const header = document.getElementsByTagName('header');

    function headerFlash(e) {
        let headerFlagNum = e;
        document.querySelector('header img').src = headerImage[headerFlagNum];
    }
    const gogo = document.getElementById('gogo');

    function gogoFlash(e) {
        let gogoRampNum = e;
        document.querySelector('#gogo img').src = gogoRamp[gogoRampNum];
    }

    headerFlash(0);
    gogoFlash(0);

    class Panel {
        constructor() {
            const section = document.createElement('section');
            section.classList.add('panel');
            this.img = document.createElement('img');
            this.img.src = this.getRandomImage();

            this.timeoutId = undefined;

            this.stop = document.createElement('div');
            this.stop.textContent = 'STOP';
            this.stop.classList.add('stop', 'inactive');
            this.stop.addEventListener('click', () => {
                if (this.stop.classList.contains('inactive')) {
                    return;
                }
                this.stop.classList.add('inactive');
                clearTimeout(this.timeoutId);
                if (get777 === 1) {
                    this.img.src = 'img/replay.jpg';
                }
                panelsLeft--;

                if (panelsLeft === 0) {
                    gogoNum = Math.floor(Math.random() * 20);

                    checkResult(gogoNum);
                    spin.classList.remove('inactive');
                    panelsLeft = 3;
                }
            });

            section.appendChild(this.img);
            section.appendChild(this.stop);

            const main = document.querySelector('main');
            main.appendChild(section);
        }

        getRandomImage() {
            return images[Math.floor(Math.random() * images.length)];
        }

        spin() {
            this.img.src = this.getRandomImage();
            this.timeoutId = setTimeout(() => {
                this.spin();
            }, 1000);
        }

        isMatched(p1, p2) {
            return this.img.src === p1.img.src && this.img.src === p2.img.src;
        }

        isUnmatched(p1, p2) {
            return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
        }

        unmatch() {
            this.img.classList.add('unmatched');
        }

        activate() {
            this.img.classList.remove('unmatched');
            this.stop.classList.remove('inactive');
        }

        check777() {
            return this.img.src.indexOf('seven') !== -1 && panels[1].img.src.indexOf('seven') !== -1 && panels[2].img.src.indexOf('seven') !== -1;
        }
    }

    function checkResult(gogoNum) {


        if (get777 === 1) {
            get777 = 0;
        }
        if (reachFlag === 0) {
            headerFlash(0);
            if (panels[0].check777(panels[1], panels[2])) {
                panels[2].img.src = 'img/cherry.jpg';
            }
        }

        if (hitNUm === gogoNum) {
            reachFlag = 1;
            gogoFlash(1);
        }
        if (reachFlag === 1 && panels[0].check777()) {
            gogoFlash(0);
            headerFlash(1);
            reachFlag = 0;
            get777 = 1;
        }

        if (panels[0].isUnmatched(panels[1], panels[2])) {
            panels[0].unmatch();
        }
        if (panels[1].isUnmatched(panels[0], panels[2])) {
            panels[1].unmatch();
        }
        if (panels[2].isUnmatched(panels[0], panels[1])) {
            panels[2].unmatch();
        }
    }

    const panels = [
        new Panel(),
        new Panel(),
        new Panel(),
    ];

    let panelsLeft = 3;

    const spin = document.getElementById('spin');
    spin.addEventListener('click', () => {
        if (spin.classList.contains('inactive')) {
            return;
        }
        spin.classList.add('inactive');
        panels.forEach(panel => {
            panel.activate();
            panel.spin();
        });
    });
}