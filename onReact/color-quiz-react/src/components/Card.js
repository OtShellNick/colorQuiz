export default function Card(props) {
    return (
      <li id={props.id} className={props.className} onClick={props.onClick}></li>
    );
  }
  