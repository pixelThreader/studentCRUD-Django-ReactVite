function populateIcons(start, end, iconARR) {
    var iconsHTML = "";
    for (let i = start; i < end; i++) {
        iconsHTML += `
        <div class="icon0421 lazy-div">
            <div class="icon0422">
                <div class="icon0423">
                    <img src="${iconARR[i].path}" alt="icons">
                    <div class="icon0423p"></div>
                </div>
            </div>
            <div class="icon0424">
                <div class="icon0425">
                ${iconARR[i].name}
                </div>
                <div class="icon0425 mild">
                ${iconARR[i].category}
                </div>
                <div class="icon0426">
                ${iconARR[i].sno}
                </div>
            </div>
            <div class="icon0421p"></div>
        </div>
        `;
        updateLoadingBar(i + 1);
    }
    $("#load0420").addClass("removeNow");
    hideLoadingBar();
    $("#load0420").removeClass("removeNow");
    return iconsHTML;
}
$(document).ready(function () {
    $.getJSON("assets/icons.json")
        .then(function (data) {
            let iconJSON = data;
            var numberOfItems = iconJSON.length;
            $("#ttlitms").text(Math.ceil(numberOfItems / 100));

            $("#iconList").append(populateIcons(0, 100, iconJSON));

            populateThePageBtns(numberOfItems)

            // Apply animation effect to each icon separately
            $(".icon0421").hide().each(function (index) {
                $(this).delay(index * 100).slideDown(500); // Modify the animation effect as needed
            });
        });
});


function populateThePageBtns(noOfData) {
    var pagesPossible = Math.ceil(noOfData / 100);
    var $pagesPossible = $('#pagesPossible');
    $pagesPossible.empty(); // Clear the existing buttons

    var currentPage = 1; // Default current page
    var startPage = 1; // Default start page
    var endPage = Math.min(pagesPossible, 6); // Maximum end page is 6 or less

    // Check if the current page is within the visible range
    if (currentPage > 6) {
        startPage = currentPage - 5;
        endPage = currentPage;
    }

    // Populate the page buttons
    for (var i = startPage; i <= endPage; i++) {
        var from = (i - 1) * 100;
        var to = i * 100 - 1;
        var $button = $('<button>', {
            class: 'page_btn' + (i === currentPage ? ' op active' : ''),
            from: from,
            to: to,
            text: i
        });
        $pagesPossible.append($button);
    }

    // Check if the disabled button is needed
    if (pagesPossible > 6 && currentPage < pagesPossible) {
        var $disabledButton = $('<button>', {
            class: 'page_btn disable',
            'data-range': (currentPage + 1) + '-' + pagesPossible
        }).append($('<i>', {
            class: 'icon ion-ios-more'
        }));
        $pagesPossible.append($disabledButton);
    }
}

$(document).on('click', '.page_btn', function () {
    console.log("This clicked");
    check_page_more(this);
});


function check_page_more(element) {
    if ($(element).hasClass("op")) {
        $("#prev_page").addClass("disable");
    }
    $("#prev_page").removeClass("disable");
    if (!$(element).hasClass("disable")) {
        $(".page_btn").removeClass("active");
        $(element).addClass("active");
        var start = parseInt($(element).attr('from'));
        var end = parseInt($(element).attr('to'));
        $.getJSON("assets/icons.json")
            .then(function (data) {
                let iconJSON = data;
                $("#iconList").hide(500).delay(500).empty();
                $("#iconList").show().append(populateIcons(start, end, iconJSON));
            });
    } else {
        alert("Not allowed to access these pages directly!");
    }
}
