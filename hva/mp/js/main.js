// random digit generator
var randomDigit = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// hamburger menu

var feed, tech, design = false;

$('#hamclick').click(function() {
    if (feed) {
        $('.content-section').show()
        feed = false;
        console.log("test")
        this.src = 'img/hamburger-cross.png';
    } else {
        $('.content-section').hide()
        feed = true;
        this.src = 'img/hamburger.png';
    }
})

// aside catogory filter functions

function techClick() {
    if (tech) {
        $('.tech').show()
        tech = false;
        $('#techclick').css({
            '-moz-transform': 'rotate(0deg)',
            '-webkit-transform': 'rotate(0deg)',
            '-o-transform': 'rotate(0deg)',
            '-ms-transform': 'rotate(0deg)',
            'transform': 'rotate(0deg)'
        });
    } else {
        $('.tech').hide()
        tech = true;
        $('#techclick').css({
            '-moz-transform': 'rotate(-90deg)',
            '-webkit-transform': 'rotate(-90deg)',
            '-o-transform': 'rotate(-90deg)',
            '-ms-transform': 'rotate(-90deg)',
            'transform': 'rotate(-90deg)'
        });
    }
}

function designClick() {
    if (design) {
        $('.design').show()
        design = false;
        $('#designclick').css({
            '-moz-transform': 'rotate(0deg)',
            '-webkit-transform': 'rotate(0deg)',
            '-o-transform': 'rotate(0deg)',
            '-ms-transform': 'rotate(0deg)',
            'transform': 'rotate(0deg)'
        });
    } else {
        $('.design').hide()
        design = true;
        $('#designclick').css({
            '-moz-transform': 'rotate(-90deg)',
            '-webkit-transform': 'rotate(-90deg)',
            '-o-transform': 'rotate(-90deg)',
            '-ms-transform': 'rotate(-90deg)',
            'transform': 'rotate(-90deg)'
        });
    }
}

// unanonymous functions declaring

techClick()
designClick()

$('#techclick').click(function() {
    techClick();
})

$('#designclick').click(function() {
    designClick();
})

// menu

$('#your-feed').click(function() {
    $("#menu-arrow-container").css("margin-left", "0%")
    $("#menu-arrow-wrapper").css("height", "15px")
    if ($("#your-feed").hasClass("active-menu-item")) {
        $("#menu-arrow").css("border-top", "15px solid #3ab34d")
    } else {
        $("#menu-arrow").css("border-top", "15px solid #f4f8fb")
    }

    $(".content-item").hide();
    $(".content-item").next().hide();

    $("ul.content-section li").each(function() {
        var person = $(this).text().slice(0, -1)
        $('.content-item .expert-name-job h3').each(function() {
            if ($(this).text() === person) {
                $(this).parent().parent().parent().parent().show();
                $(this).parent().parent().parent().parent().next().show();
            }
        })

    })
})

$('#trending, #trending-aside').click(function() {
    $("#menu-arrow-wrapper").css("height", "15px")
    $("#menu-arrow-container").css("margin-left", "20%")
    $("#menu-arrow").css("border-top", "15px solid #f4f8fb")

    $(".content-item").hide();
    $(".content-item").next().hide();

    $(".content-item").each(function() {
        if (randomDigit(0, 1)) {
            $(this).show()
            $(this).next().show()
        }
    })
})

$('#recently-added, #recent-aside').click(function() {
    $("#menu-arrow-wrapper").css("height", "15px")
    $("#menu-arrow-container").css("margin-left", "40%")
    $("#menu-arrow").css("border-top", "15px solid #f4f8fb")
    $(".content-item").show();
    $(".content-item").next().show();
})

$('#design-menu, #design-aside').click(function() {
    $("#menu-arrow-wrapper").css("height", "15px")
    $("#menu-arrow-container").css("margin-left", "60%")
    $("#menu-arrow").css("border-top", "15px solid #f4f8fb")

    $(".content-item").hide();
    $(".content-item").next().hide();

    $(".content-item").each(function() {

        var button = $(this).find(".follow-button")

        if (button.hasClass("follow-design")) {
            button.parent().parent().parent().parent().show()
            button.parent().parent().parent().parent().next().show()
        }
    })

})

$('#tech-menu, #tech-aside').click(function() {
    $("#menu-arrow-wrapper").css("height", "15px")
    $("#menu-arrow-container").css("margin-left", "80%")
    $("#menu-arrow").css("border-top", "15px solid #f4f8fb")

    $(".content-item").hide();
    $(".content-item").next().hide();

    $(".content-item").each(function() {

        var button = $(this).find(".follow-button")

        if (button.hasClass("follow-tech")) {
            button.parent().parent().parent().parent().show()
            button.parent().parent().parent().parent().next().show()
        }
    })

})

// i like this

$('.hart-white').hover(function() {
    if (this.src.indexOf("white.png") >= 0) {
        this.src = 'img/hart_border.png';
    }
}, function() {
    if (this.src.indexOf("border.png") >= 0) {
        this.src = 'img/hart_white.png';
    }
});

