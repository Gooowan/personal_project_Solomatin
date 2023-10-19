document.addEventListener('DOMContentLoaded', function() {
    let faqHeaders = document.querySelectorAll('.faq-dropdown h3');

    faqHeaders.forEach(function(header) {
        header.addEventListener('click', function() {
            let answer = this.nextElementSibling;

            if (answer.style.display === 'block') {
                answer.style.display = 'none';
            } else {

                document.querySelectorAll('.faq-answer').forEach(function(item) {
                    item.style.display = 'none';
                });

                answer.style.display = 'block';
            }
        });
    });
});