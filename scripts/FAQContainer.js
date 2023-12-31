function appendFAQContainer() {
    document.getElementById("faq-container").innerHTML = `
    
    <div class="faq-block">
        <h1>Frequently Asked Questions</h1>
        <div class="faq-section">
            <h2>Why are Drake Doner Kebabs so delicious?</h2>
            <p>It's a combination of high-quality ingredients, passion, and a touch of musical inspiration.</p>
        </div>
        <div class="content">
            <h2>FAQs for Drake Doner Kebab:</h2>
            <ol>
                <li class="faq-dropdown">
                    <h3>What's the origin of Drake Doner Kebab?</h3>
                    <p class="faq-answer">Just like Drake started from the bottom, so did our kebab recipe! Our founder was inspired by traditional Middle Eastern flavors while on tour and decided to bring them to you with a twist.</p>
                </li>
                <li class="faq-dropdown">
                    <h3>Is your meat Halal?</h3>
                    <p class="faq-answer">Absolutely! We ensure that our meat is 100% Halal and sourced from certified suppliers. No fake love for our ingredients!</p>
                </li>
                <li class="faq-dropdown">
                    <h3>Do you offer vegetarian options?</h3>
                    <p class="faq-answer">Yes, we do! We've got some "Passionfruit" inspired vegetarian kebabs that you'll love even if you're a hardcore carnivore.</p>
                </li>
                <li class="faq-dropdown">
                    <h3>What's the secret to your sauce?</h3>
                    <p class="faq-answer">Ah, that's our "God's Plan" special recipe. We could tell you, but then we'd have to hire you!</p>
                </li>
                <li class="faq-dropdown">
                    <h3>Do you have any specials or promotions?</h3>
                    <p class="faq-answer">Keep an eye out on our "Views" from the menu board for daily specials and promotions.</p>
                </li>
                <li class="faq-dropdown">
                    <h3>Can I book the place for a private event?</h3>
                    <p class="faq-answer">Of course! Whether it's your birthday or you just feel like having a "One Dance" party with kebabs, reach out to us for details.</p>
                </li>
                <li class="faq-dropdown">
                    <h3>Are there any Drake songs played at the store?</h3>
                    <p class="faq-answer">You bet! It's always a "Nonstop" Drake playlist here. Feel the vibes while enjoying your kebab.</p>
                </li>
                <li class="faq-dropdown">
                    <h3>Do you deliver?</h3>
                    <p class="faq-answer">Yes, we do! Just remember, if our delivery is late, "Don't Matter To Me". Just kidding, we always strive for timely deliveries.</p>
                </li>
            </ol>
        </div>
    </div>
    `;
}


document.addEventListener('click', function(event) {
    if (event.target.matches('.faq-dropdown h3')) {
        let answer = event.target.nextElementSibling;

        document.querySelectorAll('.faq-answer').forEach(function(item) {
            if (item !== answer) {
                item.style.display = 'none';
            }
        });

        answer.style.display = (answer.style.display === 'block') ? 'none' : 'block';
    }
});