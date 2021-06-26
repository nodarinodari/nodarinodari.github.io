$(function() {
    var imgs = $("#slideshow > li");
    var imgLen = imgs.length;
    var count = 0;

    function changeImg() {
        count = (count + 1) % imgLen;
        imgs.removeClass("showSlide").eq(count).addClass("showSlide");
    }
    setInterval(changeImg, 3000);
});
