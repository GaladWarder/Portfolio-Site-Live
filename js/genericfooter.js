// Function to set the current year
function setCurrentYear() {
    var currentYear = new Date().getFullYear();
    document.getElementById("currentYear").textContent = currentYear;
}

// Set the footer content
let appFooter = `
    <nav>
       <!-- footer -->
            <footer class="fixed-footer">
                <div class="policy-box">
                    <span>&#169; Grant Roberts Art <span id="currentYear"></span> / All rights reserved.</span>
                </div>
                <div class="swiper-pagination footer-counter"></div>
                <div class="footer-social">
                    <ul>
                        <li><a href="https://www.artstation.com/grantroberts" target="_blank" ><i class="fa fa-instagram"></i><span>artstation</span></a></li>
                        <li><a href="https://twitter.com/GaladWarder" target="_blank"><i class="fa fa-twitter"></i><span>twitter / X</span></a></li>
                        <li><a href="https://www.linkedin.com/in/grantrobertsart/" target="_blank" ><i class="fa fa-linkedin"></i><span>linkedin</span></a></li>
                    </ul>
                </div>
            </footer>
            <!-- footer end -->
    </nav>
`;

// Add the footer content to the DOM
document.getElementById("app-footer").innerHTML = appFooter;

// Call the function to set the year after ensuring the content is added to the DOM
setTimeout(setCurrentYear, 0);
