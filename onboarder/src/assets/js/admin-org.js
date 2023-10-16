// Event handler for the "Delete" button click
$(document).on('click', '.btn-danger', function() {
    $('#deleteOrgModal').modal('show');
});

// Event handler for the "Yes" button click in the delete modal
$(document).on('click', '#deleteOrgModal .btn-success', function() {
    // Perform the delete action here
    // Get the data for the organization you want to delete (you may need to pass it as a parameter)
    const data = window.OrganizationArray.find(item => item._id === window._id);

    // Make the HTTP request to delete the organization
    $.ajax({
        type: 'DELETE',
        url: "http://localhost:5000/api/organization" + "/" + data._id,
        success: function(resultData) {
            console.log(resultData);
            // Close the delete modal after the delete action is completed
            $('#deleteOrgModal').modal('hide');
        },
        error: function(error) {
            console.error(error);
        }
    });
});

// Event handler for the "Edit" button click
$(document).on('click', '.btn-primary', function() {
    $('#editOrgModal').modal('show');
});

// Event handler for the "View" button click
$(document).on('click', '.btn-success', function() {
    $('#viewOrgModal').modal('show');
});
