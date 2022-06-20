const color = [
    '#5d4a75',
    '#ee805b',
    '#fdd44f'
    ]

    function createSquere(){
        const section = document.querySelector('.bg');
        const square = document.createElement('span');

        var size = Math.random() * 30;

        square.style.width = 10 + size + 'px';
        square.style.height = 10 + size + 'px';

        square.style.top = Math.random() * innerHeight + 'px';
        square.style.right = Math.random() * innerWidth + 'px';

        // const bg = color[Math.floor(Math.random()* color.length)];
        // square.style.background = bg;

        section.appendChild(square);

        setTimeout(() => {
            square.remove()
        }, 5000)

    }
    setInterval(createSquere, 150)
