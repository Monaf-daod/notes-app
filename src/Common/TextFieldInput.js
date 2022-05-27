import TextField from '@material-ui/core/TextField';

const TextFieldInput = ({type, label, errorMessage, changeEvent, checkFocus, typeInput = 'text'}) => {

    return ( 
        <>
          <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id={type}
                    type={typeInput}
                    label={label}
                    name={type}
                    autoFocus={checkFocus}
                    autoComplete={type}
                    onChange={changeEvent}
                  />
            {errorMessage && <div className="alert alert-danger"><span>{errorMessage}</span></div>}
        </>
     );
}
 
export default TextFieldInput;