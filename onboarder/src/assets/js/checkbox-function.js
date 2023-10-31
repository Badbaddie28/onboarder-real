$(document).ready(function () {
  // Listen for changes in the state of individual checkboxes
  $(":checkbox").on("change", function () {
    // Check if any of the individual checkboxes are checked
    var anyChecked = $(":checkbox:gt(0):checked").length > 0;

    // Update the state of the "Personal Information" checkbox
    $("#personalInfo").prop("checked", anyChecked);
  });
});