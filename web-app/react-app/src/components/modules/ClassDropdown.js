import React from 'react';
import {
    Dropdown,
    DropdownButton
} from 'react-bootstrap';

export function ClassDropdown() {

    return (
        <DropdownButton id="dropdown-item-button" title="Select your class">
            <Dropdown.Item as="button">CS 1301</Dropdown.Item>
            <Dropdown.Item as="button">ENGL 1101</Dropdown.Item>
            <Dropdown.Item as="button">CS 1331</Dropdown.Item>
            <Dropdown.Item as="button">MATH 1554</Dropdown.Item>
            <Dropdown.Item as="button">CS 1332</Dropdown.Item>
        </DropdownButton>
    );

}