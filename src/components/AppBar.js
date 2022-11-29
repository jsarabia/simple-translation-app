import { IconButton } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import FileUploadIcon from '@mui/icons-material/FileUpload';

function AppBar() {
    return (
        <div class="app_bar">
            <IconButton class="nav_btn">
                <HomeIcon/>
            </IconButton>
            <IconButton class="nav_btn">
                <FileUploadIcon/>
            </IconButton>
        </div>
    );
}

export default AppBar;