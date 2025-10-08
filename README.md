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
## Grid Data Model
The grid is represented as a 2D array of strings:

```ts
type GridType = string[][];
[
  ["A1", "B1", "C1"],
  ["A2", "B2", "C2"],
  ["A3", "B3", "C3"],
]
```
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
## Live Demo

Try it out here: [https://data-grid-application.vercel.app/](https://data-grid-application.vercel.app/)

