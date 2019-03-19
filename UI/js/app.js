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
});