'use strict';

var valueOption = [];
var optionTwo = [];

var uniqueOptionValue = [];
var uniqueOptionValueTwo = [];

var arrayImages = [];
var arrayImagesTwo = [];


//age-1 images 
function Images(title, image_url, description, horns, keyword) {
    this.title = title;
    this.image_url = image_url;
    this.description = description;
    this.horns = horns;
    this.keyword = keyword;
    arrayImages.push(this);
}
//page-2 images 
function ImagesTwo(title, image_url, description, horns, keyword) {
    this.title = title;
    this.image_url = image_url;
    this.description = description;
    this.horns = horns;
    this.keyword = keyword;
    arrayImagesTwo.push(this);

}
// console.log(arrayImagesTwo);

//render images 1
Images.prototype.renderImages = function() {
        let temp = $('#template-img').html();
        $('.main-1').append(Mustache.render(temp, this));
    }
    //render images 2
ImagesTwo.prototype.renderImages2 = function() {
    let temp = $('#template-img').html();
    $('.main-2').append(Mustache.render(temp, this));
}


Images.readJson = () => {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };


    $.ajax('data/page-1.json', ajaxSettings)
        .then(data => {
            data.forEach(element => {
                valueOption.push(element.keyword);
                let image = new Images(element.title, element.image_url, element.description, element.horns, element.keyword);
                image.renderImages();
            });
            $.each(valueOption, function(i, el) {
                if ($.inArray(el, uniqueOptionValue) === -1) uniqueOptionValue.push(el);
            });

            uniqueOptionValue.forEach(function(value, i) {
                $("#menu").append("<option value=" + value + ">" + value + "</option>");
            });
        });
};

ImagesTwo.readJson2 = () => {
    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    };
    $.ajax('data/page-2.json', ajaxSettings)
        .then(data => {
            data.forEach(element => {
                optionTwo.push(element.keyword);
                let image = new ImagesTwo(element.title, element.image_url, element.description, element.horns, element.keyword);
                image.renderImages2();

            });
            $.each(optionTwo, function(i, el) {
                if ($.inArray(el, uniqueOptionValueTwo) === -1) uniqueOptionValueTwo.push(el);
            });

            uniqueOptionValueTwo.forEach(function(value, i) {
                $("#menu").append("<option value=" + value + ">" + value + "</option>");
            });
        });
};

function selectKeywords() {
    $("#menu").on('change', function() {
        var name = this.options[this.selectedIndex].text;
        var newPhotoTemplate2 = $('.photo-template').clone();
        $('.main-1').html("");
        $('.main-1').append(newPhotoTemplate2);
        arrayImages.forEach(function(value, i) {
            if (name === value.keyword) {
                value.renderImages();
            }
        });
    });
}

function selectKeywordsTwo() {
    $("#menu").on('change', function() {
        var name = this.options[this.selectedIndex].text;
        var newPhotoTemplateTwo = $('#template-img').clone();
        $('.main-2').html("");
        $('.main-2').append(newPhotoTemplateTwo);
        arrayImagesTwo.forEach(function(value, i) {
            if (name === value.keyword) {
                value.renderImages2();
            }
        });
    });
}


$("document").ready(function() {

    Images.readJson();
    selectKeywords();
});

var pageName = "page-1";
$("#page-1").on("click", function() {
    // $('.photo-template').html("");
    $("#menu").html("");
    $(".main-2").hide();
    $(".main-1").show();
    $(".main-1").empty();
    Images.readJson();
    selectKeywords();
    pageName = "page-1";

    arrayImages = [];
});

$("#page-2").on("click", function() {
    // $(".photo-template2").html("");
    $("#menu").html("");
    $(".main-1").hide();
    $(".main-2").show();
    $(".main-2").empty();
    ImagesTwo.readJson2();
    selectKeywordsTwo();
    pageName = "page-2";
    arrayImagesTwo = [];
    // $(".photo-template2").html("");
});

$("#title").on("click", function() {
    sortOnTitle();
});
$("#horns").on("click", function() {
    sortOnHorns();
});



function sortOnTitle() {
    if (pageName === "page-1") {
        arrayImages.sort(function(a, b) {
            if (a.title > b.title) return 1;
            if (b.title > a.title) return -1;

            return 0;
        });

        $('.main-1').html("");
        arrayImages.forEach(function(value, i) {
            value.renderImages();
        });
    }
    if (pageName === "page-2") {
        arrayImagesTwo.sort(function(a, b) {
            if (a.title > b.title) return 1;
            if (b.title > a.title) return -1;

            return 0;
        });

        $('.main-2').html("");
        arrayImagesTwo.forEach(function(value, i) {
            value.renderImages2();
        });
    }
}

function sortOnHorns() {

    if (pageName === "page-1") {
        arrayImages.sort(function(a, b) {
            if (a.horns < b.horns) return 1;
            if (b.horns < a.horns) return -1;

            return 0;
        });

        $('.main-1').html("");
        arrayImages.forEach(function(value, i) {
            value.renderImages();
        });
    }
    if (pageName === "page-2") {
        arrayImagesTwo.sort(function(a, b) {
            if (a.horns < b.horns) return 1;
            if (b.horns < a.horns) return -1;

            return 0;
        });

        $('.main-2').html("");
        arrayImagesTwo.forEach(function(value, i) {
            value.renderImages2();
        });
    }
}