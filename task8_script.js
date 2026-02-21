$(document).ready(function () {

    let bookData = [];

    $.ajax({
        type: "GET",
        url: "task8_books.xml",
        dataType: "xml",
        success: function (xml) {

            $(xml).find("book").each(function () {

                let book = {
                    title: $(this).find("title").text(),
                    author: $(this).find("author").text(),
                    genre: $(this).find("genre").text(),
                    price: parseFloat($(this).find("price").text()),
                    publish_date: $(this).find("publish_date").text()
                };

                bookData.push(book);
            });

            populateFilters(bookData);
            displayTable(bookData);
        },
        error: function () {
            alert("Error loading XML file");
        }
    });

    function displayTable(data) {
        $("#bookTable tbody").empty();

        $.each(data, function (index, book) {
            $("#bookTable tbody").append(
                "<tr>" +
                "<td>" + book.title + "</td>" +
                "<td>" + book.author + "</td>" +
                "<td>" + book.genre + "</td>" +
                "<td>" + book.price + "</td>" +
                "<td>" + book.publish_date + "</td>" +
                "</tr>"
            );
        });
    }

    function populateFilters(data) {

        let genres = new Set();
        let authors = new Set();

        data.forEach(book => {
            genres.add(book.genre);
            authors.add(book.author);
        });

        genres.forEach(g => {
            $("#genreFilter").append("<option value='" + g + "'>" + g + "</option>");
        });

        authors.forEach(a => {
            $("#authorFilter").append("<option value='" + a + "'>" + a + "</option>");
        });
    }

    $("#filterBtn").click(function () {

        let selectedGenre = $("#genreFilter").val();
        let selectedAuthor = $("#authorFilter").val();
        let minPrice = $("#minPrice").val();
        let maxPrice = $("#maxPrice").val();

        let filtered = bookData.filter(function (book) {

            return (selectedGenre === "" || book.genre === selectedGenre) &&
                   (selectedAuthor === "" || book.author === selectedAuthor) &&
                   (minPrice === "" || book.price >= minPrice) &&
                   (maxPrice === "" || book.price <= maxPrice);
        });

        displayTable(filtered);
    });

});