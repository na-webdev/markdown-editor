class Editor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.mode === "viewer") return null;
    return (
      <div
        id="editor-cover"
        className={
          "d-flex flex-column" + (this.props.mode === "editor" ? " h-full" : "")
        }
      >
        <div
          id="editor-header"
          className="d-flex justify-content-between align-items-center"
        >
          <div>Editor</div>
          <div>
            {this.props.mode !== "editor" ? (
              <i
                onClick={() => this.props.changeMode("editor")}
                className="fa-solid fa-up-right-and-down-left-from-center"
              ></i>
            ) : (
              <i
                onClick={() => this.props.changeMode("both")}
                class="fa-solid fa-down-left-and-up-right-to-center"
              ></i>
            )}
          </div>
        </div>
        <div id="editor-body" className="d-flex flex-column flex-grow-1">
          <textarea
            value={this.props.text}
            className="flex-grow-1"
            name=""
            id="editor"
            cols="30"
            rows="10"
            onChange={(e) => this.props.onChange(e)}
          ></textarea>
        </div>
      </div>
    );
  }
}

class Viewer extends React.Component {
  constructor(props) {
    super(props);
  }

  getMarkdownText = () => {
    const rawMarkup = marked.parse(this.props.text);
    return { __html: rawMarkup };
  };

  render() {
    if (this.props.mode === "editor") return null;

    return (
      <div
        id="viewer-cover"
        className={
          "d-flex flex-column" + (this.props.mode === "viewer" ? " h-full" : "")
        }
      >
        <div
          id="viewer-header"
          className="d-flex justify-content-between align-items-center"
        >
          <div>Previewer</div>
          <div>
            {this.props.mode !== "viewer" ? (
              <i
                onClick={() => this.props.changeMode("viewer")}
                className="fa-solid fa-up-right-and-down-left-from-center"
              ></i>
            ) : (
              <i
                onClick={() => this.props.changeMode("both")}
                class="fa-solid fa-down-left-and-up-right-to-center"
              ></i>
            )}
          </div>
        </div>
        <div id="viewer-body" className="d-flex flex-column flex-grow-1">
          <div
            dangerouslySetInnerHTML={this.getMarkdownText()}
            id="viewer"
            className="flex-grow-1"
          />
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "viewe",
      text: `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`,
    };

    this.watchChanges = this.watchChanges.bind(this);
    this.changeMode = this.changeMode.bind(this);
  }

  watchChanges(e) {
    this.setState({ text: e.target.value });
  }

  changeMode(mode) {
    this.setState({ mode: mode });
  }

  render() {
    return (
      <div className="container">
        <Editor
          mode={this.state.mode}
          text={this.state.text}
          onChange={this.watchChanges}
          changeMode={this.changeMode}
        />
        <Viewer
          mode={this.state.mode}
          text={this.state.text}
          changeMode={this.changeMode}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
