const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

var tabs = $$('.tab-item');
var panes = $$('.tab-pane');

var tabActive = $('.tab-item.active');
var line = $('.tabs .line');
console.log([line]);

line.style.left = tabActive.offsetLeft + 'px';
line.style.width = tabActive.offsetWidth + 'px';

tabs.forEach((tab, index) => {
    const pane = panes[index];
    tab.addEventListener('click', function() {
        $('.tab-pane.active').classList.remove('active');
        $('.tab-item.active').classList.remove('active');
        
        line.style.left = this.offsetLeft + 'px';
        line.style.width = this.offsetWidth + 'px';

        this.classList.add('active');
        pane.classList.add('active');
    });
});