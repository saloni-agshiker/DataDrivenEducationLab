function makeUL(courses) {
    // Create the list element:
    var list = document.createElement('ul');

    for(var i = 0; i < courses.length; i++) {
        // Create the list item:
        var item = document.createElement('li');

        // Set its contents:
        item.appendChild(document.createTextNode(courses[i]));

        // Add it to the list:
        list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;
}

// Add the contents of json to #foo:
document.getElementById("courses").appendChild(makeUL(['VIP 3602', 'CS 1301', 'CS 1331', 'CS 1332']));
