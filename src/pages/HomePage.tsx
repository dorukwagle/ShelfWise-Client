import { Box, Button } from "@mui/material"
import DemoCard from "../components/DemoCard"

const HomePage = () => {
  return (
    <Box>
      <Button variant="contained" color="primary" sx={{ mx: 5, my: 5 }}>
          Hello test
        </Button>
        <DemoCard />
    </Box>
  )
}

export default HomePage