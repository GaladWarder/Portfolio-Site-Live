let appHeader = `
    <nav>
       <header class="main-header">
                <div class="header-contacts">
                    <ul>
                        <li><span>Discord :</span> galadwarder</li>
                        <li><span>Email Me :</span> 
                            <button title="Click to Copy" type="submit" value="copy" id="copyButton" class=copybutton>galaddota@yahoo.com</button>  
                        </li>
                    </ul>
                </div>
                <span id="custom-tooltip">copied!</span>
                <textarea class=visuallyhidden id="box">galaddota@yahoo.com</textarea>
                </div>

                <a class="logo-holder" href="index.html"><img src="images/logo.png" alt=""></a>

                <!--   
                <div class="show-sibedar vissidebar"></div>
                --> 

                <!-- sidebar-button  
                <div class="sidebar-button-wrap vis-m"></div>
                --->           

                <!-- mobile nav --> 
                <div class="nav-button-wrap">
                    <div class="nav-button vis-main-menu"><span></span><span></span><span></span></div>
                </div>
                <!-- mobile nav end--> 

                <!--  navigation --> 
                <div class="nav-holder">
                    <nav>
                        <ul>
                            <li>
                                <a href="index.html" class="act-link">Home </a>
                            </li>
                            <li>
                                <a href="portfolio.html">Portfolio</a>
                                <!--second level -->
                                <ul>
                                    <li><a href="portfolio.html">All</a></li>
                                    <li>
                                        <a href="portfolio-battleplan.html">BattlePlan!</a>
                                        <!--third level-->
                                        <ul>
                                            <li><a href="portfolio-battleplan-backgrounds.html">Backgrounds</a></li>
                                            <li><a href="portfolio-battleplan-characters.html">Characters</a></li>
                                            <li><a href="portfolio-battleplan-illustrations.html">Illustrations</a></li>
                                        </ul>
                                        <!--end third level-->
                                    </li>
                                    <li><a href="portfolio-triumph.html">Triumph</a></li>
                                    <li><a href="portfolio-packageblue.html">Package Blue</a></li>
                                    <li><a href="portfolio-projectdot.html">Project DOT</a></li>
                                    <li><a href="portfolio-inhabitants-posters.html">Inhabitants Posters</a></li>
                                </ul>
                                <!--second level end-->
                            </li>
                            <li>
                                <a href="resume.html">Resume</a>
                            </li>
                            <li>
                                <a href="#">Links</a>
                                <!--second level -->
                                <ul>
                                    <li><a target="_blank" href="https://www.linkedin.com/in/grantrobertsart/">LinkedIn</a></li>
                                    <li><a target="_blank" href="https://www.artstation.com/grantroberts">Artstation</a></li>
                                    <li><a target="_blank" href="https://twitter.com/GaladWarder">Twitter / X</a></li>
                                    <li><a target="_blank" href="https://discord.gg/artworkhouse"> Join the Art Work House Server</a></li>
                                    <li><a target="_blank" href="https://open.spotify.com/show/4aHgc3ZoG6SfW8I69XuUlN">Sessions at the Art Work House on Spotify</a></li>
                                </ul>
                                <!--second level end-->
                            </li>
                        </ul>
                    </nav>
                </div>
                <!-- navigation  end -->
            </header>
    </nav>
`;
document.getElementById("app-header").innerHTML = appHeader;

function copyEmail(event) {
    var copyInput = document.getElementById("box");
    copyInput.select();
    copyInput.setSelectionRange(0, 99999); // For mobile devices

    // Array of tooltip messages
    var tooltips = ["copied!", "double copy!", "triple copy!", "QUADRACOPY!", "GODLIKE!"];

    var tooltipElement = document.getElementById("custom-tooltip");
    tooltipElement.textContent = tooltips[clickCount];

    // Check if the click count is 4 and add the "shake" class
    if (clickCount === 4) { // "GODLIKE!" corresponds to click count 4
        tooltipElement.classList.add("shake");
    } else {
        // Remove the "shake" class if the click count is not 4
        tooltipElement.classList.remove("shake");
    }

    // Get the position and size of the clicked button
    var buttonRect = event.target.getBoundingClientRect();

    // Set the tooltip's position inline with the clicked button, to the right
    tooltipElement.style.display = "inline";
    tooltipElement.style.position = "absolute";
    tooltipElement.style.top = (buttonRect.top - 11) + "px"; // Adjust the position as needed
    tooltipElement.style.left = (buttonRect.right + 16) + "px"; // To the right of the button

    document.execCommand("copy");
    clickCount = (clickCount + 1) % tooltips.length; // Cycle through the messages

    // Clear the previous timeout, if any
    if (timeoutId) {
        clearTimeout(timeoutId);
    }

    // Set a new timeout for hiding the tooltip
    timeoutId = setTimeout(function () {
        tooltipElement.style.display = "none";
    }, 1000);
}




//end of copy function


document.getElementById("copyButton").addEventListener("click", copyEmail);