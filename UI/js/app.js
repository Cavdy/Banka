$(document).ready(() => {
    // Sidebar Toggle 
    window.addEventListener('resize', () => {
        if (window.matchMedia('(min-width: 900px)').matches) {
            $('.sidebar').removeClass('sidebar-hide');
        } else {
            $('.sidebar').addClass('sidebar-hide');
        }
    });

    if (window.innerWidth <= 600) {
        $('.sidebar').addClass('sidebar-hide');
    }

    $('#toggle-sidebar').click(() => {
        $('.sidebar').toggleClass('sidebar-hide');

        if (window.innerWidth <= 600) {
            $('.user-nav-icon-box').toggleClass('user-nav-icon-box-active');
        }
    });

    // Pop box
    $(".user-nav-icon-box").click(() => {
        $(".user-nav-user-pop").removeClass("user-nav-user-pop-active");
        $(".user-nav-notification-pop").toggleClass("user-nav-notification-pop-active");
    });
    $(".user-nav-user").click(() => {
        $(".user-nav-notification-pop").removeClass("user-nav-notification-pop-active");
        $(".user-nav-user-pop").toggleClass("user-nav-user-pop-active");
    });

    // dismiss alert 
    $('#close').click(() => {
        $('.alert').remove();
    });

    // modal
    const showModal = document.querySelectorAll('#show-modal')
    if (showModal) {
        showModal.forEach(function (modal) {
            modal.addEventListener('click', function () {
                 $(".modal").css("visibility", "visible");
                 $(".modal").css("opacity", "1");
            });
        });
    }

    $(window).click((e) => {
        const modal = document.querySelector("#modal");
        if (e.target === modal) {
            $(".modal").css("visibility", "hidden");
            $(".modal").css("opacity", "0");
        }
    });
});