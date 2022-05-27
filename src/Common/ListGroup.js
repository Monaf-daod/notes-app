
export default function ListGroup (props) {

  const {items, textProperty, valueProperty, selectedItem, onItemSelected} = props
  return (
    <ul className='list-group'>
      {items.map(item=>
          <li 
            className={item === selectedItem? 'list-group-item btn active' : 'list-group-item btn' }
            key={Math.random()} 
            onClick={()=>onItemSelected(item)}>
              {item[textProperty]}
          </li>
      )}
    </ul>
   
  );
}


ListGroup.defaultProps = {
  textProperty:'name', valueProperty:'id'
}

