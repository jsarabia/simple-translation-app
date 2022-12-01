import { Button, IconButton } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { importUSFM } from "../domain/ImportFile";


function AppBar() {
    return (
        <div class="app_bar">
            <IconButton class="nav_btn">
                <HomeIcon />
            </IconButton>
        
            <Button variant="contained" component="label" sx={{margin: 1, minWidth:48, maxWidth: 48, height: 48}}>
                <input hidden type="file" accept=".usfm, .usfm3, .USFM, .USFM3" onChange={(event) => {
                    const files = event.target.files;
                    for (const file of files) {
                        importUSFM(file);
                    }
                }}>
                </input>
                <FileUploadIcon />
            </Button>
        </div>
    );
}

export default AppBar;