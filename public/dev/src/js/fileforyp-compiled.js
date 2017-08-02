$(function () {
    $('.apply-title>div:first-child').on('mouseover', function (e) {
        e.preventDefault();
        $(this).addClass('p-line').siblings().removeClass('p-line');
        $(this).parent().next().children().eq(0).removeClass('hide').siblings().addClass('hide');
    });

    $('.apply-title>div:nth-child(2)').on('mouseover', function (e) {
        e.preventDefault();
        $(this).addClass('p-line').siblings().removeClass('p-line');
        $(this).parent().next().children().eq(1).removeClass('hide').siblings().addClass('hide');
    });

    $('.apply-title>div:nth-child(3)') && $('.apply-title>div:nth-child(3)').on('mouseover', function (e) {
        e.preventDefault();
        $(this).addClass('p-line').siblings().removeClass('p-line');
        $(this).parent().next().children().eq(2).removeClass('hide').siblings().addClass('hide');
    });

    $('.apply-title>div:nth-child(4)') && $('.apply-title>div:nth-child(4)').on('mouseover', function (e) {
        e.preventDefault();
        $(this).addClass('p-line').siblings().removeClass('p-line');
        $(this).parent().next().children().eq(3).removeClass('hide').siblings().addClass('hide');
    });

    $('.apply-title>div:nth-child(5)') && $('.apply-title>div:nth-child(5)').on('mouseover', function (e) {
        e.preventDefault();
        $(this).addClass('p-line').siblings().removeClass('p-line');
        $(this).parent().next().children().eq(4).removeClass('hide').siblings().addClass('hide');
    });

    // 回到顶部
    var returnContainer = $('.return-container');
    var returntop = $('.returntop');
    var consultation = $('.consultation');

    returntop && returntop.on('click', function (e) {
        e.preventDefault();
        $('body,html').animate({ scrollTop: 0 }, 1000);
        return false;
    });
});

//# sourceMappingURL=fileforyp-compiled.js.map