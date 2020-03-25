$(function () {
    banner();
});
var banner = function () {
    var getData = function (callback) {
        if(window.data){
            callback && callback(window.data);
        }else {
            $.ajax({
                type:'get',
                url:'js/data.json',
                dataType:'json',
                data:'',
                success:function (data) {
                    window.data = data;
                    callback && callback(window.data);
                }
            });
        }
    }
    var render = function () {
        getData(function (data) {
            var isMobile = $(window).width() < 768 ? true : false;
            var pointHtml = template('pointTemplate',{list:data});
            //console.log(pointHtml);
            var imageHtml = template('imageTemplate',{list:data,isMobile:isMobile});
            //console.log(imageHtml);
            $('.carousel-indicators').html(pointHtml);
            $('.carousel-inner').html(imageHtml);
        });
    }
    $(window).on('resize',function () {
        render();
    }).trigger('resize');
    /*4.移动端手势切换*/
    var startX = 0;
    var distanceX = 0;
    var isMove = false;
    $('.wjs_banner').on('touchstart',function (e) {
        startX = e.originalEvent.touches[0].clientX;
    }).on('touchmove',function (e) {
        var moveX = e.originalEvent.touches[0].clientX;
        distanceX = moveX - startX;
        isMove = true;
    }).on('touchend',function (e) {
        /*距离足够 50px 一定要滑动过*/
        if(isMove && Math.abs(distanceX) > 50){
            /*手势*/
            /*左滑手势*/
            if(distanceX < 0){
                //console.log('next');
                $('.carousel').carousel('next');
            }
            /*右滑手势*/
            else {
                //console.log('prev');
                $('.carousel').carousel('prev');
            }
        }
        startX = 0;
        distanceX = 0;
        isMove = false;
    });

}
