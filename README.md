# Data Grid Application
A lightweight **Excel-like spreadsheet** built with React, TailwindCSS, Typescript and Nanostores.  
Supports editable cells, range selection, copy/paste, drag-resize, and dynamic rows/columns with persistent storage.

---

## Features

- Editable cells with two-way binding (UI and data model)
- Select single cell, row, column, or a range
- Highlight cells on selection
- Copy, Cut, and Paste (works with external Excel)  
- Paste overflow automatically expands the grid
- Keyboard navigation: Arrow keys, Enter, Esc, Tab, Shift + Arrow
- Add rows and columns dynamically  
- Persist grid data in **localStorage**  using **Persistent Nanostores**
- Resizable rows and columns (also persisted in localstorage)
- Styled headers: first row (red), first column (green)  
- Drag to select a range of cells
---
## Highlights

- **Typed Data with Nanostores:** Unlike using plain `localStorage`, Nanostores provides a reactive data model with type safety.  
- **Simplified Imports:** Base path setup allows clean, absolute imports without navigating nested folders.  
- **Lightweight & Custom:** No third-party grid library is used, keeping the project fast and fully customizable.
- **Reusable types:** Types are declared once and implemented strictly.

---
## Project Structure

- **src/**
    - **components/** 
    - **stores/**
    - **hooks/**
---
## Installation

```bash
# Clone the repo
git clone https://github.com/ashikstylist/data-grid-application.git
cd data-grid-application

# Install dependencies
npm install

# Run the app
npm run dev

```

