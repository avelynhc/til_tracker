# til_tracker

Command-line tool written in Typescript processing input .txt files into generated .html files.

### Features

- User will be able to specify either a file or folder of files as input for conversion
- If the input is a .txt or a .md file, it should process that file.
- If it's a directory, it will look for and find all .txt and .md files within that folder, processing each one.

### Download && Install til_tracker

```shell
$ npm i til_tracker

// go to the root directory of the til_tracker
$ cd node_modules/til_tracker

// install ts-node globally if you do not have it already
$ npm install -g ts-node

// now you can start using the til_tracker
```

### Argument Options

| Option                                       | Responsibility                                    |
| -------------------------------------------- | ------------------------------------------------- |
| -v, --version                                | displays app name and version                     |
| -h, --help                                   | show help                                         |
| -s, --stylesheet <'URL to a CSS stylesheet'> | CSS stylesheet to be used in generated HTML files |
| -l, --lang <'language'>                      | language to be used in generated HTML files       |
| -c, --config <'.toml config file'>           | path to .toml config file                         |

### Usage

#### Check Version of the app

```
ts-node src/index.ts --version or ts-node src/index.ts -v
```

#### Help Command

```
ts-node src/index.ts --help or ts-node src/index.ts -h
```

#### Convert .txt file to .html file

```
ts-node src/index.ts fileName.txt
```

#### Example

```text
./examples.txt

This is the first paragraph of examples.txt.

This is the second paragraph of examples.txt.

This is the third paragraph of examples.txt.
```

```sh
~/WebstormProjects/til_tracker $ ts-node src/index.ts examples.txt
Existing folder was successfully removed
Output folder is successfully created!
examples.html is created successfully!
```

```html
./til/examples.html

<!doctype html>
<html lang="en-CA">
  <head>
    <meta charset="utf-8" />
    <title>examples</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <h1>examples</h1>
    <p>This is the first paragraph of examples.txt.</p>
    <p>This is the second paragraph of examples.txt.</p>
    <p>This is the third paragraph of examples.txt.</p>
  </body>
</html>
```

#### Convert files in a folder to .html files in a folder

```
ts-node src/index.ts folderName
```

#### Example

```text
./examples/test1.txt

This is the test1 txt file of examples folder.

This is the test1 txt file of examples folder.
```

```text
./examples/test2.txt

This is the test2 txt file of examples folder.

This is the test2 txt file of examples folder.
```

```sh
~/WebstormProjects/til_tracker $ ts-node src/index.ts examples
Existing folder was successfully removed
Output folder is successfully created!
test1.html is created successfully!
test2.html is created successfully!
```

```html
./til/examples.html

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>test1</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <h1>test1</h1>
    <p>This is the test1 txt file of examples folder.</p>
    <p>This is the test1 txt file of examples folder.</p>
  </body>
</html>
```

```html
./til/test2.html

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>test2</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <h1>test2</h1>
    <p>This is the test2 txt file of examples folder.</p>
    <p>This is the test2 txt file of examples folder.</p>
  </body>
</html>
```

#### Convert .txt file to .html file with another language

```
ts-node src/index.ts fileName -l language
```

#### Example

```sh
~/WebstormProjects/til_tracker $ ts-node src/index.ts examples.txt -l fr
Existing folder was successfully removed
Output folder is successfully created!
examples.html is created successfully!
```

```html
./til/examples.html

<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <title>examples</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <h1>examples</h1>
    <p>This is the first paragraph of examples.txt.</p>
    <p>This is the second paragraph of examples.txt.</p>
    <p>This is the third paragraph of examples.txt.</p>
  </body>
</html>
```

#### Convert .md file to .html file with another language

```
ts-node src/index.ts fileName -l language
```

#### Example

```text
./examples/test.md

# Heading Level 1

## Heading Level 2

### Heading Level 3

Click this [link]("https://commonmark.org/help/") for more ino!

*Italic* font

**Bold** font as well!

#### Heading Level 4

Should be a paragraph 1

Should be a paragraph 2

Should be a paragraph 3
```

