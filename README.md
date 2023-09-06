# til_tracker
Command-line tool processing input .txt files into generated .html files.

### Features
- User will be able to specify either a file or folder of files as input for conversion
- If the input is a .txt file, it should process that file; 
if it's a directory, it will look for and find all .txt files within that folder, 
processing each one.

### Argument Options
| Argument Option                                   | Role                                                |
|---------------------------------------------------|-----------------------------------------------------|
| -i, --input <'fileName'> or <'folderName'> `required` | specifies an `input` file or folder to be processed |
| -v, --version                                     | displays app name and version                       |
| -h, --help                                        | show help                                           |
| -s, --stylesheet <'link-to-css-stylesheet'>       | applies css link to `<head>` of HTML file           |

### Usage
#### Check Version of the app
```ts-node src/index.ts --version` or `ts-node src/index.ts -v```

#### Help Command
```ts-node src/index.ts --help` or `ts-node src/index.ts -h```

#### Convert .txt file to .html file
```ts-node src/index.ts test.txt```

#### Convert .txt file in a folder to .html file in a folder
test folder contains test1.txt and test2.txt
```ts-node src/index.ts test```