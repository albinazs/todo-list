import './style.css';

function HelloWorld({greeting = "hello", greeted = '"World"', silent = false, onMouseOver,}) {

    if(!greeting){return null};
  
       // TODO: Don't use random in render
    let num = Math.floor (Math.random() * 1E+7).toString().replace(/\.\d+/ig, "")
  
    return <div className='HelloWorld' title={`You are visitor number ${ num }`} onMouseOver={onMouseOver}>
  
      <strong>{ greeting.slice( 0, 1 ).toUpperCase() + greeting.slice(1).toLowerCase() }</strong>
      {greeting.endsWith(",") ? " " : <span style={{color: '\grey'}}>", "</span> }
      <em>
      { greeted }
      </em>
      { (silent)
        ? "."
        : "!"}
  
      </div>;
  
  }

/* 

todo app

dom
- inbox (all)
- today 
- this week
- completed
- projects list

[projects]

{project}
- title
- data-key for dom remove/edit
- [todo items]

{todo item}:
- title
- desc
- dueDate
- isComplete
- data-key for dom remove/edit

app logic object or module?
- creates todos
- setting todos as complete
- changing priority, date, desc etc

DOMdtuff
- visualise app logic

ref https://artis-dev.github.io/to-do-list/#
 */
