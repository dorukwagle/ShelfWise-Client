import { Button} from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "./ThemedApp";
import Toggle from "./components/DarkModeToggle";


const  App = () => {
  const colorMode = useContext(ColorModeContext);

  return (
    <>
      <Button variant="contained"  color="secondary"
      endIcon={<Toggle onChange={colorMode.toggleColorMode} size={100}/>}
      >Hello test</Button>
    </>
  );
}

export default App;
