# Steeleye Frontend Assignment

## Q1. Explain what the simple List component does?
Ans: List component renders an array of items as a list of selectable items from an array of elements. A SingleListItem element is used to represent each item in the list. The background colour of an object changes to green when we click on a list element.

## Q2. What problems / warnings are there with code?
Ans: Following problems/warnings are there:
1. In `WrappedSingleListItem` component the `onClickHandler()` method is been invoked as a regular expression instead of using an arrow function to call the function.
   ```js
   const WrappedSingleListItem = ({ index, isSelected, onClickHandler, text }) => {
        return (
            <li
            style={{ backgroundColor: isSelected ? "green" : "red" }}
            onClick={() => onClickHandler(index)} // Made changes here
            >
            {text}
            </li>
        );
    };
   ``` 
2. `const [setSelectedIndex, selectedIndex] = useState();`\
   should be changed to\
    `const [selectedIndex, setSelectedIndex] = useState();`
3.  It is mandatory to assign unique key to the elements of array while mapping.
    ```js
    {items.map((item, index) => (
            <SingleListItem
            key = {index}   // This Line should be added
            onClickHandler={() => handleClick(index)}
            text={item.text}
            index={index}
            isSelected={selectedIndex}
            />
    ))}
    ```
   
3. In the following
    ```js
    WrappedListComponent.propTypes = {
    items: PropTypes.array(PropTypes.shapeOf({
        text: PropTypes.string.isRequired,
    })),
    ```
    It should be written as
    ```js
    WrappedListComponent.propTypes = {
        items: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
    })),
    ```
4. .map() will throw an error if the items is defined as null by default.
   ```js
   WrappedListComponent.defaultProps = {
       items: null,
   };
   ```
   It can be fixed by
   ```js
   WrappedListComponent.defaultProps = {
        items: [],
   };
   ```
## Q3. Please fix, optimize, and/or modify the component as much as you think is necessary.
Ans: Fixed code below:
```javascript
import React, { useState, useEffect, memo } from "react";
import PropTypes from "prop-types";

// Single List Item
const WrappedSingleListItem = ({ index, isSelected, onClickHandler, text }) => {
  return (
    <li
      style={{ backgroundColor: isSelected ? "green" : "red" }}
      onClick={() => onClickHandler(index)}
    >
      {text}
    </li>
  );
};

WrappedSingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const SingleListItem = memo(WrappedSingleListItem);

// List Component
const WrappedListComponent = ({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState();

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  const handleClick = index => {
    setSelectedIndex(index);
  };

  return (
    <ul style={{ textAlign: "left" }}>
      {items.map((item, index) => (
        <SingleListItem
          key = {index}
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
          isSelected={index === selectedIndex}
        />
      ))}
    </ul>
  );
};

WrappedListComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ),
};

WrappedListComponent.defaultProps = {
  items: [],
};

const List = memo(WrappedListComponent);

export default List;
```