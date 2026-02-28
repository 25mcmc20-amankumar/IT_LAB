$(document).ready(function () {

    const formJSON = {
        fields: [
            { label: "Full Name", type: "text", id: "name", required: true },
            { label: "Email", type: "email", id: "email", required: true },
            { label: "Password", type: "password", id: "password", required: true },
            {
                label: "Country",
                type: "select",
                id: "country",
                required: true,
                options: ["Select", "USA", "India", "Canada"]
            },
            {
                label: "State",
                type: "select",
                id: "state",
                required: true,
                options: ["Select", "California", "Texas", "New York"],
                dependsOn: "USA"
            },
            {
                label: "Student Type",
                type: "radio",
                id: "studentType",
                options: ["Undergraduate", "Postgraduate"]
            },
            {
                label: "University Name",
                type: "text",
                id: "university",
                dependsOnRadio: "Postgraduate"
            }
        ]
    };

    $.each(formJSON.fields, function (index, field) {

        let formGroup = $("<div>").addClass("form-group");
        let label = $("<label>").text(field.label);

        formGroup.append(label);

        if (field.type === "select") {
            let select = $("<select>").attr("id", field.id);

            $.each(field.options, function (i, option) {
                select.append($("<option>").val(option).text(option));
            });

            formGroup.append(select);
        }

        else if (field.type === "radio") {
            $.each(field.options, function (i, option) {
                let radio = $("<input>")
                    .attr("type", "radio")
                    .attr("name", field.id)
                    .val(option);

                formGroup.append(radio).append(option).append("<br>");
            });
        }

        else {
            let input = $("<input>")
                .attr("type", field.type)
                .attr("id", field.id);

            formGroup.append(input);
        }

        formGroup.append($("<div>").addClass("error").attr("id", field.id + "Error"));

        $("#dynamicForm").append(formGroup);
    });

    $("#dynamicForm").append("<button type='submit'>Submit</button>");

    $("#state").parent().hide();

    $("#country").change(function () {
        if ($(this).val() === "USA") {
            $("#state").parent().show();
        } else {
            $("#state").parent().hide();
        }
    });

    $("#university").parent().hide();

    $(document).on("change", "input[name='studentType']", function () {
        if ($(this).val() === "Postgraduate") {
            $("#university").parent().show();
        } else {
            $("#university").parent().hide();
        }
    });

    $("#dynamicForm").submit(function (e) {
        e.preventDefault();
        let isValid = true;

        $(".error").text("");

        if ($("#name").val().trim() === "") {
            $("#nameError").text("Name is required");
            isValid = false;
        }

        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test($("#email").val())) {
            $("#emailError").text("Enter valid email");
            isValid = false;
        }

        if ($("#password").val().length < 6) {
            $("#passwordError").text("Password must be at least 6 characters");
            isValid = false;
        }

        if ($("#country").val() === "Select") {
            $("#countryError").text("Select country");
            isValid = false;
        }

        if ($("#country").val() === "USA" && $("#state").val() === "Select") {
            $("#stateError").text("Select state");
            isValid = false;
        }

        if ($("input[name='studentType']:checked").val() === "Postgraduate" &&
            $("#university").val().trim() === "") {
            $("#universityError").text("University name required");
            isValid = false;
        }

        if (isValid) {
            alert("Form Submitted Successfully!");
        }
    });

});