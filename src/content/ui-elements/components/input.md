---
title: "Input"
description: "Form input components with validation and multiple states"
category: "components"
subcategory: "form-controls"
slug: "input"
variantCount: 24
variableCount: 18
modeSupport: true
isPremium: false
hasPlayground: true
figmaUrl: "https://www.figma.com/design/ShZ3wQGgTDbKft8dG4oqqe/System-16"
docsUrl: "/docs/components/input"
htmlCode: |
  <div class="form-field form-field-{{variant}}">
    <label class="form-label" for="{{id}}">{{label}}</label>
    <input 
      type="{{type}}" 
      id="{{id}}"
      class="form-input form-input-{{size}}" 
      placeholder="{{placeholder}}"
      {{disabled}}
      {{required}}
      {{readonly}}
    >
    <div class="form-helper">{{helperText}}</div>
  </div>
playgroundParams:
  variant:
    type: "select"
    label: "Variant"
    options: ["default", "success", "warning", "error"]
    default: "default"
  size:
    type: "select"
    label: "Size"
    options: ["sm", "md", "lg"]
    default: "md"
  type:
    type: "select"
    label: "Type"
    options: ["text", "email", "password", "number", "tel", "search"]
    default: "text"
  id:
    type: "text"
    label: "Input ID"
    default: "sample-input"
  label:
    type: "text"
    label: "Label Text"
    default: "Label"
  placeholder:
    type: "text"
    label: "Placeholder"
    default: "Enter your text..."
  helperText:
    type: "text"
    label: "Helper Text"
    default: "This is helper text"
  disabled:
    type: "boolean"
    label: "Disabled"
    default: false
  required:
    type: "boolean"
    label: "Required"
    default: false
  readonly:
    type: "boolean"
    label: "Read Only"
    default: false
---

# Input Components

Professional form input components with comprehensive validation, multiple states, and accessibility features built-in.

## Features

- **24 Input Variants**: Text, email, password, search, number, and more
- **18 Customizable Variables**: Sizing, colors, borders, and spacing
- **Validation States**: Error, success, warning, and loading states
- **Icon Integration**: Leading and trailing icons with proper alignment
- **Accessibility**: Full ARIA support and screen reader compatibility
- **Dark Mode**: Seamless adaptation to light and dark themes

## Input Types

### Basic Inputs
- **Text**: Standard text input for names, titles, etc.
- **Email**: Email validation with proper keyboard on mobile
- **Password**: Secure input with optional show/hide toggle
- **Number**: Numeric input with increment/decrement controls

### Enhanced Inputs
- **Search**: Optimized for search functionality with icons
- **Textarea**: Multi-line text input for longer content
- **Select**: Dropdown selection with custom styling
- **File**: File upload with drag-and-drop support

## Validation Features

- **Real-time Validation**: Instant feedback as users type
- **Multiple States**: Error, success, warning, and neutral
- **Custom Messages**: Contextual error and help text
- **Accessibility**: Proper ARIA attributes for screen readers
- **Visual Indicators**: Color coding and icons for state changes

## Best Practices

- Always include clear, descriptive labels
- Use appropriate input types for better UX
- Provide helpful placeholder text and examples  
- Show validation feedback immediately and clearly
- Ensure proper contrast ratios for accessibility
- Test with keyboard navigation and screen readers