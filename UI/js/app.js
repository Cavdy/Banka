$(document).ready(() => {
    // Sidebar Toggle 
    window.addEventListener('resize', () => {
        if (window.matchMedia('(min-width: 900px)').matches) {
            $('.sidebar').removeClass('sidebar-hide');
        } else {
            $('.sidebar').addClass('sidebar-hide');
        }
    });

    $('#toggle-sidebar').click(() => {
        $('.sidebar').toggleClass('sidebar-hide');
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

    $(window).click(function (e) {
        const modal = document.querySelector("#modal");
        if (e.target === modal) {
            $(".modal").css("visibility", "hidden");
            $(".modal").css("opacity", "0");
        }
    });
});