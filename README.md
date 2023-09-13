# til_tracker
Command-line tool processing input .txt files into generated .html files.

### Installation
```bash
# Step 1: Ensure that NPM is installed on your system.
$ npm --version

# Step 2: Ensure that Node is installed on your system. You can check this by using:
$ node --version

# Step 3: Clone the repository to your local machine, and install it.
$ git clone https://github.com/avelynhc/til_tracker.git
$ cd til_tracker
$ npm install
```

### Features
- User will be able to specify either a file or folder of files as input for conversion
- If the input is a .txt file, it should process that file; 
if it's a directory, it will look for and find all .txt files within that folder, 
processing each one.

### Argument Options
| Option                                               | Responsibility                                    |
|------------------------------------------------------|---------------------------------------------------|
| -v, --version                                        | displays app name and version                     |
| -h, --help                                           | show help                                         |
| -i, --input <'fileName'> or <'folderName'> `required` | input file or folder will be converted to .html   |
| -s, --stylesheet <'URL to a CSS stylesheet'>         | CSS stylesheet to be used in generated HTNL files |
| -l, --lang <'language'>                              | language to be used in generated HTML files       |

### Usage
#### Check Version of the app
```ts-node src/index.ts --version` or `ts-node src/index.ts -v```

#### Help Command
```ts-node src/index.ts --help` or `ts-node src/index.ts -h```

#### Convert .txt file to .html file
```ts-node src/index.ts -i fileName.txt` or `ts-node src/index.ts --input fileName.txt```
#### Example
```text
./test.txt

This is the first paragraph.

This is the second paragraph.

This is the third paragraph.
```

```sh
~/WebstormProjects/til_tracker $ ts-node src/index.ts -i examples.txt
Existing folder was successfully removed
Output folder is successfully created!
test.html is created successfully!
```

```html
./dist/test.html

<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>test</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
    <h1>test</h1>
    <p>This is the first paragraph.</p>
    
    <p>This is the second paragraph.</p>
    
    <p>This is the third paragraph.</p>
</body>
</html>
```

#### Convert .txt files in a folder to .html files in a folder
```ts-node src/index.ts -i folderName` or `ts-node src/index.ts --input folderName```
#### Example
```text
./examples/test1.txt

This is the test1 txt file of test folder.

This is the test1 txt file of test folder.
```

```text
./examples/test2.txt

This is the test2 txt file of test folder.

This is the test2 txt file of test folder.
```

```sh
~/WebstormProjects/til_tracker $ ts-node src/index.ts -i examples
Existing folder was successfully removed
Output folder is successfully created!
test1.html is created successfully!
test2.html is created successfully!
```

```html
./dist/test1.html

<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>test1</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
    <h1>test1</h1>  
    <p>This is the test1 txt file of test folder.</p>
    
    <p>This is the test1 txt file of test folder.</p>
</body>
</html>
```

```html
./dist/test2.html
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>test2</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
    <h1>test2</h1>
    <p>This is the test2 txt file of test folder.</p>
    
    <p>This is the test2 txt file of test folder.</p>
</body>
</html>
```

#### Convert .txt file to .html file with french
```ts-node src/index.ts -i folderName -l language```
#### Example
```sh
~/WebstormProjects/til_tracker $ ts-node src/index.ts -i examples.txt -l fr
Existing folder was successfully removed
Output folder is successfully created!
examples.html is created successfully!
```

```html
<!doctype html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <title>examples</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
    <h1>examples</h1>
    <p>This is the first paragraph of test1.txt.</p>
    
    <p>This is the second paragraph of test1.txt.</p>
    
    <p>This is the third paragraph of test1.txt.</p>
</body>
</html>
```

#### Convert .txt file to .html file with french and stylesheet
```ts-node src/index.ts -i folderName -l language -s CSS-styelesheet-URL```
#### Example
```sh
~/WebstormProjects/til_tracker $ ts-node src/index.ts -i examples.txt -l kor -s https://cdn.jsdelivr.net/npm/water.css@2/out/water.css                                                                        ✔  23:08:51 
Existing folder was successfully removed
Output folder is successfully created!
examples.html is created successfully!
```

```html
<!doctype html>
<html lang="kor">
<head>
    <meta charset="utf-8">
    <title>examples</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css">
</head>
<body>
    <h1>examples</h1>
    <p>This is the first paragraph of test1.txt.</p>
    
    <p>This is the second paragraph of test1.txt.</p>
    
    <p>This is the third paragraph of test1.txt.</p>
</body>
</html>
```

Note: Even if a file and a folder share the same name, you will still be able to obtain the desired result. 
Since folders do not have file extensions, there is no confusion between the folder and the file.

#### Specify stylesheet URL to a CSS stylesheet to be used in the <head> of generated HTML files
```ts-node src/index.ts -i fileName.txt -s stylesheetURL```
#### Example
```sh
~/WebstormProjects/til_tracker $ ts-node src/index.ts -i examples.txt -s https://cdnjs.cloudflare.com/ajax/libs/tufte-css/1.8.0/tufte.min.css 
Existing folder was successfully removed
Output folder is successfully created!
test.html is created successfully!
```

```html
./dist/test.html

<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <title>test</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tufte-css/1.8.0/tufte.min.css">
</head>
<h1>test</h1>
<body>
    <p>This is the first paragraph.</p>
    
    <p>This is the second paragraph.</p>
    
    <p>This is the third paragraph.</p>
</body>
</html>
```