$('.hart-white').click(function() {
    if (this.src.indexOf("fill.png") >= 0) {
        this.src = 'img/hart_border.png'
        var img = $(this);
        img.css("marginTop", "5px")
        setTimeout(function() {
            img.css("marginTop", "0px")
        }, 100)

        var hearts = $(this).parent().find(".heart-icon")
        hearts.html(Number(hearts.text()) - 1)

    } else {
        this.src = 'img/hart_fill.png'
        $(this).css("marginTop", "5px")
        var img = $(this);
        img.css("marginTop", "5px")
        setTimeout(function() {
            img.css("marginTop", "0px")
        }, 100)

        var hearts = $(this).parent().find(".heart-icon")
        hearts.html(Number(hearts.text()) + 1)

    }
});

// bookmarking

$('.bookmark-white').hover(function() {
    if (this.src.indexOf("white.png") >= 0) {
        this.src = 'img/bookmark_border.png';
    }
}, function() {
    if (this.src.indexOf("border.png") >= 0) {
        this.src = 'img/bookmark_white.png';
    }
});

$('.bookmark-white').click(function() {
    if (this.src.indexOf("fill.png") >= 0) {
        this.src = 'img/bookmark_border.png'
        var amount = Number($("#saved-updates").text()) - 1;
        $("#saved-updates").html(amount).css("padding", "7px")
        setTimeout(function() {
            $("#saved-updates").css("padding", "2px 6px 2px 6px")
        }, 100)
        var img = $(this);
        img.css("marginTop", "5px")
        setTimeout(function() {
            img.css("marginTop", "0px")
        }, 100)
    } else {
        this.src = 'img/bookmark_fill.png'
        var amount = Number($("#saved-updates").text()) + 1;
        $("#saved-updates").html(amount).css("padding", "7px")
        setTimeout(function() {
            $("#saved-updates").css("padding", "2px 6px 2px 6px")
        }, 100)
        var img = $(this);
        img.css("marginTop", "5px")
        setTimeout(function() {
            img.css("marginTop", "0px")
        }, 100)
    }
});

// follow buttons

var followers = 0;

$('.follow-button').click(function() {

    var follow = $(this)
    var user = $(this).parent().children().first().text()
    var feed = $("#your-feed");

    $('#menu-arrow-wrapper').hide();
    var marginleft = $('#menu-arrow-container').css("margin-left");
    $('#menu-arrow-wrapper').show();

    if (follow.text() !== "Follow") {
        follow.html("Follow")
        follow.removeAttr('style');
        followers--

        if (followers === 0) {
            feed.removeClass("active-menu-item")
            if (marginleft === "0%") {
                $("#menu-arrow").css("border-top", "15px solid #f4f8fb")
            }
        }

        $('.design').each(function() {
            if ($(this).text().slice(0, -1) === user) {
                $(this).remove()
            }
        })
        $('.tech').each(function() {
            if ($(this).text().slice(0, -1) === user) {
                $(this).remove()
            }
        })
    } else {
        follow.html("Unfollow")
        follow.css("background-color", "#ffffff").css("border", "solid 1px #000")
        followers++


        if (followers > 0) {
            if (!feed.hasClass("active-menu-item")) {
                feed.addClass("active-menu-item")

                if (marginleft === "0%") {
                    $("#menu-arrow").css("border-top", "15px solid #3ab34d")
                }
            }
            // do not add another class if it's already there
        }

        if (follow.attr("class").indexOf("design") >= 0) {
            if ($(".design").css('display') === 'none') {
                designClick();
            }
            $("#designcontainer").append('<li class="design">' + user + '<span class="digit">' + randomDigit(0, 4) + '</span></li>');

        } else {
            if ($(".tech").css('display') === 'none') {
                techClick();
            }
            $("#techcontainer").append('<li class="tech">' + $(this).parent().children().first().text() + '<span class="digit">' + randomDigit(0, 4) + '</span></li>');
        }
    }
})

// read more

var reading;

$(".iframe-options").hide()

$('.content-footer').click(function() {

    reading = $(this)

    $(this).parent().children().first().css("background-image", "url('img/eye.png')");
    $(this).parent().css("opacity", "0.6");

    $(".iframe-options").show()
    $("#wrapper").hide()

    $(this).parent().next().appendTo("#navigation-iframe")

})

$('#navigation-iframe span, #return-icon').click(function() {
    $(".iframe-options").hide()
    $("#wrapper").show()

    var options = ($(this).parent().find(".content-options"))

    options.insertAfter(reading.parent())

})

// saved articles

$('.saved-articles').click(function() {
    $(".content-item").hide()
    $(".content-item").next().hide()

    $("#menu-arrow-wrapper").css("height", "0px")
    $("#menu-arrow").css("border-top", "0px")

    $(".content-options").each(function() {
        if ($(this).find(".bookmark-white").attr("src").indexOf("fill.png") >= 0) {
            $(this).show()
            $(this).prev().show()
        }
    })
})

$('#searchfield').keypress(function(e) {
    if (e.which === 13) {

        var searchoption = $(this).val();
        var digit = randomDigit(1, 3);

        $("#search img:first").after('<section class="search-item search-' + digit + '">' + searchoption + '</section><section class="search-cross search-' + digit + '"><img src="img/search-cross.png"></section>')
        $(this).val("")

        removeSearch();
    }
})

var removeSearch = function() {
    $('.search-cross').click(function() {
        $(this).prev().remove()
        $(this).remove()
    });
}

removeSearch()