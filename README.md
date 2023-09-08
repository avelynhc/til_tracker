# til_tracker
Command-line tool processing input .txt files into generated .html files.

### Features
- User will be able to specify either a file or folder of files as input for conversion
- If the input is a .txt file, it should process that file; 
if it's a directory, it will look for and find all .txt files within that folder, 
processing each one.

### Argument Options
| Option                                                | Responsibility                                  |
|-------------------------------------------------------|-------------------------------------------------|
| -v, --version                                         | displays app name and version                   |
| -h, --help                                            | show help                                       |
| -i, --input <'fileName'> or <'folderName'> `required` | input file or folder will be converted to .html |
| -s, --stylesheet <'URL to a CSS stylesheet'>          | used in the <head> of generated HTML files      |

### Usage
#### Check Version of the app
```ts-node src/index.ts --version` or `ts-node src/index.ts -v```

#### Help Command
```ts-node src/index.ts --help` or `ts-node src/index.ts -h```

#### Convert .txt file to .html file
```ts-node src/index.ts -i fileName.txt` or `ts-node src/index.ts --input fileName.txt```
#### Example
```sh
~/WebstormProjects/til_tracker $ ts-node src/index.ts -i test.txt
Existing folder was successfully removed
Output folder is successfully created!
test.html is created successfully!
```

#### Convert .txt file in a folder to .html file in a folder
```ts-node src/index.ts -i folderName` or `ts-node src/index.ts --input folderName```
#### Example
```sh
~/WebstormProjects/til_tracker $ ts-node src/index.ts -i test
Existing folder was successfully removed
Output folder is successfully created!
test1.html is created successfully!
test2.html is created successfully!
```

#### Specify stylesheet URL to a CSS stylesheet to be used in the <head> of generated HTML files.
```ts-node src/index.ts -i fileName.txt -s stylesheetURL```
#### Example
```sh
~/WebstormProjects/til_tracker $ ts-node src/index.ts -i test.txt -s https://cdnjs.cloudflare.com/ajax/libs/tufte-css/1.8.0/tufte.min.css 
Existing folder was successfully removed
Output folder is successfully created!
test.html is created successfully!
```