```sh
~/WebstormProjects/til_tracker $ ts-node .\src\index.ts .\examples\test.md
Existing folder was successfully removed
Output folder is successfully created!
test.html is created successfully!
```

```html
./til/test.html

<!doctype html>
<html lang="en-CA">
  <head>
    <meta charset="utf-8" />
    <title>test</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <h1>test</h1>
    <h1>Heading Level 1</h1>
    <h2>Heading Level 2</h2>
    <h3>Heading Level 3</h3>
    <p>Click this <a href="https://commonmark.org/help/">link</a> for more ino!</p>
    <p><i>Italic</i> font</p>
    <p><b>Bold</b> font as well!</p>
    <h4>Heading Level 4</h4>
    <p>Should be a paragraph 1</p>
    <p>Should be a paragraph 2</p>
    <p>Should be a paragraph 3</p>
  </body>
</html>
```

#### Convert .txt file to .html file with another language and stylesheet

```
ts-node src/index.ts folderName -l language -s CSS-styelesheet-URL
```

#### Example

```sh
~/WebstormProjects/til_tracker $ ts-node src/index.ts examples -l fr -s https://cdn.jsdelivr.net/npm/water.css@2/out/water.css                                                                        ✔  23:08:51
Existing folder was successfully removed
Output folder is successfully created!
test1.html is created successfully!
test2.html is created successfully!
```

```html
./til/test1.html

<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <title>test1</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css" />
  </head>
  <body>
    <h1>test1</h1>
    <p>This is the test1 txt file of examples folder.</p>
    <p>This is the test1 txt file of examples folder.</p>
  </body>
</html>
```

```html
./til/test2.html

<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <title>test2</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css" />
  </head>
  <body>
    <h1>test2</h1>
    <p>This is the test2 txt file of examples folder.</p>
    <p>This is the test2 txt file of examples folder.</p>
  </body>
</html>
```

Note: Even if a file and a folder share the same name, you will still be able to obtain the desired result.
Since folders do not have file extensions, there is no confusion between the folder and the file.

#### Specify stylesheet URL or relative path to a CSS stylesheet to be used in the <head> of generated HTML files

```
$ ts-node src/index.ts fileName.txt -s stylesheetURL
or
$ ts-node src/index.ts fileName.txt -s <relative-path-to-css-file>
```

#### Example

```sh
~/WebstormProjects/til_tracker $ ts-node src/index.ts examples.txt -s https://cdnjs.cloudflare.com/ajax/libs/tufte-css/1.8.0/tufte.min.css
Existing folder was successfully removed
Output folder is successfully created!
examples.html is created successfully!
```

```html
./til/examples.html

<!doctype html>
<html lang="en-CA">
  <head>
    <meta charset="utf-8" />
    <title>examples</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/tufte-css/1.8.0/tufte.min.css"
    />
  </head>
  <body>
    <h1>examples</h1>
    <p>This is the first paragraph of examples.txt.</p>
    <p>This is the second paragraph of examples.txt.</p>
    <p>This is the third paragraph of examples.txt.</p>
  </body>
</html>
```

```sh
~/WebstormProjects/til_tracker $ ts-node src/index.ts examples1.md -s examples/styles/test.css
Existing folder was successfully removed
Output folder ./til is successfully created
examples1.html is created successfully!
```

```html
./til/examples1.html

<!doctype html>
<html lang="en-CA">
  <head>
    ...
    <link rel="stylesheet" href="../examples/styles/test.css" />
    ...
  </head>
</html>
```

#### You can even specify all of their options in a TOML formatted configuration file

#### Example

```sh
./config.toml

lang = "fr-CA"
stylesheet = "https://cdn.jsdelivr.net/npm/water.css@2/out/water.css"
```

```sh
 ~/WebstormProjects/til_tracker $ src/index.ts examples -c config.toml                                                                                                                           ✔  15:19:08
Existing folder was successfully removed
Output folder ./til is successfully created
examples1.html is created successfully!
```
