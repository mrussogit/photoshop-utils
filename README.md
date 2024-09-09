
# Photoshop Script Collection

This repository contains a collection of useful Photoshop scripts that automate tasks within Adobe Photoshop, improving workflow efficiency for game development.

## Table of Contents

- [Getting Started](#getting-started)
- [Scripts](#scripts)
  - [Get Number of Selected Layers](#get-number-of-selected-layers)
  - [Export Coordinates](#export-coordinates)
  - [Regex in Layer Names](#regex-in-layer-names)
  - [Batch Rename Layers](#batch-rename-layers)
  - [Export Layer Names](#export-layer-names)

## Getting Started

To use these scripts in Adobe Photoshop, follow the instructions below:

1. Open Adobe Photoshop.
2. Go to `File` > `Scripts` > `Browse`.
3. Navigate to the location where you saved the script, select it, and click `Open`.

I recommend using Brusherator by Sergey Kritskiy for frequently used scripts.

## Scripts

### 1. Get Number of Selected Layers ![count](https://github.com/user-attachments/assets/b445e45d-1b7e-491c-9130-bff5e04b3f49)


This script retrieves the number of currently selected layers in the active Photoshop document and displays it in an alert box. 
This is useful if you are working on a number of items/layers and need to ensure accuracy (e.g., you must have exactly 30 layers).

---

### 2. Export Coordinates ![exportcoordinates](https://github.com/user-attachments/assets/9384419c-0cb7-4c88-96b7-a48d9bbc9a1e)


This script exports the coordinates of layers in a `xxxx,yyyy` format, which can then be used in game engines. It generates a `.txt` file that contains the position information of the layers, simplifying the process of integrating graphics into your game.


---

### 3. Regex in Layer Names

This script allows you to find and replace text within layer names using regular expressions (regex). This is useful for batch renaming layers when you need to apply complex renaming patterns or clean up layer names in a Photoshop file with many layers.


![regex](https://github.com/user-attachments/assets/519935cd-fff5-401a-a004-fc0da81b210e)

---

### 4. Batch Rename Layers

This script enables batch renaming of layers by appending or prepending text to layer names. It is particularly useful when organizing large files with many layers, as you can quickly rename multiple layers at once without manual intervention.
![2024-09-09 09_55_09-Adobe Photoshop 2024](https://github.com/user-attachments/assets/96b0e9f3-0395-46c7-8ed3-ce2966a50767)



---

### 5. Export Layer Names ![exportnames](https://github.com/user-attachments/assets/04f69990-2c4f-490c-ab65-bedebd292939)


This script exports the names of all layers in the Photoshop document to a `.txt` file. This is useful when you need to reference layer names in a game engine, such as for labeling or organizing assets.
